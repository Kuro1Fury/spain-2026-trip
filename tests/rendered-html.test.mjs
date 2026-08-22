import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
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
  assert.match(html, /CA1566/);
  assert.match(html, /NH Barcelona Eixample/);
  assert.match(html, /Faborit Casa Amatller/);
  assert.match(html, /Palco Central P7/);
  assert.match(html, /Guernica/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/);
  await access(new URL("_next/static/", root));
  await assert.rejects(access(new URL("spain-2026-trip/_next/", root)));
});

test("public build contains all quick links but no identity data", async () => {
  const output = (await readTree(root)).join("\n");
  assert.match(output, /drive\.google\.com/);
  assert.match(output, /1jyywswvqEm0LfKqn7EufmUVsMDZE0G5y/);
  assert.match(output, /10DXUPjXP4_xF7f-HbUhxmgaZGlPucI1E/);
  assert.match(output, /12ka8nWZ1WYeseKwx0Ay4JXGjOFhCU0ty/);
  assert.doesNotMatch(output, /notion\.so|app\.notion\.com/i);
  assert.doesNotMatch(output, /Zihe Ji|Allan Ji/i);
});
