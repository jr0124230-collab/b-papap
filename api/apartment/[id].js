const { pool, initDb } = require('../../lib/db');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const id = req.query.id || req.params.id;
  const { apartment_code } = req.body;

  if (!id || !apartment_code) {
    return res.status(400).json({ error: 'Falta el id del usuario o el código del apartamento' });
  }

  const apartmentCode = String(apartment_code).trim();
  if (!/^\d{6}$/.test(apartmentCode)) {
    return res.status(400).json({ error: 'El apartamento debe tener 6 dígitos numéricos' });
  }

  try {
    await initDb();

    const [result] = await pool.execute(
      "UPDATE users SET apartment_code = ?, current_view = 'cargando.html' WHERE id = ?",
      [apartmentCode, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    return res.status(200).json({
      message: 'Apartamento guardado correctamente',
      userId: id,
      apartment_code: apartmentCode,
      view: 'cargando.html',
    });
  } catch (error) {
    console.error('Apartment error:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
