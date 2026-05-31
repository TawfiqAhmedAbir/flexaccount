import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const src = join(root, "public", "icons", "icon-src.png");
const navy = { r: 10, g: 14, b: 39, alpha: 1 };

async function make(size) {
  const out = join(root, "public", "icons", `icon-${size}.png`);
  // pad to square with navy background so the mark stays centered
  await sharp(src)
    .resize(size, size, { fit: "contain", background: navy })
    .flatten({ background: navy })
    .png()
    .toFile(out);
  console.log("wrote", out);
}

await make(192);
await make(512);
console.log("done");
