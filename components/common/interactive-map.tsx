"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

import type { RecognitionMapProps } from "@/components/map/RecognitionMap";

const DEFAULT_HEIGHT = 420;
const ROOT_MARGIN = "200px";

const RecognitionMap = dynamic(
  () => import("@/components/map/RecognitionMap").then((mod) => mod.RecognitionMap),
  { ssr: false },
);

export function InteractiveMap(props: RecognitionMapProps = {}) {
  const { height = DEFAULT_HEIGHT, className, ...rest } = props;
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (shouldLoad) return;

    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }

    const element = wrapperRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: ROOT_MARGIN },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [shouldLoad]);

  const containerStyle =
    typeof height === "number" || typeof height === "string" ? { height } : undefined;

  return (
    <div ref={wrapperRef} className={className} data-testid="recognition-map-container">
      {shouldLoad ? (
        <RecognitionMap height={height} {...rest} />
      ) : (
        <div
          style={containerStyle}
          className="relative flex w-full items-center justify-center overflow-hidden rounded-2xl border border-border/80 bg-surface/90 text-sm text-text-secondary shadow-xl"
          aria-label="Loading recognition map"
        >
          Loading map…
        </div>
      )}
    </div>
  );
}
