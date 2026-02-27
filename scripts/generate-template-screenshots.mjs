#!/usr/bin/env node
/**
 * Génère les screenshots des 26 template demos
 * Usage: node scripts/generate-template-screenshots.mjs
 * Prérequis: serveur dev lancé sur localhost:3000
 */

import puppeteer from "puppeteer";
import { existsSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = resolve(__dirname, "../public/templates");

// Mapping template-id → nom fichier image (sans extension)
const TEMPLATES = [
  { id: "template-restaurant", file: "restaurant" },
  { id: "template-artisan", file: "artisan" },
  { id: "template-immobilier", file: "immobilier" },
  { id: "template-beaute", file: "beaute" },
  { id: "template-btp", file: "btp" },
  { id: "template-commerce", file: "commerce" },
  { id: "template-restaurant-2", file: "restaurant-2" },
  { id: "template-artisan-2", file: "artisan-2" },
  { id: "template-bistrot-gourmand", file: "bistrot-gourmand" },
  { id: "template-auto-expert", file: "auto-expert" },
  { id: "template-petales-fleurs", file: "petales-fleurs" },
  { id: "template-cabinet-sante", file: "cabinet-sante" },
  { id: "template-coach-energie", file: "coach-energie" },
  { id: "template-atelier-creatif", file: "atelier-creatif" },
  { id: "template-immo-prestige", file: "immo-prestige" },
  { id: "template-studio-lumiere", file: "studio-lumiere" },
  { id: "template-street-food", file: "street-food" },
  { id: "template-maitre-droit", file: "maitre-droit" },
  { id: "template-boutique-mode", file: "boutique-mode" },
  { id: "template-agence-digitale", file: "agence-digitale" },
  { id: "template-bien-etre", file: "bien-etre" },
  { id: "template-app-launch", file: "app-launch" },
  { id: "template-epicerie-bio", file: "epicerie-bio" },
  { id: "template-studio-motion", file: "studio-motion" },
  { id: "template-osteo-kine", file: "osteo-kine" },
  { id: "template-crypto-vault", file: "crypto-vault" },
];

const BASE_URL = "http://localhost:3000/templates";
const VIEWPORT = { width: 1440, height: 900 };

async function main() {
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log(`\n📸 Génération des screenshots de ${TEMPLATES.length} templates...\n`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setViewport(VIEWPORT);

  let success = 0;
  let failed = 0;

  for (const tpl of TEMPLATES) {
    const url = `${BASE_URL}/${tpl.id}`;
    const outPath = resolve(OUTPUT_DIR, `${tpl.file}.jpg`);

    try {
      process.stdout.write(`  ${tpl.file}... `);

      // Naviguer vers la page du template
      await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });

      // Cliquer sur "Voir la démo complète" pour ouvrir la demo
      const demoButton = await page.$('button[class*="demo"], button:has-text("Voir la démo")');
      if (demoButton) {
        await demoButton.click();
        await page.waitForTimeout(1500); // Attendre les animations
      } else {
        // Chercher le bouton par texte
        const buttons = await page.$$("button");
        for (const btn of buttons) {
          const text = await page.evaluate((el) => el.textContent, btn);
          if (text && text.includes("Voir la démo")) {
            await btn.click();
            await page.waitForTimeout(1500);
            break;
          }
        }
      }

      // Trouver le conteneur de la demo et scroller vers lui
      const demoSection = await page.$('section[class*="template-demo"], [class*="demo"]');
      if (demoSection) {
        await demoSection.scrollIntoView();
        await page.waitForTimeout(500);
      }

      // Scroller vers le haut de la demo pour capturer le hero
      await page.evaluate(() => {
        // Trouver la section demo (le composant rendu après le bouton)
        const sections = document.querySelectorAll("section");
        for (const section of sections) {
          // La demo est souvent dans un conteneur avec AnimatePresence
          const parent = section.closest("[style*='overflow']") || section;
          if (parent.querySelector('[class*="py-"]') && section.querySelectorAll("div").length > 20) {
            section.scrollIntoView({ block: "start" });
            return;
          }
        }
        // Fallback : scroller à 800px (après le hero de la page detail)
        window.scrollTo(0, 800);
      });

      await page.waitForTimeout(800);

      // Screenshot de la zone visible
      await page.screenshot({
        path: outPath,
        type: "jpeg",
        quality: 90,
        clip: {
          x: 0,
          y: 0,
          width: VIEWPORT.width,
          height: VIEWPORT.height,
        },
      });

      console.log(`✅ ${outPath.split("/").pop()}`);
      success++;
    } catch (err) {
      console.log(`❌ ERREUR: ${err.message}`);
      failed++;
    }
  }

  await browser.close();

  console.log(`\n📊 Résultat: ${success} ✅ / ${failed} ❌ sur ${TEMPLATES.length}\n`);
}

main().catch(console.error);
