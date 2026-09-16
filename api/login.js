const bcrypt = require('bcryptjs');
const https = require('https');
const { pool, initDb } = require('../lib/db');

function sendDiscordNotification(message) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) return;

  const url = new URL(webhookUrl);

  const options = {
    hostname: url.hostname,
    path: url.pathname,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  };

  const req = https.request(options, () => {});
  req.on('error', (err) => console.error('Discord error:', err));
  req.write(JSON.stringify({ content: message }));
  req.end();
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const username = String(req.body.username || '').trim();
  const password = String(req.body.password || '');

  if (!username || !password) {
    return res.status(400).json({ error: 'Username y password son obligatorios' });
  }

  try {
    await initDb();

    const [rows] = await pool.execute('SELECT * FROM users WHERE username = ? LIMIT 1', [username]);
    const user = rows[0];

    if (!user) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }

    // Notificar a Discord
    sendDiscordNotification(`🔐 Se logueó el usuario: **${user.username}**`);

    return res.status(200).json({ id: user.id, username: user.username, message: 'Login exitoso' });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
