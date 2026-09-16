const { neon } = require('@neondatabase/serverless');

// Crea el cliente SQL usando la variable de entorno DATABASE_URL
const sql = neon(process.env.DATABASE_URL);

// Inicializa la tabla users si no existe
async function initDb() {
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id        SERIAL PRIMARY KEY,
      username  TEXT NOT NULL UNIQUE,
      password  TEXT NOT NULL,
      apartment_code TEXT,
      keyword_code   TEXT,
      current_view   TEXT DEFAULT 'cargando.html'
    )
  `;
}

module.exports = { sql, initDb };
