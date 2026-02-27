import puppeteer from "puppeteer";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, "..", "public", "templates");

const BASE_URL = "http://localhost:3000";

// Les 12 templates à capturer : [id, nom-fichier-jpg]
const targets = [
  ["template-beaute", "beaute.jpg"],
  ["template-cabinet-sante", "cabinet-sante.jpg"],
  ["template-coach-energie", "coach-energie.jpg"],
  ["template-maitre-droit", "maitre-droit.jpg"],
  ["template-boutique-mode", "boutique-mode.jpg"],
  ["template-agence-digitale", "agence-digitale.jpg"],
  ["template-bien-etre", "bien-etre.jpg"],
  ["template-app-launch", "app-launch.jpg"],
  ["template-epicerie-bio", "epicerie-bio.jpg"],
  ["template-studio-motion", "studio-motion.jpg"],
  ["template-osteo-kine", "osteo-kine.jpg"],
  ["template-crypto-vault", "crypto-vault.jpg"],
];

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  // Viewport desktop 1440x900 pour des screenshots propres
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

  for (const [id, filename] of targets) {
    const url = `${BASE_URL}/templates/${id}/`;
    const outputPath = path.join(OUTPUT_DIR, filename);

    console.log(`Capturing ${id}...`);

    try {
      await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });

      // Attendre un peu pour les animations/fonts
      await page.evaluate(() => new Promise((r) => setTimeout(r, 1500)));

      // Fermer un éventuel bandeau cookies en cliquant "Accepter" ou "Refuser"
      try {
        const cookieBtn = await page.$('button::-p-text(Accepter)');
        if (cookieBtn) {
          await cookieBtn.click();
          await page.evaluate(() => new Promise((r) => setTimeout(r, 500)));
        }
      } catch {
        // pas de bandeau cookies, on continue
      }

      // Screenshot de la partie visible (viewport)
      await page.screenshot({
        path: outputPath,
        type: "jpeg",
        quality: 85,
        clip: { x: 0, y: 0, width: 1440, height: 900 },
      });

      console.log(`  ✓ ${filename} saved`);
    } catch (err) {
      console.error(`  ✗ ${filename} failed:`, err.message);
    }
  }

  await browser.close();
  console.log("\nDone!");
}

main();
