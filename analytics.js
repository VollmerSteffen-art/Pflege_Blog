/* Google Analytics 4 erst nach Einwilligung. Solange GA_ID leer ist, passiert nichts: kein Banner, kein Laden, keine Verbindung zu Google.
   Aktivieren: Messungs-ID (G-XXXXXXXXXX) unten eintragen UND vorher die Datenschutzerklärung ergänzen (siehe ANALYTICS_EINRICHTEN.md). */
(function () {
  var GA_ID = "";
  if (!GA_ID) return;
  var KEY = "pl-analytics-consent";
  function get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function set(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  function load() {
    if (window.gtag) return;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    gtag("consent", "default", { analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
    gtag("js", new Date());
    gtag("config", GA_ID, { anonymize_ip: true, allow_google_signals: false });
    var s = document.createElement("script");
    s.async = true; s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA_ID);
    document.head.appendChild(s);
  }
  function banner() {
    var b = document.createElement("div");
    b.className = "pl-consent"; b.setAttribute("role", "dialog"); b.setAttribute("aria-label", "Einwilligung zur Reichweitenmessung");
    b.innerHTML = '<p>Ich möchte wissen, welche Beiträge gelesen werden. Dafür nutze ich Google Analytics, aber nur, wenn du zustimmst. Mehr steht in der <a href="datenschutz.html">Datenschutzerklärung</a>.</p>' +
      '<div class="pl-consent-btns"><button type="button" data-v="no">Ablehnen</button><button type="button" data-v="yes">Zustimmen</button></div>';
    b.addEventListener("click", function (e) {
      var v = e.target && e.target.getAttribute && e.target.getAttribute("data-v");
      if (!v) return;
      set(v); b.remove(); if (v === "yes") load();
    });
    document.body.appendChild(b);
  }
  function link() {
    var f = document.querySelector("footer p");
    if (!f) return;
    var a = document.createElement("a");
    a.href = "#"; a.textContent = "Cookie Einstellungen";
    a.addEventListener("click", function (e) { e.preventDefault(); set(""); if (!document.querySelector(".pl-consent")) banner(); });
    f.appendChild(a);
  }
  function init() { link(); var c = get(); if (c === "yes") load(); else if (c !== "no") banner(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
