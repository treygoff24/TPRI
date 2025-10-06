import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // CSRF protection for state-changing operations
  if (
    request.method === "POST" ||
    request.method === "PUT" ||
    request.method === "DELETE" ||
    request.method === "PATCH"
  ) {
    const origin = request.headers.get("origin");
    const host = request.headers.get("host");

    // Verify origin matches host for state-changing requests
    if (origin && host && !origin.includes(host)) {
      return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
