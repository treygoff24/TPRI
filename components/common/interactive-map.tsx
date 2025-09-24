"use client";

import type { RecognitionMapProps } from "@/components/map/RecognitionMap";
import { RecognitionMap } from "@/components/map/RecognitionMap";

export function InteractiveMap(props: RecognitionMapProps) {
  return <RecognitionMap {...props} />;
}
