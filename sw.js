"use strict";
/* 提升生產力系統 service worker
 * 策略：precache 入口＋全部工具頁，之後 stale-while-revalidate（先回快取、背景更新，下次進場拿到新版）。
 * 新增工具時要把 "./slug/" 加進 PRECACHE（scripts/check.mjs 會驗證）。
 * 改版時 bump CACHE 版本號即可強制重抓。
 */
const CACHE = "prod-sys-v1";
const PRECACHE = [
  "./",
  "./manifest.webmanifest",
  "./icon.svg",
  "./action-trigger/",
  "./analogy-transfer/",
  "./choice-loop/",
  "./cognitive-load/",
  "./compound-flywheel/",
  "./compounding-life/",
  "./constraint-driven/",
  "./constraint-reframing/",
  "./decision-fatigue/",
  "./decision-journal/",
  "./decision-tree/",
  "./energy-blocking/",
  "./energy-first/",
  "./energy-matrix/",
  "./first-principles/",
  "./flow-triggers/",
  "./habit-stacking/",
  "./identity-driven/",
  "./info-diet/",
  "./innovation-combo/",
  "./knowledge-atom/",
  "./knowledge-compression/",
  "./knowledge-distill/",
  "./knowledge-sop/",
  "./learning-pyramid/",
  "./life-leverage/",
  "./low-dependency/",
  "./mental-models/",
  "./mind-offload/",
  "./mvo/",
  "./mvp-progress/",
  "./pareto-review/",
  "./pre-decision/",
  "./premortem-thinking/",
  "./reverse-thinking/",
  "./strategic-optionality/",
  "./system-boundary/",
  "./task-batching/",
  "./task-switching-cost/",
  "./time-blocking/",
  "./two-minute/",
  "./value-recovery/",
  "./visual-note-taking/"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  e.respondWith(
    caches.open(CACHE).then(cache =>
      cache.match(req, { ignoreSearch: true }).then(cached => {
        const fresh = fetch(req).then(res => {
          if (res && res.ok) {
            /* 背景更新拿到新版頁面時，通知該頁顯示「重新整理」提示（etag 變了才算真的有新版） */
            if (cached && req.mode === "navigate") {
              const a = cached.headers.get("etag"), b = res.headers.get("etag");
              if (a && b && a !== b) notifyUpdated(req.url);
            }
            cache.put(req, res.clone());
          }
          return res;
        }).catch(() => cached || offlineFallback(req, cache));
        return cached || fresh;
      })
    )
  );
});

function notifyUpdated(url) {
  self.clients.matchAll({ type: "window" }).then(list =>
    list.forEach(c => c.postMessage({ type: "sw-updated", url }))
  );
}

/* 離線且該頁沒進快取：導航請求退回入口頁，其餘照常回網路錯誤 */
function offlineFallback(req, cache) {
  if (req.mode === "navigate") return cache.match("./", { ignoreSearch: true });
  return Response.error();
}
