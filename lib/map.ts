import type { FeatureCollection } from "geojson";

import type { RecognitionRecord } from "../content/schema";

export type MapData = {
  features: FeatureCollection;
  recognition: RecognitionRecord[];
};

export function deriveRecognitionStatus(
  recognition: RecognitionRecord[],
): Record<string, RecognitionRecord> {
  return recognition.reduce<Record<string, RecognitionRecord>>((acc, record) => {
    acc[record.isoCode] = record;
    return acc;
  }, {});
}
