"use client";

import type { RecognitionMapProps } from "@/components/map/RecognitionMap";
import { RecognitionMap } from "@/components/map/RecognitionMap";

const DEFAULT_HEIGHT = 420;

export function InteractiveMap(props: RecognitionMapProps = {}) {
  const { height = DEFAULT_HEIGHT, ...rest } = props;
  return <RecognitionMap height={height} {...rest} />;
}
