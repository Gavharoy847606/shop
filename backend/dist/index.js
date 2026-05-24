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
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// 1. Bulutli Load Balancer uchun Health Check (Juda muhim!)
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'ERP Backend is running smoothly.' });
});
// 2. Ombor mahsulotlarini olish (GET)
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
// 3. Ombborga yangi mahsulot qo'shish (POST)
app.post('/api/products', async (req, res) => {
    const { sku, name, quantity, price } = req.body;
    try {
        const result = await (0, db_1.query)('INSERT INTO products (sku, name, quantity, price) VALUES ($1, $2, $3, $4) RETURNING *', [sku, name, quantity, price]);
        res.status(201).json(result.rows[0]);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Mahsulot qoʻshishda xatolik (SKU band boʻlishi mumkin).' });
    }
});
// Serverni ishga tushirish
app.listen(PORT, () => {
    console.log(`🚀 ERP Backend server ${PORT}-portda muvaffaqiyatli ishlamoqda...`);
});
