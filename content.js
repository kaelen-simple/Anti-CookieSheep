 /* --- CODESHEEP v1.4 - RIFIUTO COOKIE MULTILINGUA & MOBILE --- */

(async function () {
  const dati = await chrome.storage.local.get('statoGregge');
  const attivo = dati.statoGregge ? dati.statoGregge.cookie !== false : true;
  if (!attivo) return;

  const paroleRifiuto = [
    // Italiano
    "rifiuta tutto", "rifiuta tutti", "rifiuta", "continua senza accettare",
    "solo necessari", "solo essenziali", "nega tutto", "non accetto",
    // Inglese
    "reject all", "reject", "decline all", "decline", "deny all", "deny",
    "necessary only", "essential only", "continue without accepting", "do not accept",
    // Spagnolo
    "rechazar todo", "rechazar", "solo necesarias", "continuar sin aceptar",
    // Francese
    "tout refuser", "refuser", "continuer sans accepter", "uniquement nécessaires",
    // Tedesco
    "alle ablehnen", "ablehnen", "nur notwendige", "weiter ohne einwilligung",
    // Portoghese
    "rejeitar tudo", "rejeitar", "apenas necessários"
  ];

  const selettoriDiretti = [
    '#onetrust-reject-all-handler',
    '.qc-cmp2-summary-buttons button[mode="secondary"]',
    '#CybotCookiebotDialogBodyButtonDecline',
    '.iubenda-cs-reject-btn',
    '[data-testid="uc-deny-all-button"]',
    '.didomi-continue-without-agreeing',
    'button[aria-label*="reject" i]',
    'button[aria-label*="rifiuta" i]'
  ];

  function trovaTuttiGliElementi(radice = document) {
    let lista = Array.from(radice.querySelectorAll('button, a, [role="button"], input[type="button"]'));
    for (const el of radice.querySelectorAll('*')) {
      if (el.shadowRoot) {
        lista = lista.concat(trovaTuttiGliElementi(el.shadowRoot));
      }
    }
    return lista;
  }

  function cliccaRifiuta() {
    for (const sel of selettoriDiretti) {
      const btn = document.querySelector(sel);
      if (btn && btn.offsetParent !== null) {
        btn.click();
        return true;
      }
    }

    const elementi = trovaTuttiGliElementi();
    for (const el of elementi) {
      if (el.offsetParent === null) continue;
      const testo = (el.innerText || el.value || el.getAttribute('aria-label') || "").trim().toLowerCase();
      if (testo && testo.length < 40 && paroleRifiuto.some(p => testo === p || testo.startsWith(p))) {
        el.click();
        return true;
      }
    }
    return false;
  }

  let tentativi = 0;
  const intervallo = setInterval(() => {
    tentativi++;
    if (cliccaRifiuta() || tentativi >= 15) {
      clearInterval(intervallo);
    }
  }, 600);
})();
