const { pool, initDb } = require('../../lib/db');

module.exports = async function handler(req, res) {
  const id = req.query.id || req.params.id;

  if (!id) {
    return res.status(400).json({ error: 'Falta el id del usuario' });
  }

  try {
    await initDb();

    // GET /api/points/:id — obtiene los datos de puntos del usuario
    if (req.method === 'GET') {
      const [rows] = await pool.execute(
        'SELECT puntos, valor_cop, cuenta_destino FROM users WHERE id = ?',
        [id]
      );
      const user = rows[0];
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      return res.status(200).json({
        puntos: user.puntos || null,
        valor_cop: user.valor_cop || null,
        cuenta_destino: user.cuenta_destino || null,
      });
    }

    // POST /api/points/:id — actualiza los datos de puntos del usuario (panel admin)
    if (req.method === 'POST') {
      const { puntos, valor_cop, cuenta_destino } = req.body;

      if (puntos === undefined || valor_cop === undefined || cuenta_destino === undefined) {
        return res.status(400).json({ error: 'Faltan campos: puntos, valor_cop, cuenta_destino' });
      }

      const [result] = await pool.execute(
        'UPDATE users SET puntos = ?, valor_cop = ?, cuenta_destino = ? WHERE id = ?',
        [String(puntos), String(valor_cop), String(cuenta_destino), id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      return res.status(200).json({
        message: 'Datos de puntos actualizados correctamente',
        userId: id,
        puntos,
        valor_cop,
        cuenta_destino,
      });
    }

    return res.status(405).json({ error: 'Método no permitido' });
  } catch (error) {
    console.error('Points error:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
