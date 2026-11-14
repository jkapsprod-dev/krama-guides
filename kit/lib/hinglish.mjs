// Hinglish (Roman letters) to Devanagari, for the Hindi Piper voices, which read Devanagari
// well and Roman letters badly. Words come from voice/hinglish-words.json first; anything else is
// spelled by simple rules and reported, so a person can add it to the word list.
import fs from "node:fs";
import path from "node:path";
import { KIT } from "./common.mjs";

const LEX_FILE = path.join(KIT, "voice", "hinglish-words.json");

function lexicon() {
  const j = JSON.parse(fs.readFileSync(LEX_FILE, "utf8"));
  return { words: j.words || {}, lines: j.lines || {} };
}

const CONS = [
  ["chh", "छ"], ["kh", "ख"], ["gh", "घ"], ["ch", "च"], ["jh", "झ"], ["th", "थ"], ["dh", "ध"],
  ["ph", "फ"], ["bh", "भ"], ["sh", "श"], ["k", "क"], ["g", "ग"], ["j", "ज"], ["t", "त"], ["d", "द"],
  ["n", "न"], ["p", "प"], ["b", "ब"], ["m", "म"], ["y", "य"], ["r", "र"], ["l", "ल"], ["v", "व"],
  ["w", "व"], ["s", "स"], ["h", "ह"], ["f", "फ़"], ["z", "ज़"], ["q", "क़"], ["x", "क्स"], ["c", "क"],
];
const VOWELS = [
  ["aa", "आ", "ा"], ["ai", "ऐ", "ै"], ["au", "औ", "ौ"], ["ee", "ई", "ी"], ["ei", "ए", "े"], ["ii", "ई", "ी"],
  ["oo", "ऊ", "ू"], ["ou", "औ", "ौ"], ["a", "अ", ""], ["e", "ए", "े"], ["i", "इ", "ि"], ["o", "ओ", "ो"], ["u", "उ", "ु"],
];
const LETTERS = {
  a: "ए", b: "बी", c: "सी", d: "डी", e: "ई", f: "एफ़", g: "जी", h: "एच", i: "आई", j: "जे", k: "के", l: "एल", m: "एम",
  n: "एन", o: "ओ", p: "पी", q: "क्यू", r: "आर", s: "एस", t: "टी", u: "यू", v: "वी", w: "डब्ल्यू", x: "एक्स", y: "वाई", z: "ज़ेड",
};
const LONG = new Set(["aa", "ai", "au", "ee", "ei", "ii", "oo", "ou", "e", "o"]);

function tokens(word) {
  const out = [];
  let i = 0;
  while (i < word.length) {
    const v = VOWELS.find(([r]) => word.startsWith(r, i));
    if (v) {
      out.push({ kind: "v", r: v[0], ind: v[1], mat: v[2] });
      i += v[0].length;
      continue;
    }
    const c = CONS.find(([r]) => word.startsWith(r, i));
    if (c) {
      out.push({ kind: "c", r: c[0], d: c[1] });
      i += c[0].length;
      continue;
    }
    i += 1; // anything else is dropped
  }
  return out;
}

/** Rule spelling for a word that is not in the list. Good enough to be understood; not perfect. */
export function spell(word) {
  const t = tokens(word);
  let out = "";
  for (let i = 0; i < t.length; i++) {
    const a = t[i];
    const prev = t[i - 1];
    const next = t[i + 1];
    if (a.kind === "v") {
      // Hinglish writes a final long vowel short: "kaisa" is कैसा, "jaldi" is जल्दी.
      let mat = a.mat;
      if (!next && prev?.kind === "c" && a.r === "a") mat = "ा";
      if (!next && prev?.kind === "c" && a.r === "i") mat = "ी";
      out += !prev || prev.kind === "v" ? a.ind : mat;
      continue;
    }
    // A nasal after a vowel: before another consonant, or at the end after a long vowel.
    if ((a.r === "n" || a.r === "m") && prev?.kind === "v") {
      if (next?.kind === "c" && a.r === "n") {
        out += "ं";
        continue;
      }
      if (!next && a.r === "n" && LONG.has(prev.r)) {
        out += "ं";
        continue;
      }
    }
    out += a.d;
    if (next?.kind === "c") out += "्";
  }
  return out;
}

/**
 * One line to Devanagari. Returns { text, unknown: [words spelled by rule] }.
 * App labels and English words read best when the word list has them.
 */
export function toDevanagari(line) {
  const lex = lexicon();
  if (lex.lines[line]) return { text: lex.lines[line], unknown: [] };
  const unknown = [];
  const text = line
    .replace(/[“”"]/g, "")
    .split(/(\s+|[.,?!:;()]+)/)
    .map((part) => {
      if (!part || /^\s+$/.test(part)) return part;
      if (/^[.,?!:;()]+$/.test(part)) return part.replace(/\./g, "।").replace(/[()]/g, "").replace(/[!]/g, "।");
      if (/[ऀ-ॿ]/.test(part)) return part;
      if (/^\d[\d,]*$/.test(part)) return part;
      const parts = part.split(/(['’-])/).filter((p) => p && !/^['’-]$/.test(p));
      return parts
        .map((w) => {
          const key = w.toLowerCase();
          if (lex.words[key]) return lex.words[key];
          if (/^[A-Z]{2,5}s?$/.test(w)) return [...w.replace(/s$/, "").toLowerCase()].map((ch) => LETTERS[ch] || "").join("") + (w.endsWith("s") ? "स" : "");
          unknown.push(key);
          return spell(key);
        })
        .join(" ");
    })
    .join("");
  return { text: text.replace(/\s+/g, " ").trim(), unknown };
}
