/* === CODESHEEP v1.4 - CONTROLLO RECINTI (SÌ/NO) === */

const mappaRecinti = {
  meta:,
  google:,
  tiktok:,
  linkedin:,
  pinterest:,
  x:,
  snapchat:,
  bing:,
  ads: [15, 16, 17]
};

const gruppiTutti = ["scudo", "cookie", "meta", "tiktok", "x", "google", "linkedin", "pinterest", "snapchat", "bing", "ads"];

document.addEventListener('DOMContentLoaded', async () => {
  const dati = await chrome.storage.local.get('statoGregge');
  const predefiniti = {
    scudo: true, cookie: true, meta: true, tiktok: true, x: true,
    google: true, linkedin: true, pinterest: true,
    snapchat: true, bing: true, ads: true
  };
  let statoGregge = Object.assign({}, predefiniti, dati.statoGregge || {});

  const pulsanti = document.querySelectorAll('.btn-toggle');

  pulsanti.forEach(btn => {
    const gruppo = btn.dataset.gruppo || btn.dataset.id;
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
  let daDisabilitare = [];
  let daAbilitare = [];

  for (const [gruppo, ids] of Object.entries(mappaRecinti)) {
    if (statoGregge[gruppo]) {
      daAbilitare.push(...ids);
    } else {
      daDisabilitare.push(...ids);
    }
  }

  await chrome.declarativeNetRequest.updateEnabledRulesets({
    enableRulesetIds: ["ruleset_1"]
  });

  await chrome.declarativeNetRequest.updateStaticRules({
    rulesetId: "ruleset_1",
    disableRuleIds: daDisabilitare,
    enableRuleIds: daAbilitare
  });
}


