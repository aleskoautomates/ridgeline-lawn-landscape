#!/usr/bin/env node
/* ---------------------------------------------------------------------------
   tools/serve.mjs
   A local static server for dist/, so you can click through the site exactly
   as it will behave on the host, including clean URLs and the 404 page.

   npm run serve       (or `npm run dev` to build then serve)

   It does NOT run PHP. Submitting a form locally will 404 on estimate.php.
   That is expected. Test the forms on the real host, or point the form
   action at a hosted endpoint. See README, "Wiring the forms".
--------------------------------------------------------------------------- */

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const DIST = path.resolve('dist');
const PORT = Number(process.env.PORT) || 4173;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2'
};

if (!fs.existsSync(DIST)) {
  console.error('No dist/. Run `npm run build` first.');
  process.exit(1);
}

function resolveFile(urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0].split('#')[0]);

  /* Block traversal outside dist/. */
  const target = path.normalize(path.join(DIST, clean));
  if (!target.startsWith(DIST)) return null;

  if (fs.existsSync(target) && fs.statSync(target).isFile()) return target;

  const asIndex = path.join(target, 'index.html');
  if (fs.existsSync(asIndex)) return asIndex;

  const asHtml = target + '.html';
  if (fs.existsSync(asHtml)) return asHtml;

  return null;
}

const server = http.createServer((req, res) => {
  const file = resolveFile(req.url || '/');

  if (!file) {
    const notFound = path.join(DIST, '404.html');
    if (fs.existsSync(notFound)) {
      res.writeHead(404, { 'Content-Type': TYPES['.html'] });
      res.end(fs.readFileSync(notFound));
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404');
    }
    console.log('  404  ' + req.url);
    return;
  }

  const ext = path.extname(file).toLowerCase();
  res.writeHead(200, {
    'Content-Type': TYPES[ext] || 'application/octet-stream',
    'Cache-Control': 'no-store'
  });
  res.end(fs.readFileSync(file));
});

server.listen(PORT, () => {
  console.log('');
  console.log('  Ridgeline preview');
  console.log('  http://localhost:' + PORT + '/');
  console.log('  Serving dist/  (Ctrl+C to stop)');
  console.log('');
});
