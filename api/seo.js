const { pool, initDb } = require('../lib/db');

const allowedPages = new Set(['login', 'index']);
const fields = ['title', 'description', 'og_title', 'og_description', 'canonical_url'];

function clean(value, maxLength) {
  return String(value || '').trim().slice(0, maxLength);
}

module.exports = async function handler(req, res) {
  try {
    await initDb();

    if (req.method === 'GET') {
      const [rows] = await pool.execute(
        'SELECT page, title, description, og_title, og_description, canonical_url FROM seo_settings ORDER BY page'
      );
      return res.status(200).json({ seo: rows });
    }

    if (req.method === 'PUT') {
      const page = clean(req.body.page, 20);
      if (!allowedPages.has(page)) {
        return res.status(400).json({ error: 'Pagina invalida' });
      }

      const seo = {
        title: clean(req.body.title, 255),
        description: clean(req.body.description, 1000),
        og_title: clean(req.body.og_title || req.body.title, 255),
        og_description: clean(req.body.og_description || req.body.description, 1000),
        canonical_url: clean(req.body.canonical_url, 500)
      };

      if (!seo.title) {
        return res.status(400).json({ error: 'El titulo es obligatorio' });
      }

      await pool.execute(
        `INSERT INTO seo_settings (page, title, description, og_title, og_description, canonical_url)
         VALUES (?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
           title = VALUES(title),
           description = VALUES(description),
           og_title = VALUES(og_title),
           og_description = VALUES(og_description),
           canonical_url = VALUES(canonical_url)`,
        [page, seo.title, seo.description, seo.og_title, seo.og_description, seo.canonical_url]
      );

      return res.status(200).json({ page, ...seo });
    }

    return res.status(405).json({ error: 'Metodo no permitido' });
  } catch (error) {
    console.error('SEO error:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
