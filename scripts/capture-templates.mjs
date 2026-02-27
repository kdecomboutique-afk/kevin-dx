import { chromium } from "playwright";
import { mkdirSync } from "fs";

const BASE_URL = "http://localhost:62444";
const OUTPUT_DIR = "public/templates";
const VIEWPORT = { width: 1280, height: 900 };
const SCREENSHOT_SIZE = { width: 800, height: 600 };

const templates = [
  { id: "template-restaurant", file: "restaurant.jpg" },
  { id: "template-artisan", file: "artisan.jpg" },
  { id: "template-immobilier", file: "immobilier.jpg" },
  { id: "template-beaute", file: "beaute.jpg" },
  { id: "template-btp", file: "btp.jpg" },
  { id: "template-commerce", file: "commerce.jpg" },
  { id: "template-restaurant-2", file: "restaurant-2.jpg" },
  { id: "template-artisan-2", file: "artisan-2.jpg" },
  { id: "template-bistrot-gourmand", file: "bistrot-gourmand.jpg" },
  { id: "template-auto-expert", file: "auto-expert.jpg" },
  { id: "template-petales-fleurs", file: "petales-fleurs.jpg" },
  { id: "template-cabinet-sante", file: "cabinet-sante.jpg" },
  { id: "template-coach-energie", file: "coach-energie.jpg" },
  { id: "template-atelier-creatif", file: "atelier-creatif.jpg" },
  { id: "template-immo-prestige", file: "immo-prestige.jpg" },
  { id: "template-studio-lumiere", file: "studio-lumiere.jpg" },
  { id: "template-street-food", file: "street-food.jpg" },
  { id: "template-maitre-droit", file: "maitre-droit.jpg" },
];

async function main() {
  mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log(`Lancement du navigateur...`);
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2,
  });

  let success = 0;
  let errors = 0;

  for (const tpl of templates) {
    const url = `${BASE_URL}/templates/${tpl.id}/`;
    const path = `${OUTPUT_DIR}/${tpl.file}`;

    try {
      const page = await context.newPage();
      await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });

      // Attendre que les animations Framer Motion soient terminées
      await page.waitForTimeout(1500);

      // Scroll un peu vers le bas pour passer le header et capturer le hero
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(300);

      await page.screenshot({
        path,
        type: "jpeg",
        quality: 85,
        clip: {
          x: 0,
          y: 0,
          width: VIEWPORT.width,
          height: VIEWPORT.height,
        },
      });

      await page.close();
      success++;
      console.log(`  [${success}/${templates.length}] ${tpl.file}`);
    } catch (err) {
      errors++;
      console.error(`  ERREUR ${tpl.file}: ${err.message}`);
    }
  }

  await browser.close();

  console.log(`\nTermine: ${success} captures, ${errors} erreurs`);
}

main();
