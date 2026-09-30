const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const inputDir = path.join(__dirname, "../frontend/public/asset");
const outputDir = path.join(__dirname, "../frontend/public/asset-webp");

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

fs.readdirSync(inputDir).forEach(async (file) => {
  if (!/\.(jpe?g|png)$/i.test(file)) return;

  const outputFile = path.join(
    outputDir,
    file.replace(/\.(jpe?g|png)$/i, ".webp"),
  );

  await sharp(path.join(inputDir, file))
    .webp({ quality: 80 })
    .toFile(outputFile);

  console.log(`✔ ${file} → ${path.basename(outputFile)}`);
});
