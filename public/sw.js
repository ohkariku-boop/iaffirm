/* iAffirm service worker
 * - Precache icons / manifest (cache-first for static)
 * - Network-first navigations with cache fallback
 * - Never cache /api/*
 * - Push + local notification helpers
 */

const CACHE = "iaffirm-static-v2";

const PRECACHE = [
  "/favicon.svg",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/icon-192-maskable.png",
  "/icons/icon-512-maskable.png",
  "/icons/apple-touch-icon.png",
  "/manifest.json",
  "/install",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) =>
        Promise.all(
          PRECACHE.map((url) =>
            cache.add(url).catch((err) => {
              console.warn("[iaffirm sw] precache skip", url, err);
            })
          )
        )
      )
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))
        )
      )
      .then(() => self.clients.claim())
  );
});

function isApiRequest(url) {
  return url.pathname.startsWith("/api/");
}

function isStaticAsset(url) {
  if (url.pathname.startsWith("/icons/")) return true;
  if (url.pathname === "/favicon.svg") return true;
  if (url.pathname === "/manifest.json") return true;
  if (url.pathname === "/sw.js") return false;
  return /\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?|css|js)$/i.test(
    url.pathname
  );
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const res = await fetch(request);
  if (res.ok) {
    const copy = res.clone();
    const cache = await caches.open(CACHE);
    cache.put(request, copy);
  }
  return res;
}

async function networkFirstNavigate(request) {
  try {
    const res = await fetch(request);
    if (res.ok) {
      const copy = res.clone();
      const cache = await caches.open(CACHE);
      cache.put(request, copy);
    }
    return res;
  } catch {
    const cached =
      (await caches.match(request)) ||
      (await caches.match("/app")) ||
      (await caches.match("/"));
    if (cached) return cached;
    return new Response(
      "You are offline. Reconnect to continue your practice.",
      {
        status: 503,
        statusText: "Offline",
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      }
    );
  }
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (isApiRequest(url)) return; // network only — no SW cache

  if (request.mode === "navigate") {
    event.respondWith(networkFirstNavigate(request));
    return;
  }

  if (isStaticAsset(url)) {
    event.respondWith(cacheFirst(request));
  }
});

self.addEventListener("push", (event) => {
  let data = {
    title: "iAffirm",
    body: "A quiet moment for kinder self-talk.",
  };
  try {
    if (event.data) data = { ...data, ...event.data.json() };
  } catch {
    try {
      if (event.data) data.body = event.data.text();
    } catch {
      /* */
    }
  }
  event.waitUntil(
    self.registration.showNotification(data.title || "iAffirm", {
      body: data.body,
      icon: "/icons/icon-192.png",
      badge: "/icons/icon-192.png",
      data: { url: data.url || "/app" },
      tag: data.tag || "iaffirm-reminder",
      renotify: true,
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url =
    (event.notification.data && event.notification.data.url) || "/app";
  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clients) => {
        for (const c of clients) {
          if ("focus" in c) {
            c.navigate(url);
            return c.focus();
          }
        }
        if (self.clients.openWindow) return self.clients.openWindow(url);
      })
  );
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SHOW_NOTIFICATION") {
    const { title, body, url } = event.data;
    event.waitUntil(
      self.registration.showNotification(title || "iAffirm", {
        body: body || "Time for a short affirmation practice.",
        icon: "/icons/icon-192.png",
        data: { url: url || "/app" },
        tag: "iaffirm-local",
      })
    );
  }
});
