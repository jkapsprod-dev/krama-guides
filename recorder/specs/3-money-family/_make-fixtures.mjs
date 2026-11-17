// Makes the made-up files the lane 3 videos upload (receipt, bill, photos, PDFs, a spreadsheet) into
// _fixtures\. Nothing here is real: invented names, numbers and pictures.
//   node recorder\specs\3-money-family\_make-fixtures.mjs
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const here = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(here, "_fixtures");
fs.mkdirSync(out, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 800 } });

async function jpeg(name, html, w = 1200, h = 800) {
  await page.setViewportSize({ width: w, height: h });
  await page.setContent(`<body style="margin:0">${html}</body>`);
  await page.screenshot({ path: path.join(out, name), type: "jpeg", quality: 88 });
}

// Three made-up "photos": soft colour with flowers (circles), so they look like decor shots.
const scenes = [
  ["mehndi-1.jpg", "#d9a441", "#7a1f3d", "Mehndi night"],
  ["mehndi-2.jpg", "#3f7d4e", "#e9c46a", "Mehndi hands"],
  ["mehndi-3.jpg", "#c1440e", "#f4d9a6", "Mehndi lawn"],
  ["sangeet-1.jpg", "#5a3d8a", "#f2b5d4", "Sangeet stage"],
  ["sangeet-2.jpg", "#1d5c63", "#f7d794", "Sangeet dance"],
  ["sangeet-3.jpg", "#8c2f39", "#f9dcc4", "Sangeet cousins"],
];
for (const [name, a, b, label] of scenes) {
  const dots = Array.from({ length: 26 }, (_, i) => {
    const x = (i * 197) % 1200, y = (i * 131) % 800, r = 30 + ((i * 37) % 80);
    return `<circle cx="${x}" cy="${y}" r="${r}" fill="${i % 2 ? b : "#ffffff"}" fill-opacity="0.${3 + (i % 5)}"/>`;
  }).join("");
  await jpeg(
    name,
    `<div style="width:1200px;height:800px;background:linear-gradient(135deg,${a},${b});position:relative;font-family:Georgia,serif">
      <svg width="1200" height="800" style="position:absolute;inset:0">${dots}</svg>
      <div style="position:absolute;left:50px;bottom:50px;color:#fff;font-size:54px;text-shadow:0 2px 8px #0008">${label}</div></div>`,
  );
}

// A made-up receipt (a phone photo of a small slip).
await jpeg(
  "receipt.jpg",
  `<div style="width:600px;height:800px;background:#fff;font:28px 'Courier New',monospace;padding:40px;box-sizing:border-box;color:#111">
    <div style="text-align:center;font-weight:bold;font-size:34px">PANDIT JI PUJA SEVA</div>
    <div style="text-align:center">Receipt 0231</div><hr>
    <div>Advance for puja</div><div>Date: 12 Nov 2026</div>
    <div style="margin-top:40px;font-size:40px">Rs. 10,000</div>
    <div style="margin-top:40px">Received with thanks</div></div>`,
  600,
  800,
);

// A made-up printed bill for Snap a bill: big, black on white, so the reader can see it.
await jpeg(
  "bill.jpg",
  `<div style="width:1000px;height:1300px;background:#fff;font:44px Arial,sans-serif;padding:70px;box-sizing:border-box;color:#000">
    <div style="font-weight:bold;font-size:68px">SHREE CATERERS</div>
    <div>Ahmedabad</div>
    <div>GSTIN: 24ABCDE1234F1Z6</div>
    <div style="margin-top:30px">Bill No: 1042</div>
    <div>Date: 10/11/2026</div>
    <hr style="border:2px solid #000;margin:30px 0">
    <div>Wedding lunch 200 plates ..... 40,000</div>
    <div>Tea and snacks ................ 5,000</div>
    <hr style="border:2px solid #000;margin:30px 0">
    <div style="font-weight:bold;font-size:60px">Total  Rs. 45,000</div></div>`,
  1000,
  1300,
);

// PDFs: a made-up quote and a made-up caterer quote.
async function pdf(name, html) {
  await page.setContent(`<body style="font:20px Arial,sans-serif;padding:40px">${html}</body>`);
  await page.pdf({ path: path.join(out, name), format: "A4" });
}
await pdf(
  "Rangoli Decor quote.pdf",
  `<h1>Rangoli Decor</h1><p>Quote for the Sharma-Patel wedding</p><p>Mandap and stage decor: Rs. 4,50,000</p><p>Valid for 30 days. This is made-up demo data.</p>`,
);
await pdf(
  "Caterer quote.pdf",
  `<h1>Annapurna Caterers</h1><p>Quote for the Sharma-Patel wedding</p><p>Food for five functions: Rs. 9,00,000</p><p>Rate per plate: Rs. 750. This is made-up demo data.</p>`,
);
await browser.close();

// A tiny spreadsheet: Haldi seating list.xlsx (a minimal workbook, written with Python's zipfile).
const py = `
import zipfile, sys
rows = [["Table","Family","Seats"],["1","Mehta family","8"],["2","Sharma family","10"],["3","Patel family","6"]]
def cell(r, c, v):
    return f'<c r="{"ABC"[c]}{r+1}" t="inlineStr"><is><t>{v}</t></is></c>'
sheet = "".join(f'<row r="{r+1}">' + "".join(cell(r, c, v) for c, v in enumerate(row)) + "</row>" for r, row in enumerate(rows))
files = {
 "[Content_Types].xml": '<?xml version="1.0" encoding="UTF-8"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/></Types>',
 "_rels/.rels": '<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>',
 "xl/workbook.xml": '<?xml version="1.0" encoding="UTF-8"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="Seating" sheetId="1" r:id="rId1"/></sheets></workbook>',
 "xl/_rels/workbook.xml.rels": '<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/></Relationships>',
 "xl/worksheets/sheet1.xml": '<?xml version="1.0" encoding="UTF-8"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData>' + sheet + '</sheetData></worksheet>',
}
with zipfile.ZipFile(sys.argv[1], "w", zipfile.ZIP_DEFLATED) as z:
    for k, v in files.items(): z.writestr(k, v)
`;
execFileSync("python", ["-c", py, path.join(out, "Haldi seating list.xlsx")]);
console.log("Fixtures in", out, "\n", fs.readdirSync(out).join("\n "));
