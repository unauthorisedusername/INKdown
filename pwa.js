/* INKdown v88: makes the page installable (manifest + service worker) */
(function(){
  var h=document.head;
  var l=document.createElement('link'); l.rel='manifest'; l.href='manifest.json'; h.appendChild(l);
  var m=document.createElement('meta'); m.name='theme-color'; m.content='#111318'; h.appendChild(m);
  if('serviceWorker' in navigator) window.addEventListener('load',function(){ navigator.serviceWorker.register('sw.js').catch(function(){}); });
})();
