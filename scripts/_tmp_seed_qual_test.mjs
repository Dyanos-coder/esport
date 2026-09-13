import fs from 'node:fs';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

function loadEnv(p) {
  for (const line of fs.readFileSync(p, 'utf8').split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const eq = t.indexOf('=');
    if (eq === -1) continue;
    const k = t.slice(0, eq).trim();
    let v = t.slice(eq + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    process.env[k] = v;
  }
}
loadEnv('.env');

const conn = await mysql.createConnection({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const [[country]] = await conn.query("SELECT id, name FROM countries WHERE name = 'Bénin'");
const passwordHash = await bcrypt.hash('testpass123', 10);

for (let i = 0; i < 4; i++) {
  const email = `qualtest${i}.${Date.now()}@example.com`;
  const [userResult] = await conn.execute(
    'INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)',
    [email, passwordHash, 'player'],
  );
  await conn.execute(
    `INSERT INTO player_registrations (user_id, country_id, pseudo, full_name, phone, level, status)
     VALUES (?, ?, ?, ?, ?, 'amateur', 'accepted')`,
    [userResult.insertId, country.id, `QualTest${i}`, `Qual Test ${i}`, `+2290000111${i}`],
  );
}

console.log(`Seeded 4 accepted players for ${country.name} (id=${country.id})`);
await conn.end();
