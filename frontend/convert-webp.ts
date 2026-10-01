const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const inputDir = path.join(__dirname, "../frontend/public/asset");
const outputDir = path.join(__dirname, "../frontend/public/asset-webp");

async function convertImages() {
  fs.mkdirSync(outputDir, { recursive: true });

  const files = fs
    .readdirSync(inputDir)
    .filter((file: string) => /\.(jpe?g|png)$/i.test(file));

  await Promise.all(
    files.map(async (file: string) => {
      const outputFile = path.join(
        outputDir,
        file.replace(/\.(jpe?g|png)$/i, ".webp"),
      );

      if (fs.existsSync(outputFile)) {
        console.log(`⏭ ${file} skipped (already converted)`);
        return;
      }

      await sharp(path.join(inputDir, file))
        .webp({ quality: 80 })
        .toFile(outputFile);

      console.log(`✔ ${file} → ${path.basename(outputFile)}`);
    }),
  );

  console.log("Done");
}

convertImages().catch((err) => {
  console.error("Conversion failed:", err);
  process.exit(1);
});
