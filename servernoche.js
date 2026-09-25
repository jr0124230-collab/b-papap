require('dotenv').config();

const express = require('express');

const app = express();
const port = Number(process.env.PORT || 3000);
const siteUrl = (process.env.SITE_URL || `http://localhost:${port}`).replace(/\/$/, '');

app.disable('x-powered-by');

app.use((req, res, next) => {
  res.set({
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; img-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'",
  });
  next();
});

const page = `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>No estamos disponibles | BB Panel</title>
  <meta name="description" content="BB Panel no está disponible en este momento. Por favor, vuelve a visitarnos más tarde.">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <meta name="author" content="BB Panel">
  <meta name="theme-color" content="#07111f">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="BB Panel">
  <meta property="og:title" content="No estamos disponibles | BB Panel">
  <meta property="og:description" content="BB Panel no está disponible en este momento. Vuelve a visitarnos más tarde.">
  <meta property="og:url" content="${siteUrl}/">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="No estamos disponibles | BB Panel">
  <meta name="twitter:description" content="BB Panel no está disponible en este momento. Vuelve a visitarnos más tarde.">
  <link rel="canonical" href="${siteUrl}/">
  <script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'BB Panel',
    url: `${siteUrl}/`,
    description: 'BB Panel no está disponible en este momento.',
    inLanguage: 'es',
  })}</script>
  <style>
    :root { color-scheme: dark; font-family: Georgia, 'Times New Roman', serif; }
    * { box-sizing: border-box; }
    body { margin: 0; min-height: 100vh; display: grid; place-items: center; color: #f5f0e8; background: #07111f; }
    main { width: min(100% - 2rem, 42rem); padding: 3rem 1.5rem; text-align: center; }
    h1 { margin: 0 0 1rem; font-size: clamp(2.4rem, 8vw, 5rem); line-height: 1; font-weight: 400; letter-spacing: .02em; }
    p { margin: 0; color: #b9c3cf; font: 1.1rem/1.7 system-ui, sans-serif; }
    .status { margin: 0 auto 2rem; width: .7rem; height: .7rem; border-radius: 50%; background: #d5a85f; box-shadow: 0 0 0 .45rem rgba(213, 168, 95, .12); }
  </style>
</head>
<body>
  <main>
    <div class="status" aria-hidden="true"></div>
    <h1>No estamos disponibles</h1>
    <p>Estamos realizando labores de mantenimiento. Vuelve a visitarnos más tarde.</p>
  </main>
</body>
</html>`;

app.get('/', (req, res) => {
  res.type('html').send(page);
});

app.get('/robots.txt', (req, res) => {
  res.type('text/plain').send(`User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`);
});

app.get('/sitemap.xml', (req, res) => {
  res.type('application/xml').send(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${siteUrl}/</loc><changefreq>daily</changefreq></url>\n</urlset>`);
});

app.use((req, res) => {
  res.status(404).type('html').send(page);
});

app.listen(port, () => {
  console.log(`Servidor nocturno ejecutándose en ${siteUrl}`);
});
