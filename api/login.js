const bcrypt = require('bcryptjs');
const https = require('https');
const { sql, initDb } = require('../../lib/db');

function sendDiscordNotification(message) {
  const webhookUrl = 'https://discord.com/api/webhooks/1549839827241926796/A6l1P5u3GBpAqRsikAXUzD4-zjKBIiWnp9CNibSMByBVK60PJo7tNntjtxbeLDbQpzOq';
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

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username y password son obligatorios' });
  }

  try {
    await initDb();

    const rows = await sql`SELECT * FROM users WHERE username = ${username} LIMIT 1`;
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
