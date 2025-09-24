import { NextResponse } from "next/server";

import { loadDownloads } from "@/lib/content";

export const runtime = "nodejs";

export async function GET() {
  try {
    const downloads = await loadDownloads();
    const offline = downloads.filter((item) => item.offline).map((item) => item.file);

    return NextResponse.json({ downloads: offline }, { status: 200 });
  } catch (error) {
    console.error("Failed to build offline manifest", error);
    return NextResponse.json({ downloads: [] }, { status: 200 });
  }
}
