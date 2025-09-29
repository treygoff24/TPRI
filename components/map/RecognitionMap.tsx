"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { geoConicEqualArea, geoPath } from "d3-geo";
import type { Feature, FeatureCollection, LineString, MultiPolygon, Polygon } from "geojson";

import type {
  CitationsIndex,
  RecognitionEntry,
  RecognitionKind,
  StyleTokens,
} from "@/lib/recognition/types";
import {
  loadCitations,
  loadRecognitionDataset,
  loadStyleTokens,
} from "@/lib/recognition/loadRecognition";

import { Legend } from "./Legend";
import { Tooltip, type TooltipData } from "./Tooltip";

const DEFAULT_HEIGHT = 520;
const MAP_PADDING = { top: 28, right: 36, bottom: 40, left: 36 } as const;
const GRID_LATITUDES = [-60, -40, -20, 0, 20, 40, 60];
const GRID_LONGITUDES = [-150, -120, -90, -60, -30];
const LATITUDE_RANGE = { min: -65, max: 75 } as const;
const LONGITUDE_RANGE = { min: -170, max: -25 } as const;
const TOOLTIP_WIDTH = 220;
const TOOLTIP_HEIGHT = 140;
const USA_CODE = "USA";
const USA_SPECIAL_COLOR = "#F4B400";

export type RecognitionMapProps = {
  height?: number | string;
  className?: string;
};

type CountryFeatureProperties = {
  iso_a3: string;
  name?: string;
  recognition?: RecognitionKind;
};

type CountryFeature = Feature<Polygon | MultiPolygon, CountryFeatureProperties>;

type RenderFeature = {
  iso: string;
  name: string;
  path: string;
  centroid: [number, number];
  recognition: RecognitionKind | null;
  entry?: RecognitionEntry;
};

type GridLine = {
  path: string;
  kind: "latitude" | "longitude";
  value: number;
};

type IsoLookup = Record<RecognitionKind, string[]>;

export function RecognitionMap({ height = DEFAULT_HEIGHT, className }: RecognitionMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const entryMapRef = useRef<Map<string, RecognitionEntry>>(new Map());
  const citationsRef = useRef<CitationsIndex>({});
  const isoLookupRef = useRef<IsoLookup>({ china: [], taiwan: [] });
  const centroidsRef = useRef<Map<string, [number, number]>>(new Map());
  const hoveredIsoRef = useRef<string | null>(null);
  const pinnedIsoRef = useRef<string | null>(null);

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [featureCollectionState, setFeatureCollectionState] = useState<FeatureCollection<
    Polygon | MultiPolygon,
    CountryFeatureProperties
  > | null>(null);
  const [entries, setEntries] = useState<RecognitionEntry[]>([]);
  const [colors, setColors] = useState<StyleTokens["colors"] | null>(null);
  const [legendState, setLegendState] = useState<Record<RecognitionKind, boolean>>({
    china: true,
    taiwan: true,
  });
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [hoveredIso, setHoveredIso] = useState<string | null>(null);
  const [pinnedIso, setPinnedIso] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const gradientId = useId();
  const glowId = useId();

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    let timeoutId: NodeJS.Timeout;
    const resize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const rect = element.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }, 150);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [height]);

  useEffect(() => {
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
        const isoLookup: IsoLookup = { china: [], taiwan: [] };
        const entryMap = new Map<string, RecognitionEntry>();

        dataset.entries.forEach((entry) => {
          entryMap.set(entry.isoAlpha3, entry);
          isoLookup[entry.recognition].push(entry.isoAlpha3);
        });

        const enrichedFeatures: CountryFeature[] = [];
        for (const feature of featureCollection.features) {
          const iso = (feature.properties?.iso_a3 ?? feature.id) as string | undefined;
          if (!iso) continue;
          const entry = entryMap.get(iso);
          const recognition = entry?.recognition;
          const name = entry?.name ?? (feature.properties as { name?: string } | undefined)?.name;
          enrichedFeatures.push({
            type: "Feature",
            geometry: feature.geometry,
            properties: {
              iso_a3: iso,
              name,
              recognition,
            },
          });
        }

        const enrichedCollection: FeatureCollection<
          Polygon | MultiPolygon,
          CountryFeatureProperties
        > = {
          type: "FeatureCollection",
          features: enrichedFeatures,
        };
        setFeatureCollectionState(enrichedCollection);
        entryMapRef.current = entryMap;
        citationsRef.current = citations;
        isoLookupRef.current = isoLookup;
        setEntries(dataset.entries.slice());
        setColors(tokens.colors);
        setReady(true);
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
    };
  }, []);

  const sortedEntries = useMemo(
    () => entries.slice().sort((a, b) => a.name.localeCompare(b.name)),
    [entries],
  );

  const renderData = useMemo(() => {
    const featureCollection = featureCollectionState;
    if (!featureCollection || dimensions.width === 0 || dimensions.height === 0) {
      return null;
    }

    const projection = geoConicEqualArea().parallels([8, 45]).rotate([96, 0]).center([0, 12]);

    projection.fitExtent(
      [
        [MAP_PADDING.left, MAP_PADDING.top],
        [dimensions.width - MAP_PADDING.right, dimensions.height - MAP_PADDING.bottom],
      ],
      featureCollection,
    );

    const pathGenerator = geoPath(projection);
    const centroids = new Map<string, [number, number]>();
    const features: RenderFeature[] = [];

    for (const feature of featureCollection.features) {
      if (!feature.geometry) continue;
      const iso = feature.properties?.iso_a3;
      if (!iso) continue;
      const path = pathGenerator(feature as Feature<Polygon | MultiPolygon>);
      if (!path) continue;
      const centroid = pathGenerator.centroid(feature as Feature<Polygon | MultiPolygon>);
      const entry = entryMapRef.current.get(iso);
      const name = entry?.name ?? feature.properties?.name ?? iso;
      const recognition = entry?.recognition ?? null;
      centroids.set(iso, centroid as [number, number]);
      features.push({
        iso,
        name,
        path,
        centroid: centroid as [number, number],
        recognition,
        entry,
      });
    }

    const gridLines: GridLine[] = [];

    for (const latitude of GRID_LATITUDES) {
      const line: Feature<LineString> = {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [
            [LONGITUDE_RANGE.min, latitude],
            [LONGITUDE_RANGE.max, latitude],
          ],
        },
        properties: {},
      };
      const path = pathGenerator(line);
      if (path) {
        gridLines.push({ path, kind: "latitude", value: latitude });
      }
    }

    const latitudeSteps = Array.from(
      { length: 16 },
      (_, index) => LATITUDE_RANGE.min + (index * (LATITUDE_RANGE.max - LATITUDE_RANGE.min)) / 15,
    );

    for (const longitude of GRID_LONGITUDES) {
      const line: Feature<LineString> = {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: latitudeSteps.map((lat) => [longitude, lat]),
        },
        properties: {},
      };
      const path = pathGenerator(line);
      if (path) {
        gridLines.push({ path, kind: "longitude", value: longitude });
      }
    }

    centroidsRef.current = centroids;

    return { features, gridLines };
  }, [dimensions.height, dimensions.width, featureCollectionState]);

  const computeTooltipPosition = useCallback(
    (point: { x: number; y: number }) => {
      const { width, height: containerHeight } = dimensions;
      if (width === 0 || containerHeight === 0) return point;
      const clampedX = Math.min(point.x + 14, width - TOOLTIP_WIDTH);
      const clampedY = Math.min(point.y + 14, containerHeight - TOOLTIP_HEIGHT);
      return {
        x: Math.max(14, clampedX),
        y: Math.max(14, clampedY),
      };
    },
    [dimensions],
  );

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
    (entry: RecognitionEntry, point: { x: number; y: number }, pinned: boolean) => {
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

  const clearPinned = useCallback(() => {
    pinnedIsoRef.current = null;
    setPinnedIso(null);
    if (!hoveredIsoRef.current) {
      setTooltip(null);
    }
  }, []);

  useEffect(() => {
    const activeIsoSet = new Set(
      (Object.keys(legendState) as RecognitionKind[])
        .filter((kind) => legendState[kind])
        .flatMap((kind) => isoLookupRef.current[kind]),
    );

    if (pinnedIsoRef.current && !activeIsoSet.has(pinnedIsoRef.current)) {
      clearPinned();
    }
    if (hoveredIsoRef.current && !activeIsoSet.has(hoveredIsoRef.current)) {
      hoveredIsoRef.current = null;
      setHoveredIso(null);
      if (!pinnedIsoRef.current) {
        setTooltip(null);
      }
    }
  }, [legendState, clearPinned]);

  useEffect(() => () => clearPinned(), [clearPinned]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && pinnedIsoRef.current) {
        clearPinned();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
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

  const handlePointerMove = useCallback(
    (event: ReactMouseEvent<SVGPathElement>, entry: RecognitionEntry | undefined, iso: string) => {
      if (!entry) {
        setHoveredIso(null);
        hideTooltip();
        return;
      }
      if (!legendState[entry.recognition]) {
        setHoveredIso(null);
        hideTooltip();
        return;
      }

      // Throttle tooltip updates - only update if position changed significantly
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const point = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };

      setHoveredIso(iso);
      hoveredIsoRef.current = iso;
      const pinned = pinnedIsoRef.current === iso;

      // Only update tooltip position if not pinned or if country changed
      if (!pinned || hoveredIso !== iso) {
        showTooltip(entry, point, pinned);
      }
    },
    [hideTooltip, hoveredIso, legendState, showTooltip],
  );

  const handlePointerLeave = useCallback(() => {
    hoveredIsoRef.current = null;
    setHoveredIso(null);
    hideTooltip();
  }, [hideTooltip]);

  const handlePointerClick = useCallback(
    (event: ReactMouseEvent<SVGPathElement>, entry: RecognitionEntry | undefined, iso: string) => {
      event.stopPropagation();
      if (!entry || !legendState[entry.recognition]) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      pinnedIsoRef.current = iso;
      setPinnedIso(iso);
      showTooltip(
        entry,
        {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        },
        true,
      );
    },
    [legendState, showTooltip],
  );

  const handleSvgLeave = useCallback(() => {
    hoveredIsoRef.current = null;
    setHoveredIso(null);
    if (!pinnedIsoRef.current) {
      setTooltip(null);
    }
  }, []);

  const handleSvgBackgroundClick = useCallback(() => {
    if (pinnedIsoRef.current) {
      clearPinned();
    }
  }, [clearPinned]);

  const focusCountry = useCallback(
    (entry: RecognitionEntry, options?: { pin?: boolean }) => {
      if (!legendState[entry.recognition]) return;
      const centroid = centroidsRef.current.get(entry.isoAlpha3);
      if (!centroid) return;
      const pinned = Boolean(options?.pin);
      if (pinned) {
        pinnedIsoRef.current = entry.isoAlpha3;
        setPinnedIso(entry.isoAlpha3);
      }
      hoveredIsoRef.current = entry.isoAlpha3;
      setHoveredIso(entry.isoAlpha3);
      showTooltip(entry, { x: centroid[0], y: centroid[1] }, pinned);
    },
    [legendState, showTooltip],
  );

  useEffect(() => {
    if (!renderData) return;
    const pinnedIsoCurrent = pinnedIsoRef.current;
    if (!pinnedIsoCurrent) return;
    const entry = entryMapRef.current.get(pinnedIsoCurrent);
    if (!entry) return;
    focusCountry(entry, { pin: true });
  }, [focusCountry, renderData]);

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
      hoveredIsoRef.current = null;
      setHoveredIso(null);
      setTooltip(null);
    }
  }, []);

  if (error) {
    return (
      <div className="rounded-xl border border-border bg-surface/70 p-6 text-sm text-error/80">
        Unable to render map: {error}
      </div>
    );
  }

  const containerStyle =
    typeof height === "number" || typeof height === "string" ? { height } : undefined;
  const hasData = Boolean(colors && renderData && ready);

  return (
    <div className={className}>
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-2xl border border-border/80 bg-surface/90 shadow-xl"
        style={containerStyle}
        role="region"
        aria-label="Diplomatic recognition map"
      >
        {renderData && dimensions.width > 0 && dimensions.height > 0 ? (
          <svg
            data-testid="recognition-map"
            className="block h-full w-full"
            viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-label="Diplomatic recognition across the Americas"
            onMouseLeave={handleSvgLeave}
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                handleSvgBackgroundClick();
              }
            }}
          >
            <defs>
              <radialGradient id={gradientId} cx="30%" cy="30%" r="85%">
                <stop offset="0%" stopColor="rgba(56, 114, 181, 0.30)" />
                <stop offset="55%" stopColor="rgba(14, 21, 38, 0.85)" />
                <stop offset="100%" stopColor="rgba(6, 10, 22, 0.95)" />
              </radialGradient>
              <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.6" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${gradientId})`} pointerEvents="none" />
            <rect width="100%" height="100%" fill="rgba(9, 14, 26, 0.88)" pointerEvents="none" />
            <g aria-hidden="true">
              {renderData.gridLines
                .filter((line) => line.kind === "latitude")
                .map((line) => (
                  <path
                    key={`lat-${line.value}`}
                    d={line.path}
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.08)"
                    strokeWidth={0.6}
                    strokeDasharray="4 8"
                  />
                ))}
              {renderData.gridLines
                .filter((line) => line.kind === "longitude")
                .map((line) => (
                  <path
                    key={`lon-${line.value}`}
                    d={line.path}
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.08)"
                    strokeWidth={0.6}
                    strokeDasharray="4 8"
                  />
                ))}
            </g>
            <g>
              {renderData.features.map((feature) => {
                const { iso, path, recognition, entry } = feature;
                const isHovered = hoveredIso === iso;
                const isPinned = pinnedIso === iso;
                const isActive = recognition ? legendState[recognition] : true;
                const fillColor =
                  iso === USA_CODE
                    ? USA_SPECIAL_COLOR
                    : recognition
                      ? recognition === "china"
                        ? colors?.china
                        : colors?.taiwan
                      : "rgba(255, 255, 255, 0.25)";
                const opacity = isActive ? (isHovered || isPinned ? 1 : 0.9) : 0.15;
                const strokeOpacity = isActive ? 0.35 : 0.08;
                const strokeWidth = isHovered || isPinned ? 2.2 : 1.6;

                return (
                  <g key={iso} filter={`url(#${glowId})`}>
                    <path
                      d={path}
                      fill="none"
                      stroke="rgba(17, 24, 42, 0.9)"
                      strokeWidth={strokeWidth}
                      strokeLinejoin="round"
                      strokeOpacity={strokeOpacity}
                      pointerEvents="none"
                    />
                    <path
                      d={path}
                      fill={fillColor ?? "rgba(255, 255, 255, 0.2)"}
                      fillOpacity={opacity}
                      stroke="rgba(255, 255, 255, 0.18)"
                      strokeWidth={0.6}
                      strokeLinejoin="round"
                      className="transition-transform duration-200 ease-out"
                      style={{
                        transformOrigin: "center",
                        transform: isHovered || isPinned ? "scale(1.002)" : undefined,
                      }}
                      onMouseMove={(event) => handlePointerMove(event, entry, iso)}
                      onMouseLeave={handlePointerLeave}
                      onClick={(event) => handlePointerClick(event, entry, iso)}
                    />
                  </g>
                );
              })}
            </g>
          </svg>
        ) : null}
        {colors ? <Tooltip data={tooltip} colors={colors} /> : null}
        {!hasData ? (
          <div className="absolute inset-0 flex items-center justify-center bg-surface/90 text-sm text-text-secondary">
            Loading map…
          </div>
        ) : null}
        {colors ? (
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/5"
            aria-hidden="true"
          />
        ) : null}
        {colors ? (
          <div
            className="pointer-events-auto absolute bottom-4 left-4 max-w-[min(100%,280px)]"
            style={{ zIndex: "var(--z-dropdown)" }}
          >
            <Legend
              colors={colors}
              active={legendState}
              onToggle={handleLegendToggle}
              className="gap-2 rounded-2xl border border-white/10 bg-surface/80 px-4 py-2 text-[11px] shadow-lg md:backdrop-blur"
            />
          </div>
        ) : null}
      </div>
      {colors ? (
        <div className="mt-5 flex flex-col gap-3">
          <p className="text-xs text-text-muted">
            Use the keyboard to tab through the hidden list of countries, then press Enter to pin a
            tooltip.
          </p>
          {pinnedIso ? (
            <button
              type="button"
              onClick={clearPinned}
              className="self-start rounded-full border border-border/70 bg-surface px-3 py-1 text-xs font-medium text-text-secondary shadow-sm transition hover:border-primary/30 hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
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
              className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:w-64 focus:max-w-[90vw] focus:rounded-xl focus:bg-surface focus:p-3 focus:text-sm focus:text-text-primary focus:shadow-2xl focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-accent"
              style={{ zIndex: "var(--z-modal)" }}
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
