const { sql, initDb } = require('../../lib/db');

module.exports = async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Falta el id del usuario' });
  }

  try {
    await initDb();

    // GET /api/status/:id — consulta la vista actual del usuario
    if (req.method === 'GET') {
      const rows = await sql`SELECT current_view FROM users WHERE id = ${id}`;
      const user = rows[0];
      const view = user ? user.current_view : 'cargando.html';
      return res.status(200).json({ view });
    }

    // POST /api/status/:id — actualiza la vista del usuario (panel admin)
    if (req.method === 'POST') {
      const { view } = req.body;

      if (!view) {
        return res.status(400).json({ error: 'View es requerido' });
      }

      const result = await sql`
        UPDATE users SET current_view = ${view} WHERE id = ${id}
        RETURNING id
      `;

      if (result.length === 0) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      return res.status(200).json({ message: 'View updated successfully', view });
    }

    return res.status(405).json({ error: 'Método no permitido' });
  } catch (error) {
    console.error('Status error:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
