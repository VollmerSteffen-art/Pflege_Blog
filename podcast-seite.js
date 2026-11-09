// Podcastseite: Fenster zur Folge, Einblenden beim Scrollen
(function () {
  var oeffnen = document.querySelectorAll("[data-open]");
  Array.prototype.forEach.call(oeffnen, function (b) {
    b.addEventListener("click", function () {
      var d = document.getElementById(b.getAttribute("data-open"));
      if (d && typeof d.showModal === "function") { d.showModal(); }
    });
  });
  Array.prototype.forEach.call(document.querySelectorAll(".pc-dlg"), function (d) {
    d.addEventListener("click", function (e) {
      if (e.target === d || e.target.hasAttribute("data-close")) { d.close(); }
    });
  });
  var rv = document.querySelectorAll(".pc-rv");
  if (!("IntersectionObserver" in window)) {
    Array.prototype.forEach.call(rv, function (el) { el.classList.add("pc-in"); });
    return;
  }
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("pc-in"); io.unobserve(x.target); } });
  }, { threshold: 0.12 });
  Array.prototype.forEach.call(rv, function (el, i) { el.style.transitionDelay = (i % 4) * 70 + "ms"; io.observe(el); });
})();
// Zahl in der Info unten hochzaehlen, sobald sichtbar
(function () {
  var z = document.querySelector(".pc-info [data-count]");
  if (!z || !("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) { return; }
  var ziel = parseInt(z.getAttribute("data-count"), 10); z.textContent = "0";
  var io = new IntersectionObserver(function (es) {
    if (!es[0].isIntersecting) { return; }
    io.disconnect();
    var t0 = null;
    function schritt(t) {
      if (t0 === null) { t0 = t; }
      var p = Math.min(1, (t - t0) / 1800), e = 1 - Math.pow(1 - p, 3);
      z.textContent = Math.round(ziel * e);
      if (p < 1) { requestAnimationFrame(schritt); }
    }
    requestAnimationFrame(schritt);
  }, { threshold: 0.4 });
  io.observe(z);
})();
