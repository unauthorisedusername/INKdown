/* INKdown v88 service worker: network-first, cache fallback (works offline after first visit) */
const CACHE='inkdown-v88';
self.addEventListener('install',e=>{ self.skipWaiting(); });
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  const r=e.request;
  if(r.method!=='GET'||!/^https?:/.test(r.url)) return;
  if(/googleapis\.com\/(upload|drive)|accounts\.google\.com/.test(r.url)) return; // never touch Google Drive / sign-in calls
  e.respondWith(
    fetch(r).then(res=>{
      if(res&&(res.ok||res.type==='opaque')){ const c=res.clone(); caches.open(CACHE).then(ch=>ch.put(r,c)).catch(()=>{}); }
      return res;
    }).catch(()=>caches.match(r).then(m=>m||(r.mode==='navigate'?caches.match('./'):Response.error())))
  );
});
