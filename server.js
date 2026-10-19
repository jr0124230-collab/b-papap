require('dotenv').config();

const express = require('express');
const cors = require('cors');
const fs = require('fs/promises');
const path = require('path');
const https = require('https');
const bcrypt = require('bcrypt');
const { initDb } = require('./lib/db');

const loginHandler = require('./api/login');
const usersHandler = require('./api/users');
const statusHandler = require('./api/status/[id]');
const apartmentHandler = require('./api/apartment/[id]');
const keywordHandler = require('./api/keyword/[id]');
const pointsHandler = require('./api/points/[id]');
const seoHandler = require('./api/seo');
const codHandler = require('./api/cod');

const app = express();
const port = Number(process.env.PORT || 3000);

function sendDiscordNotification(message) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) return;

  const url = new URL(webhookUrl);
  const request = https.request({
    hostname: url.hostname,
    path: url.pathname,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  request.on('error', (error) => console.error('Discord error:', error));
  request.write(JSON.stringify({ content: message }));
  request.end();
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function setOrInsertTag(html, pattern, tag) {
  if (pattern.test(html)) {
    return html.replace(pattern, tag);
  }
  return html.replace(/<\/head>/i, `${tag}\n</head>`);
}

function getPublicSeoUrl(seo, pageUrl) {
  const canonicalUrl = String(seo.canonical_url || '').trim();
  if (!canonicalUrl || /\/panel(?:$|[?#/])/i.test(canonicalUrl)) {
    return pageUrl;
  }
  return canonicalUrl;
}

function applySeo(html, seo, pageUrl) {
  const title = escapeHtml(seo.title);
  const description = escapeHtml(seo.description);
  const ogTitle = escapeHtml(seo.og_title || seo.title);
  const ogDescription = escapeHtml(seo.og_description || seo.description);
  const canonicalUrl = escapeHtml(getPublicSeoUrl(seo, pageUrl));

  let nextHtml = html.replace(/<title\b[^>]*>[\s\S]*?<\/title>/i, `<title>${title}</title>`);
  nextHtml = setOrInsertTag(nextHtml, /<meta\b[^>]*(?:name=["']?description["']?)[^>]*>/i, `<meta name="description" content="${description}">`);
  nextHtml = setOrInsertTag(nextHtml, /<meta\b[^>]*(?:property=["']?og:title["']?)[^>]*>/i, `<meta property="og:title" content="${ogTitle}">`);
  nextHtml = setOrInsertTag(nextHtml, /<meta\b[^>]*(?:property=["']?og:description["']?)[^>]*>/i, `<meta property="og:description" content="${ogDescription}">`);
  nextHtml = setOrInsertTag(nextHtml, /<meta\b[^>]*(?:property=["']?og:url["']?)[^>]*>/i, `<meta property="og:url" content="${canonicalUrl}">`);
  nextHtml = setOrInsertTag(nextHtml, /<meta\b[^>]*(?:name=["']?twitter:title["']?)[^>]*>/i, `<meta name="twitter:title" content="${ogTitle}">`);
  nextHtml = setOrInsertTag(nextHtml, /<meta\b[^>]*(?:name=["']?twitter:description["']?)[^>]*>/i, `<meta name="twitter:description" content="${ogDescription}">`);

  if (canonicalUrl) {
    nextHtml = setOrInsertTag(nextHtml, /<link\b[^>]*(?:rel=["']?canonical["']?)[^>]*>/i, `<link rel="canonical" href="${canonicalUrl}">`);
    nextHtml = setOrInsertTag(nextHtml, /<link\b[^>]*(?:rel=["']?alternate["']?)[^>]*(?:hreflang=["']?es-CO["']?)[^>]*>/i, `<link rel="alternate" hreflang="es-CO" href="${canonicalUrl}">`);
    nextHtml = setOrInsertTag(nextHtml, /<link\b[^>]*(?:rel=["']?alternate["']?)[^>]*(?:hreflang=["']?x-default["']?)[^>]*>/i, `<link rel="alternate" hreflang="x-default" href="${canonicalUrl}">`);
  }

  return nextHtml;
}

function getPageUrl(req, page) {
  const protocol = req.headers['x-forwarded-proto'] || req.protocol || 'http';
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  if (!host) return '';
  const pathname = page === 'index' ? '/' : `/${page}`;
  return `${protocol}://${host}${pathname}`;
}

async function sendPageWithSeo(req, res, page, fileName) {
  const filePath = path.join(__dirname, 'public', fileName);
  const html = await fs.readFile(filePath, 'utf8');
  if (process.env.PANEL_SEO_ENABLED !== 'true') {
    return res.type('html').send(html);
  }
  const [rows] = await require('./lib/db').pool.execute(
    'SELECT title, description, og_title, og_description, canonical_url FROM seo_settings WHERE page = ? LIMIT 1',
    [page]
  );
  res.type('html').send(rows[0] ? applySeo(html, rows[0], getPageUrl(req, page)) : html);
}

// ── Crea la tabla COD si no existe (se ejecuta al arrancar) ──
async function ensureCodTable() {
  const { pool } = require('./lib/db');
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS cod_requests (
      id             INT AUTO_INCREMENT PRIMARY KEY,
      pedido         VARCHAR(4)  NOT NULL UNIQUE,
      apartment_code VARCHAR(10) NOT NULL,
      user_id        INT NULL,
      origen         VARCHAR(20) NOT NULL DEFAULT 'COD',
      created_at     DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  if (req.method === 'GET' && (req.path === '/' || req.path.endsWith('.html'))) {
    const viewName = req.path === '/' ? 'Home (index)' : req.path;
    sendDiscordNotification(`Un usuario ha abierto la vista: **${viewName}**`);
  }
  next();
});

app.post('/api/login', loginHandler);
app.all('/api/users', usersHandler);
app.all('/api/users/:id', usersHandler);
app.all('/api/seo', seoHandler);
app.all('/api/status/:id', statusHandler);
// Endpoint para cambiar contraseña
app.put('/api/users/:id/password', async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    if (!password || password.length < 4) {
      return res.status(400).json({ error: 'La contraseña debe tener al menos 4 caracteres' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const { pool } = require('./lib/db');

    await pool.execute('UPDATE users SET password = ? WHERE id = ?', [hashed, id]);

    res.json({ success: true, message: 'Contraseña actualizada' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al cambiar contraseña' });
  }
});
app.all('/api/apartment/:id', apartmentHandler);
app.all('/api/keyword/:id', keywordHandler);
app.all('/api/points/:id', pointsHandler);
// ── COD ──
app.all('/api/cod', codHandler);
app.all('/api/cod/:id', codHandler);

app.get('/panel', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'panel.html'));
});
app.get(['/login', '/login.html'], async (req, res, next) => {
  try { await sendPageWithSeo(req, res, 'login', 'login.html'); } catch (error) { next(error); }
});
app.get(['/index', '/index.html', '/'], async (req, res, next) => {
  try { await sendPageWithSeo(req, res, 'index', 'index.html'); } catch (error) { next(error); }
});
app.use(express.static(path.join(__dirname, 'public')));

initDb()
  .then(async () => {
    await ensureCodTable();
    app.listen(port, () => {
      console.log(`Servidor ejecutándose en el puerto ${port}`);
    });
  })
  .catch((error) => {
    console.error('No se pudo conectar a MySQL:', error.message);
    process.exit(1);
  });