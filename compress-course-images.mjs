// Compression images cours — PNG 1024×1024 → WebP 80 / max 800px
// Résultat attendu : ~1.3 Go → ~80 Mo

import sharp from 'sharp';
import { readdir, stat, rename, unlink } from 'fs/promises';
import { join, extname, basename, dirname } from 'path';
import { existsSync } from 'fs';

const COURSES_DIR = './assets/courses';
const QUALITY    = 80;   // WebP quality (0-100)
const MAX_SIZE   = 800;  // px — largeur et hauteur max

let total = 0, done = 0, saved = 0;

async function findPngs(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const results = [];
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) results.push(...await findPngs(full));
    else if (e.isFile() && extname(e.name).toLowerCase() === '.png') results.push(full);
  }
  return results;
}

async function compress(pngPath) {
  const webpPath = pngPath.replace(/\.png$/i, '.webp');
  const before = (await stat(pngPath)).size;

  try {
    await sharp(pngPath)
      .resize(MAX_SIZE, MAX_SIZE, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(webpPath);

    const after = (await stat(webpPath)).size;
    saved += before - after;
    done++;

    // Remplace le PNG par le WebP (supprime l'original)
    await unlink(pngPath);

    if (done % 50 === 0 || done === total) {
      const pct = Math.round(done / total * 100);
      const savedMb = (saved / 1024 / 1024).toFixed(0);
      console.log(`[${pct}%] ${done}/${total} — économisé ${savedMb} Mo`);
    }
  } catch (err) {
    console.error(`ERREUR ${pngPath}: ${err.message}`);
  }
}

const pngs = await findPngs(COURSES_DIR);
total = pngs.length;
console.log(`${total} PNG trouvés dans ${COURSES_DIR}`);
console.log(`Cible : WebP qualité ${QUALITY}, max ${MAX_SIZE}px\n`);

// Traitement par lots de 8 pour ne pas saturer la mémoire
const BATCH = 8;
for (let i = 0; i < pngs.length; i += BATCH) {
  await Promise.all(pngs.slice(i, i + BATCH).map(compress));
}

const totalSavedMb = (saved / 1024 / 1024).toFixed(0);
console.log(`\n✓ Terminé — ${done} images converties — ${totalSavedMb} Mo économisés`);
