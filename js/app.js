(function () {
  "use strict";

  const CHURCHES = window.CHURCHES;
  const DENOMS = window.DENOMINATIONS;
  const PLACES = window.PLACES;
  const LANG_KEYS = ["pap", "nl", "en", "es"];
  const DAY_ORDER = [0, 1, 2, 3, 4, 5, 6];
  const PERIODS = ["morning", "afternoon", "evening"];
  const MAIN_TYPES = ["service", "mass"];

  const state = {
    ui: loadPref("lang") || guessLang(),
    view: loadPref("view") || "list",
    q: "",
    days: new Set(),
    periods: new Set(),
    langs: new Set(),
    denoms: new Set(),
    place: "",
    translation: false,
    other: false
  };

  const $ = sel => document.querySelector(sel);
  let map = null;
  let markerLayer = null;
  const markers = {};

  // ---------- helpers ----------

  function loadPref(key) {
    try { return localStorage.getItem("kerkkiezer." + key); } catch (e) { return null; }
  }
  function savePref(key, value) {
    try { localStorage.setItem("kerkkiezer." + key, value); } catch (e) { /* ignore */ }
  }
  function guessLang() {
    const l = (navigator.language || "nl").toLowerCase();
    if (l.startsWith("pap")) return "pap";
    if (l.startsWith("nl")) return "nl";
    return "en";
  }
  function t() { return window.I18N[state.ui]; }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  function noteText(note) {
    if (!note) return "";
    return typeof note === "string" ? note : (note[state.ui] || note.nl || "");
  }
  function minutes(time) {
    if (!time) return null;
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  }
  function periodOf(time) {
    const m = minutes(time);
    if (m === null) return null;
    if (m < 12 * 60) return "morning";
    if (m < 17 * 60) return "afternoon";
    return "evening";
  }
  function langList(langs) { return langs.map(l => t().langs[l]).join(", "); }

  // ---------- filtering ----------

  function serviceFiltersActive() {
    return state.days.size || state.periods.size || state.langs.size;
  }

  function serviceMatches(church, s) {
    if (!state.other && !MAIN_TYPES.includes(s.type)) return false;
    if (state.days.size && !state.days.has(s.day)) return false;
    if (state.periods.size && !state.periods.has(periodOf(s.time))) return false;
    if (state.langs.size) {
      const langs = s.langs.concat(state.translation ? (church.translation || []) : []);
      if (!langs.some(l => state.langs.has(l))) return false;
    }
    return true;
  }

  function churchMatches(c) {
    if (state.denoms.size && !state.denoms.has(c.denomination)) return false;
    if (state.place && c.place !== state.place) return false;
    if (state.q) {
      const hay = [c.name, c.address, t().denoms[c.denomination], t().places[c.place]].join(" ").toLowerCase();
      if (!state.q.toLowerCase().split(/\s+/).every(w => hay.includes(w))) return false;
    }
    if (serviceFiltersActive()) return c.services.some(s => serviceMatches(c, s));
    return true;
  }

  function sortServices(a, b) {
    return a.day - b.day || (minutes(a.time) ?? 9999) - (minutes(b.time) ?? 9999);
  }

  // ---------- rendering ----------

  function chip(group, value, label, active, color) {
    const dot = color ? `<span class="dot" style="background:${color}"></span>` : "";
    return `<button type="button" class="chip" data-group="${group}" data-value="${value}" aria-pressed="${active}">${dot}${esc(label)}</button>`;
  }

  function renderStatic() {
    const L = t();
    document.documentElement.lang = state.ui === "pap" ? "pap" : state.ui;
    document.title = L.title;
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const v = L[el.dataset.i18n];
      if (typeof v === "string") el.textContent = v;
    });
    $("#q").placeholder = L.search;
    document.querySelectorAll(".lang-switch button").forEach(b => b.setAttribute("aria-pressed", b.dataset.lang === state.ui));

    $("#f-day").innerHTML = DAY_ORDER.map(d => chip("days", d, L.days[d], state.days.has(d))).join("");
    $("#f-period").innerHTML = PERIODS.map(p => chip("periods", p, L[p], state.periods.has(p))).join("");
    $("#f-lang").innerHTML = LANG_KEYS.map(l => chip("langs", l, L.langs[l], state.langs.has(l))).join("");
    $("#f-denom").innerHTML = Object.keys(DENOMS).map(d => chip("denoms", d, L.denoms[d], state.denoms.has(d), DENOMS[d].color)).join("");
    $("#f-place").innerHTML = `<option value="">${esc(L.allPlaces)}</option>` +
      PLACES.map(p => `<option value="${p}"${state.place === p ? " selected" : ""}>${esc(L.places[p])}</option>`).join("");

    $("#disclaimer").textContent = L.disclaimer(new Date(window.LAST_CHECKED).toLocaleDateString(state.ui === "en" ? "en-GB" : "nl-NL", { day: "numeric", month: "long", year: "numeric" }));
  }

  function serviceRow(c, s) {
    const L = t();
    const cls = serviceFiltersActive() ? (serviceMatches(c, s) ? "match" : "dim") : "";
    const type = MAIN_TYPES.includes(s.type) ? "" : ` · ${L.types[s.type]}`;
    return `<li class="${cls}"><span>${L.days[s.day]}</span><span class="t">${s.time || "?"}</span>` +
      `<span class="l">${esc(langList(s.langs))}${esc(type)}${s.time ? "" : ` · ${esc(L.timeUnknown)}`}</span></li>`;
  }

  function card(c) {
    const L = t();
    const color = DENOMS[c.denomination].color;
    const services = c.services.slice().sort(sortServices).map(s => serviceRow(c, s)).join("");
    const links = [];
    if (c.phone) links.push(`<a href="tel:${c.phone.replace(/[^+\d]/g, "")}">${esc(c.phone)}</a>`);
    if (c.website) links.push(`<a href="${esc(c.website)}" target="_blank" rel="noopener">${L.website}</a>`);
    if (c.facebook) links.push(`<a href="${esc(c.facebook)}" target="_blank" rel="noopener">${L.facebook}</a>`);
    if (c.email) links.push(`<a href="mailto:${esc(c.email)}">${esc(c.email)}</a>`);
    links.push(`<a href="https://www.openstreetmap.org/?mlat=${c.lat}&mlon=${c.lng}#map=17/${c.lat}/${c.lng}" target="_blank" rel="noopener">${L.route}</a>`);
    links.push(`<button type="button" data-show-map="${c.id}">${L.showOnMap}</button>`);
    const translation = c.translation && c.translation.length
      ? `<span class="tag">${esc(L.translationOnRequest)}: ${esc(langList(c.translation))}</span>` : "";
    const note = noteText(c.note);

    return `<article class="card" style="--denom:${color}">
      <h3>${esc(c.name)}</h3>
      <div class="meta">
        <span class="tag denom">${esc(L.denoms[c.denomination])}</span>
        <span class="tag">${esc(L.places[c.place])}</span>
        ${translation}
      </div>
      <p class="address">${esc(c.address)}</p>
      <ul class="services" aria-label="${esc(L.services)}">${services}</ul>
      ${note ? `<p class="note">${esc(note)}</p>` : ""}
      <div class="links">${links.join("")}</div>
      <details class="sources"><summary>${L.sources}</summary>
        ${(c.sources || []).map(u => `<div><a href="${esc(u)}" target="_blank" rel="noopener">${esc(u)}</a></div>`).join("")}
      </details>
    </article>`;
  }

  function renderList(list) {
    $("#view-list").innerHTML = list.length
      ? `<div class="cards">${list.map(card).join("")}</div>`
      : `<div class="empty">${esc(t().noResults)}</div>`;
  }

  function renderSchedule(list) {
    const L = t();
    const rows = [];
    list.forEach(c => c.services.forEach(s => {
      const ok = serviceFiltersActive() ? serviceMatches(c, s) : (state.other || MAIN_TYPES.includes(s.type));
      if (ok) rows.push({ c, s });
    }));
    if (!rows.length) {
      $("#view-schedule").innerHTML = `<div class="empty">${esc(L.noResults)}</div>`;
      return;
    }
    rows.sort((a, b) => sortServices(a.s, b.s) || a.c.name.localeCompare(b.c.name));
    $("#view-schedule").innerHTML = DAY_ORDER.map(d => {
      const dayRows = rows.filter(r => r.s.day === d);
      if (!dayRows.length) return "";
      return `<section class="day-block"><h3>${L.days[d]}</h3><table><tbody>${dayRows.map(({ c, s }) => {
        const type = MAIN_TYPES.includes(s.type) ? "" : ` · ${L.types[s.type]}`;
        return `<tr><td class="t">${s.time || "?"}</td>
          <td><span class="dot" style="background:${DENOMS[c.denomination].color}"></span><strong>${esc(c.name)}</strong>
          <div class="muted small">${esc(L.places[c.place])} · ${esc(langList(s.langs))}${esc(type)}</div></td></tr>`;
      }).join("")}</tbody></table></section>`;
    }).join("");
  }

  function popupHtml(c) {
    const L = t();
    const lines = c.services.filter(s => state.other || MAIN_TYPES.includes(s.type)).sort(sortServices)
      .map(s => `${L.daysShort[s.day]} ${s.time || "?"} · ${esc(langList(s.langs))}`).join("<br>");
    const links = [];
    if (c.website) links.push(`<a href="${esc(c.website)}" target="_blank" rel="noopener">${L.website}</a>`);
    else if (c.facebook) links.push(`<a href="${esc(c.facebook)}" target="_blank" rel="noopener">${L.facebook}</a>`);
    const linksHtml = links.length ? `<div style="margin-top:6px">${links.join(" · ")}</div>` : "";
    return `<h4>${esc(c.name)}</h4><div>${esc(L.denoms[c.denomination])} · ${esc(L.places[c.place])}</div>
      <div class="muted">${esc(c.address)}</div><div style="margin-top:6px">${lines}</div>${linksHtml}`;
  }

  function renderMap(list) {
    if (!window.L) return;
    if (!map) {
      map = window.L.map("map", { scrollWheelZoom: false }).setView([12.19, -68.29], 11);
      window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);
      markerLayer = window.L.layerGroup().addTo(map);
    }
    markerLayer.clearLayers();
    list.forEach(c => {
      const m = window.L.circleMarker([c.lat, c.lng], {
        radius: 9, color: "#fff", weight: 2, fillColor: DENOMS[c.denomination].color, fillOpacity: .95
      }).bindPopup(popupHtml(c));
      markers[c.id] = m;
      markerLayer.addLayer(m);
    });
    if (list.length) {
      map.invalidateSize();
      map.fitBounds(window.L.latLngBounds(list.map(c => [c.lat, c.lng])), { padding: [40, 40], maxZoom: 15 });
    }
  }

  function setView(view) {
    state.view = view;
    savePref("view", view);
    document.querySelectorAll(".tabs button").forEach(b => b.setAttribute("aria-selected", b.dataset.view === view));
    ["list", "schedule", "map"].forEach(v => { $("#view-" + v).hidden = v !== view; });
    render();
  }

  function render() {
    const list = CHURCHES.filter(churchMatches).sort((a, b) => a.name.localeCompare(b.name));
    $("#count").textContent = t().results(list.length);
    if (state.view === "list") renderList(list);
    else if (state.view === "schedule") renderSchedule(list);
    else renderMap(list);
  }

  // ---------- events ----------

  document.addEventListener("click", e => {
    const chipEl = e.target.closest(".chip");
    if (chipEl) {
      const set = state[chipEl.dataset.group];
      let v = chipEl.dataset.value;
      if (chipEl.dataset.group === "days") v = Number(v);
      set.has(v) ? set.delete(v) : set.add(v);
      chipEl.setAttribute("aria-pressed", set.has(v));
      render();
      return;
    }
    const langBtn = e.target.closest("[data-lang]");
    if (langBtn) {
      state.ui = langBtn.dataset.lang;
      savePref("lang", state.ui);
      renderStatic();
      render();
      return;
    }
    const tab = e.target.closest("[data-view]");
    if (tab) { setView(tab.dataset.view); return; }

    const showMap = e.target.closest("[data-show-map]");
    if (showMap) {
      const id = showMap.dataset.showMap;
      setView("map");
      const c = CHURCHES.find(x => x.id === id);
      if (c && markers[id]) { map.setView([c.lat, c.lng], 16); markers[id].openPopup(); }
      $("#view-map").scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  $("#q").addEventListener("input", e => { state.q = e.target.value.trim(); render(); });
  $("#f-place").addEventListener("change", e => { state.place = e.target.value; render(); });
  $("#f-translation").addEventListener("change", e => { state.translation = e.target.checked; render(); });
  $("#f-other").addEventListener("change", e => { state.other = e.target.checked; render(); });
  $("#reset").addEventListener("click", () => {
    ["days", "periods", "langs", "denoms"].forEach(k => state[k].clear());
    state.q = ""; state.place = ""; state.translation = false; state.other = false;
    $("#q").value = ""; $("#f-translation").checked = false; $("#f-other").checked = false;
    renderStatic();
    render();
  });

  // Filters standaard ingeklapt op smalle schermen; op brede schermen altijd open
  const narrow = window.matchMedia("(max-width: 860px)");
  if (narrow.matches) $("#filters-details").open = false;
  $("#filters-details summary").addEventListener("click", e => { if (!narrow.matches) e.preventDefault(); });

  if (!["list", "schedule", "map"].includes(state.view)) state.view = "list";
  if (!window.I18N[state.ui]) state.ui = "nl";
  renderStatic();
  setView(state.view);
})();
