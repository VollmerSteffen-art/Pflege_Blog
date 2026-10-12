// Lädt den Podigee Player erst nach Klick (Einwilligung, siehe Datenschutzerklärung Abschnitt 7).
(function () {
  var btn = document.getElementById("player-start");
  var slot = document.getElementById("player-slot");
  if (!btn || !slot) return;
  btn.addEventListener("click", function () {
    var s = document.createElement("script");
    s.className = "podigee-podcast-player";
    s.src = "https://player.podigee-cdn.net/podcast-player/javascripts/podigee-podcast-player.js";
    s.setAttribute("data-configuration", "https://podcastbb54d2.podigee.io/1-folge-1-willkommen/embed?context=external");
    slot.textContent = "";
    slot.appendChild(s);
  });
})();
