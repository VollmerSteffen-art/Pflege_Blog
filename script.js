// Inhalte blenden beim Scrollen ein
(function () {
  var items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('visible'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  items.forEach(function (el) { io.observe(el); });
})();

// Menü auf dem Handy
(function () {
  var btn = document.querySelector('.toggle');
  var menu = document.querySelector('.menu');
  if (!btn || !menu) return;
  btn.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
})();

// Rubriken filtern im Blog
(function () {
  var chips = document.querySelectorAll('.chip');
  var cards = document.querySelectorAll('[data-rubrik]');
  if (!chips.length) return;
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(function (c) { c.setAttribute('aria-pressed', 'false'); });
      chip.setAttribute('aria-pressed', 'true');
      var f = chip.getAttribute('data-filter');
      cards.forEach(function (card) {
        var show = f === 'alle' || card.getAttribute('data-rubrik') === f;
        card.style.display = show ? '' : 'none';
      });
    });
  });
})();
