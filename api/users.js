const bcrypt = require('bcryptjs');
const { pool, initDb } = require('../lib/db');

module.exports = async function handler(req, res) {
  try {
    await initDb();
    
    // DELETE /api/users/:id - extraer ID correctamente
    const userId = req.params?.id || req.query?.id;

    // GET /api/users — lista todos los usuarios (AHORA CON PASSWORD)
    if (req.method === 'GET') {
      const [rows] = await pool.execute(
        'SELECT id, username, password, apartment_code, keyword_code, current_view, puntos, valor_cop, cuenta_destino FROM usuarios'
      );
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

      // CORREGIDO: tabla 'usuarios' no 'users', y agregar campos faltantes si existen
      const [result] = await pool.execute(
        'INSERT INTO usuarios (username, password, current_view) VALUES (?, ?, ?)',
        [username, hashedPassword, 'cargando.html']
      );

      return res.status(200).json({ 
        id: result.insertId, 
        username, 
        message: 'User added successfully' 
      });
    }

    // DELETE /api/users/:id — elimina un usuario
    if (req.method === 'DELETE') {
      if (!userId || !/^\d+$/.test(String(userId))) {
        return res.status(400).json({ error: 'ID de usuario inválido' });
      }

      const [result] = await pool.execute('DELETE FROM usuarios WHERE id = ?', [userId]);
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      return res.status(200).json({ message: 'Usuario eliminado correctamente' });
    }

    // PUT /api/users/:id/password — cambiar contraseña
    if (req.method === 'PUT' && req.url?.includes('/password')) {
      if (!userId || !/^\d+$/.test(String(userId))) {
        return res.status(400).json({ error: 'ID inválido' });
      }
      
      const { password } = req.body;
      if (!password || password.length < 4) {
        return res.status(400).json({ error: 'Contraseña mínimo 4 caracteres' });
      }
      
      const hashed = await bcrypt.hash(password, 10);
      await pool.execute('UPDATE usuarios SET password = ? WHERE id = ?', [hashed, userId]);
      
      return res.json({ success: true, message: 'Contraseña actualizada' });
    }

    return res.status(405).json({ error: 'Método no permitido' });
    
  } catch (error) {
    console.error('Users error:', error);
    
    if (error.code === 'ER_DUP_ENTRY' || error.message?.includes('unique')) {
      return res.status(409).json({ error: 'El usuario ya existe' });
    }
    
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};