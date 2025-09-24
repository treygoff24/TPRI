import type { FeatureCollection } from "geojson";

import { recognitionSchema, type RecognitionRecord } from "../content/schema";
import type { MapData } from "./map";

const MAP_DIRECTORY = "data/map" as const;

type NodeModules = {
  readFile: typeof import("node:fs/promises").readFile;
  path: typeof import("node:path");
};

let cachedModules: NodeModules | null = null;

async function getNodeModules(): Promise<NodeModules> {
  if (cachedModules) return cachedModules;
  const [{ readFile }, path] = await Promise.all([
    import("node:fs/promises"),
    import("node:path"),
  ]);
  cachedModules = { readFile, path };
  return cachedModules;
}

async function readMapFile(fileName: string): Promise<string> {
  const { readFile, path } = await getNodeModules();
  const fullPath = path.join(process.cwd(), MAP_DIRECTORY, fileName);
  return readFile(fullPath, "utf-8");
}

export async function loadMapFeatures(): Promise<FeatureCollection> {
  const raw = await readMapFile("countries.geo.json");
  return JSON.parse(raw) as FeatureCollection;
}

export async function loadRecognition(): Promise<RecognitionRecord[]> {
  const raw = await readMapFile("recognition.json");
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
