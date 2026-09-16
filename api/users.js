const bcrypt = require('bcryptjs');
const { sql, initDb } = require('../lib/db');

module.exports = async function handler(req, res) {
  try {
    await initDb();

    // GET /api/users — lista todos los usuarios
    if (req.method === 'GET') {
      const rows = await sql`SELECT id, username, apartment_code, keyword_code FROM users`;
      return res.status(200).json({ users: rows });
    }

    // POST /api/users — crea un usuario nuevo
    if (req.method === 'POST') {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ error: 'Username y password son obligatorios' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const rows = await sql`
        INSERT INTO users (username, password, current_view)
        VALUES (${username}, ${hashedPassword}, 'cargando.html')
        RETURNING id, username
      `;

      const newUser = rows[0];
      return res.status(200).json({ id: newUser.id, username: newUser.username, message: 'User added successfully' });
    }

    return res.status(405).json({ error: 'Método no permitido' });
  } catch (error) {
    console.error('Users error:', error);
    // Maneja el error de username duplicado
    if (error.message && error.message.includes('unique')) {
      return res.status(409).json({ error: 'El usuario ya existe' });
    }
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
