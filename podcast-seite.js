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
