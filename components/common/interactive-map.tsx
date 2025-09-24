"use client";
import { useMemo, useState } from "react";
import { geoMercator, geoPath } from "d3-geo";
import type { FeatureCollection, Feature } from "geojson";

import { deriveRecognitionStatus } from "@/lib/map";
import { cn } from "@/lib/utils";
import type { RecognitionRecord } from "@/content/schema";

const WIDTH = 640;
const HEIGHT = 360;

const STATUS_CLASSES: Record<RecognitionRecord["status"], string> = {
  "recognizes-taiwan": "fill-success/70",
  "recognizes-china": "fill-danger/60",
};

type InteractiveMapProps = {
  features: FeatureCollection;
  recognition: RecognitionRecord[];
};

export function InteractiveMap({ features, recognition }: InteractiveMapProps) {
  const recognitionMap = useMemo(() => deriveRecognitionStatus(recognition), [recognition]);
  const [hovered, setHovered] = useState<RecognitionRecord | null>(null);

  const projection = useMemo(
    () =>
      geoMercator()
        .scale(90)
        .center([-60, -10])
        .translate([WIDTH / 2, HEIGHT / 2]),
    [],
  );
  const pathGenerator = useMemo(() => geoPath(projection), [projection]);

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full"
        role="img"
        aria-labelledby="map-title"
      >
        <title id="map-title">Western Hemisphere recognition status</title>
        <rect width={WIDTH} height={HEIGHT} className="fill-background" />
        {(features.features as Feature[]).map((feature) => {
          const iso = (feature.properties?.ISO_A2 ?? feature.properties?.iso_a2 ?? "").toString();
          const record = recognitionMap[iso];
          const className = record ? STATUS_CLASSES[record.status] : "fill-muted/70";
          return (
            <path
              key={feature.id ?? iso}
              d={pathGenerator(feature) ?? undefined}
              className={cn(className, "stroke-border/60 transition hover:fill-accent/70")}
              onMouseEnter={() => setHovered(record ?? null)}
              onMouseLeave={() => setHovered(null)}
            />
          );
        })}
      </svg>
      <div className="mt-4 flex items-center gap-x-6 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-x-2">
          <span className="h-3 w-3 rounded-full bg-success/70" /> Recognizes Taiwan
        </span>
        <span className="inline-flex items-center gap-x-2">
          <span className="h-3 w-3 rounded-full bg-danger/60" /> Recognizes PRC
        </span>
      </div>
      {hovered ? (
        <div className="absolute left-1/2 top-1/2 w-64 -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-border/60 bg-background/90 p-4 text-sm shadow-lg backdrop-blur">
          <p className="font-semibold text-foreground">{hovered.country}</p>
          <p className="mt-2 text-xs text-muted-foreground">
            Status:{" "}
            {hovered.status === "recognizes-taiwan" ? "Allied with Taiwan" : "PRC recognition"}
          </p>
          {hovered.changeDate ? (
            <p className="mt-1 text-xs text-muted-foreground">
              Last change: {new Date(hovered.changeDate).toLocaleDateString()}
            </p>
          ) : null}
        </div>
      ) : null}
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/map-fallback.svg"
          alt="Map of recognition status"
          className="mt-4 w-full"
        />
      </noscript>
    </div>
  );
}
