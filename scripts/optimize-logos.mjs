import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const SRC_DIR = path.join(process.cwd(), "Imagens");
const DEST_DIR = path.join(process.cwd(), "public", "logos");

const FILES = [
  { src: "LOGO BRANCA.png", dest: "logo-branca.png" },
  { src: "LOGO BRANCA COM ESCRITA.png", dest: "logo-branca-com-escrita.png" },
  { src: "LOGO PRETA.png", dest: "logo-preta.png" },
  { src: "LOGO PRETA COM ESCRITA.png", dest: "logo-preta-com-escrita.png" },
  { src: "LOGO UEM.png", dest: "logo-uem.png" },
];

fs.mkdirSync(DEST_DIR, { recursive: true });

for (const { src, dest } of FILES) {
  const srcPath = path.join(SRC_DIR, src);
  const destPath = path.join(DEST_DIR, dest);
  const before = fs.statSync(srcPath).size;

  await sharp(srcPath)
    .resize({ width: 480, withoutEnlargement: true })
    .png({ compressionLevel: 9, quality: 90 })
    .toFile(destPath);

  const after = fs.statSync(destPath).size;
  console.log(`${src} -> ${dest}: ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`);
}
