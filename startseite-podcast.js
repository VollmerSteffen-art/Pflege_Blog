// Startseite: Einblenden des Podcast-Blocks beim Scrollen
(function () {
  var els = document.querySelectorAll(".sp-rv");
  if (!("IntersectionObserver" in window)) { Array.prototype.forEach.call(els, function (e) { e.classList.add("sp-in"); }); return; }
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("sp-in"); io.unobserve(x.target); } });
  }, { threshold: 0.12 });
  Array.prototype.forEach.call(els, function (el, i) { el.style.transitionDelay = (i % 3) * 90 + "ms"; io.observe(el); });
  // Zahl hochzaehlen, sobald sichtbar
  var z = document.querySelector("[data-count]");
  if (z && "IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var ziel = parseInt(z.getAttribute("data-count"), 10); z.textContent = "0";
    var io2 = new IntersectionObserver(function (es) {
      if (!es[0].isIntersecting) { return; }
      io2.disconnect();
      var t0 = null;
      function schritt(t) {
        if (t0 === null) { t0 = t; }
        var p = Math.min(1, (t - t0) / 1800), e = 1 - Math.pow(1 - p, 3);
        z.textContent = Math.round(ziel * e);
        if (p < 1) { requestAnimationFrame(schritt); }
      }
      requestAnimationFrame(schritt);
    }, { threshold: 0.4 });
    io2.observe(z);
  }
})();
