/* === CODESHEEP v1.2 - CONTROLLO RECINTI (SÌ/NO) === */

const mappaRecinti = {
  meta: new Array(1, 2),
  google: new Array(3, 4, 5),
  tiktok: new Array(6),
  linkedin: new Array(7),
  pinterest: new Array(8, 9),
  x: new Array(10, 11),
  snapchat: new Array(12, 13),
  bing: new Array(14),
  ads: new Array(15, 16, 17)
};

const gruppiTutti = new Array("cookie", "meta", "tiktok", "x", "google", "linkedin", "pinterest", "snapchat", "bing", "ads");

document.addEventListener('DOMContentLoaded', async () => {
  const dati = await chrome.storage.local.get('statoGregge');
  let statoGregge = dati.statoGregge || {
    cookie: true, meta: true, tiktok: true, x: true,
    google: true, linkedin: true, pinterest: true,
    snapchat: true, bing: true, ads: true
  };

  const pulsanti = document.querySelectorAll('.btn-toggle');

  pulsanti.forEach(btn => {
    const gruppo = btn.dataset.gruppo;
    aggiornaGrafica(btn, statoGregge[gruppo]);

    btn.addEventListener('click', async () => {
      statoGregge[gruppo] = !statoGregge[gruppo];
      aggiornaGrafica(btn, statoGregge[gruppo]);
      await chrome.storage.local.set({ statoGregge });
      aggiornaRegoleRete(statoGregge);
    });
  });

  document.getElementById('blocca-tutto').addEventListener('click', async () => {
    gruppiTutti.forEach(g => statoGregge[g] = true);
    pulsanti.forEach(btn => aggiornaGrafica(btn, true));
    await chrome.storage.local.set({ statoGregge });
    aggiornaRegoleRete(statoGregge);
  });

  document.getElementById('consenti-tutto').addEventListener('click', async () => {
    gruppiTutti.forEach(g => statoGregge[g] = false);
    pulsanti.forEach(btn => aggiornaGrafica(btn, false));
    await chrome.storage.local.set({ statoGregge });
    aggiornaRegoleRete(statoGregge);
  });
});

function aggiornaGrafica(btn, attivo) {
  if (attivo) {
    btn.textContent = "SÌ";
    btn.classList.remove("no");
    btn.classList.add("si");
  } else {
    btn.textContent = "NO";
    btn.classList.remove("si");
    btn.classList.add("no");
  }
}

async function aggiornaRegoleRete(statoGregge) {
  let daDisabilitare = new Array();
  let daAbilitare = new Array();

  for (const [gruppo, ids] of Object.entries(mappaRecinti)) {
    if (statoGregge[gruppo]) {
      daAbilitare.push(...ids);
    } else {
      daDisabilitare.push(...ids);
    }
  }

  await chrome.declarativeNetRequest.updateStaticRules({
    rulesetId: "blocco_tracker",
    disableRuleIds: daDisabilitare,
    enableRuleIds: daAbilitare
  });
}
