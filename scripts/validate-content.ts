import { readFile } from "node:fs/promises";
import path from "node:path";

import fg from "fast-glob";
import matter from "gray-matter";
import { load as loadYaml } from "js-yaml";

import {
  contentBundleSchema,
  downloadSchema,
  endorsementSchema,
  faqSchema,
  keyMetricsSchema,
  recognitionDatasetSchema,
  recognitionSchema,
  sectionFrontmatterSchema,
  timelineEventSchema,
} from "../content/schema";

function logSuccess(message: string) {
  console.log(`\x1b[32m✔\x1b[0m ${message}`);
}

let hasErrors = false;

function logError(message: string) {
  hasErrors = true;
  console.error(`\x1b[31m✖\x1b[0m ${message}`);
}

async function validateSections(rootDir: string) {
  const sectionFiles = await fg("content/sections/**/*.mdx", {
    cwd: rootDir,
    absolute: true,
  });

  const metaRecords: Array<{ file: string; data: unknown }> = [];

  for (const file of sectionFiles) {
    const raw = await readFile(file, "utf-8");
    const parsed = matter(raw);
    if (Object.keys(parsed.data).length === 0) continue; // partials have no frontmatter
    try {
      const meta = sectionFrontmatterSchema.parse(parsed.data);
      metaRecords.push({ file, data: meta });
    } catch (error) {
      logError(`Invalid section frontmatter in ${path.relative(rootDir, file)}`);
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  const orders = new Map<number, string>();
  for (const record of metaRecords) {
    const { order } = record.data as { order: number };
    if (orders.has(order)) {
      logError(
        `Duplicate section order ${order} in ${path.relative(rootDir, record.file)} and ${path.relative(
          rootDir,
          orders.get(order) as string,
        )}`,
      );
    } else {
      orders.set(order, record.file);
    }
  }

  if (metaRecords.length) {
    logSuccess(`Validated ${metaRecords.length} section frontmatter files.`);
  }

  return metaRecords.map((record) => record.data);
}

async function validateYamlCollection(
  rootDir: string,
  pattern: string,
  schema: typeof faqSchema | typeof downloadSchema | typeof endorsementSchema,
) {
  const files = await fg(pattern, { cwd: rootDir, absolute: true });
  const results: unknown[] = [];

  for (const file of files) {
    const raw = await readFile(file, "utf-8");
    const data = loadYaml(raw);
    if (!Array.isArray(data)) {
      logError(`Expected an array in ${path.relative(rootDir, file)}`);
      continue;
    }
    data.forEach((item, index) => {
      try {
        const parsed = schema.parse(item);
        results.push(parsed);
      } catch (error) {
        logError(
          `Validation error in ${path.relative(rootDir, file)} at index ${index}: ${
            error instanceof Error ? error.message : error
          }`,
        );
      }
    });
    logSuccess(`Validated ${data.length} items in ${path.relative(rootDir, file)}.`);
  }

  return results;
}

async function validateStats(rootDir: string) {
  const file = path.join(rootDir, "content/stats/key-metrics.json");
  try {
    const raw = await readFile(file, "utf-8");
    const json = JSON.parse(raw);
    keyMetricsSchema.parse(json);
    logSuccess("Validated key metrics JSON.");
  } catch (error) {
    logError(`Issue parsing key metrics in ${path.relative(rootDir, file)}.`);
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}

async function validateDataAssets(rootDir: string) {
  const timelineFile = path.join(rootDir, "data/timeline.json");
  try {
    const raw = await readFile(timelineFile, "utf-8");
    const json = JSON.parse(raw);
    if (!Array.isArray(json)) {
      throw new Error("Timeline data must be an array.");
    }
    json.forEach((item, index) => {
      try {
        timelineEventSchema.parse(item);
      } catch (error) {
        logError(
          `Timeline validation error at index ${index}: ${error instanceof Error ? error.message : error}`,
        );
      }
    });
    logSuccess("Validated timeline data.");
  } catch (error) {
    logError("Unable to parse timeline data.");
    if (error instanceof Error) {
      console.error(error.message);
    }
  }

  const recognitionFile = path.join(rootDir, "public/data/recognition.json");
  try {
    const raw = await readFile(recognitionFile, "utf-8");
    const json = JSON.parse(raw);
    const dataset = recognitionDatasetSchema.parse(json);
    dataset.entries.forEach((item, index) => {
      try {
        recognitionSchema.parse(item);
      } catch (error) {
        logError(
          `Recognition validation error at index ${index}: ${
            error instanceof Error ? error.message : error
          }`,
        );
      }
    });
    logSuccess(`Validated recognition dataset with ${dataset.entries.length} entries.`);
  } catch (error) {
    logError("Unable to parse recognition data.");
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}

async function main() {
  const rootDir = path.resolve(__dirname, "..");
  const sections = await validateSections(rootDir);
  const [faqResults, endorsementResults, downloadResults] = await Promise.all([
    validateYamlCollection(rootDir, "content/faqs/*.yml", faqSchema),
    validateYamlCollection(rootDir, "content/endorsements.yml", endorsementSchema),
    validateYamlCollection(rootDir, "content/downloads.yml", downloadSchema),
  ]);
  await validateStats(rootDir);
  await validateDataAssets(rootDir);

  try {
    const bundle = {
      sections,
      faqs: faqResults.flat(),
      downloads: downloadResults.flat(),
      endorsements: endorsementResults.flat(),
      stats: await (async () => {
        const raw = await readFile(path.join(rootDir, "content/stats/key-metrics.json"), "utf-8");
        return JSON.parse(raw);
      })(),
      timeline: await (async () => {
        const raw = await readFile(path.join(rootDir, "data/timeline.json"), "utf-8");
        return JSON.parse(raw);
      })(),
      recognition: await (async () => {
        const raw = await readFile(path.join(rootDir, "public/data/recognition.json"), "utf-8");
        const json = JSON.parse(raw);
        return recognitionDatasetSchema.parse(json);
      })(),
    };
    contentBundleSchema.parse(bundle);
  } catch (error) {
    logError("Composite content bundle validation failed.");
    if (error instanceof Error) {
      console.error(error.message);
    }
    process.exitCode = 1;
    return;
  }

  logSuccess("Content bundle schema satisfied.");

  if (hasErrors) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  logError("Content validation encountered an unexpected error.");
  console.error(error);
  process.exitCode = 1;
});
