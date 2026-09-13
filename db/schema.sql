-- KarreX auth + player registrations + countries schema (MySQL)

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('player', 'admin') NOT NULL DEFAULT 'player',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS countries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  code VARCHAR(5) NOT NULL UNIQUE,
  flag VARCHAR(10) NOT NULL,
  status ENUM('open', 'qualifying', 'closed', 'qualified') NOT NULL DEFAULT 'open',
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS qualification_groups (
  id INT AUTO_INCREMENT PRIMARY KEY,
  country_id INT NOT NULL,
  name VARCHAR(50) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (country_id) REFERENCES countries(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS player_registrations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL UNIQUE,
  country_id INT NOT NULL,
  group_id INT,
  pseudo VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  level VARCHAR(50) NOT NULL,
  message TEXT,
  status ENUM('pending', 'accepted', 'rejected') NOT NULL DEFAULT 'pending',
  is_finalist BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (country_id) REFERENCES countries(id),
  FOREIGN KEY (group_id) REFERENCES qualification_groups(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS group_matches (
  id INT AUTO_INCREMENT PRIMARY KEY,
  group_id INT NOT NULL,
  player1_id INT NOT NULL,
  player2_id INT NOT NULL,
  score1 INT,
  score2 INT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (group_id) REFERENCES qualification_groups(id) ON DELETE CASCADE,
  FOREIGN KEY (player1_id) REFERENCES player_registrations(id) ON DELETE CASCADE,
  FOREIGN KEY (player2_id) REFERENCES player_registrations(id) ON DELETE CASCADE
);

-- National single-elimination bracket, one per country. round 1 = first round,
-- increasing towards the final. slot identifies position within a round; the
-- match at (round, slot) feeds the winner into (round+1, floor(slot/2)).
CREATE TABLE IF NOT EXISTS bracket_matches (
  id INT AUTO_INCREMENT PRIMARY KEY,
  country_id INT NOT NULL,
  round INT NOT NULL,
  slot INT NOT NULL,
  player1_id INT,
  player2_id INT,
  score1 INT,
  score2 INT,
  winner_id INT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (country_id) REFERENCES countries(id) ON DELETE CASCADE,
  FOREIGN KEY (player1_id) REFERENCES player_registrations(id) ON DELETE SET NULL,
  FOREIGN KEY (player2_id) REFERENCES player_registrations(id) ON DELETE SET NULL,
  FOREIGN KEY (winner_id) REFERENCES player_registrations(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS content_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  type ENUM('article', 'video', 'social') NOT NULL,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  platform VARCHAR(50),
  link_url VARCHAR(500),
  published_at DATE NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS partners (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  tier ENUM('title', 'premium', 'official', 'media') NOT NULL,
  logo_url VARCHAR(500),
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Single-row site-wide settings (id is always 1).
CREATE TABLE IF NOT EXISTS site_settings (
  id INT PRIMARY KEY DEFAULT 1,
  maintenance_mode BOOLEAN NOT NULL DEFAULT FALSE,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
INSERT IGNORE INTO site_settings (id, maintenance_mode) VALUES (1, FALSE);
