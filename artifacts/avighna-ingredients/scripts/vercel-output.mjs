import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/** On Vercel, mirror the site build into sibling/root `public` folders so Output Directory "public" resolves regardless of Root Directory. */
if (!process.env.VERCEL) {
  process.exit(0);
}

const pkgDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = path.join(pkgDir, 'public');

if (!fs.existsSync(path.join(src, 'index.html'))) {
  console.error(`vercel-output: expected ${src}${path.sep}index.html after Vite build`);
  process.exit(1);
}

const targets = [
  path.join(pkgDir, '../api-server/public'),
  path.join(pkgDir, '../../public'),
];

for (const target of targets) {
  fs.rmSync(target, { recursive: true, force: true });
  fs.cpSync(src, target, { recursive: true });
  console.log(`vercel-output: copied site to ${path.relative(pkgDir, target)}`);
}
