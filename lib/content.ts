import { readFile } from "node:fs/promises";
import path from "node:path";

import fg from "fast-glob";
import { load as loadYaml } from "js-yaml";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import type { ComponentType } from "react";

import { mdxComponents } from "@/components/common/mdx-components";

import {
  DownloadResource,
  Endorsement,
  FAQItem,
  KeyMetrics,
  SectionFrontmatter,
  TimelineEvent,
  ctaSchema,
  downloadSchema,
  endorsementSchema,
  faqSchema,
  keyMetricsSchema,
  sectionFrontmatterSchema,
  timelineEventSchema,
} from "../content/schema";

const CONTENT_ROOT = path.join(process.cwd(), "content");
const DATA_ROOT = path.join(process.cwd(), "data");

export type CompiledSection = {
  meta: SectionFrontmatter;
  slug: string;
  Content: ComponentType;
};

export type HowItWorksStep = {
  id: string;
  label: string;
  Content: ComponentType;
};

async function readJsonFile<T>(
  filePath: string,
  schema?: { parse: (value: unknown) => T },
): Promise<T> {
  const raw = await readFile(filePath, "utf-8");
  const json = JSON.parse(raw);
  return schema ? schema.parse(json) : json;
}

async function readYamlCollection<T>(
  filePath: string,
  schema: { parse: (value: unknown) => T },
): Promise<T[]> {
  const raw = await readFile(filePath, "utf-8");
  const data = loadYaml(raw);
  if (!Array.isArray(data)) {
    throw new Error(`Expected array data in ${filePath}`);
  }
  return data.map((item, index) => {
    try {
      return schema.parse(item);
    } catch (error) {
      throw new Error(`Validation error in ${filePath} at index ${index}: ${String(error)}`);
    }
  });
}

export async function loadSections(): Promise<CompiledSection[]> {
  const sectionDir = path.join(CONTENT_ROOT, "sections");
  const files = await fg("*.mdx", { cwd: sectionDir });

  const compiled = await Promise.all(
    files.map(async (file) => {
      const fullPath = path.join(sectionDir, file);
      const source = await readFile(fullPath, "utf-8");
      const { content, frontmatter } = await compileMDX<{ meta: SectionFrontmatter }>({
        source,
        options: {
          parseFrontmatter: true,
          mdxOptions: {
            remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm],
            rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "append" }]],
          },
        },
        components: mdxComponents,
      });

      const parsedMeta = sectionFrontmatterSchema.parse(frontmatter);
      const ContentComponent: ComponentType = () => content;
      return {
        meta: parsedMeta,
        slug: file.replace(/\.mdx$/, ""),
        Content: ContentComponent,
      } satisfies CompiledSection;
    }),
  );

  return compiled.sort((a, b) => a.meta.order - b.meta.order);
}

export async function loadHowItWorksSteps(): Promise<HowItWorksStep[]> {
  const stepsDir = path.join(CONTENT_ROOT, "sections/how-it-works");
  const files = await fg("*.mdx", { cwd: stepsDir });

  const labelMap: Record<string, string> = {
    "quick-take": "Quick Take",
    "full-explanation": "Full Explanation",
    "technical-deep-dive": "Technical Deep Dive",
  };

  const compiled = await Promise.all(
    files.map(async (file) => {
      const id = file.replace(/\.mdx$/, "");
      const source = await readFile(path.join(stepsDir, file), "utf-8");
      const { content } = await compileMDX({
        source,
        options: {
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "append" }]],
          },
        },
        components: mdxComponents,
      });

      const ContentComponent: ComponentType = () => content;
      return {
        id,
        label: labelMap[id] ?? id,
        Content: ContentComponent,
      } satisfies HowItWorksStep;
    }),
  );

  const order = ["quick-take", "full-explanation", "technical-deep-dive"];
  return compiled.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
}

export async function loadFaqs(): Promise<FAQItem[]> {
  const faqDir = path.join(CONTENT_ROOT, "faqs");
  const files = await fg("*.yml", { cwd: faqDir });
  const results: FAQItem[] = [];
  for (const file of files) {
    const parsed = await readYamlCollection(path.join(faqDir, file), faqSchema);
    results.push(...parsed);
  }
  return results;
}

export async function loadDownloads(): Promise<DownloadResource[]> {
  const file = path.join(CONTENT_ROOT, "downloads.yml");
  return readYamlCollection(file, downloadSchema);
}

export async function loadEndorsements(): Promise<Endorsement[]> {
  const file = path.join(CONTENT_ROOT, "endorsements.yml");
  return readYamlCollection(file, endorsementSchema);
}

export async function loadKeyMetrics(): Promise<KeyMetrics> {
  return readJsonFile<KeyMetrics>(
    path.join(CONTENT_ROOT, "stats/key-metrics.json"),
    keyMetricsSchema,
  );
}

export async function loadTimeline(): Promise<TimelineEvent[]> {
  const raw = await readJsonFile(path.join(DATA_ROOT, "timeline.json"));
  if (!Array.isArray(raw)) {
    throw new Error("Timeline data must be an array.");
  }
  return raw.map((item, index) => {
    try {
      return timelineEventSchema.parse(item);
    } catch (error) {
      throw new Error(`Timeline item ${index} failed validation: ${String(error)}`);
    }
  });
}

export async function loadCtas() {
  const sections = await loadSections();
  return sections.flatMap((section) => section.meta.ctas ?? []).map((cta) => ctaSchema.parse(cta));
}

export async function loadAllContent() {
  const [sections, howItWorks, faqs, downloads, endorsements, metrics, timeline] =
    await Promise.all([
      loadSections(),
      loadHowItWorksSteps(),
      loadFaqs(),
      loadDownloads(),
      loadEndorsements(),
      loadKeyMetrics(),
      loadTimeline(),
    ]);

  return {
    sections,
    howItWorks,
    faqs,
    downloads,
    endorsements,
    metrics,
    timeline,
  };
}
