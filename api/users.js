const bcrypt = require('bcryptjs');
const { pool, initDb } = require('../lib/db');

module.exports = async function handler(req, res) {
  try {
    await initDb();

    // GET /api/users — lista todos los usuarios
    if (req.method === 'GET') {
      const [rows] = await pool.execute('SELECT id, username, apartment_code, keyword_code FROM users');
      return res.status(200).json({ users: rows });
    }

    // POST /api/users — crea un usuario nuevo
    if (req.method === 'POST') {
      const username = String(req.body.username || '').trim();
      const password = String(req.body.password || '');

      if (!username || !password) {
        return res.status(400).json({ error: 'Username y password son obligatorios' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const [result] = await pool.execute(
        'INSERT INTO users (username, password, current_view) VALUES (?, ?, ?)',
        [username, hashedPassword, 'cargando.html']
      );

      return res.status(200).json({ id: result.insertId, username, message: 'User added successfully' });
    }

    return res.status(405).json({ error: 'Método no permitido' });
  } catch (error) {
    console.error('Users error:', error);
    // Maneja el error de username duplicado
    if (error.code === 'ER_DUP_ENTRY' || (error.message && error.message.includes('unique'))) {
      return res.status(409).json({ error: 'El usuario ya existe' });
    }
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
