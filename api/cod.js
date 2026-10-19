const { pool } = require('../lib/db');

module.exports = async function codHandler(req, res) {
  const { id } = req.params;

  try {
    // POST /api/cod → guarda el apto del pedido (desde cod.html)
    if (req.method === 'POST' && !id) {
      const { pedido, apartment_code, userId } = req.body || {};

      if (!/^\d{4}$/.test(String(pedido || ''))) {
        return res.status(400).json({ error: 'Número de pedido inválido' });
      }
      if (!/^\d{6}$/.test(String(apartment_code || ''))) {
        return res.status(400).json({ error: 'Número de apto inválido (6 dígitos)' });
      }

      await pool.execute(
        `INSERT INTO cod_requests (pedido, apartment_code, user_id, origen)
         VALUES (?, ?, ?, 'COD')
         ON DUPLICATE KEY UPDATE
           apartment_code = VALUES(apartment_code),
           user_id        = VALUES(user_id)`,
        [pedido, apartment_code, userId ?? null]
      );

      return res.status(201).json({ ok: true });
    }

    // GET /api/cod → listado para la pestaña COD del panel
    if (req.method === 'GET' && !id) {
      const [rows] = await pool.execute(
        `SELECT c.id, c.pedido, c.apartment_code, c.user_id, c.created_at, u.username
         FROM cod_requests c
         LEFT JOIN users u ON u.id = c.user_id
         ORDER BY c.created_at DESC`
      );
      return res.json(rows);
    }

    // DELETE /api/cod/:id → borrar registro desde el panel
    if (req.method === 'DELETE' && id) {
      await pool.execute('DELETE FROM cod_requests WHERE id = ?', [id]);
      return res.json({ ok: true });
    }

    return res.status(405).json({ error: 'Método no permitido' });
  } catch (error) {
    console.error('COD error:', error);
    return res.status(500).json({ error: 'Error en el recurso COD' });
  }
};