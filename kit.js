/* ממלא את הדף ואת גרסת ה-PDF מתוך data.js. כל הטקסט נכנס כטקסט (textContent), לא כקוד. */
(() => {
  const K = window.KIT;
  if (!K) return;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const get = path => path.split(".").reduce((o, k) => (o == null ? o : o[k]), K);
  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };
  const latin = s => /^[A-Za-z0-9 @.,%+_-]+$/.test(s);
  const textNode = s => (latin(s) ? el("span", "ltr", s) : document.createTextNode(s));
  const has = v => v != null && String(v).trim() !== "";

  // שדות פשוטים
  $$("[data-k]").forEach(n => {
    const v = n.dataset.k === "hero" ? K.hero && K.hero.value : get(n.dataset.k);
    if (has(v)) n.textContent = v;
    else n.closest(".note, .fit, .updated, .p-sec span") ? n.remove() : (n.textContent = "");
  });

  // שורת נתונים - רק מה שקיים
  const stats = (K.stats || []).filter(s => has(s.value));
  const sBox = $("[data-stats]"), pBox = $("[data-pstats]");
  [sBox, pBox].forEach(b => b && b.style.setProperty("--n", stats.length));
  if (sBox) sBox.setAttribute("style", `--n: ${stats.length}`);
  stats.forEach(s => {
    const d = el("div", "stat");
    const b = el("b", "ltr", s.value);
    d.append(b, el("span", null, s.label));
    sBox && sBox.append(d);
    const p = el("div");
    p.append(el("b", "ltr", s.value), el("span", null, s.label));
    pBox && pBox.append(p);
  });
  if (!stats.length) { sBox && sBox.remove(); pBox && pBox.remove(); }

  // רילסים
  const reels = (K.reels || []).filter(r => has(r.title) && has(r.views));
  const rBox = $("[data-reels]"), prBox = $("[data-preels]");
  reels.forEach(r => {
    const card = has(r.url) ? el("a", "reel") : el("div", "reel");
    if (has(r.url)) {
      card.href = r.url; card.target = "_blank"; card.rel = "noopener";
      card.setAttribute("aria-label", `צפייה בריל באינסטגרם: ${r.title}, ${r.views} צפיות. נפתח בלשונית חדשה`);
    }
    const thumb = el("div", "thumb");
    thumb.append(textNode(r.title));
    if (has(r.cover)) {
      const img = el("img"); img.src = r.cover; img.alt = ""; img.loading = "lazy";
      img.onerror = () => img.remove();
      thumb.append(img);
    }
    const meta = el("p", "meta");
    meta.append(el("span", "ltr", r.views), document.createTextNode(" צפיות"));
    if (has(r.note)) meta.append(el("small", null, r.note));
    card.append(thumb, meta);
    rBox && rBox.append(card);

    if (prBox) {
      const f = el("figure");
      if (has(r.cover)) { const i = el("img"); i.src = r.cover; i.alt = ""; f.append(i); }
      const c = el("figcaption");
      const vb = el("b"); vb.append(el("span", "ltr", r.views), document.createTextNode(" צפיות"));
      c.append(vb, document.createTextNode(r.note || ""));
      f.append(c); prBox.append(f);
    }
  });

  // קהל
  const A = K.audience || {};
  const g = $("[data-gender]");
  if (g && A.gender && A.gender.length) {
    const top = A.gender[0];
    g.append(el("h3", null, "מגדר"));
    const b = el("b"); b.append(el("span", "ltr", top.pct + "%"), document.createTextNode(" " + top.label));
    g.append(b);
    const bar = el("div", "bar");
    bar.setAttribute("role", "img");
    bar.setAttribute("aria-label", A.gender.map(x => `${x.pct} אחוז ${x.label}`).join(", "));
    A.gender.forEach(x => { const i = el("i"); i.style.width = x.pct + "%"; i.style.background = x.color; bar.append(i); });
    const leg = el("ul", "legend");
    leg.setAttribute("aria-hidden", "true");
    A.gender.forEach(x => { const li = el("li", null, `${x.label} ${x.pct}%`); li.style.setProperty("--c", x.color); leg.append(li); });
    g.append(bar, leg);
  }
  const ages = $("[data-ages]");
  if (ages && A.ages) {
    const max = Math.max(...A.ages.map(a => a.pct));
    A.ages.forEach(a => {
      const li = el("li", a.top ? "top" : null);
      const tr = el("span", "track"); tr.setAttribute("aria-hidden", "true");
      const i = el("i"); i.style.width = Math.max(3, Math.round(a.pct / max * 100)) + "%"; tr.append(i);
      li.append(el("span", "ltr", a.range), tr, el("span", null, a.pct + "%"));
      ages.append(li);
    });
  }
  const cities = $("[data-cities]");
  if (cities && A.cities) cities.textContent = A.cities.join(" · ");
  const pa = $("[data-paud]");
  if (pa) {
    const items = [];
    if (A.gender && A.gender[0]) items.push([A.gender[0].pct + "%", A.gender[0].label]);
    const topAge = (A.ages || []).find(a => a.top);
    if (topAge) items.push([topAge.pct + "%", "בגילאי " + topAge.range]);
    if (has(A.ageSummary)) { const m = A.ageSummary.match(/^(\S+)\s+(.*)$/); if (m) items.push([m[1], m[2]]); }
    if (has(A.region)) items.push([A.region.split(" ")[0], A.region.split(" ").slice(1).join(" ")]);
    items.forEach(([big, small]) => { const li = el("li"); li.append(el("b", "ltr", big), el("span", null, small)); pa.append(li); });
  }

  // UGC - פחות מ-2 סרטונים = הסקשן לא מוצג
  const ugc = (K.ugc || []).filter(u => has(u.brand) && has(u.video));
  if (ugc.length < 2) {
    $$("[data-ugc-sec], [data-ugc-link], [data-pugc-wrap]").forEach(n => n.hidden = true);
  } else {
    const uBox = $("[data-ugc]"), puBox = $("[data-pugc]");
    ugc.forEach(u => {
      const card = el("div", "vid");
      const frame = el("div", "frame");
      const name = `${u.brand}, ${u.product}`;
      const btn = el("button", "play"); btn.type = "button"; btn.setAttribute("aria-label", "ניגון סרטון: " + name);
      const v = el("video"); v.preload = "none"; v.playsInline = true; v.setAttribute("playsinline", "");
      if (has(u.poster)) v.poster = u.poster;
      v.src = u.video;
      frame.append(btn, v);
      const h = el("h3"); h.append(textNode(u.brand));
      const p = el("p"); p.append(...u.product.split(/([A-Za-z][A-Za-z ]*[A-Za-z])/).filter(Boolean).map(textNode));
      card.append(frame, h, p);
      if (has(u.category)) card.append(el("span", "cat", u.category));
      uBox.append(card);

      const stop = () => { card.classList.remove("playing", "loading"); btn.setAttribute("aria-label", "ניגון סרטון: " + name); };
      const fail = () => {
        stop();
        if ($(".err", frame)) return;
        const e = el("p", "err", "הסרטון לא נטען. ");
        const again = el("button", null, "לנסות שוב"); again.type = "button";
        again.onclick = () => { e.remove(); v.load(); btn.click(); };
        e.append(again); frame.append(e);
      };
      btn.addEventListener("click", () => {
        if (v.paused) {
          $$(".vid video").forEach(o => { if (o !== v && !o.paused) o.pause(); });
          card.classList.add("loading");
          btn.setAttribute("aria-label", "עצירת סרטון: " + name);
          const pr = v.play();
          if (pr && pr.catch) pr.catch(err => { if (err && err.name !== "AbortError") fail(); });
        } else v.pause();
      });
      v.addEventListener("playing", () => { card.classList.remove("loading"); card.classList.add("playing"); });
      v.addEventListener("pause", stop);
      v.addEventListener("ended", stop);
      v.addEventListener("error", fail);
      v.addEventListener("click", () => btn.click());

      if (puBox) {
        const f = el("figure");
        if (has(u.poster)) { const i = el("img"); i.src = u.poster; i.alt = ""; f.append(i); }
        const c = el("figcaption"); const b = el("b"); b.append(textNode(u.brand));
        c.append(b, document.createTextNode(u.category || "")); f.append(c); puBox.append(f);
      }
    });
    const pk = $("[data-pkit]");
    if (pk) {
      if (has(K.kitUrl)) { pk.append(document.createTextNode("הסרטונים מתנגנים בקיט המלא: ")); const a = el("a", "ltr", K.kitUrl.replace(/^https?:\/\//, "")); a.href = K.kitUrl; pk.append(a); }
      else pk.remove();
    }
  }

  // יצירת קשר - המייל מורכב כאן
  const C = K.contact || {};
  const mail = has(C.mailUser) && has(C.mailDomain) ? `${C.mailUser}@${C.mailDomain}` : "";
  $$("[data-mail-link]").forEach(a => { if (mail) a.href = `mailto:${mail}?subject=${encodeURIComponent(C.mailSubject || "")}`; });
  $$("[data-mail-text]").forEach(n => { n.textContent = mail; n.classList.add("ltr"); });
  $$("[data-wa]").forEach(a => {
    if (has(C.whatsapp)) a.href = `https://wa.me/${C.whatsapp}?text=${encodeURIComponent(C.whatsappText || "")}`;
    else a.remove();
  });
  const copy = $("[data-copy]"), status = $("[data-copy-status]");
  if (copy) {
    if (!mail || !navigator.clipboard) copy.remove();
    else copy.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(mail);
        copy.textContent = "הועתק"; status.textContent = "כתובת המייל הועתקה";
        setTimeout(() => { copy.textContent = "העתקה"; status.textContent = ""; }, 2000);
      } catch (e) { copy.remove(); }
    });
  }
})();
