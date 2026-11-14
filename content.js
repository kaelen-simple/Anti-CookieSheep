/* --- CODESHEEP v1.2 - RIFIUTO AUTOMATICO COOKIE (ANCHE SHADOW DOM) --- */

(async function () {
  const dati = await chrome.storage.local.get('statoGregge');
  const attivo = dati.statoGregge ? dati.statoGregge.cookie !== false : true;
  if (!attivo) return;

  const paroleRifiuto = [
    "rifiuta tutto", "rifiuta tutti", "rifiuta",
    "continua senza accettare", "solo necessari", "solo essenziali",
    "reject all", "decline all", "deny all", "necessary only", "continue without accepting"
  ];

  // Cerca i pulsanti anche dentro gli Shadow DOM (es. Iubenda, Cookiebot, OneTrust)
  function trovaTuttiGliElementi(radice = document) {
    let lista = Array.from(radice.querySelectorAll('button, a, [role="button"], input[type="button"]'));
    const tutti = radice.querySelectorAll('*');
    for (const el of tutti) {
      if (el.shadowRoot) {
        lista = lista.concat(trovaTuttiGliElementi(el.shadowRoot));
      }
    }
    return lista;
  }

  function cliccaRifiuta() {
    const elementi = trovaTuttiGliElementi();
    for (const el of elementi) {
      const testo = (el.innerText || el.value || "").trim().toLowerCase();
      if (testo && paroleRifiuto.some(parola => testo === parola || testo.startsWith(parola))) {
        el.click();
        return true;
      }
    }
    return false;
  }

  let tentativi = 0;
  const intervallo = setInterval(() => {
    tentativi++;
    if (cliccaRifiuta() || tentativi >= 12) {
      clearInterval(intervallo);
    }
  }, 800);
})();

