<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <style>
    body {
      width: 290px;
      background-color: #0f172a;
      color: #f8fafc;
      font-family: system-ui, -apple-system, sans-serif;
      margin: 0;
      padding: 14px;
    }
    .header {
      display: flex;
      align-items: center;
      gap: 10px;
      border-bottom: 1px solid #1e293b;
      padding-bottom: 10px;
      margin-bottom: 10px;
    }
    .header img {
      width: 36px;
      height: 36px;
      border-radius: 8px;
    }
    .header h2 {
      margin: 0;
      font-size: 16px;
      color: #38bdf8;
    }
    .sub {
      font-size: 11px;
      color: #94a3b8;
      margin-bottom: 6px;
    }
    .riga {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 6px 0;
      border-bottom: 1px solid #1e293b;
      font-size: 13px;
    }
    .riga:last-child { border-bottom: none; }
    .btn-toggle {
      padding: 4px 12px;
      border: none;
      border-radius: 12px;
      font-weight: bold;
      font-size: 11px;
      cursor: pointer;
    }
    .si { background-color: #10b981; color: #022c22; }
    .no { background-color: #ef4444; color: #ffffff; }
    .azioni-globali {
      display: flex;
      gap: 8px;
      margin-top: 12px;
    }
    .btn-globale {
      flex: 1;
      padding: 7px;
      border: none;
      border-radius: 8px;
      font-weight: bold;
      font-size: 11px;
      cursor: pointer;
    }
    #blocca-tutto { background-color: #0284c7; color: white; }
    #consenti-tutto { background-color: #334155; color: #cbd5e1; }
  </style>
</head>
<body>
  <div class="header">
    <img src="Screenshot_20261114-100552.WhatsApp (1) (1).png" alt="Sheep">
    <div>
      <h2>Anti-CookieSheep</h2>
      <div class="sub">SÌ = Bloccato | NO = Consentito</div>
    </div>
  </div>

  <div id="lista-recinti">
    <div class="riga"><span>🍪 Rifiuta Banner Cookie</span><button class="btn-toggle si" data-gruppo="cookie">SÌ</button></div>
    <div class="riga"><span>📘 Meta Pixel (FB/IG)</span><button class="btn-toggle si" data-gruppo="meta">SÌ</button></div>
    <div class="riga"><span>🎵 TikTok Pixel</span><button class="btn-toggle si" data-gruppo="tiktok">SÌ</button></div>
    <div class="riga"><span>✖️ X (Twitter) Pixel</span><button class="btn-toggle si" data-gruppo="x">SÌ</button></div>
    <div class="riga"><span>🔍 Google Ads & Analytics</span><button class="btn-toggle si" data-gruppo="google">SÌ</button></div>
    <div class="riga"><span>💼 LinkedIn Tag</span><button class="btn-toggle si" data-gruppo="linkedin">SÌ</button></div>
    <div class="riga"><span>📌 Pinterest Tag</span><button class="btn-toggle si" data-gruppo="pinterest">SÌ</button></div>
    <div class="riga"><span>👻 Snapchat Pixel</span><button class="btn-toggle si" data-gruppo="snapchat">SÌ</button></div>
    <div class="riga"><span>🪟 Microsoft / Bing UET</span><button class="btn-toggle si" data-gruppo="bing">SÌ</button></div>
    <div class="riga"><span>🛒 Criteo / Taboola / Outbrain</span><button class="btn-toggle si" data-gruppo="ads">SÌ</button></div>
  </div>

  <div class="azioni-globali">
    <button id="blocca-tutto" class="btn-globale">🛡️ Blocca Tutto</button>
    <button id="consenti-tutto" class="btn-globale">🔓 Consenti Tutto</button>
  </div>

  <script src="popup.js"></script>
</body>
</html>
      
