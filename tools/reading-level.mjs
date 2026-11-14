#!/usr/bin/env node
// Reading-level check for the guides. No dependencies — needs only Node.
//
// Usage:
//   node tools/reading-level.mjs                 (checks the whole guides folder)
//   node tools/reading-level.mjs guides/2-guests (one lane)
//   node tools/reading-level.mjs guides --max 7  (stricter limit)
//
// It scores the guide text of each note with the Flesch–Kincaid grade
// (roughly the US school grade needed to read it). It skips the frontmatter,
// code blocks, tables and the "Video scripts" section, and it skips files whose
// name starts with "_" (template, inventory, glossary…) and README.md.
// Exits with code 1 if any note is above the limit (default: grade 8).

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, basename } from "node:path";

const args = process.argv.slice(2);
let max = 8;
const targets = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--max") max = Number(args[++i]);
  else targets.push(args[i]);
}
if (targets.length === 0) targets.push("guides");

function walk(path, out) {
  const s = statSync(path);
  if (s.isDirectory()) {
    for (const name of readdirSync(path)) {
      if (name.startsWith(".")) continue;
      walk(join(path, name), out);
    }
  } else if (path.endsWith(".md")) {
    const name = basename(path);
    if (!name.startsWith("_") && name !== "README.md") out.push(path);
  }
  return out;
}

function guideText(md) {
  let t = md.replace(/\r\n/g, "\n");
  t = t.replace(/^---\n[\s\S]*?\n---\n/, "");          // frontmatter
  t = t.replace(/^## Video scripts[\s\S]*$/m, "");      // video scripts section
  t = t.replace(/```[\s\S]*?```/g, " ");                // code blocks
  t = t
    .split("\n")
    .filter((line) => !line.trim().startsWith("|"))     // tables
    .join("\n");
  t = t.replace(/\{ui:\s*([^}]*)\}/g, "$1");            // {ui: Add} -> Add
  t = t.replace(/\[\[([^\]|]*)(\|([^\]]*))?\]\]/g, (_, a, __, b) => b || a);
  t = t.replace(/\[([^\]]*)\]\([^)]*\)/g, "$1");        // markdown links
  t = t.replace(/[*_`>#]/g, "");
  return t;
}

function syllables(word) {
  let w = word.toLowerCase().replace(/[^a-z]/g, "");
  if (!w) return 0;
  if (w.length <= 3) return 1;
  w = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "").replace(/^y/, "");
  const groups = w.match(/[aeiouy]{1,2}/g);
  return Math.max(1, groups ? groups.length : 1);
}

function score(text) {
  // Each line (list item, heading) counts as ending a sentence, as do . ! ?
  const sentences = text
    .split(/[.!?]+|\n+/)
    .map((s) => s.trim())
    .filter((s) => /[A-Za-z]/.test(s));
  const words = text.match(/[A-Za-z][A-Za-z'’-]*/g) || [];
  if (words.length === 0 || sentences.length === 0) return null;
  const syl = words.reduce((n, w) => n + syllables(w), 0);
  const grade =
    0.39 * (words.length / sentences.length) + 11.8 * (syl / words.length) - 15.59;
  return { grade, words: words.length };
}

const files = targets.flatMap((t) => walk(t, []));
if (files.length === 0) {
  console.log("No guide notes found yet.");
  process.exit(0);
}

let failed = 0;
const rows = [];
for (const file of files) {
  const result = score(guideText(readFileSync(file, "utf8")));
  const name = relative(process.cwd(), file);
  if (!result || result.words < 30) {
    rows.push(["  -  ", "too short to score", name]);
    continue;
  }
  const g = result.grade.toFixed(1);
  const ok = result.grade <= max;
  if (!ok) failed++;
  rows.push([ok ? `  ${g}` : `✗ ${g}`, `${result.words} words`, name]);
}

console.log(`Reading level (Flesch–Kincaid grade, limit ${max})\n`);
for (const [g, w, n] of rows) console.log(`${g.padEnd(7)} ${w.padEnd(20)} ${n}`);
console.log(
  failed
    ? `\n${failed} note(s) above grade ${max}. Shorten sentences and use simpler words.`
    : `\nAll notes are grade ${max} or lower.`
);
process.exit(failed ? 1 : 0);
