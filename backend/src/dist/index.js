"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express_1 = require("express");
var cors_1 = require("cors");
var bcryptjs_1 = require("bcryptjs");
var jsonwebtoken_1 = require("jsonwebtoken");
var db_1 = require("./db");
var app = express_1["default"]();
var PORT = process.env.PORT || 5000;
var JWT_SECRET = process.env.JWT_SECRET || 'stuffus_secret';
// ── MIDDLEWARE ──
app.use(cors_1["default"]({
    origin: ['https://stuffushop.eu.org', 'https://www.stuffushop.eu.org'],
    credentials: true
}));
app.use(express_1["default"].json());
// ── AUTH MIDDLEWARE ──
var authMiddleware = function (req, res, next) {
    var authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Token topilmadi' });
        return;
    }
    var token = authHeader.split(' ')[1];
    try {
        var decoded = jsonwebtoken_1["default"].verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (_a) {
        res.status(401).json({ error: 'Token yaroqsiz' });
    }
};
var adminMiddleware = function (req, res, next) {
    var _a;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== 'admin') {
        res.status(403).json({ error: 'Faqat admin uchun' });
        return;
    }
    next();
};
// ════════════════════════════════════
// HEALTH CHECK
// ════════════════════════════════════
app.get('/api/health', function (_req, res) {
    res.status(200).json({ status: 'OK', message: 'Stuffus ERP ishlamoqda' });
});
// ════════════════════════════════════
// AUTH
// ════════════════════════════════════
// Register
app.post('/api/auth/register', function (req, res) { return __awaiter(void 0, void 0, Promise, function () {
    var _a, name, email, password, existing, password_hash, result, user, token, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, email = _a.email, password = _a.password;
                if (!name || !email || !password) {
                    res.status(400).json({ error: 'Ism, email va parol kiritilishi shart' });
                    return [2 /*return*/];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                return [4 /*yield*/, db_1.query('SELECT id FROM clents WHERE email = $1', [email])];
            case 2:
                existing = _b.sent();
                if (existing.rows.length > 0) {
                    res.status(409).json({ error: "Bu email allaqachon ro'yxatdan o'tgan" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, bcryptjs_1["default"].hash(password, 10)];
            case 3:
                password_hash = _b.sent();
                return [4 /*yield*/, db_1.query('INSERT INTO clents (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role', [name, email, password_hash, 'employee'])];
            case 4:
                result = _b.sent();
                user = result.rows[0];
                token = jsonwebtoken_1["default"].sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
                res.status(201).json({ user: user, token: token });
                return [3 /*break*/, 6];
            case 5:
                err_1 = _b.sent();
                console.error(err_1.message);
                res.status(500).json({ error: "Ro'yxatdan o'tishda xatolik" });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
// Login
app.post('/api/auth/login', function (req, res) { return __awaiter(void 0, void 0, Promise, function () {
    var _a, email, password, result, user, isMatch, token, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                if (!email || !password) {
                    res.status(400).json({ error: 'Email va parol kiritilishi shart' });
                    return [2 /*return*/];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, db_1.query('SELECT * FROM clents WHERE email = $1', [email])];
            case 2:
                result = _b.sent();
                if (result.rows.length === 0) {
                    res.status(401).json({ error: "Email yoki parol noto'g'ri" });
                    return [2 /*return*/];
                }
                user = result.rows[0];
                return [4 /*yield*/, bcryptjs_1["default"].compare(password, user.password_hash)];
            case 3:
                isMatch = _b.sent();
                if (!isMatch) {
                    res.status(401).json({ error: "Email yoki parol noto'g'ri" });
                    return [2 /*return*/];
                }
                token = jsonwebtoken_1["default"].sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
                res.json({ token: token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
                return [3 /*break*/, 5];
            case 4:
                err_2 = _b.sent();
                console.error(err_2.message);
                res.status(500).json({ error: 'Tizimga kirishda xatolik' });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
// Me
app.get('/api/auth/me', authMiddleware, function (req, res) { return __awaiter(void 0, void 0, Promise, function () {
    var result, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1.query('SELECT id, name, email, role, created_at FROM clents WHERE id = $1', [req.user.id])];
            case 1:
                result = _b.sent();
                res.json(result.rows[0]);
                return [3 /*break*/, 3];
            case 2:
                _a = _b.sent();
                res.status(500).json({ error: 'Xatolik' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// ════════════════════════════════════
// PRODUCTS
// ════════════════════════════════════
// GET all
app.get('/api/products', function (req, res) { return __awaiter(void 0, void 0, Promise, function () {
    var _a, search, sort, sql, params, result, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.query, search = _a.search, sort = _a.sort;
                sql = 'SELECT * FROM products';
                params = [];
                if (search) {
                    sql += ' WHERE name ILIKE $1 OR sku ILIKE $1';
                    params.push("%" + search + "%");
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
                return [4 /*yield*/, db_1.query(sql, params)];
            case 1:
                result = _b.sent();
                res.json(result.rows);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _b.sent();
                console.error(err_3.message);
                res.status(500).json({ error: 'Server xatoligi' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// GET one
app.get('/api/products/:id', function (req, res) { return __awaiter(void 0, void 0, Promise, function () {
    var result, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1.query('SELECT * FROM products WHERE id = $1', [req.params.id])];
            case 1:
                result = _b.sent();
                if (result.rows.length === 0) {
                    res.status(404).json({ error: 'Mahsulot topilmadi' });
                    return [2 /*return*/];
                }
                res.json(result.rows[0]);
                return [3 /*break*/, 3];
            case 2:
                _a = _b.sent();
                res.status(500).json({ error: 'Server xatoligi' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// POST — admin only
app.post('/api/products', authMiddleware, adminMiddleware, function (req, res) { return __awaiter(void 0, void 0, Promise, function () {
    var _a, sku, name, image_url, quantity, price, result, err_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, sku = _a.sku, name = _a.name, image_url = _a.image_url, quantity = _a.quantity, price = _a.price;
                if (!sku || !name || !quantity || !price) {
                    res.status(400).json({ error: 'SKU, nom, miqdor va narx kiritilishi shart' });
                    return [2 /*return*/];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db_1.query('INSERT INTO products (sku, name, image_url, quantity, price) VALUES ($1, $2, $3, $4, $5) RETURNING *', [sku, name, image_url || null, quantity, price])];
            case 2:
                result = _b.sent();
                res.status(201).json(result.rows[0]);
                return [3 /*break*/, 4];
            case 3:
                err_4 = _b.sent();
                console.error(err_4.message);
                res.status(500).json({ error: "Mahsulot qo'shishda xatolik (SKU band bo'lishi mumkin)" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// PUT — admin only
app.put('/api/products/:id', authMiddleware, adminMiddleware, function (req, res) { return __awaiter(void 0, void 0, Promise, function () {
    var _a, sku, name, image_url, quantity, price, result, err_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, sku = _a.sku, name = _a.name, image_url = _a.image_url, quantity = _a.quantity, price = _a.price;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db_1.query("UPDATE products\n       SET sku=$1, name=$2, image_url=$3, quantity=$4, price=$5, updated_at=NOW()\n       WHERE id=$6 RETURNING *", [sku, name, image_url || null, quantity, price, req.params.id])];
            case 2:
                result = _b.sent();
                if (result.rows.length === 0) {
                    res.status(404).json({ error: 'Mahsulot topilmadi' });
                    return [2 /*return*/];
                }
                res.json(result.rows[0]);
                return [3 /*break*/, 4];
            case 3:
                err_5 = _b.sent();
                console.error(err_5.message);
                res.status(500).json({ error: 'Tahrirlashda xatolik' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// DELETE — admin only
app["delete"]('/api/products/:id', authMiddleware, adminMiddleware, function (req, res) { return __awaiter(void 0, void 0, Promise, function () {
    var result, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1.query('DELETE FROM products WHERE id=$1 RETURNING *', [req.params.id])];
            case 1:
                result = _b.sent();
                if (result.rows.length === 0) {
                    res.status(404).json({ error: 'Mahsulot topilmadi' });
                    return [2 /*return*/];
                }
                res.json({ message: "Mahsulot o'chirildi", product: result.rows[0] });
                return [3 /*break*/, 3];
            case 2:
                _a = _b.sent();
                res.status(500).json({ error: "O'chirishda xatolik" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// ════════════════════════════════════
// CLIENTS — admin only
// ════════════════════════════════════
app.get('/api/clients', authMiddleware, adminMiddleware, function (_req, res) { return __awaiter(void 0, void 0, Promise, function () {
    var result, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1.query('SELECT id, name, email, role, created_at FROM clents ORDER BY id DESC')];
            case 1:
                result = _b.sent();
                res.json(result.rows);
                return [3 /*break*/, 3];
            case 2:
                _a = _b.sent();
                res.status(500).json({ error: 'Server xatoligi' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// ════════════════════════════════════
// ORDERS
// ════════════════════════════════════
// GET
app.get('/api/orders', authMiddleware, function (req, res) { return __awaiter(void 0, void 0, Promise, function () {
    var result, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                result = void 0;
                if (!(req.user.role === 'admin' || req.user.role === 'manager')) return [3 /*break*/, 2];
                return [4 /*yield*/, db_1.query("\n        SELECT o.*, c.name as client_name, c.email as client_email\n        FROM orders o\n        LEFT JOIN clents c ON o.clent_id = c.id\n        ORDER BY o.created_at DESC\n      ")];
            case 1:
                result = _b.sent();
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, db_1.query("\n        SELECT o.*, c.name as client_name, c.email as client_email\n        FROM orders o\n        LEFT JOIN clents c ON o.clent_id = c.id\n        WHERE o.clent_id = $1\n        ORDER BY o.created_at DESC\n      ", [req.user.id])];
            case 3:
                result = _b.sent();
                _b.label = 4;
            case 4:
                res.json(result.rows);
                return [3 /*break*/, 6];
            case 5:
                _a = _b.sent();
                res.status(500).json({ error: 'Server xatoligi' });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
// POST
app.post('/api/orders', authMiddleware, function (req, res) { return __awaiter(void 0, void 0, Promise, function () {
    var total_amount, result, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                total_amount = req.body.total_amount;
                if (!total_amount) {
                    res.status(400).json({ error: 'Umumiy summa kiritilishi shart' });
                    return [2 /*return*/];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db_1.query('INSERT INTO orders (clent_id, total_amount, status) VALUES ($1, $2, $3) RETURNING *', [req.user.id, total_amount, 'pending'])];
            case 2:
                result = _b.sent();
                res.status(201).json(result.rows[0]);
                return [3 /*break*/, 4];
            case 3:
                _a = _b.sent();
                res.status(500).json({ error: 'Buyurtma yaratishda xatolik' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// PUT status
app.put('/api/orders/:id/status', authMiddleware, function (req, res) { return __awaiter(void 0, void 0, Promise, function () {
    var status, allowed, result, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                status = req.body.status;
                allowed = ['pending', 'completed', 'cancelled'];
                if (!allowed.includes(status)) {
                    res.status(400).json({ error: "Noto'g'ri status" });
                    return [2 /*return*/];
                }
                if (req.user.role !== 'admin' && req.user.role !== 'manager') {
                    res.status(403).json({ error: "Ruxsat yo'q" });
                    return [2 /*return*/];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db_1.query('UPDATE orders SET status=$1 WHERE id=$2 RETURNING *', [status, req.params.id])];
            case 2:
                result = _b.sent();
                if (result.rows.length === 0) {
                    res.status(404).json({ error: 'Buyurtma topilmadi' });
                    return [2 /*return*/];
                }
                res.json(result.rows[0]);
                return [3 /*break*/, 4];
            case 3:
                _a = _b.sent();
                res.status(500).json({ error: 'Xatolik' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// ── START ──
app.listen(PORT, function () {
    console.log("Stuffus ERP Server " + PORT + "-portda ishlamoqda");
});
