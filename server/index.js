const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: require('path').resolve(__dirname, '..', '.env') });

const pool = require('./db');
const { fetchAndStore, getStoredData } = require('./dataService');

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'finshark_default_secret';
const TWELVEDATA_API_KEY = process.env.TWELVEDATA_API_KEY || '';
const JWT_EXPIRES_IN = '30d';

// Middleware
app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(express.json());

// Helper: generate JWT
function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, full_name: user.full_name },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

// Helper: auth middleware
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Không có token xác thực' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token không hợp lệ hoặc đã hết hạn' });
  }
}

// ==================== AUTH ROUTES ====================

// POST /api/auth/register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, full_name } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email và mật khẩu là bắt buộc' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Mật khẩu ít nhất 6 ký tự' });
    }

    // Check if user exists
    const [existing] = await pool.execute('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(409).json({ error: 'Email đã được đăng ký' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // Insert user
    const [result] = await pool.execute(
      'INSERT INTO users (email, password_hash, full_name) VALUES (?, ?, ?)',
      [email, password_hash, full_name || null]
    );

    const user = { id: result.insertId, email, full_name: full_name || null };
    const token = generateToken(user);

    res.status(201).json({
      user,
      token,
      message: 'Đăng ký thành công',
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Lỗi server' });
  }
});

// POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email và mật khẩu là bắt buộc' });
    }

    // Find user
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Email hoặc mật khẩu không đúng' });
    }

    const user = rows[0];

    // Check password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Email hoặc mật khẩu không đúng' });
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      full_name: user.full_name,
    });

    res.json({
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
      },
      token,
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Lỗi server' });
  }
});

// GET /api/auth/me — get current user from token
app.get('/api/auth/me', authMiddleware, async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT id, email, full_name, created_at FROM users WHERE id = ?',
      [req.user.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ user: rows[0] });
  } catch (err) {
    console.error('Me error:', err);
    res.status(500).json({ error: 'Lỗi server' });
  }
});

// ==================== DATA ROUTES ====================

// POST /api/data/fetch — fetch from Twelve Data, process, store in MySQL
app.post('/api/data/fetch', authMiddleware, async (req, res) => {
  try {
    if (!TWELVEDATA_API_KEY) {
      return res.status(500).json({ error: 'TWELVEDATA_API_KEY chưa được cấu hình trên server' });
    }
    const { symbol = 'XAU/USD', interval = '5min', outputsize = 200 } = req.body;
    const data = await fetchAndStore(TWELVEDATA_API_KEY, { symbol, interval, outputsize });
    res.json({ data, count: data.length });
  } catch (err) {
    console.error('Data fetch error:', err);
    res.status(500).json({ error: err.message || 'Lỗi khi lấy dữ liệu' });
  }
});

// GET /api/data/history — get stored computed data from MySQL
app.get('/api/data/history', authMiddleware, async (req, res) => {
  try {
    const { symbol = 'XAU/USD', interval = '5min', limit = '200' } = req.query;
    const data = await getStoredData(symbol, interval, parseInt(limit));
    res.json({ data, count: data.length });
  } catch (err) {
    console.error('Data history error:', err);
    res.status(500).json({ error: err.message || 'Lỗi khi lấy dữ liệu lịch sử' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🦈 FinShark API server running on http://localhost:${PORT}`);
});
