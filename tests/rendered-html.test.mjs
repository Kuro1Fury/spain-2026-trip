import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";

const root = new URL("../dist/client/", import.meta.url);

async function readTree(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const contents = [];
  for (const entry of entries) {
    const url = new URL(entry.name + (entry.isDirectory() ? "/" : ""), directory);
    if (entry.isDirectory()) contents.push(...(await readTree(url)));
    else if (/\.(?:html|js|css|json|rsc|txt)$/i.test(entry.name)) contents.push(await readFile(url, "utf8"));
  }
  return contents;
}

test("renders the finished itinerary", async () => {
  const html = await readFile(new URL("index.html", root), "utf8");
  assert.match(html, /España 2026/);
  assert.match(html, /西班牙国庆行程/);
  assert.match(html, /巴塞罗那/);
  assert.match(html, /马德里/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/);
});

test("public build contains no private ticket URLs or identity data", async () => {
  const output = (await readTree(root)).join("\n");
  assert.doesNotMatch(output, /drive\.google\.com/i);
  assert.doesNotMatch(output, /notion\.so|app\.notion\.com/i);
  assert.doesNotMatch(output, /(?:passport|身份证|护照号|booking reference|PNR)/i);
});
