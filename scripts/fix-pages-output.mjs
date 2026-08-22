import { access, rename, rm } from "node:fs/promises";

const clientRoot = new URL("../dist/client/", import.meta.url);
const nestedRoot = new URL("spain-2026-trip/", clientRoot);
const nestedAssets = new URL("_next/", nestedRoot);
const finalAssets = new URL("_next/", clientRoot);

await access(nestedAssets);
await rm(finalAssets, { recursive: true, force: true });
await rename(nestedAssets, finalAssets);
await rm(nestedRoot, { recursive: true, force: true });
