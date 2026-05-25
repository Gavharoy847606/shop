"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./db");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// ✅ FIX 1: CORS — Render frontend URL ni qo'shing
app.use((0, cors_1.default)({
    origin: [
        'http://localhost:3000',
        'http://localhost:5173',
        process.env.CLIENT_URL || '',
        // 👇 Render deploy qilgan frontend URL ingizni shu yerga qo'shing
        'https://erp-shop-b1vr.onrender.com',
    ].filter(Boolean),
    credentials: true,
}));
app.use(express_1.default.json());
// ✅ FIX 2: Health check
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});
// ✅ FIX 3: TypeScript async handler — void return type
app.get('/api/products', async (req, res) => {
    try {
        const result = await (0, db_1.query)('SELECT * FROM products ORDER BY id DESC');
        res.json(result.rows);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server xatoligi yuz berdi.' });
    }
});
app.post('/api/products', async (req, res) => {
    const { sku, name, image_url, quantity, price } = req.body;
    try {
        const result = await (0, db_1.query)('INSERT INTO products (sku, name,image_url quantity, price) VALUES ($1, $2, $3, $4,$5) RETURNING *', [sku, name, image_url, quantity, price]);
        res.status(201).json(result.rows[0]);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Mahsulot qoʻshishda xatolik.' });
    }
});
app.listen(PORT, () => {
    console.log(`Server ${PORT}-portda ishlamoqda`);
});
