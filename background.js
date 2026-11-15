/* --- CODESHEEP v1.4 - SCUDO PRIVACY (WEBRTC + PULIZIA LINK + HTTPS) --- */

function aggiornaScudoPrivacy(attivo) {
  // 1. Blocca perdita indirizzo IP tramite WebRTC (Anti-IP Leak)
  if (chrome.privacy && chrome.privacy.network && chrome.privacy.network.webRTCIPHandlingPolicy) {
    chrome.privacy.network.webRTCIPHandlingPolicy.set({
      value: attivo ? 'disable_non_proxied_udp' : 'default'
    });
  }

  // 2. Attiva/Disattiva le regole di pulizia link e HTTPS forzato (ID 901 e 902)
  if (chrome.declarativeNetRequest) {
    if (attivo) {
      chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds:,
        addRules: [
          {
            id: 901,
            priority: 1,
            action: {
              type: "redirect",
              redirect: {
                transform: {
                  queryTransform: {
                    removeParams: [
                      "fbclid", "gclid", "ttclid", "msclkid", "igshid",
                      "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"
                    ]
                  }
                }
              }
            },
            condition: {
              resourceTypes: ["main_frame"]
            }
          },
          {
            id: 902,
            priority: 1,
            action: { type: "upgradeScheme" },
            condition: {
              urlFilter: "http://*",
              resourceTypes: ["main_frame"]
            }
          }
        ]
      });
    } else {
      chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [901, 902]
      });
    }
  }
}

// Attiva lo scudo in automatico all'installazione o all'avvio del browser
chrome.runtime.onInstalled.addListener(() => {
  aggiornaScudoPrivacy(true);
});

chrome.runtime.onStartup.addListener(async () => {
  const dati = await chrome.storage.local.get('statoGregge');
  const scudoAttivo = dati.statoGregge ? dati.statoGregge.scudo !== false : true;
  aggiornaScudoPrivacy(scudoAttivo);
});

// Ascolta i cambiamenti dagli interruttori del popup
chrome.storage.onChanged.addListener((cambiamenti) => {
  if (cambiamenti.statoGregge && cambiamenti.statoGregge.newValue) {
    const scudoAttivo = cambiamenti.statoGregge.newValue.scudo !== false;
    aggiornaScudoPrivacy(scudoAttivo);
  }
});
