// Newsletter-Anmeldung: Kasten im Footer auf jeder Seite, Popup nur auf der Startseite.
// Es wird nichts im Browser gespeichert (kein Cookie, kein localStorage).
(function () {
  var ACCESS_KEY = "0f814486-0a5f-4b53-814b-34aa48d78063"; // öffentlicher Web3Forms-Key, für den Browser gedacht

  function formular(id) {
    return '' +
      '<form class="nl-form" novalidate>' +
        '<label for="' + id + '-mail">Deine Mailadresse</label>' +
        '<div class="nl-row">' +
          '<input type="email" id="' + id + '-mail" name="email" autocomplete="email" placeholder="name@beispiel.de" required>' +
          '<button type="submit" class="nl-btn">Kostenlos anmelden</button>' +
        '</div>' +
        '<input type="checkbox" name="botcheck" class="nl-bot" tabindex="-1" autocomplete="off" aria-hidden="true">' +
        '<label class="nl-check"><input type="checkbox" name="einwilligung" required> ' +
          'Ich möchte den wöchentlichen Newsletter per Mail bekommen. Die Hinweise in der <a href="datenschutz.html#newsletter">Datenschutzerklärung</a> habe ich gelesen.</label>' +
        '<p class="nl-msg" role="status" aria-live="polite" hidden></p>' +
      '</form>';
  }

  function text() {
    return '<p class="nl-text">Einmal pro Woche eine Mail mit dem Neuesten aus dem Pflegelaborblog. ' +
           'Kostenlos, ohne Werbung. Deine Mailadresse gebe ich nicht weiter und nutze sie für nichts anderes als den Newsletter. ' +
           'Abmelden kannst du dich jederzeit mit einem Klick in jeder Mail.</p>';
  }

  function verdrahten(form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = form.querySelector('.nl-msg');
      var btn = form.querySelector('.nl-btn');
      var mail = form.elements['email'].value.trim();
      function zeig(t, fehler) { msg.textContent = t; msg.hidden = false; msg.className = 'nl-msg' + (fehler ? ' nl-err' : ' nl-ok'); }
      if (form.elements['botcheck'].checked) return;
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(mail)) { zeig('Bitte gib eine gültige Mailadresse ein.', true); return; }
      if (!form.elements['einwilligung'].checked) { zeig('Bitte bestätige zuerst den Haken zur Einwilligung.', true); return; }
      btn.disabled = true;
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: 'Newsletter Anmeldung',
          from_name: 'Pflegelaborblog Anmeldung',
          email: mail,
          message: 'Neue Newsletter-Anmeldung: ' + mail + '. Einwilligung per Haken auf der Seite ' + location.pathname + ' am ' + new Date().toLocaleString('de-DE') + '.'
        })
      }).then(function (r) { return r.json(); }).then(function (j) {
        if (j && j.success) {
          form.reset();
          zeig('Danke, du bist eingetragen. Die erste Mail kommt mit dem nächsten Newsletter.', false);
        } else { throw new Error('fail'); }
      }).catch(function () {
        btn.disabled = false;
        zeig('Das hat leider nicht geklappt. Bitte versuche es später noch einmal.', true);
      });
    });
  }

  // 1. Kasten im Footer, immer sichtbar
  var wrap = document.querySelector('footer .wrap');
  if (wrap) {
    var box = document.createElement('section');
    box.className = 'nl-box';
    box.id = 'newsletter';
    box.setAttribute('aria-labelledby', 'nl-titel-footer');
    box.innerHTML = '<h2 id="nl-titel-footer">Newsletter, kostenlos und wöchentlich</h2>' + text() + formular('nl-footer');
    wrap.insertBefore(box, wrap.firstChild);
    verdrahten(box.querySelector('form'));
  }

  // 2. Popup nur auf der Startseite, ein Mal pro Seitenaufruf
  var p = location.pathname;
  var start = p === '/' || /\/index\.html$/.test(p) || /\/$/.test(p);
  if (!start) return;

  var pill = document.createElement('button');
  pill.type = 'button'; pill.className = 'nl-pill'; pill.hidden = true;
  pill.textContent = 'Newsletter';
  pill.setAttribute('aria-label', 'Newsletter anmelden');
  document.body.appendChild(pill);

  var dlg = document.createElement('div');
  dlg.className = 'nl-popup'; dlg.hidden = true;
  dlg.setAttribute('role', 'dialog'); dlg.setAttribute('aria-modal', 'false'); dlg.setAttribute('aria-labelledby', 'nl-titel-popup');
  dlg.innerHTML = '<button type="button" class="nl-close" aria-label="Schließen">&times;</button>' +
    '<h2 id="nl-titel-popup">Newsletter, kostenlos und wöchentlich</h2>' + text() + formular('nl-popup');
  document.body.appendChild(dlg);
  verdrahten(dlg.querySelector('form'));

  function auf() { dlg.hidden = false; pill.hidden = true; dlg.querySelector('input[type=email]').focus({ preventScroll: true }); }
  function zu() { dlg.hidden = true; pill.hidden = false; }
  dlg.querySelector('.nl-close').addEventListener('click', zu);
  pill.addEventListener('click', auf);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !dlg.hidden) zu(); });
  setTimeout(function () { if (dlg.hidden && pill.hidden) { dlg.hidden = false; } }, 6000);
})();
