import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";
import { extractSection } from "../lib/itinerary-sections.mjs";

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
  assert.match(html, /14 天总行程/);
  assert.match(html, /DAY <!-- -->01/);
  assert.match(html, /09\.26/);
  assert.match(html, /10\.09/);
  assert.match(html, /巴塞罗那/);
  assert.match(html, /马德里/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/);
  await access(new URL("_next/static/", root));
  await assert.rejects(access(new URL("spain-2026-trip/_next/", root)));
});

test("public build contains all quick links but no identity data", async () => {
  const output = (await readTree(root)).join("\n");
  assert.match(output, /完整攻略/);
  assert.match(output, /文档大纲/);
  assert.match(output, /打开攻略目录/);
  assert.match(output, /CA1566/);
  assert.match(output, /NH Barcelona Eixample/);
  assert.match(output, /Faborit Casa Amatller/);
  assert.match(output, /Palco Central P7/);
  assert.match(output, /Guernica/);
  assert.match(output, /Tibidabo/);
  assert.match(output, /Turó de la Rovira/);
  assert.match(output, /Las Setas/);
  assert.match(output, /Mezquita-Catedral[^]*10:00/);
  assert.match(output, /行前清单/);
  assert.match(output, /40 × 30 × 20cm/);
  assert.match(output, /相机（一个镜头）/);
  assert.match(output, /相机充电器/);
  assert.match(output, /棉拖/);
  assert.match(output, /个人用品/);
  assert.match(output, /随身双肩包/);
  assert.match(output, /双肩包防盗锁/);
  assert.match(output, /iPad 扩展坞/);
  assert.match(output, /SIM 卡与取卡针/);
  assert.match(output, /备用手机/);
  assert.doesNotMatch(output, /AirTag|数码配件收纳包|晕车药|创可贴/);
  assert.doesNotMatch(output, /折叠相机包|相机包不作为/);
  assert.match(output, /spain-2026-packing/);
  assert.match(output, /drive\.google\.com/);
  assert.match(output, /1jyywswvqEm0LfKqn7EufmUVsMDZE0G5y/);
  assert.match(output, /1DvGcWF3irX6jfdkiiAfgoDL72GkWg1d1/);
  assert.match(output, /1Un1jBEMfBDCMvYqtsz_kuGl0n1rvEHh6/);
  assert.match(output, /1QlyFqhgLI5Qm3mz39b7WKyv1sOjHCJYC/);
  assert.match(output, /1ktu9ko4bkZ1rKYIHjgTPOr-BwqYm_rEb/);
  assert.match(output, /10DXUPjXP4_xF7f-HbUhxmgaZGlPucI1E/);
  assert.match(output, /12ka8nWZ1WYeseKwx0Ay4JXGjOFhCU0ty/);
  assert.doesNotMatch(output, /notion\.so|app\.notion\.com/i);
  assert.doesNotMatch(output, /Zihe Ji|Allan Ji/i);
});

test("daily sections stop at the next day", async () => {
  const markdown = await readFile(new URL("../content/itinerary.md", import.meta.url), "utf8");

  const barcelonaArrival = extractSection(markdown, "# 9/27｜抵达日", "# 9/28｜高迪住宅日");
  assert.match(barcelonaArrival, /Gothic Quarter/);
  assert.doesNotMatch(barcelonaArrival, /Casa Batlló · Platinum/);

  const tossaDay = extractSection(markdown, "# 9/29｜Barcelona / Tossa de Mar", "# 9/30｜Montserrat");
  assert.match(tossaDay, /Plan A[^]*08:45[^]*10:05[^]*19:10[^]*20:30/);
  assert.match(tossaDay, /Platja Gran[^]*Vila Vella[^]*Es Codolar[^]*Camí de Ronda/);
  assert.match(tossaDay, /Plan B[^]*Park Güell[^]*Gràcia/);
  assert.match(tossaDay, /不加入 Blanes/);

  const cathedralDay = extractSection(markdown, "# 10/3｜Cathedral", "# 10/4｜Córdoba 一日游");
  assert.match(cathedralDay, /Sevilla Cathedral \+ Giralda/);
  assert.match(cathedralDay, /今日推荐动线/);
  assert.match(cathedralDay, /Petit Palace Santa Cruz/);
  assert.match(cathedralDay, /La Turruñuela[^]*已锁定/);
  assert.doesNotMatch(cathedralDay, /AVE 03943/);

  const cordobaDay = extractSection(markdown, "# 10/4｜Córdoba 一日游", "# 10/5｜Plaza de España");
  assert.match(cordobaDay, /10:00[^]*Mezquita[^]*13:30[^]*Bodegas Mezquita Céspedes/);
  assert.match(cordobaDay, /最晚约 18:35 离开老城/);

  const royalMadrid = extractSection(markdown, "# 10/7｜Royal Madrid", "# 10/8｜Prado");
  assert.match(royalMadrid, /Royal Palace of Madrid/);
  assert.doesNotMatch(royalMadrid, /Museo del Prado/);

  const madridArrival = extractSection(markdown, "# 10/6｜抵达 Madrid", "# 10/7｜Royal Madrid");
  assert.match(madridArrival, /Temple of Debod/);
  assert.match(madridArrival, /Gran Vía/);
  assert.doesNotMatch(madridArrival, /Royal Palace of Madrid/);

  assert.doesNotMatch(markdown, /Select Tetuán|Select Tetuan/);
});

test("mobile controls use large touch targets and bottom navigation", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /\.tab-wrap\s*\{[^}]*position:\s*fixed[^}]*inset:\s*auto 0 0/s);
  assert.match(css, /\.tabs button\s*\{[^}]*min-height:\s*58px/s);
  assert.match(css, /\.guide-outline-mobile summary\s*\{[^}]*min-height:\s*48px/s);
  assert.match(css, /\.guide-outline-mobile a\s*\{[^}]*min-height:\s*44px/s);
  assert.match(css, /env\(safe-area-inset-bottom\)/);
});
