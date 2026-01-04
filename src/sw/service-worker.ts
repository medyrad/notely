/// <reference lib="webworker" />

import { APP_SHELL_CACHE, NOTES_API_CACHE } from "./cacheNames";
import { cacheFirst, staleWhileRevalidate } from "./strategies";

const APP_SHELL = ["/", "/index.html"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(APP_SHELL_CACHE).then((cache) => cache.addAll(APP_SHELL)));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // Notes API
  if (url.pathname.startsWith("/api/notes")) {
    event.respondWith(staleWhileRevalidate(request, NOTES_API_CACHE));
    return;
  }

  // App shell & assets
  if (url.origin === self.location.origin) {
    event.respondWith(cacheFirst(request, APP_SHELL_CACHE));
  }
});
