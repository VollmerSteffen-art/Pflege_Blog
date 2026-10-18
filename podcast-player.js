// Lädt die Podigee Player erst nach Klick (Einwilligung, siehe Datenschutzerklärung Abschnitt 8).
(function () {
  var slots = document.querySelectorAll(".player-slot[data-embed]");
  Array.prototype.forEach.call(slots, function (slot) {
    var btn = slot.querySelector(".player-start");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var s = document.createElement("script");
      s.className = "podigee-podcast-player";
      s.src = "https://player.podigee-cdn.net/podcast-player/javascripts/podigee-podcast-player.js";
      s.setAttribute("data-configuration", slot.getAttribute("data-embed"));
      slot.textContent = "";
      slot.appendChild(s);
    });
  });
})();
