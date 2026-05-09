// Remplace toutes les références .png par .webp dans les fichiers JS des cours
// Cible : js/axis-course-*-images-pdf-premium.js

import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const JS_DIR = './js';

const files = (await readdir(JS_DIR))
  .filter(f => f.startsWith('axis-course-') && f.endsWith('-images-pdf-premium.js'));

let updated = 0;
for (const file of files) {
  const path = join(JS_DIR, file);
  const original = await readFile(path, 'utf8');
  const modified = original.replaceAll(
    /assets\/courses\/([^"]+)\.png/g,
    'assets/courses/$1.webp'
  );
  if (modified !== original) {
    await writeFile(path, modified, 'utf8');
    updated++;
  }
}

console.log(`${updated}/${files.length} fichiers JS mis à jour (.png → .webp)`);
