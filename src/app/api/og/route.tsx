import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

import { OG_IMAGE_SIZE, renderOgImage, resolveOgSection } from "@/lib/og";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sectionParam = searchParams.get("section");
  const section = resolveOgSection(sectionParam);

  return new ImageResponse(renderOgImage(section), {
    width: OG_IMAGE_SIZE.width,
    height: OG_IMAGE_SIZE.height,
  });
}
