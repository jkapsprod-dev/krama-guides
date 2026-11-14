// The visible cursor, drawn inside the page so it is in the recording: an arrow on desktop, a soft
// fingertip dot on phone. It glides to each target (CSS transition) and shows a small ripple on a
// click. No other effects: the video kit adds highlights and zooms later from <ID>.json.
// Its position survives page loads (sessionStorage), so it never jumps back to the corner.

/** Runs in the page (Playwright addInitScript). Exposes window.__rec. */
function install({ kind }) {
  if (window.__rec) return;
  const KEY = "__rec_cursor_pos";
  // No position yet: start low on the right once the page knows its real size (on phone the
  // width is not final until the viewport tag is read).
  let pos = null;
  try {
    pos = JSON.parse(sessionStorage.getItem(KEY));
  } catch {}

  const style = document.createElement("style");
  style.textContent = `
    /* A fixed, clipped layer: the cursor can never widen the page or move its layout. */
    #__rec_layer { position: fixed; inset: 0; overflow: hidden; pointer-events: none;
      z-index: 2147483647; contain: strict; }
    #__rec_cursor, .__rec_ripple { position: absolute; left: 0; top: 0; pointer-events: none; }
    #__rec_cursor { will-change: transform; transition-property: transform;
      transition-timing-function: cubic-bezier(.45,.05,.25,1); }
    #__rec_cursor.finger > div { width: 34px; height: 34px; margin: -17px 0 0 -17px;
      border-radius: 50%; background: rgba(30,30,30,.28); border: 2px solid rgba(255,255,255,.95);
      box-shadow: 0 1px 6px rgba(0,0,0,.25); transition: transform 120ms ease; }
    #__rec_cursor.finger.down > div { transform: scale(.82); }
    #__rec_cursor.arrow svg { display: block; filter: drop-shadow(0 1px 2px rgba(0,0,0,.35));
      transition: transform 120ms ease; transform-origin: 3px 3px; }
    #__rec_cursor.arrow.down svg { transform: scale(.88); }
    .__rec_ripple { width: 44px; height: 44px; margin: -22px 0 0 -22px; border-radius: 50%;
      border: 3px solid rgba(255,255,255,.95); box-shadow: 0 0 0 2px rgba(0,0,0,.18);
      animation: __rec_ripple 520ms ease-out forwards; }
    @keyframes __rec_ripple { from { transform: scale(.35); opacity: .95 }
      to { transform: scale(1.35); opacity: 0 } }
  `;
  const layer = document.createElement("div");
  layer.id = "__rec_layer";
  const el = document.createElement("div");
  el.id = "__rec_cursor";
  layer.appendChild(el);
  el.className = kind === "phone" ? "finger" : "arrow";
  el.innerHTML =
    kind === "phone"
      ? "<div></div>"
      : `<svg width="26" height="30" viewBox="0 0 26 30"><path d="M3 2 L3 24 L9 18.5 L13 27.5 L17 25.7 L13 17 L21 17 Z"
           fill="#1b1b1b" stroke="#fff" stroke-width="2" stroke-linejoin="round"/></svg>`;

  const place = (x, y, ms) => {
    el.style.transitionDuration = `${ms}ms`;
    el.style.transform = `translate(${x}px, ${y}px)`;
    pos = { x, y };
    try {
      sessionStorage.setItem(KEY, JSON.stringify(pos));
    } catch {}
  };
  // React owns the document, so put the cursor back if a render ever removes it.
  const mount = () => {
    if (!style.isConnected) document.documentElement.appendChild(style);
    if (!layer.isConnected) document.documentElement.appendChild(layer);
    if (!pos) {
      const w = document.documentElement.clientWidth;
      const h = document.documentElement.clientHeight;
      place(Math.round(w * 0.62), Math.round(h * 0.72), 0);
    }
  };
  if (pos) place(pos.x, pos.y, 0);
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
  setInterval(mount, 250);

  window.__rec = {
    moveTo(x, y, ms) {
      mount();
      place(x, y, ms);
    },
    press(down) {
      el.classList.toggle("down", down);
    },
    ripple(x, y) {
      const r = document.createElement("div");
      r.className = "__rec_ripple";
      r.style.left = `${x}px`;
      r.style.top = `${y}px`;
      layer.appendChild(r);
      setTimeout(() => r.remove(), 600);
    },
    pos: () => pos ?? { x: 0, y: 0 },
  };
}

export const cursorInitScript = (kind) => ({ content: `(${install})(${JSON.stringify({ kind })});` });

/** CSS for screenshots: the guides' images show the app without the robot's cursor. */
export const HIDE_CURSOR_CSS = "#__rec_layer { display: none !important; }";
