/// <reference lib="webworker" />

export {}; // Custom service worker for offline downloads and lightweight caching.

declare const self: ServiceWorkerGlobalScope;

const VERSION = "1.0.0";
const DOWNLOAD_CACHE = `tpri-downloads-${VERSION}`;
const DATA_CACHE = `tpri-data-${VERSION}`;
const MANIFEST_ENDPOINT = "/api/offline-manifest";

async function readOfflineManifest(): Promise<string[]> {
  try {
    const response = await fetch(MANIFEST_ENDPOINT, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Manifest request failed with status ${response.status}`);
    }
    const data: { downloads?: string[] } = await response.json();
    return Array.isArray(data.downloads) ? data.downloads : [];
  } catch (error) {
    console.warn("Unable to retrieve offline manifest", error);
    return [];
  }
}

async function precacheDownloads(paths: string[]) {
  if (!paths.length) return;

  const cache = await caches.open(DOWNLOAD_CACHE);

  await Promise.all(
    paths.map(async (path) => {
      try {
        const url = new URL(path, self.location.origin).toString();
        const request = new Request(url, { credentials: "same-origin" });
        const response = await fetch(request);
        if (response.ok) {
          await cache.put(request, response.clone());
        }
      } catch (error) {
        console.warn("Failed to precache download", path, error);
      }
    }),
  );
}

self.addEventListener("install", (event: ExtendableEvent) => {
  event.waitUntil(
    (async () => {
      const downloads = await readOfflineManifest();
      await precacheDownloads(downloads);
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener("activate", (event: ExtendableEvent) => {
  event.waitUntil(
    (async () => {
      const validCaches = new Set([DOWNLOAD_CACHE, DATA_CACHE]);
      const existing = await caches.keys();
      await Promise.all(
        existing
          .filter((cacheName) => !validCaches.has(cacheName))
          .map(async (cacheName) => caches.delete(cacheName)),
      );
      await self.clients.claim();
    })(),
  );
});

async function cacheFirst(request: Request, cacheName: string) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(request);
    if (response && response.ok) {
      await cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.warn("Cache-first request failed", error);
    return new Response(null, {
      status: 504,
      statusText: "Offline and no cached resource available.",
    });
  }
}

self.addEventListener("fetch", (event: FetchEvent) => {
  const { request } = event;

  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);

  if (url.origin === self.location.origin && url.pathname.startsWith("/downloads/")) {
    event.respondWith(cacheFirst(request, DOWNLOAD_CACHE));
    return;
  }

  const acceptHeader = request.headers.get("accept") ?? "";
  const wantsJson = acceptHeader.includes("application/json") || url.pathname.endsWith(".json");

  if (wantsJson) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(DATA_CACHE);
        const cached = await cache.match(request);

        const networkPromise = fetch(request)
          .then(async (response) => {
            if (response && response.ok) {
              await cache.put(request, response.clone());
            }
            return response;
          })
          .catch((error) => {
            console.warn("Network request for JSON failed", error);
            return undefined;
          });

        if (cached) {
          event.waitUntil(networkPromise);
          return cached;
        }

        const networkResponse = await networkPromise;
        if (networkResponse) {
          return networkResponse;
        }

        return new Response(null, {
          status: 504,
          statusText: "Offline and no cached data available.",
        });
      })(),
    );
  }
});
