import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { ImageResponse } from "next/og";

import { OG_IMAGE_SIZE, OG_SECTIONS, renderOgImage } from "@/lib/og";

async function writeImage(filename: string, response: ImageResponse) {
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  await writeFile(filename, buffer);
}

async function main() {
  const outputDir = path.join(process.cwd(), "public/images/og");
  await mkdir(outputDir, { recursive: true });

  for (const section of OG_SECTIONS) {
    const image = new ImageResponse(renderOgImage(section), {
      width: OG_IMAGE_SIZE.width,
      height: OG_IMAGE_SIZE.height,
    });

    const filePath = path.join(outputDir, `${section.id}.png`);
    await writeImage(filePath, image);
  }

  const defaultImage = new ImageResponse(renderOgImage(undefined), {
    width: OG_IMAGE_SIZE.width,
    height: OG_IMAGE_SIZE.height,
  });
  await writeImage(path.join(outputDir, "default.png"), defaultImage);

  console.log(`Generated ${OG_SECTIONS.length + 1} Open Graph images in ${outputDir}`);
}

main().catch((error) => {
  console.error("Failed to generate OG images", error);
  process.exitCode = 1;
});
