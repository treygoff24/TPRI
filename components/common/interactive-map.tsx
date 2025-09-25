"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Map as MapInstance, StyleSpecification } from "maplibre-gl";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import type { Feature, FeatureCollection } from "geojson";

import recognitionData from "@/data/map/recognition.json";
import countriesGeo from "@/data/map/countries.geo.json";

type RecognitionStatus = "recognizes-taiwan" | "recognizes-china" | "neutral";

type RecognitionEntry = {
  isoCode: string;
  country: string;
  status: RecognitionStatus;
};

type CountryFeature = Feature & {
  properties: {
    name: string;
    iso_a2: string;
    recognitionStatus?: RecognitionStatus;
  };
};

const COUNTRY_COLORS: Record<RecognitionStatus, string> = {
  "recognizes-taiwan": "#0066FF",
  "recognizes-china": "#94A3B8",
  neutral: "#F1F5F9",
};

const LEGEND_ITEMS: Array<{ status: RecognitionStatus; label: string }> = [
  { status: "recognizes-taiwan", label: "Recognizes Taiwan" },
  { status: "recognizes-china", label: "Recognizes PRC" },
  { status: "neutral", label: "No formal stance" },
];

const mapStyle: StyleSpecification = {
  version: 8,
  sources: {},
  layers: [
    {
      id: "background",
      type: "background",
      paint: {
        "background-color": "#E2E8F0",
      },
    },
  ],
};

function buildFeatureCollection(): FeatureCollection {
  const statusByIso = new Map<string, RecognitionStatus>();
  (recognitionData as RecognitionEntry[]).forEach((entry) => {
    statusByIso.set(entry.isoCode, entry.status);
  });

  const features = (countriesGeo as FeatureCollection).features
    .map((feature) => feature as CountryFeature)
    .map((feature) => {
      const status = statusByIso.get(feature.properties.iso_a2) ?? "neutral";
      return {
        ...feature,
        properties: {
          ...feature.properties,
          recognitionStatus: status,
        },
      } satisfies CountryFeature;
    });

  return {
    type: "FeatureCollection",
    features,
  } satisfies FeatureCollection;
}

export function InteractiveMap() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapInstance | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<{
    name: string;
    status: RecognitionStatus;
  } | null>(null);

  const features = useMemo(() => buildFeatureCollection(), []);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: mapStyle,
      bounds: [
        [-130, -60],
        [-30, 50],
      ],
      fitBoundsOptions: { padding: 24 },
      attributionControl: false,
      interactive: true,
    });

    map.on("load", () => {
      map.addSource("countries", {
        type: "geojson",
        data: features,
      });

      map.addLayer({
        id: "countries-fill",
        type: "fill",
        source: "countries",
        paint: {
          "fill-color": [
            "match",
            ["get", "recognitionStatus"],
            "recognizes-taiwan",
            COUNTRY_COLORS["recognizes-taiwan"],
            "recognizes-china",
            COUNTRY_COLORS["recognizes-china"],
            COUNTRY_COLORS.neutral,
          ],
          "fill-opacity": 0.85,
        },
      });

      map.addLayer({
        id: "countries-outline",
        type: "line",
        source: "countries",
        paint: {
          "line-color": "#E2E8F0",
          "line-width": 0.75,
        },
      });

      map.addLayer({
        id: "countries-highlight",
        type: "line",
        source: "countries",
        paint: {
          "line-color": "#0066FF",
          "line-width": 2,
        },
        filter: ["==", ["get", "name"], ""],
      });
    });

    map.on("mousemove", "countries-fill", (event) => {
      const feature = event.features?.[0] as CountryFeature | undefined;
      if (!feature) return;
      setHoveredCountry({
        name: feature.properties.name,
        status: feature.properties.recognitionStatus ?? "neutral",
      });
      map.setFilter("countries-highlight", ["==", ["get", "name"], feature.properties.name]);
    });

    map.on("mouseleave", "countries-fill", () => {
      setHoveredCountry(null);
      map.setFilter("countries-highlight", ["==", ["get", "name"], ""]);
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [features]);

  return (
    <div className="relative h-[420px] w-full">
      <div ref={mapContainerRef} className="absolute inset-0 rounded-xl" aria-hidden="true" />
      <div className="absolute bottom-4 left-4 rounded-lg bg-white/95 p-4 shadow-sm">
        <ul className="space-y-2 text-sm text-text-secondary">
          {LEGEND_ITEMS.map((item) => (
            <li key={item.status} className="flex items-center gap-2">
              <span
                className="inline-block h-3 w-3 rounded"
                style={{ backgroundColor: COUNTRY_COLORS[item.status] }}
                aria-hidden="true"
              />
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
      {hoveredCountry && (
        <div className="absolute top-4 right-4 max-w-xs rounded-lg bg-white p-4 shadow-md">
          <p className="text-sm font-semibold text-text-primary">{hoveredCountry.name}</p>
          <p className="text-sm text-text-secondary capitalize">
            {hoveredCountry.status.replace("-", " ")}
          </p>
        </div>
      )}
    </div>
  );
}
