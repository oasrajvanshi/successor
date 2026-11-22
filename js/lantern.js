// Drawings of the lantern: the four product views and the reactive scenario stage.

(function () {
  const C = {
    shell: "#F1EFE8", shellLine: "#888780", band: "#FAEEDA", bandLine: "#BA7517",
    handle: "#5F5E5A", dock: "#D3D1C7", dark: "#444441", amber: "#EF9F27", beam: "#FAC775"
  };

  const body = `
    <rect x="150" y="476" width="140" height="22" rx="8" fill="${C.dock}" stroke="${C.shellLine}"/>
    <rect x="165" y="230" width="110" height="246" rx="40" fill="${C.shell}" stroke="${C.shellLine}" stroke-width="1.5"/>
    <rect x="165" y="245" width="110" height="52" rx="22" fill="${C.band}" stroke="${C.bandLine}" stroke-width="1.5"/>`;

  const views = {
    front: {
      viewBox: "110 140 290 380",
      svg: `
        <path d="M188 235 Q220 150 252 235" fill="none" stroke="${C.handle}" stroke-width="7" stroke-linecap="round"/>
        ${body}
        <circle cx="220" cy="271" r="13" fill="${C.dark}"/>
        <path d="M207 271 A13 13 0 0 1 233 271 Z" fill="${C.bandLine}"/>
        <line x1="190" y1="330" x2="250" y2="330" stroke="#B4B2A9" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="190" y1="342" x2="250" y2="342" stroke="#B4B2A9" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="190" y1="354" x2="250" y2="354" stroke="#B4B2A9" stroke-width="2.5" stroke-linecap="round"/>
        <rect x="180" y="385" width="80" height="44" rx="10" fill="${C.band}" stroke="${C.amber}" stroke-width="1.5"/>
        <circle cx="262" cy="445" r="6" fill="${C.amber}"/>
        <polygon points="266,448 300,499 360,499" fill="${C.beam}" opacity="0.5"/>`
    },
    side: {
      viewBox: "110 130 320 390",
      svg: `
        <rect x="212" y="150" width="16" height="85" rx="8" fill="none" stroke="${C.handle}" stroke-width="6"/>
        ${body}
        <path d="M275 258 Q292 271 275 284 Z" fill="${C.dark}"/>
        <path d="M300 271 A30 30 0 0 0 300 240" fill="none" stroke="${C.bandLine}" stroke-width="1.5" stroke-dasharray="4 3"/>
        <line x1="188" y1="330" x2="188" y2="360" stroke="#B4B2A9" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="200" y1="330" x2="200" y2="360" stroke="#B4B2A9" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M275 438 L284 436 L284 452 L275 450 Z" fill="${C.amber}"/>
        <polygon points="284,444 330,499 410,499" fill="${C.beam}" opacity="0.5"/>`
    },
    back: {
      viewBox: "110 140 290 380",
      svg: `
        <path d="M188 235 Q220 150 252 235" fill="none" stroke="${C.handle}" stroke-width="7" stroke-linecap="round"/>
        ${body}
        <rect x="178" y="483" width="10" height="8" rx="2" fill="${C.bandLine}"/>
        <rect x="252" y="483" width="10" height="8" rx="2" fill="${C.bandLine}"/>
        <circle cx="220" cy="271" r="16" fill="${C.amber}" stroke="#854F0B" stroke-width="1.5"/>
        <circle cx="220" cy="271" r="6" fill="${C.band}"/>
        <circle cx="220" cy="340" r="22" fill="${C.dock}" stroke="${C.handle}" stroke-width="1.5"/>
        <line x1="220" y1="340" x2="220" y2="322" stroke="#2C2C2A" stroke-width="3" stroke-linecap="round"/>
        <circle cx="204" cy="385" r="6" fill="#3FB27F"/><circle cx="236" cy="385" r="6" fill="#F08A3C"/>
        <rect x="185" y="408" width="70" height="30" rx="8" fill="${C.shell}" stroke="${C.shellLine}"/>
        <circle cx="202" cy="423" r="4" fill="${C.shellLine}"/><circle cx="220" cy="423" r="4" fill="${C.shellLine}"/>
        <circle cx="238" cy="423" r="5" fill="#378ADD"/>`
    },
    top: {
      viewBox: "100 150 270 280",
      svg: `
        <circle cx="230" cy="290" r="110" fill="none" stroke="${C.bandLine}" stroke-width="1.5" stroke-dasharray="6 5"/>
        <circle cx="230" cy="290" r="62" fill="${C.shell}" stroke="${C.shellLine}" stroke-width="1.5"/>
        <circle cx="230" cy="290" r="48" fill="${C.band}" stroke="${C.bandLine}" stroke-width="1.5"/>
        <rect x="166" y="282" width="128" height="16" rx="8" fill="${C.handle}"/>
        <rect x="212" y="280" width="36" height="20" rx="8" fill="#5DCAA5" stroke="#0F6E56"/>
        <path d="M230 228 L222 214 L238 214 Z" fill="${C.dark}"/>
        <path d="M300 200 A110 110 0 0 1 335 255" fill="none" stroke="${C.bandLine}" stroke-width="2.5"/>
        <path d="M335 255 L338 241 L326 248 Z" fill="${C.bandLine}"/>`
    }
  };

  // Reactive scene used in the scenario explorer.
  function stage(opts) {
    const mode = opts.modeColour, projected = opts.projected || "", lit = opts.mode !== "resting";
    const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
    const beam = projected ? `
      <polygon points="278,286 360,372 600,372 600,330" fill="#FFE7AE" opacity="0.14"/>
      <text x="470" y="356" text-anchor="middle" class="stage-projection">${esc(projected)}</text>` : "";
    return `
      <svg viewBox="0 0 640 400" role="img" aria-label="The lantern on a counter, ${esc(opts.modeLabel)}${projected ? ", projecting: " + esc(projected) : ""}">
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="${mode}" stop-opacity="${lit ? 0.55 : 0.18}"/>
            <stop offset="100%" stop-color="${mode}" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <rect width="640" height="400" fill="#1B2640"/>
        <rect x="380" y="40" width="180" height="150" rx="6" fill="#141C2F" stroke="#33415F" stroke-width="2"/>
        <line x1="470" y1="40" x2="470" y2="190" stroke="#33415F" stroke-width="2"/>
        <line x1="380" y1="115" x2="560" y2="115" stroke="#33415F" stroke-width="2"/>
        <circle cx="520" cy="78" r="12" fill="#FFE7AE" opacity="0.8"/>
        <rect x="0" y="318" width="640" height="82" fill="#2B3957"/>
        <rect x="0" y="318" width="640" height="6" fill="#384A6E"/>
        <circle class="stage-glow" cx="250" cy="250" r="${lit ? 190 : 120}" fill="url(#glow)"/>
        ${beam}
        <g transform="translate(250 318) scale(0.62) translate(-220 -498)">
          <path d="M188 235 Q220 150 252 235" fill="none" stroke="#5F5E5A" stroke-width="7" stroke-linecap="round"/>
          <rect x="150" y="476" width="140" height="22" rx="8" fill="#D3D1C7"/>
          <rect x="165" y="230" width="110" height="246" rx="40" fill="#F1EFE8"/>
          <rect x="165" y="245" width="110" height="52" rx="22" fill="#FAEEDA" stroke="#BA7517" stroke-width="1.5"/>
          <circle cx="220" cy="271" r="13" fill="#444441"/>
          ${opts.mode === "learning" ? "" : `<path d="M207 271 A13 13 0 0 1 233 271 Z" fill="#BA7517"/>`}
          <rect x="180" y="385" width="80" height="44" rx="10" fill="${mode}" opacity="${lit ? 1 : 0.5}"/>
          <circle cx="262" cy="445" r="6" fill="${projected ? "#FFE7AE" : "#8A97B3"}"/>
        </g>
      </svg>`;
  }

  window.LANTERN = { views, stage };
})();
