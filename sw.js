const cacheName="dayplate-static-v3";
const root=new URL("./",self.location.href).href;
const offline=new URL("Dayplate.html",root).href;
self.addEventListener("install",event=>event.waitUntil((async()=>{
  const cache=await caches.open(cacheName);
  await cache.addAll([new Request(root,{cache:"reload"}),new Request(offline,{cache:"reload"})]);
  await self.skipWaiting();
})()));
self.addEventListener("activate",event=>event.waitUntil((async()=>{
  for(const key of await caches.keys())if(key.startsWith("dayplate-static-")&&key!==cacheName)await caches.delete(key);
  await self.clients.claim();
})()));
self.addEventListener("fetch",event=>{
  const req=event.request;
  const url=new URL(req.url);url.search="";url.hash="";
  if(req.method!=="GET"||req.mode!=="navigate"||![root,offline,new URL("index.html",root).href].includes(url.href))return;
  const key=url.href===offline?offline:root;
  event.respondWith((async()=>{
    const cache=await caches.open(cacheName);
    try {const res=await fetch(req);if(res.ok){await cache.put(key,res.clone());return res}return await cache.match(key)||res}
    catch(e){const saved=await cache.match(key);if(saved)return saved;throw e}
  })());
});
