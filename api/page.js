const fs = require('fs/promises');
const path = require('path');
const { pool, initDb } = require('../lib/db');

const pages = {
  login: 'login.html',
  index: 'index.html'
};

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
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  if (!host) return '';
  const pathname = page === 'index' ? '/' : `/${page}`;
  return `${protocol}://${host}${pathname}`;
}

module.exports = async function handler(req, res) {
  try {
    const page = String(req.query.page || 'index');
    const fileName = pages[page];
    if (!fileName) {
      return res.status(404).send('Pagina no encontrada');
    }

    const filePath = path.join(process.cwd(), 'public', fileName);
    const html = await fs.readFile(filePath, 'utf8');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    if (process.env.PANEL_SEO_ENABLED !== 'true') {
      return res.status(200).send(html);
    }

    await initDb();
    const [rows] = await pool.execute(
      'SELECT title, description, og_title, og_description, canonical_url FROM seo_settings WHERE page = ? LIMIT 1',
      [page]
    );

    return res.status(200).send(rows[0] ? applySeo(html, rows[0], getPageUrl(req, page)) : html);
  } catch (error) {
    console.error('Page render error:', error);
    return res.status(500).send('Error interno del servidor');
  }
};
