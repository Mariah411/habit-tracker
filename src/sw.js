// const staticCacheName = "s-app-v1";

// const assetUrls = ["index.html", "assets"];

// self.addEventListener("install", async (event) => {
//   // console.log("sw: install");

//   const cache = await caches.open(staticCacheName);
//   await cache.addAll(assetUrls);
// });

// self.addEventListener("activate", (event) => {
//   // console.log("sw: activate");
// });

// self.addEventListener("fetch", (event) => {
//   // console.log(" fetch ", event.request);

//   console.log("fetch", event.request.url);
//   event.respondWith(cacheFirst(event.request));
// });

// async function cacheFirst(request) {
//   const cached = await caches.match(request);
//   return cached ?? (await fetch(request));
// }

import { registerRoute } from "workbox-routing";
import * as strategies from "workbox-strategies";
registerRoute(match, new strategies.CacheFirst());
