/**
 * Verifies every image path referenced in data/bookData.ts exists under public/.
 * Run: node scripts/verify-book-images.mjs
 */
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const bookDataPath = join(root, "data", "bookData.ts");
const publicDir = join(root, "public");

const raw = readFileSync(bookDataPath, "utf8");
const paths = [/image:\s*"([^"]+)"/g, /rightImage:\s*"([^"]+)"/g, /leftImage:\s*"([^"]+)"/g]
  .flatMap((re) => [...raw.matchAll(re)].map((m) => m[1]));
const unique = [...new Set(paths)];

let ok = true;
for (const p of unique) {
  if (!p.startsWith("/")) {
    console.error(`Invalid path (must start with /): ${p}`);
    ok = false;
    continue;
  }
  const disk = join(publicDir, ...p.split("/").filter(Boolean));
  if (!existsSync(disk)) {
    console.error(`Missing file for ${p} → expected at ${disk}`);
    ok = false;
  }
}

if (ok) {
  console.log(`All ${unique.length} unique book image paths resolve under public/.`);
} else {
  process.exitCode = 1;
}
