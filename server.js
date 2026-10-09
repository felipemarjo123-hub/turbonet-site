const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const db = require('./src/server/db');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY || 'super-secret-key-for-turbonet';

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Serve ONLY the public directory for static files to prevent exposing server files & the database
app.use(express.static(path.join(__dirname, 'public')));

// --- Initialize default admin if not exists ---
const initializeAdmin = () => {
  const username = process.env.ADMIN_USER || 'admin';
  const password = process.env.ADMIN_PASSWORD || 'password123';

  setTimeout(() => {
      db.get('SELECT * FROM admins WHERE username = ?', [username], (err, row) => {
        if (err) return console.error("Admin init error:", err);
        if (!row) {
          bcrypt.hash(password, 10, (err, hash) => {
            if (err) return console.error(err);
            db.run('INSERT INTO admins (username, password) VALUES (?, ?)', [username, hash], (err) => {
              if (err) console.error(err);
              else console.log(`Default admin created (${username})`);
            });
          });
        }
      });
  }, 1000);
};
initializeAdmin();

// --- Auth Middleware ---
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (token == null) return res.status(401).json({ error: 'Unauthorized' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: 'Forbidden' });
    req.user = user;
    next();
  });
};

// --- API Routes ---

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  db.get('SELECT * FROM admins WHERE username = ?', [username], (err, user) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    bcrypt.compare(password, user.password, (err, match) => {
      if (err) return res.status(500).json({ error: 'Server error' });
      if (!match) return res.status(401).json({ error: 'Invalid credentials' });

      const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '24h' });
      res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
      res.json({ success: true });
    });
  });
});

app.post('/api/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ success: true });
});

app.get('/api/check-auth', authenticateToken, (req, res) => {
  res.json({ authenticated: true, user: req.user.username });
});

app.get('/api/leads', authenticateToken, (req, res) => {
  db.all('SELECT * FROM leads ORDER BY createdAt DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(rows);
  });
});

app.put('/api/leads/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  db.run('UPDATE leads SET status = ? WHERE id = ?', [status, id], function(err) {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (this.changes === 0) return res.status(404).json({ error: 'Lead not found' });
    res.json({ success: true });
  });
});

app.post('/api/leads', (req, res) => {
  const { name, phone, city, plan } = req.body;
  if (!name || !phone || !city || !plan) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  const status = 'novo';

  db.run(
    'INSERT INTO leads (id, name, phone, city, plan, status, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [id, name, phone, city, plan, status, createdAt],
    (err) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.status(201).json({ success: true, id });
    }
  );
});

// Fallback to serving index.html for unknown GET requests (SPA behavior)
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  } else {
    next();
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
