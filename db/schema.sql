-- Player registrations table (MySQL)
-- Public application intake: anyone can submit (via the /api/register endpoint),
-- nobody can read/update/delete through the public site — enforce that at the API layer,
-- MySQL has no built-in row-level security like Postgres.

CREATE TABLE IF NOT EXISTS player_registrations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  country VARCHAR(255) NOT NULL,
  pseudo VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  level VARCHAR(50) NOT NULL,
  message TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
