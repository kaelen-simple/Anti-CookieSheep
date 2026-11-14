/* --- CODESHEEP v1.2 - RIFIUTO AUTOMATICO COOKIE --- */

(async function () {
  // Controlla se l'utente ha lasciato attivo il blocco cookie nel popup
  const dati = await chrome.storage.local.get('statoGregge');
  const attivo = dati.statoGregge ? dati.statoGregge.cookie !== false : true;

  if (!attivo) return;

  // Parole chiave comuni nei pulsanti di rifiuto (italiano e inglese)
  const paroleRifiuto = [
    "rifiuta tutto",
    "rifiuta tutti",
    "rifiuta",
    "continua senza accettare",
    "solo necessari",
    "solo essenziali",
    "reject all",
    "decline all",
    "deny all",
    "necessary only",
    "continue without accepting"
  ];

  function cliccaRifiuta() {
    const elementi = document.querySelectorAll('button, a, [role="button"], input[type="button"]');
    for (const el of elementi) {
      const testo = (el.innerText || el.value || "").trim().toLowerCase();
      if (testo && paroleRifiuto.some(parola => testo === parola || testo.startsWith(parola))) {
        el.click();
        return true;
      }
    }
    return false;
  }

  // Prova subito al caricamento e ricontrolla per i banner che appaiono in ritardo
  let tentativi = 0;
  const intervallo = setInterval(() => {
    tentativi++;
    if (cliccaRifiuta() || tentativi >= 10) {
      clearInterval(intervallo);
    }
  }, 800);
})();
