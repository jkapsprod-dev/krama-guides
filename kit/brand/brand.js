/* eslint-disable */
// Krama guide videos: shared brand helpers. Copied and trimmed from the launch film's
// shared/kit.js (app\promo\launch-60s), so the guides use the same mark, wordmark and gold thread.
// Loaded by every composition the kit builds, before any scene runs.
//
// Deterministic by design: no Math.random(), no Date, no network.
(function () {
  "use strict";

  var doc = document;
  var html = doc.documentElement;
  var SVG_NS = "http://www.w3.org/2000/svg";

  // Variables: defaults declared on <html data-composition-variables>, overridden at render time.
  var cached = null;
  function vars() {
    if (cached) return cached;
    var out = {};
    try {
      JSON.parse(html.getAttribute("data-composition-variables") || "[]").forEach(function (d) {
        out[d.id] = d.default;
      });
    } catch (e) {}
    var over = window.__hfVariables || {};
    Object.keys(over).forEach(function (k) {
      out[k] = over[k];
    });
    cached = out;
    return out;
  }

  function portrait() {
    return html.getAttribute("data-resolution") === "portrait";
  }

  function applyAttrs(el, attrs) {
    if (!attrs) return;
    Object.keys(attrs).forEach(function (k) {
      var v = attrs[k];
      if (v === undefined || v === null || v === false) return;
      if (k === "text") el.textContent = v;
      else el.setAttribute(k, v);
    });
  }
  function h(tag, attrs, kids) {
    var el = doc.createElement(tag);
    applyAttrs(el, attrs);
    (kids || []).forEach(function (k) {
      el.appendChild(typeof k === "string" ? doc.createTextNode(k) : k);
    });
    return el;
  }
  function s(tag, attrs) {
    var el = doc.createElementNS(SVG_NS, tag);
    applyAttrs(el, attrs);
    return el;
  }

  // Words as spans, so a line can come in word by word. "*gold words*" are set in gold italic.
  function words(el, text) {
    el.textContent = "";
    var out = [];
    String(text || "")
      .split(/(\*[^*]+\*)/)
      .forEach(function (seg) {
        if (!seg) return;
        var em = seg.charAt(0) === "*" && seg.charAt(seg.length - 1) === "*";
        seg
          .replace(/^\*|\*$/g, "")
          .split(/\s+/)
          .filter(Boolean)
          .forEach(function (w) {
            if (out.length) el.appendChild(doc.createTextNode(" "));
            var span = h("span", { class: "k-w" + (em ? " k-w-em" : ""), text: w });
            el.appendChild(span);
            out.push(span);
          });
      });
    return out;
  }

  // The website's placeholder mark: a circle with two petals. Swap it when the real logo arrives.
  function mark() {
    var svg = s("svg", { class: "k-mark", viewBox: "0 0 32 32", fill: "none", "aria-hidden": "true" });
    svg.appendChild(s("circle", { class: "k-mark-stroke", cx: 16, cy: 16, r: 15, pathLength: "1" }));
    svg.appendChild(
      s("path", { class: "k-mark-stroke", d: "M16 5 C 20 11, 20 21, 16 27 C 12 21, 12 11, 16 5 Z", pathLength: "1" }),
    );
    svg.appendChild(
      s("path", { class: "k-mark-stroke", d: "M5 16 C 11 12, 21 12, 27 16 C 21 20, 11 20, 5 16 Z", pathLength: "1" }),
    );
    return svg;
  }
  function lockup(container, name) {
    container.textContent = "";
    var m = mark();
    var word = h("span", { class: "k-wordmark", text: name || vars().brandName || "Krama Events" });
    container.appendChild(m);
    container.appendChild(word);
    return { mark: m, word: word, strokes: m.querySelectorAll(".k-mark-stroke") };
  }

  // The gold thread: a glow, a line and a travelling glint on one gentle curve from x0 to x1.
  // sag bends it a little (0 = straight), so it reads as thread and not as a rule.
  function thread(svg, x0, x1, y, sag) {
    sag = sag || 0;
    var mid = (x0 + x1) / 2;
    var d =
      "M" + x0 + " " + y + " C" + (x0 + (mid - x0) * 0.6) + " " + (y + sag) + " " +
      (x1 - (x1 - mid) * 0.6) + " " + (y - sag) + " " + x1 + " " + y;
    var glow = s("path", { class: "k-thread-glow", d: d, pathLength: "1" });
    var line = s("path", { class: "k-thread-line", d: d, pathLength: "1" });
    var glint = s("path", { class: "k-thread-glint", d: d, pathLength: "1" });
    [glow, line].forEach(function (p) {
      p.style.strokeDasharray = "1";
      p.style.strokeDashoffset = "1";
    });
    svg.appendChild(glow);
    svg.appendChild(line);
    svg.appendChild(glint);
    return {
      drawn: [glow, line],
      glint: glint,
      draw: function (tl, at, dur, ease) {
        tl.fromTo([glow, line], { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: dur, ease: ease || "power2.inOut" }, at);
      },
      sweep: function (tl, at, dur) {
        tl.set(glint, { opacity: 1 }, at);
        tl.fromTo(glint, { strokeDashoffset: 0.09 }, { strokeDashoffset: -1.02, duration: dur, ease: "power1.inOut", immediateRender: false }, at);
        tl.set(glint, { opacity: 0 }, at + dur);
      },
    };
  }

  // Film grain: a new tile offset on every frame, as a pure function of the playhead.
  function grain(tl, el, duration, fps) {
    var clock = { t: 0 };
    tl.to(
      clock,
      {
        t: duration,
        duration: duration,
        ease: "none",
        onUpdate: function () {
          var f = Math.floor(clock.t * (fps || 30) + 0.001);
          el.style.backgroundPosition = ((f * 173) % 256) + "px " + ((f * 89) % 256) + "px";
        },
      },
      0,
    );
  }

  window.KramaBrand = { vars: vars, portrait: portrait, h: h, s: s, words: words, mark: mark, lockup: lockup, thread: thread, grain: grain };
})();
