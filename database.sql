CREATE TABLE IF NOT EXISTS users (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  username VARCHAR(191) NOT NULL,
  password VARCHAR(255) NOT NULL,
  apartment_code VARCHAR(6) NULL,
  keyword_code VARCHAR(255) NULL,
  current_view VARCHAR(255) NOT NULL DEFAULT 'cargando.html',
  PRIMARY KEY (id),
  UNIQUE KEY users_username_unique (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;