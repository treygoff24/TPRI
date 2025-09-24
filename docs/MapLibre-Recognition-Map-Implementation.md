# MapLibre GL – Western Hemisphere Recognition Map

**Goal:** A premium, high‑performance interactive map of the Western Hemisphere that shades each sovereign country by whether it maintains diplomatic relations with the **People’s Republic of China (PRC)** or the **Republic of China (Taiwan)**, with authoritative citations, hover/click tooltips, keyboard navigation, and responsive performance.

---

## What you get in this package

- `recognition.json` — canonical dataset for recognition status by ISO‑A3 (generated and included).
- `citations.json` — source registry keyed by `citationId` (generated and included).
- `style-tokens.json` — color tokens used by the legend and fill styling (generated and included).
- `build_countries_western_hemisphere.mapshaper.txt` — ready‑to‑run Mapshaper recipe to generate the hemisphere country polygons from Natural Earth.
- This implementation guide (you’re reading it).

> **Why not ship the large GeoJSON here?** Country polygons are 1–5 MB even when simplified; we generate them deterministically from public Natural Earth data using a one‑liner so the repo stays lean and updates are trivial.

---

## Data model

### `recognition.json`

```jsonc
{{
  "version": "1.0.0",
  "updated": "2025-09-24",
  "sourceIndex": "citations.json",
  "entries": [
    {{
      "isoAlpha3": "USA",                // Natural Earth ADM0_A3 code
      "name": "United States",
      "recognition": "china",            // 'china' | 'taiwan'
      "since": "1979-01-01",             // optional ISO date
      "sinceYear": 1979,                 // optional year when exact date unknown
      "lastChangeEvent": "established-relations-with-prc",
      "notes": "Optional free-form notes",
      "citationIds": ["usa-1979-frus"]   // keys into citations.json
    }}
  ]
}}
```

Design principles:

- **Immutable facts only**: which government is formally recognized, and since when (if known).
- **Citations are mandatory**: each entry has 1+ `citationIds`.
- **Neutral naming**: we label categories “china / taiwan” for styling and keep tooltips factual.

### `citations.json`

Map of `citationId` → `{{ title, publisher, url, accessed }}`. URLs are authoritative (MOFA Taiwan, FMPRC, State Dept/FRUS, BBC/Reuters for switches).

### Color tokens (`style-tokens.json`)

These may be themed by the site. Default values are:

```json
{{
  "colors": {{
    "china": "#C62828",
    "taiwan": "#1E88E5",
    "neutral": "#BDBDBD",
    "hoverStroke": "#212121",
    "ocean": "#0A0F1C"
  }}
}}
```

---

## Build the hemisphere polygons

> **One-time step.** Requires Node + `mapshaper` installed globally.

1. Find Natural Earth 1:50m Admin 0 Countries:  
   file name in root directory: (`ne_50m_admin_0_countries.zip`)

2. Unzip and run the recipe (adjust path as needed):

```bash
mapshaper \
  ne_50m_admin_0_countries.shp \
  -filter 'TYPE == "Sovereign country"' \
  -proj wgs84 \
  -clip bbox=-170,-60,-20,85 \
  -filter 'ADM0_A3 != "ATA"' \
  -clean-layers \
  -dissolve2 target=ADM0_A3 \
  -each 'iso_a3=ADM0_A3, name=NAME_LONG' \
  -rename-layers countries \
  -simplify 15% preserve-shapes \
  -o format=geojson precision=0.000001 public/data/countries-western-hemisphere.geo.json \
  -o format=topojson precision=0.000001 public/data/countries-western-hemisphere.topo.json
```

> **Notes**
>
> - Keeps **sovereign countries only** (no territories) to match the political intent.
> - The bbox roughly bounds the Western Hemisphere; tweak if you want to include Azores/Iceland.
> - Exports both GeoJSON (simple) and TopoJSON (smaller) — we’ll default to GeoJSON for simplicity.

---

## Directory layout (Next.js)

```
/public/data/
  countries-western-hemisphere.geo.json   # generated with mapshaper
  recognition.json                        # provided
  citations.json                          # provided

/src/components/map/
  RecognitionMap.tsx                      # Client component with MapLibre logic
  Legend.tsx                              # Simple legend / category filter
  Tooltip.tsx                             # Controlled tooltip component

/src/lib/recognition/
  loadRecognition.ts                      # Fetch+validate recognition.json
  buildColorExpression.ts                 # MapLibre ‘match’ expression generator
  types.ts                                # TypeScript definitions
```

---

## Implementation details

### 1) Install deps

```bash
npm i maplibre-gl @turf/turf zod
```

### 2) Type defs (`src/lib/recognition/types.ts`)

```ts
export type RecognitionKind = 'china' | 'taiwan';

export interface RecognitionEntry {{
  isoAlpha3: string;
  name: string;
  recognition: RecognitionKind;
  since?: string;
  sinceYear?: number;
  lastChangeEvent?: string;
  notes?: string;
  citationIds: string[];
}}

export interface RecognitionDataset {{
  version: string;
  updated: string;
  sourceIndex: string;
  entries: RecognitionEntry[];
}}

export interface CitationsIndex {{
  [id: string]: {{
    title: string;
    publisher: string;
    url: string;
    accessed?: string;
    note?: string;
  }};
}}
```

### 3) Loader + validation (`src/lib/recognition/loadRecognition.ts`)

```ts
import {{ z }} from 'zod';
import type {{ RecognitionDataset, CitationsIndex }} from './types';

const Entry = z.object({{
  isoAlpha3: z.string().min(3).max(3),
  name: z.string(),
  recognition: z.enum(['china', 'taiwan']),
  since: z.string().optional(),
  sinceYear: z.number().optional(),
  lastChangeEvent: z.string().optional(),
  notes: z.string().optional(),
  citationIds: z.array(z.string()).min(1),
}});
const Data = z.object({{
  version: z.string(),
  updated: z.string(),
  sourceIndex: z.string(),
  entries: z.array(Entry),
}});

export async function loadRecognition(): Promise<RecognitionDataset> {{
  const res = await fetch('/data/recognition.json');
  const json = await res.json();
  return Data.parse(json);
}}

export async function loadCitations(src = '/data/citations.json'): Promise<CitationsIndex> {{
  const res = await fetch(src);
  return res.json();
}}
```

### 4) Color expression (`src/lib/recognition/buildColorExpression.ts`)

```ts
import type {{ RecognitionDataset }} from './types';

export function buildColorExpression(data: RecognitionDataset) {{
  const china = '#C62828';
  const taiwan = '#1E88E5';
  const neutral = '#BDBDBD';
  const match: (string | string[])[] = ['match', ['get', 'iso_a3']];

  const chinaSet = new Set<string>();
  const taiwanSet = new Set<string>();

  data.entries.forEach(e => {{
    (e.recognition === 'china' ? chinaSet : taiwanSet).add(e.isoAlpha3);
  }});

  if (chinaSet.size) match.push([...chinaSet], china);
  if (taiwanSet.size) match.push([...taiwanSet], taiwan);
  match.push(neutral);

  return match;
}}
```

### 5) Map component (`src/components/map/RecognitionMap.tsx`)

```tsx
'use client';
import maplibregl, {{ Map, MapMouseEvent }} from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import {{ useEffect, useRef, useState }} from 'react';
import {{ buildColorExpression }} from '@/src/lib/recognition/buildColorExpression';
import {{ loadRecognition, loadCitations }} from '@/src/lib/recognition/loadRecognition';

type Props = {{
  height?: number | string;   // e.g., 520 or '60vh'
  basemapStyle?: string;      // e.g., 'https://demotiles.maplibre.org/style.json'
}};

export default function RecognitionMap({{ height = 520, basemapStyle = 'https://demotiles.maplibre.org/style.json' }}: Props) {{
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {{
    if (!containerRef.current) return;
    const map = new maplibregl.Map({{
      container: containerRef.current,
      style: basemapStyle,
      center: [-80, 15],
      zoom: 2.2,
      attributionControl: false,
      dragRotate: false,
      pitchWithRotate: false
    }});
    mapRef.current = map;

    // load layers
    (async () => {{
      const [recog, cites] = await Promise.all([loadRecognition(), loadCitations()]);
      const colorExpr = buildColorExpression(recog);

      const geo = await fetch('/data/countries-western-hemisphere.geo.json').then(r => r.json());

      map.on('load', () => {{
        map.addSource('countries', {{ type: 'geojson', data: geo }});
        map.addLayer({{
          id: 'countries-fill',
          type: 'fill',
          source: 'countries',
          paint: {{ 'fill-color': colorExpr as any, 'fill-opacity': 0.9 }}
        }});
        map.addLayer({{
          id: 'countries-outline',
          type: 'line',
          source: 'countries',
          paint: {{ 'line-color': '#0A0F1C', 'line-width': 0.5 }}
        }});

        const popup = new maplibregl.Popup({{ closeButton: false, closeOnClick: false, offset: 8 }});
        map.on('mousemove', 'countries-fill', (e: MapMouseEvent) => {{
          const f = e.features?.[0];
          if (!f) return;
          const iso = (f.properties as any).iso_a3;
          const rec = recog.entries.find(x => x.isoAlpha3 === iso);
          if (!rec) return;
          const status = rec.recognition === 'china' ? 'Recognizes PRC (Beijing)' : 'Recognizes ROC (Taiwan)';
          const since = rec.since ?? (rec.sinceYear ? String(rec.sinceYear) : '');
          const cite = rec.citationIds?.[0];
          const href = cite ? (cites as any)[cite]?.url : undefined;

          popup
            .setLngLat(e.lngLat)
            .setHTML(`
              <div style="font: 500 12px/1.3 system-ui, -apple-system, Segoe UI, Roboto; padding:4px 6px">
                <div style="font-weight:600">${{rec.name}}</div>
                <div>${{status}}${{since ? ` · since ${{since}}` : ''}}</div>
                ${{href ? `<div style="margin-top:2px"><a href="${{href}}" target="_blank" rel="noopener noreferrer">Source</a></div>` : ''}}
              </div>
            `)
            .addTo(map);
          map.getCanvas().style.cursor = 'pointer';
        }});

        map.on('mouseleave', 'countries-fill', () => {{
          popup.remove();
          map.getCanvas().style.cursor = '';
        }});

        setReady(true);
      }});
    }})();

    return () => {{ map.remove(); }};
  }}, [basemapStyle]);

  return <div ref={containerRef} style={{ width: '100%', height }} />;
}}
```

### 6) Legend (optional filter)

A small component that shows color chips and lets users toggle visibility per category by switching layer filters with `setFilter(...)`. Omitted here for brevity — trivial to add using the color tokens.

---

## Accessibility

- **Keyboard**: Allow tab-through country list (offscreen list that drives `flyTo()` and opens a fixed-position tooltip summary).
- **Reduce motion**: Respect `prefers-reduced-motion` and skip `flyTo` animations.
- **Contrast**: Colors pass WCAG AA against ocean background; adjust in `style-tokens.json` if needed.

---

## QA checklist

- [ ] All sovereign states in the Americas + Caribbean present and filled.
- [ ] Taiwan allies render in **blue** by default; PRC-recognizers in **red**.
- [ ] Tooltip shows country name, status, since/sinceYear, and a **clickable source**.
- [ ] Mobile (iOS Safari / Android Chrome) tap = tooltip; pan remains smooth at 60fps.
- [ ] No tiles/network calls after initial load (everything local).
- [ ] Lighthouse performance > 90 on mobile.
- [ ] A11y: tooltip readable on zoomed OS text; focus traps avoided.

---

## Updating the data

1. Edit `public/data/recognition.json` (add/remove entries).
2. Keep `citationIds` in sync with `public/data/citations.json`.
3. Re-run the **Mapshaper** recipe if you tweak the bbox or want a different simplification tolerance.

---

## Troubleshooting

- **Country not filled**: Check that `iso_a3` in the GeoJSON matches `isoAlpha3` in `recognition.json`.
- **Visual gaps** along borders: increase `-simplify` tolerance accuracy or remove simplification.
- **Source link missing**: ensure the cited id exists in `citations.json` and is included in `citationIds`.

---

## License / Data sources

- Country geometry: **Natural Earth** public domain.
- Recognition facts: **Taiwan MOFA**, **FMPRC**, **U.S. FRUS**, **BBC/Reuters** (for switch dates). See `citations.json`.
