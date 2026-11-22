(function () {
  const D = window.SUCCESSOR, L = window.LANTERN;
  const $ = (s, el = document) => el.querySelector(s);
  const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
  const order = ["alex", "linda", "rose", "sam", "jordan"];

  /* ---------- Hero framing on narrow screens ---------- */
  const heroSvg = $("#heroSvg");
  const frameHero = () => heroSvg.setAttribute("viewBox", window.innerWidth < 760 ? "620 140 520 480" : "0 0 1200 700");
  frameHero(); window.addEventListener("resize", frameHero);

  /* ---------- People ---------- */
  $("#people").innerHTML = order.map(id => {
    const p = D.people[id];
    return `<li class="person">
      <span class="avatar" style="--c:${p.colour}" aria-hidden="true">${p.name[0]}</span>
      <div>
        <h3>${p.name}${p.age ? `, ${p.age}` : ""}</h3>
        <p class="role">${esc(p.role)}</p>
        <p class="detail">${esc(p.detail)}</p>
      </div>
    </li>`;
  }).join("");

  /* ---------- Lantern viewer (used inline and in the panel) ---------- */
  const VIEW_NAMES = { front: "Front", side: "Side", back: "Back", top: "Top" };

  function createViewer(root, key) {
    let view = "front", selected = null;
    root.innerHTML = `
      <div class="view-tabs" role="tablist" aria-label="Lantern views">
        ${Object.keys(VIEW_NAMES).map(v => `<button role="tab" type="button" data-view="${v}" id="${key}-tab-${v}">${VIEW_NAMES[v]}</button>`).join("")}
      </div>
      <div class="view-figure" role="tabpanel"></div>
      <div class="feature-detail" aria-live="polite"></div>
      <ul class="feature-list"></ul>`;
    const fig = $(".view-figure", root), detail = $(".feature-detail", root), list = $(".feature-list", root);

    function render() {
      root.querySelectorAll("[role=tab]").forEach(t => {
        const on = t.dataset.view === view;
        t.setAttribute("aria-selected", on); t.tabIndex = on ? 0 : -1;
      });
      $("[role=tabpanel]", root).setAttribute("aria-labelledby", `${key}-tab-${view}`);
      const spots = D.hotspots[view];
      fig.innerHTML = `<svg viewBox="${L.views[view].viewBox}" role="img" aria-label="${VIEW_NAMES[view]} view of the lantern">
        ${L.views[view].svg}
        ${Object.entries(spots).map(([f, [x, y]]) => `
          <g class="spot${selected === f ? " on" : ""}" data-feature="${f}">
            <circle cx="${x}" cy="${y}" r="13" class="spot-ring"/>
            <circle cx="${x}" cy="${y}" r="5" class="spot-dot"/>
          </g>`).join("")}
      </svg>`;
      list.innerHTML = Object.keys(spots).map(f =>
        `<li><button type="button" data-feature="${f}" aria-pressed="${selected === f}">${esc(D.features[f].name)}</button></li>`).join("");
      if (selected && spots[selected]) {
        detail.innerHTML = `<h3>${esc(D.features[selected].name)}</h3><p>${esc(D.features[selected].text)}</p>`;
      } else {
        detail.innerHTML = `<p class="hint">Select a marked part of the ${VIEW_NAMES[view].toLowerCase()} view.</p>`;
      }
    }

    root.addEventListener("click", e => {
      const tab = e.target.closest("[data-view]");
      if (tab) { view = tab.dataset.view; if (!D.hotspots[view][selected]) selected = null; render(); return; }
      const f = e.target.closest("[data-feature]");
      if (f) { selected = f.dataset.feature; render(); }
    });
    root.addEventListener("keydown", e => {
      const tab = e.target.closest("[role=tab]");
      if (!tab || !["ArrowLeft", "ArrowRight"].includes(e.key)) return;
      const keys = Object.keys(VIEW_NAMES), i = keys.indexOf(view);
      view = keys[(i + (e.key === "ArrowRight" ? 1 : keys.length - 1)) % keys.length];
      if (!D.hotspots[view][selected]) selected = null;
      render(); $(`[data-view=${view}]`, root).focus();
    });

    render();
    return {
      show(feature) {
        const v = Object.keys(D.hotspots).find(k => D.hotspots[k][feature]);
        if (!v) return;
        view = v; selected = feature; render();
      }
    };
  }

  const inlineViewer = createViewer($('[data-viewer="inline"]'), "inline");
  const panelViewer = createViewer($('[data-viewer="panel"]'), "panel");

  /* ---------- Panel ---------- */
  const panel = $("#panel"), toggle = $(".panel-toggle");
  let lastFocus = null;
  function openPanel(feature) {
    lastFocus = document.activeElement;
    panel.hidden = false;
    requestAnimationFrame(() => panel.classList.add("open"));
    toggle.setAttribute("aria-expanded", "true");
    if (feature) panelViewer.show(feature);
    $(".panel-close", panel).focus();
  }
  function closePanel() {
    panel.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    setTimeout(() => { panel.hidden = true; }, 250);
    if (lastFocus) lastFocus.focus();
  }
  document.addEventListener("click", e => {
    const opener = e.target.closest("[data-open-panel]");
    if (opener) {
      const f = opener.dataset.feature;
      if (f && !panel.hidden) panelViewer.show(f);
      else if (panel.hidden) openPanel(f);
      else closePanel();
    }
    if (e.target.closest("[data-close-panel]")) closePanel();
  });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !panel.hidden) closePanel(); });

  /* ---------- Scenario explorer ---------- */
  let sIndex = 0, stepIndex = 0;
  const listEl = $("#scenarioList"), stageEl = $("#stage");

  listEl.innerHTML = D.scenarios.map((s, i) => `
    <li><button type="button" data-scenario="${i}">
      <span class="s-title">${esc(s.title)}</span>
      <span class="s-tag">${esc(s.tag)}</span>
    </button></li>`).join("");

  function renderStage() {
    const s = D.scenarios[sIndex], st = s.steps[stepIndex];
    const mode = D.modes[st.mode], safety = D.safety[st.safety];
    listEl.querySelectorAll("button").forEach((b, i) => b.setAttribute("aria-current", i === sIndex ? "true" : "false"));
    const lines = Object.entries(st.lines).map(([who, text]) => {
      const p = who === "lantern" ? { name: "The lantern", colour: mode.colour } : D.people[who];
      return `<li class="line${who === "lantern" ? " is-lantern" : ""}">
        <span class="avatar small" style="--c:${p.colour}" aria-hidden="true">${who === "lantern" ? "" : p.name[0]}</span>
        <p><strong>${esc(p.name)}</strong> ${esc(text)}</p>
      </li>`;
    }).join("");
    const feature = st.feature ? D.features[st.feature] : null;

    stageEl.innerHTML = `
      <div class="stage-head">
        <p class="room">${esc(s.room)}</p>
        <h3>${esc(s.title)}</h3>
        <p class="summary">${esc(s.summary)}</p>
      </div>
      <div class="stage-art">${L.stage({ mode: st.mode, modeColour: mode.colour, modeLabel: mode.label, projected: st.projected })}</div>
      <div class="status">
        <span class="chip"><span class="light" style="--c:${mode.colour}"></span>Mode: ${esc(mode.label)}</span>
        <span class="chip"><span class="light" style="--c:${safety.colour}"></span>Safety: ${esc(safety.label)}</span>
        ${feature ? `<button type="button" class="chip chip-link" data-open-panel data-feature="${st.feature}">Feature in use: ${esc(feature.name)}</button>` : ""}
      </div>
      <div class="step">
        <p class="step-count">Step ${stepIndex + 1} of ${s.steps.length}</p>
        <h4>${esc(st.title)}</h4>
        <ul class="lines">${lines}</ul>
      </div>
      <div class="step-nav">
        <button type="button" class="button ghost" data-step="-1" ${stepIndex === 0 ? "disabled" : ""}>Previous step</button>
        <ol class="dots" aria-hidden="true">${s.steps.map((_, i) => `<li class="${i === stepIndex ? "on" : ""}"></li>`).join("")}</ol>
        ${stepIndex < s.steps.length - 1
          ? `<button type="button" class="button primary" data-step="1">Next step</button>`
          : (sIndex < D.scenarios.length - 1
            ? `<button type="button" class="button primary" data-next-scenario>Next moment: ${esc(D.scenarios[sIndex + 1].title)}</button>`
            : `<a class="button primary" href="#arc">See the story arc</a>`)}
      </div>`;
    if (feature && !panel.hidden) panelViewer.show(st.feature);
  }

  listEl.addEventListener("click", e => {
    const b = e.target.closest("[data-scenario]"); if (!b) return;
    sIndex = +b.dataset.scenario; stepIndex = 0; renderStage();
  });
  stageEl.addEventListener("click", e => {
    const b = e.target.closest("[data-step]");
    if (b) { stepIndex += +b.dataset.step; renderStage(); $("[data-step='1'], [data-next-scenario], [data-step='-1']", stageEl)?.focus(); return; }
    if (e.target.closest("[data-next-scenario]")) { sIndex++; stepIndex = 0; renderStage(); stageEl.scrollIntoView({ block: "start" }); }
  });
  renderStage();

  /* ---------- Story arc ---------- */
  const arc = D.arc, W = 1000, H = 260, pad = 60;
  const pts = arc.map((b, i) => [pad + i * (W - 2 * pad) / (arc.length - 1), H - 30 - b.tension * (H - 80)]);
  let path = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1], [x1, y1] = pts[i], mx = (x0 + x1) / 2;
    path += ` C ${mx} ${y0}, ${mx} ${y1}, ${x1} ${y1}`;
  }
  let beat = 0;
  function renderArc() {
    $("#arc-chart").innerHTML = `
      <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Emotional curve of the six story beats, peaking at the phone call">
        <line x1="${pad}" y1="${H - 30}" x2="${W - pad}" y2="${H - 30}" class="arc-base"/>
        <path d="${path}" class="arc-line"/>
        ${pts.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${i === beat ? 11 : 7}" class="arc-dot${i === beat ? " on" : ""}"/>`).join("")}
      </svg>
      <ol class="arc-beats">${arc.map((b, i) => `<li><button type="button" data-beat="${i}" aria-pressed="${i === beat}"><span class="n">${i + 1}</span>${esc(b.title)}</button></li>`).join("")}</ol>`;
    $("#arc-detail").innerHTML = `<h3>${beat + 1}. ${esc(arc[beat].title)}</h3><p>${esc(arc[beat].text)}</p>`;
  }
  $("#arc-chart").addEventListener("click", e => {
    const b = e.target.closest("[data-beat]"); if (!b) return;
    beat = +b.dataset.beat; renderArc(); $(`[data-beat="${beat}"]`).focus();
  });
  renderArc();
})();
