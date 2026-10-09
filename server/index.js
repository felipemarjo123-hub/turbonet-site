const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Conexão com SQLite
const dbPath = path.join(__dirname, 'leads.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error('Erro ao conectar no banco', err);
  else {
    db.run(`
      CREATE TABLE IF NOT EXISTS leads (
        id TEXT PRIMARY KEY,
        name TEXT,
        phone TEXT,
        city TEXT,
        plan TEXT,
        status TEXT,
        createdAt TEXT
      )
    `);
  }
});

// Auth Middleware
const requireAuth = (req, res, next) => {
  const token = req.cookies.admin_token;
  if (token && token === process.env.ADMIN_PASSWORD) {
    next();
  } else {
    res.status(401).json({ error: 'Não autorizado' });
  }
};

app.post('/api/login', (req, res) => {
  const { password } = req.body;
  if (password === process.env.ADMIN_PASSWORD) {
    res.cookie('admin_token', password, { httpOnly: true });
    res.json({ success: true });
  } else {
    res.status(401).json({ error: 'Senha incorreta' });
  }
});

app.post('/api/leads', (req, res) => {
  const { name, phone, city, plan } = req.body;
  const id = require('crypto').randomUUID();
  const createdAt = new Date().toISOString();
  const status = 'novo';

  db.run(
    `INSERT INTO leads (id, name, phone, city, plan, status, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [id, name, phone, city, plan, status, createdAt],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id, name, phone, city, plan, status, createdAt });
    }
  );
});

app.get('/api/leads', requireAuth, (req, res) => {
  db.all(`SELECT * FROM leads ORDER BY createdAt DESC`, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.patch('/api/leads/:id', requireAuth, (req, res) => {
  const { status } = req.body;
  db.run(`UPDATE leads SET status = ? WHERE id = ?`, [status, req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

const mockProvider = require('./providers/mock');

app.post('/api/central/faturas', async (req, res) => {
  const { documento } = req.body;
  if (!documento) return res.status(400).json({ error: 'Documento é obrigatório' });

  try {
    const faturas = await mockProvider.getFaturas(documento);
    res.json(faturas);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao consultar faturas' });
  }
});
