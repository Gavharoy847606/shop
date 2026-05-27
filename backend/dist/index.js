"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./db");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'stuffus_secret';
// ── MIDDLEWARE ──
app.use((0, cors_1.default)({
    origin: [
        'http://localhost:3000',
        'http://localhost:5173',
        process.env.CLIENT_URL || '',
        'https://erp-shop-b1vr.onrender.com',
    ].filter(Boolean),
    credentials: true,
}));
app.use(express_1.default.json());
// ── AUTH MIDDLEWARE ──
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Token topilmadi' });
        return;
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch {
        res.status(401).json({ error: 'Token yaroqsiz' });
    }
};
const adminMiddleware = (req, res, next) => {
    if (req.user?.role !== 'admin') {
        res.status(403).json({ error: 'Faqat admin uchun' });
        return;
    }
    next();
};
// ════════════════════════════════════
// HEALTH CHECK
// ════════════════════════════════════
app.get('/api/health', (_req, res) => {
    res.status(200).json({ status: 'OK', message: 'Stuffus ERP ishlamoqda' });
});
// ════════════════════════════════════
// AUTH
// ════════════════════════════════════
// Register
app.post('/api/auth/register', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400).json({ error: 'Ism, email va parol kiritilishi shart' });
        return;
    }
    try {
        const existing = await (0, db_1.query)('SELECT id FROM clents WHERE email = $1', [email]);
        if (existing.rows.length > 0) {
            res.status(409).json({ error: "Bu email allaqachon ro'yxatdan o'tgan" });
            return;
        }
        const password_hash = await bcryptjs_1.default.hash(password, 10);
        const result = await (0, db_1.query)('INSERT INTO clents (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role', [name, email, password_hash, 'employee']);
        const user = result.rows[0];
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
        res.status(201).json({ user, token });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Ro'yxatdan o'tishda xatolik" });
    }
});
// Login
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ error: 'Email va parol kiritilishi shart' });
        return;
    }
    try {
        const result = await (0, db_1.query)('SELECT * FROM clents WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            res.status(401).json({ error: "Email yoki parol noto'g'ri" });
            return;
        }
        const user = result.rows[0];
        const isMatch = await bcryptjs_1.default.compare(password, user.password_hash);
        if (!isMatch) {
            res.status(401).json({ error: "Email yoki parol noto'g'ri" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Tizimga kirishda xatolik' });
    }
});
// Me
app.get('/api/auth/me', authMiddleware, async (req, res) => {
    try {
        const result = await (0, db_1.query)('SELECT id, name, email, role, created_at FROM clents WHERE id = $1', [req.user.id]);
        res.json(result.rows[0]);
    }
    catch {
        res.status(500).json({ error: 'Xatolik' });
    }
});
// ════════════════════════════════════
// PRODUCTS
// ════════════════════════════════════
// GET all
app.get('/api/products', async (req, res) => {
    try {
        const { search, sort } = req.query;
        let sql = 'SELECT * FROM products';
        const params = [];
        if (search) {
            sql += ' WHERE name ILIKE $1 OR sku ILIKE $1';
            params.push(`%${search}%`);
        }
        if (sort === 'price_asc')
            sql += ' ORDER BY price ASC';
        else if (sort === 'price_desc')
            sql += ' ORDER BY price DESC';
        else if (sort === 'qty_asc')
            sql += ' ORDER BY quantity ASC';
        else if (sort === 'qty_desc')
            sql += ' ORDER BY quantity DESC';
        else
            sql += ' ORDER BY id DESC';
        const result = await (0, db_1.query)(sql, params);
        res.json(result.rows);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server xatoligi' });
    }
});
// GET one
app.get('/api/products/:id', async (req, res) => {
    try {
        const result = await (0, db_1.query)('SELECT * FROM products WHERE id = $1', [req.params.id]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Mahsulot topilmadi' });
            return;
        }
        res.json(result.rows[0]);
    }
    catch {
        res.status(500).json({ error: 'Server xatoligi' });
    }
});
// POST — admin only
app.post('/api/products', authMiddleware, adminMiddleware, async (req, res) => {
    const { sku, name, image_url, quantity, price } = req.body;
    if (!sku || !name || !quantity || !price) {
        res.status(400).json({ error: 'SKU, nom, miqdor va narx kiritilishi shart' });
        return;
    }
    try {
        const result = await (0, db_1.query)('INSERT INTO products (sku, name, image_url, quantity, price) VALUES ($1, $2, $3, $4, $5) RETURNING *', [sku, name, image_url || null, quantity, price]);
        res.status(201).json(result.rows[0]);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Mahsulot qo'shishda xatolik (SKU band bo'lishi mumkin)" });
    }
});
// PUT — admin only
app.put('/api/products/:id', authMiddleware, adminMiddleware, async (req, res) => {
    const { sku, name, image_url, quantity, price } = req.body;
    try {
        const result = await (0, db_1.query)(`UPDATE products
       SET sku=$1, name=$2, image_url=$3, quantity=$4, price=$5, updated_at=NOW()
       WHERE id=$6 RETURNING *`, [sku, name, image_url || null, quantity, price, req.params.id]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Mahsulot topilmadi' });
            return;
        }
        res.json(result.rows[0]);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Tahrirlashda xatolik' });
    }
});
// DELETE — admin only
app.delete('/api/products/:id', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const result = await (0, db_1.query)('DELETE FROM products WHERE id=$1 RETURNING *', [req.params.id]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Mahsulot topilmadi' });
            return;
        }
        res.json({ message: "Mahsulot o'chirildi", product: result.rows[0] });
    }
    catch {
        res.status(500).json({ error: "O'chirishda xatolik" });
    }
});
// ════════════════════════════════════
// CLIENTS — admin only
// ════════════════════════════════════
app.get('/api/clients', authMiddleware, adminMiddleware, async (_req, res) => {
    try {
        const result = await (0, db_1.query)('SELECT id, name, email, role, created_at FROM clents ORDER BY id DESC');
        res.json(result.rows);
    }
    catch {
        res.status(500).json({ error: 'Server xatoligi' });
    }
});
// ════════════════════════════════════
// ORDERS
// ════════════════════════════════════
// GET
app.get('/api/orders', authMiddleware, async (req, res) => {
    try {
        let result;
        if (req.user.role === 'admin' || req.user.role === 'manager') {
            result = await (0, db_1.query)(`
        SELECT o.*, c.name as client_name, c.email as client_email
        FROM orders o
        LEFT JOIN clents c ON o.clent_id = c.id
        ORDER BY o.created_at DESC
      `);
        }
        else {
            result = await (0, db_1.query)(`
        SELECT o.*, c.name as client_name, c.email as client_email
        FROM orders o
        LEFT JOIN clents c ON o.clent_id = c.id
        WHERE o.clent_id = $1
        ORDER BY o.created_at DESC
      `, [req.user.id]);
        }
        res.json(result.rows);
    }
    catch {
        res.status(500).json({ error: 'Server xatoligi' });
    }
});
// POST
app.post('/api/orders', authMiddleware, async (req, res) => {
    const { total_amount } = req.body;
    if (!total_amount) {
        res.status(400).json({ error: 'Umumiy summa kiritilishi shart' });
        return;
    }
    try {
        const result = await (0, db_1.query)('INSERT INTO orders (clent_id, total_amount, status) VALUES ($1, $2, $3) RETURNING *', [req.user.id, total_amount, 'pending']);
        res.status(201).json(result.rows[0]);
    }
    catch {
        res.status(500).json({ error: 'Buyurtma yaratishda xatolik' });
    }
});
// PUT status
app.put('/api/orders/:id/status', authMiddleware, async (req, res) => {
    const { status } = req.body;
    const allowed = ['pending', 'completed', 'cancelled'];
    if (!allowed.includes(status)) {
        res.status(400).json({ error: "Noto'g'ri status" });
        return;
    }
    if (req.user.role !== 'admin' && req.user.role !== 'manager') {
        res.status(403).json({ error: "Ruxsat yo'q" });
        return;
    }
    try {
        const result = await (0, db_1.query)('UPDATE orders SET status=$1 WHERE id=$2 RETURNING *', [status, req.params.id]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Buyurtma topilmadi' });
            return;
        }
        res.json(result.rows[0]);
    }
    catch {
        res.status(500).json({ error: 'Xatolik' });
    }
});
// ── START ──
app.listen(PORT, () => {
    console.log(`Stuffus ERP Server ${PORT}-portda ishlamoqda`);
});
