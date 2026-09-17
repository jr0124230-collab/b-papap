require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const https = require('https');
const { initDb } = require('./lib/db');

const loginHandler = require('./api/login');
const usersHandler = require('./api/users');
const statusHandler = require('./api/status/[id]');
const apartmentHandler = require('./api/apartment/[id]');
const keywordHandler = require('./api/keyword/[id]');
const pointsHandler = require('./api/points/[id]');

const app = express();
const port = Number(process.env.PORT || 3000);

function sendDiscordNotification(message) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) return;

  const url = new URL(webhookUrl);
  const request = https.request({
    hostname: url.hostname,
    path: url.pathname,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  request.on('error', (error) => console.error('Discord error:', error));
  request.write(JSON.stringify({ content: message }));
  request.end();
}

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  if (req.method === 'GET' && (req.path === '/' || req.path.endsWith('.html'))) {
    const viewName = req.path === '/' ? 'Home (index)' : req.path;
    sendDiscordNotification(`Un usuario ha abierto la vista: **${viewName}**`);
  }
  next();
});

app.post('/api/login', loginHandler);
app.all('/api/users', usersHandler);
app.all('/api/users/:id', usersHandler);
app.all('/api/status/:id', statusHandler);
app.put('/api/users/:id/password', async (req, res) => {
    const { password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    await db.query('UPDATE usuarios SET password = ? WHERE id = ?', [hashed, req.params.id]);
    res.json({ success: true });
});
app.all('/api/apartment/:id', apartmentHandler);
app.all('/api/keyword/:id', keywordHandler);
app.all('/api/points/:id', pointsHandler);
app.use(express.static(path.join(__dirname, 'public')));

initDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Servidor ejecutándose en el puerto ${port}`);
    });
  })
  .catch((error) => {
    console.error('No se pudo conectar a MySQL:', error.message);
    process.exit(1);
  });