import { readFile } from "node:fs/promises";
import path from "node:path";

import type { FeatureCollection } from "geojson";

import { recognitionSchema, type RecognitionRecord } from "../content/schema";

const MAP_ROOT = path.join(process.cwd(), "data/map");

export type MapData = {
  features: FeatureCollection;
  recognition: RecognitionRecord[];
};

export async function loadMapFeatures(): Promise<FeatureCollection> {
  const file = path.join(MAP_ROOT, "countries.geo.json");
  const raw = await readFile(file, "utf-8");
  return JSON.parse(raw) as FeatureCollection;
}

export async function loadRecognition(): Promise<RecognitionRecord[]> {
  const file = path.join(MAP_ROOT, "recognition.json");
  const raw = await readFile(file, "utf-8");
  const json = JSON.parse(raw);
  if (!Array.isArray(json)) {
    throw new Error("Recognition dataset must be an array.");
  }
  return json.map((item, index) => {
    try {
      return recognitionSchema.parse(item);
    } catch (error) {
      throw new Error(`Recognition item ${index} invalid: ${String(error)}`);
    }
  });
}

export async function loadMapData(): Promise<MapData> {
  const [features, recognition] = await Promise.all([loadMapFeatures(), loadRecognition()]);
  return { features, recognition };
}

export function deriveRecognitionStatus(
  recognition: RecognitionRecord[],
): Record<string, RecognitionRecord> {
  return recognition.reduce<Record<string, RecognitionRecord>>((acc, record) => {
    acc[record.isoCode] = record;
    return acc;
  }, {});
}
