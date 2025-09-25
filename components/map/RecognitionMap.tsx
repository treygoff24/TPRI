"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import maplibregl, {
  type ExpressionSpecification,
  type FilterSpecification,
  type LngLatLike,
  type Map as MapInstance,
  type MapGeoJSONFeature,
  type MapLayerMouseEvent,
  type MapMouseEvent,
  type PaddingOptions,
  type StyleSpecification,
} from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { centroid } from "@turf/turf";
import type { Feature, FeatureCollection, MultiPolygon, Polygon } from "geojson";

import type {
  CitationsIndex,
  RecognitionEntry,
  RecognitionKind,
  StyleTokens,
} from "@/lib/recognition/types";
import { buildColorExpression } from "@/lib/recognition/buildColorExpression";
import {
  loadCitations,
  loadRecognitionDataset,
  loadStyleTokens,
} from "@/lib/recognition/loadRecognition";

import { Legend } from "./Legend";
import { Tooltip, type TooltipData } from "./Tooltip";

const COUNTRIES_SOURCE_ID = "countries";
const FILL_LAYER_ID = "countries-fill";
const OUTLINE_LAYER_ID = "countries-outline";
const HIGHLIGHT_LAYER_ID = "countries-highlight";

const DEFAULT_HEIGHT = 520;
const MAP_PADDING: PaddingOptions = { top: 24, bottom: 24, left: 24, right: 24 };
const DEFAULT_BOUNDS: maplibregl.LngLatBoundsLike = [
  [-170, -60],
  [-20, 85],
];
const USA_CODE = "USA";
const USA_SPECIAL_COLOR = "#F4B400";

function createBaseStyle(tokens: StyleTokens["colors"]): StyleSpecification {
  return {
    version: 8,
    sources: {},
    layers: [
      {
        id: "background",
        type: "background",
        paint: {
          "background-color": tokens.ocean,
        },
      },
    ],
  } satisfies StyleSpecification;
}

export type RecognitionMapProps = {
  height?: number | string;
  className?: string;
};

type ActiveEntry = {
  entry: RecognitionEntry;
  point: { x: number; y: number };
  pinned: boolean;
};

type IsoLookup = Record<RecognitionKind, string[]>;

export function RecognitionMap({ height = DEFAULT_HEIGHT, className }: RecognitionMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapInstance | null>(null);
  const hoveredIsoRef = useRef<string | null>(null);
  const pinnedIsoRef = useRef<string | null>(null);
  const citationsRef = useRef<CitationsIndex>({});
  const isoLookupRef = useRef<IsoLookup>({ china: [], taiwan: [] });
  const legendStateRef = useRef<Record<RecognitionKind, boolean>>({ china: true, taiwan: true });
  const centroidsRef = useRef<Map<string, [number, number]>>(new Map());
  const entryMapRef = useRef<Map<string, RecognitionEntry>>(new Map());
  const boundsRef = useRef<maplibregl.LngLatBoundsLike | null>(null);

  const [entries, setEntries] = useState<RecognitionEntry[]>([]);
  const [colors, setColors] = useState<StyleTokens["colors"] | null>(null);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [legendState, setLegendState] = useState<Record<RecognitionKind, boolean>>({
    china: true,
    taiwan: true,
  });
  const [pinnedIso, setPinnedIso] = useState<string | null>(null);

  useEffect(() => {
    legendStateRef.current = legendState;
  }, [legendState]);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const sortedEntries = useMemo(
    () => entries.slice().sort((a, b) => a.name.localeCompare(b.name)),
    [entries],
  );

  const updateHighlight = useCallback((iso: string | null) => {
    const map = mapRef.current;
    if (!map || !map.getLayer(HIGHLIGHT_LAYER_ID)) return;

    const filter: FilterSpecification = ["==", ["get", "iso_a3"], iso ?? ""];
    map.setFilter(HIGHLIGHT_LAYER_ID, filter);
    hoveredIsoRef.current = iso;
  }, []);

  const updateHoverState = useCallback((iso: string | null) => {
    const map = mapRef.current;
    if (!map || !map.getSource(COUNTRIES_SOURCE_ID)) return;

    const previous = hoveredIsoRef.current;
    if (previous && previous !== iso) {
      map.setFeatureState({ source: COUNTRIES_SOURCE_ID, id: previous }, { hover: false });
    }
    if (iso) {
      map.setFeatureState({ source: COUNTRIES_SOURCE_ID, id: iso }, { hover: true });
    }
    hoveredIsoRef.current = iso;
  }, []);

  const computeTooltipPosition = useCallback((point: { x: number; y: number }) => {
    const container = containerRef.current;
    if (!container) return point;
    const { width, height: containerHeight } = container.getBoundingClientRect();
    const clampedX = Math.min(point.x + 12, width - 220);
    const clampedY = Math.min(point.y + 12, containerHeight - 140);
    return { x: Math.max(12, clampedX), y: Math.max(12, clampedY) };
  }, []);

  const getCitationForEntry = useCallback((entry: RecognitionEntry) => {
    const citations = citationsRef.current;
    for (const id of entry.citationIds) {
      const citation = citations[id];
      if (citation?.url) {
        return { url: citation.url, label: citation.title };
      }
    }
    return null;
  }, []);

  const showTooltip = useCallback(
    ({ entry, point, pinned }: ActiveEntry) => {
      const position = computeTooltipPosition(point);
      const citation = getCitationForEntry(entry);
      setTooltip({
        isoAlpha3: entry.isoAlpha3,
        name: entry.name,
        recognition: entry.recognition,
        since: entry.since,
        sinceYear: entry.sinceYear,
        citationUrl: citation?.url,
        citationLabel: citation?.label,
        position,
        pinned,
      });
    },
    [computeTooltipPosition, getCitationForEntry],
  );

  const hideTooltip = useCallback(() => {
    if (pinnedIsoRef.current) return;
    setTooltip(null);
  }, []);

  const focusCountry = useCallback(
    (entry: RecognitionEntry, options?: { pin?: boolean }) => {
      const map = mapRef.current;
      if (!map) return;
      const centroidPoint = centroidsRef.current.get(entry.isoAlpha3);
      if (centroidPoint) {
        map.flyTo({
          center: centroidPoint as LngLatLike,
          zoom: 3.1,
          duration: prefersReducedMotion ? 0 : 600,
          essential: true,
        });
      }
      updateHoverState(entry.isoAlpha3);
      updateHighlight(entry.isoAlpha3);
      const projected = centroidPoint
        ? map.project(centroidPoint as LngLatLike)
        : { x: map.getCanvas().width / 2, y: map.getCanvas().height / 2 };
      showTooltip({
        entry,
        point: { x: projected.x, y: projected.y },
        pinned: Boolean(options?.pin),
      });
      if (options?.pin) {
        pinnedIsoRef.current = entry.isoAlpha3;
        setPinnedIso(entry.isoAlpha3);
      }
    },
    [prefersReducedMotion, showTooltip, updateHighlight, updateHoverState],
  );

  const clearPinned = useCallback(() => {
    pinnedIsoRef.current = null;
    setPinnedIso(null);
    setTooltip(null);
    updateHoverState(null);
    updateHighlight(null);
  }, [updateHighlight, updateHoverState]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const containerElement: HTMLElement = container;

    let map: MapInstance | null = null;
    let cancelled = false;

    async function initialise() {
      try {
        const [dataset, citations, tokens, geojsonResponse] = await Promise.all([
          loadRecognitionDataset(),
          loadCitations(),
          loadStyleTokens(),
          fetch("/data/countries-western-hemisphere.geo.json").then((response) => {
            if (!response.ok) {
              throw new Error(`Failed to load countries GeoJSON: ${response.statusText}`);
            }
            return response.json();
          }),
        ]);

        if (cancelled) return;

        const featureCollection = geojsonResponse as FeatureCollection<Polygon | MultiPolygon>;
        const centroidLookup = new Map<string, [number, number]>();
        const isoLookup: IsoLookup = { china: [], taiwan: [] };
        const entryMap = new Map<string, RecognitionEntry>();
        dataset.entries.forEach((entry) => {
          entryMap.set(entry.isoAlpha3, entry);
          isoLookup[entry.recognition].push(entry.isoAlpha3);
        });

        featureCollection.features.forEach((feature) => {
          const iso = (feature.properties?.iso_a3 ?? feature.id) as string | undefined;
          if (!iso) return;
          const entry = entryMap.get(iso);
          const center = centroid(feature as Feature<Polygon | MultiPolygon>);
          centroidLookup.set(iso, center.geometry.coordinates as [number, number]);
          if (!entry) {
            return;
          }
          (feature.properties ??= {}).recognition = entry.recognition;
        });

        centroidsRef.current = centroidLookup;
        isoLookupRef.current = isoLookup;
        citationsRef.current = citations;
        entryMapRef.current = entryMap;
        setEntries(dataset.entries);
        setColors(tokens.colors);

        const baseStyle = createBaseStyle(tokens.colors);
        const baseColorExpression = buildColorExpression(dataset, tokens.colors);
        const fillColorExpression: ExpressionSpecification = [
          "case",
          ["==", ["get", "iso_a3"], USA_CODE],
          USA_SPECIAL_COLOR,
          baseColorExpression,
        ];
        map = new maplibregl.Map({
          container: containerElement,
          style: baseStyle,
          center: [-80, 15],
          zoom: 2.1,
          attributionControl: false,
          dragRotate: false,
          pitchWithRotate: false,
          renderWorldCopies: false,
        });

        mapRef.current = map;
        boundsRef.current = DEFAULT_BOUNDS;

        map.on("load", () => {
          if (!map) return;
          map.fitBounds(boundsRef.current ?? DEFAULT_BOUNDS, {
            padding: MAP_PADDING,
            duration: 0,
          });

          map.addSource(COUNTRIES_SOURCE_ID, {
            type: "geojson",
            data: featureCollection,
            promoteId: "iso_a3",
          });

          map.addLayer({
            id: FILL_LAYER_ID,
            type: "fill",
            source: COUNTRIES_SOURCE_ID,
            paint: {
              "fill-color": fillColorExpression,
              "fill-opacity": ["case", ["boolean", ["feature-state", "hover"], false], 1, 0.9],
            },
          });

          map.addLayer({
            id: OUTLINE_LAYER_ID,
            type: "line",
            source: COUNTRIES_SOURCE_ID,
            paint: {
              "line-color": tokens.colors.neutral,
              "line-width": 0.5,
            },
          });

          map.addLayer({
            id: HIGHLIGHT_LAYER_ID,
            type: "line",
            source: COUNTRIES_SOURCE_ID,
            paint: {
              "line-color": tokens.colors.hoverStroke,
              "line-width": 2,
            },
            filter: ["==", ["get", "iso_a3"], ""],
          });

          map.on("mousemove", FILL_LAYER_ID, (event: MapLayerMouseEvent) => {
            const feature = event.features?.[0] as MapGeoJSONFeature | undefined;
            if (!feature) return;
            const iso = (feature.properties?.iso_a3 ?? feature.id) as string | undefined;
            if (!iso) return;
            const entry = entryMapRef.current.get(iso);
            if (!entry || !legendStateRef.current[entry.recognition]) {
              updateHoverState(null);
              updateHighlight(null);
              hideTooltip();
              return;
            }
            updateHoverState(iso);
            updateHighlight(iso);
            showTooltip({
              entry,
              point: { x: event.point.x, y: event.point.y },
              pinned: Boolean(pinnedIsoRef.current && pinnedIsoRef.current === iso),
            });
            const canvas = mapRef.current?.getCanvas();
            if (canvas) {
              canvas.style.cursor = "pointer";
            }
          });

          map.on("mouseleave", FILL_LAYER_ID, () => {
            const canvas = mapRef.current?.getCanvas();
            if (canvas) {
              canvas.style.cursor = "";
            }
            const pinned = pinnedIsoRef.current;
            if (pinned) {
              const entry = entryMapRef.current.get(pinned);
              if (entry) {
                updateHoverState(pinned);
                updateHighlight(pinned);
                const center = centroidsRef.current.get(pinned);
                const mapInstance = mapRef.current;
                if (mapInstance && center) {
                  const projected = mapInstance.project(center as LngLatLike);
                  showTooltip({ entry, point: { x: projected.x, y: projected.y }, pinned: true });
                }
                return;
              }
            }
            updateHoverState(null);
            updateHighlight(null);
            hideTooltip();
          });

          map.on("click", FILL_LAYER_ID, (event: MapLayerMouseEvent) => {
            const feature = event.features?.[0] as MapGeoJSONFeature | undefined;
            if (!feature) return;
            const iso = (feature.properties?.iso_a3 ?? feature.id) as string | undefined;
            if (!iso) return;
            const entry = entryMapRef.current.get(iso);
            if (!entry) return;
            pinnedIsoRef.current = iso;
            setPinnedIso(iso);
            showTooltip({ entry, point: { x: event.point.x, y: event.point.y }, pinned: true });
          });

          map.on("click", (event: MapMouseEvent) => {
            const mapInstance = mapRef.current;
            if (!mapInstance) return;
            const features = mapInstance.queryRenderedFeatures(event.point, {
              layers: [FILL_LAYER_ID],
            });
            if (features.length === 0) {
              clearPinned();
            }
          });

          setReady(true);
        });
      } catch (err) {
        if (!cancelled) {
          console.error(err);
          setError(err instanceof Error ? err.message : "Failed to initialise map");
        }
      }
    }

    initialise();

    return () => {
      cancelled = true;
      map?.remove();
      mapRef.current = null;
    };
  }, [clearPinned, hideTooltip, showTooltip, updateHighlight, updateHoverState]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.getLayer(FILL_LAYER_ID) || !map.getLayer(OUTLINE_LAYER_ID)) return;
    const isoLookup = isoLookupRef.current;
    const activeKinds = (Object.keys(legendState) as RecognitionKind[]).filter(
      (kind) => legendState[kind],
    );
    if (activeKinds.length === 0) {
      setLegendState({ china: true, taiwan: true });
      return;
    }

    if (activeKinds.length === 2) {
      map.setFilter(FILL_LAYER_ID, undefined);
      map.setFilter(OUTLINE_LAYER_ID, undefined);
    } else {
      const isoList = activeKinds.flatMap((kind) => isoLookup[kind]);
      const filter: FilterSpecification = ["in", ["get", "iso_a3"], ["literal", isoList]];
      map.setFilter(FILL_LAYER_ID, filter);
      map.setFilter(OUTLINE_LAYER_ID, filter);
    }

    const activeIsoSet = new Set(activeKinds.flatMap((kind) => isoLookup[kind]));
    if (pinnedIsoRef.current && !activeIsoSet.has(pinnedIsoRef.current)) {
      clearPinned();
    }
  }, [legendState, clearPinned]);

  useEffect(() => {
    return () => {
      clearPinned();
    };
  }, [clearPinned]);

  const handleLegendToggle = useCallback((kind: RecognitionKind) => {
    setLegendState((prev) => {
      const next = { ...prev, [kind]: !prev[kind] };
      if (!next.china && !next.taiwan) {
        next[kind] = true;
      }
      return next;
    });
  }, []);

  const handleCountryFocus = useCallback(
    (entry: RecognitionEntry) => {
      focusCountry(entry, { pin: false });
    },
    [focusCountry],
  );

  const handleCountryActivate = useCallback(
    (entry: RecognitionEntry) => {
      focusCountry(entry, { pin: true });
    },
    [focusCountry],
  );

  const handleCountryBlur = useCallback(() => {
    if (!pinnedIsoRef.current) {
      hideTooltip();
      updateHoverState(null);
      updateHighlight(null);
    }
  }, [hideTooltip, updateHighlight, updateHoverState]);

  if (error) {
    return (
      <div className="rounded-xl border border-border bg-surface/70 p-6 text-sm text-error/80">
        Unable to render map: {error}
      </div>
    );
  }

  return (
    <div className={className}>
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-xl border border-border bg-surface"
        style={{ height }}
        aria-label="Diplomatic recognition map"
        role="region"
      >
        {colors ? <Tooltip data={tooltip} colors={colors} /> : null}
        {!ready ? (
          <div className="absolute inset-0 flex items-center justify-center bg-surface/90 text-sm text-text-secondary">
            Loading map…
          </div>
        ) : null}
      </div>
      {colors ? (
        <div className="mt-4 flex flex-col gap-3">
          <Legend colors={colors} active={legendState} onToggle={handleLegendToggle} />
          <p className="text-xs text-text-muted">
            Use the keyboard to tab through the hidden list of countries, then press Enter to pin a
            tooltip.
          </p>
          {pinnedIso ? (
            <button
              type="button"
              onClick={clearPinned}
              className="self-start rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-text-secondary shadow-sm transition hover:border-primary/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            >
              Clear pinned tooltip
            </button>
          ) : null}
        </div>
      ) : null}
      <ul className="sr-only" aria-label="Recognition entries for keyboard navigation">
        {sortedEntries.map((entry) => (
          <li key={entry.isoAlpha3}>
            <button
              type="button"
              className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[4] focus:w-64 focus:max-w-[90vw] focus:rounded-xl focus:bg-surface focus:p-3 focus:text-sm focus:text-text-primary focus:shadow-2xl focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-accent"
              onFocus={() => handleCountryFocus(entry)}
              onBlur={handleCountryBlur}
              onClick={() => handleCountryActivate(entry)}
              disabled={!legendState[entry.recognition]}
            >
              {entry.name} —{" "}
              {entry.recognition === "china" ? "Recognizes the PRC (Beijing)" : "Recognizes Taiwan"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
