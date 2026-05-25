'use client';
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var useStore_1 = require("./store/useStore");
var lucide_react_1 = require("lucide-react");
function getProductImage(name) {
    var n = name.toLowerCase();
    if (n.includes('laptop') || n.includes('dell') || n.includes('macbook'))
        return 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80';
    if (n.includes('monitor') || n.includes('lg'))
        return 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80';
    if (n.includes('chair'))
        return 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=400&q=80';
    if (n.includes('iphone') || n.includes('phone'))
        return 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400&q=80';
    if (n.includes('keyboard'))
        return 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80';
    if (n.includes('mouse'))
        return 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80';
    if (n.includes('printer'))
        return 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400&q=80';
    if (n.includes('headphone') || n.includes('sony') || n.includes('audio'))
        return 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80';
    if (n.includes('tablet') || n.includes('samsung') || n.includes('tab') || n.includes('ipad'))
        return 'https://images.unsplash.com/photo-1544244015-0df4512b7049?w=400&q=80';
    if (n.includes('desk'))
        return 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80';
    if (n.includes('hub') || n.includes('usb') || n.includes('adapter'))
        return 'https://images.unsplash.com/photo-1625961332771-3f40b0e2bdcf?w=400&q=80';
    if (n.includes('ssd') || n.includes('drive'))
        return 'https://images.unsplash.com/photo-1597838816882-4435b1977fbe?w=400&q=80';
    if (n.includes('watch') || n.includes('apple watch'))
        return 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&q=80';
    if (n.includes('power') || n.includes('strip') || n.includes('plug'))
        return 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80';
    return 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&q=80';
}
function StuffusShop() {
    var _this = this;
    var _a = useStore_1.useStore(), products = _a.products, loading = _a.loading, error = _a.error, fetchProducts = _a.fetchProducts, addProduct = _a.addProduct;
    var _b = react_1.useState(''), sku = _b[0], setSku = _b[1];
    var _c = react_1.useState(''), name = _c[0], setName = _c[1];
    var _d = react_1.useState(0), quantity = _d[0], setQuantity = _d[1];
    var _e = react_1.useState(''), price = _e[0], setPrice = _e[1];
    var _f = react_1.useState(''), searchQuery = _f[0], setSearchQuery = _f[1];
    var _g = react_1.useState('all'), activeCategory = _g[0], setActiveCategory = _g[1];
    var _h = react_1.useState({}), imgErrors = _h[0], setImgErrors = _h[1];
    react_1.useEffect(function () { fetchProducts(); }, [fetchProducts]);
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var success;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    if (!sku || !name || quantity <= 0 || !price)
                        return [2 /*return*/];
                    return [4 /*yield*/, addProduct({ sku: sku, name: name, quantity: quantity, price: price })];
                case 1:
                    success = _a.sent();
                    if (success) {
                        setSku('');
                        setName('');
                        setQuantity(0);
                        setPrice('');
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var filteredProducts = products.filter(function (p) {
        return p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    });
    var totalValue = products.reduce(function (s, p) { return s + parseFloat(p.price) * p.quantity; }, 0);
    var lowStock = products.filter(function (p) { return p.quantity > 0 && p.quantity <= 5; }).length;
    return (React.createElement("div", { style: { minHeight: '100vh', background: '#f8f9fc', color: '#0f0f14', fontFamily: "'Inter', -apple-system, sans-serif" } },
        React.createElement("nav", { style: {
                background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(0,0,0,0.06)',
                position: 'sticky', top: 0, zIndex: 50, padding: '0 2.5rem',
                boxShadow: '0 1px 0 rgba(0,0,0,0.05)'
            } },
            React.createElement("div", { style: { maxWidth: 1320, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 64 } },
                React.createElement("div", { style: { display: 'flex', alignItems: 'center', gap: 48 } },
                    React.createElement("div", { style: { display: 'flex', alignItems: 'center', gap: 10 } },
                        React.createElement("div", { style: {
                                width: 36, height: 36, background: '#0f0f14', borderRadius: 10,
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            } },
                            React.createElement("span", { style: { color: '#fff', fontSize: 14, fontWeight: 900 } }, "S")),
                        React.createElement("span", { style: { fontSize: 16, fontWeight: 800, letterSpacing: '-0.4px', color: '#0f0f14' } }, "Stuffus shop")),
                    React.createElement("div", { style: { display: 'flex', gap: 32, fontSize: 14, fontWeight: 500 } }, ['Boshqaruv', 'Ombor', 'Tarmoq hisoboti'].map(function (item, i) { return (React.createElement("span", { key: item, style: {
                            color: i === 0 ? '#0f0f14' : '#9ca3af', cursor: 'pointer',
                            paddingBottom: 3, borderBottom: i === 0 ? '2px solid #0f0f14' : 'none',
                            transition: 'color 0.15s'
                        } }, item)); }))),
                React.createElement("div", { style: { display: 'flex', alignItems: 'center', gap: 12 } },
                    React.createElement("div", { style: {
                            display: 'flex', alignItems: 'center', gap: 6,
                            background: '#f0fdf4', color: '#16a34a',
                            padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600,
                            border: '1px solid #bbf7d0'
                        } },
                        React.createElement(lucide_react_1.Activity, { style: { width: 12, height: 12 } }),
                        "Render Cloud DB: Onlayn"),
                    React.createElement("div", { style: {
                            width: 36, height: 36, borderRadius: '50%',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            cursor: 'pointer'
                        } })))),
        React.createElement("div", { style: { background: '#fff', borderBottom: '1px solid rgba(0,0,0,0.06)', padding: '64px 2.5rem 72px', overflow: 'hidden', position: 'relative' } },
            React.createElement("div", { style: { position: 'absolute', top: -120, right: -80, width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 65%)', pointerEvents: 'none' } }),
            React.createElement("div", { style: { position: 'absolute', bottom: -60, left: '30%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 65%)', pointerEvents: 'none' } }),
            React.createElement("div", { style: { maxWidth: 1320, margin: '0 auto', position: 'relative', zIndex: 1 } },
                React.createElement("div", { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' } },
                    React.createElement("div", null,
                        React.createElement("div", { style: {
                                display: 'inline-flex', alignItems: 'center', gap: 6,
                                background: '#f5f3ff', border: '1px solid #e9d5ff',
                                borderRadius: 20, padding: '5px 14px', fontSize: 12, fontWeight: 600,
                                color: '#7c3aed', marginBottom: 28
                            } },
                            React.createElement("span", { style: { fontSize: 13 } }, "\u2726"),
                            "Premium Inventory Suite \u00B7 v2.6"),
                        React.createElement("h1", { style: { fontSize: 'clamp(2.6rem,4.5vw,3.8rem)', fontWeight: 900, lineHeight: 1.08, letterSpacing: '-2.5px', marginBottom: 20, color: '#0f0f14' } },
                            "Mahsulot sotuvini",
                            React.createElement("br", null),
                            "bir joydan",
                            React.createElement("br", null),
                            React.createElement("span", { style: { color: '#6366f1' } }, "boshqaring.")),
                        React.createElement("p", { style: { fontSize: 15, color: '#6b7280', lineHeight: 1.75, marginBottom: 36, maxWidth: 460 } }, "Bulutli infratuzilma, real vaqt rejimidagi inventarizatsiya va premium tahlil \u2014 barchasi sizning omboringiz va sotuv jamoangizni tezlashtirish uchun."),
                        React.createElement("div", { style: {
                                display: 'flex', alignItems: 'center', gap: 10,
                                background: '#f9fafb', border: '1.5px solid #e5e7eb',
                                borderRadius: 50, padding: '6px 6px 6px 18px',
                                maxWidth: 480, boxShadow: '0 1px 4px rgba(0,0,0,0.05)'
                            } },
                            React.createElement(lucide_react_1.Search, { style: { width: 16, height: 16, color: '#9ca3af', flexShrink: 0 } }),
                            React.createElement("input", { type: "text", placeholder: "Mahsulot nomi yoki SKU bo'yicha qidirish...", value: searchQuery, onChange: function (e) { return setSearchQuery(e.target.value); }, style: {
                                    flex: 1, background: 'transparent', border: 'none', outline: 'none',
                                    fontSize: 13, color: '#0f0f14', caretColor: '#6366f1'
                                } }),
                            React.createElement("button", { style: {
                                    background: '#0f0f14', color: '#fff', border: 'none',
                                    borderRadius: 40, padding: '9px 22px', fontSize: 13,
                                    fontWeight: 700, cursor: 'pointer', letterSpacing: '-0.2px'
                                } }, "Qidirish")),
                        React.createElement("div", { style: { display: 'flex', gap: 8, marginTop: 32 } }, [
                            { label: 'MAHSULOTLAR', value: products.length, icon: React.createElement(lucide_react_1.Package, { style: { width: 16, height: 16 } }) },
                            { label: 'BU OY SOTUV', value: '+18%', icon: React.createElement(lucide_react_1.TrendingUp, { style: { width: 16, height: 16 } }), accent: true },
                            { label: 'UPTIME', value: '99.9%', icon: React.createElement(lucide_react_1.Shield, { style: { width: 16, height: 16 } }) },
                        ].map(function (s) { return (React.createElement("div", { key: s.label, style: {
                                flex: 1, background: '#f9fafb', border: '1px solid #e5e7eb',
                                borderRadius: 16, padding: '16px 18px'
                            } },
                            React.createElement("div", { style: { color: '#9ca3af', marginBottom: 8 } }, s.icon),
                            React.createElement("div", { style: { fontSize: 22, fontWeight: 900, letterSpacing: '-1px', color: s.accent ? '#16a34a' : '#0f0f14' } }, s.value),
                            React.createElement("div", { style: { fontSize: 10, fontWeight: 700, color: '#9ca3af', letterSpacing: 1, marginTop: 3 } }, s.label))); }))),
                    React.createElement("div", { style: { position: 'relative' } },
                        React.createElement("div", { style: {
                                background: 'linear-gradient(145deg, #f0f4ff 0%, #f8f0ff 50%, #fff5f0 100%)',
                                borderRadius: 28, overflow: 'hidden', position: 'relative',
                                aspectRatio: '4/3',
                                boxShadow: '0 32px 80px rgba(99,102,241,0.15), 0 8px 24px rgba(0,0,0,0.08)',
                                border: '1px solid rgba(255,255,255,0.8)'
                            } },
                            React.createElement("div", { style: {
                                    position: 'absolute', top: 18, right: 18, zIndex: 10,
                                    background: '#0f0f14', color: '#fff',
                                    fontSize: 10, fontWeight: 800, letterSpacing: 1.5,
                                    padding: '6px 14px', borderRadius: 20
                                } }, "LIVE INVENTORY"),
                            React.createElement("div", { style: { position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                                React.createElement("img", { src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80", alt: "hero products", style: { width: '75%', height: '75%', objectFit: 'contain', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.18))' }, onError: function (e) { e.target.src = 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80'; } })),
                            React.createElement("div", { style: {
                                    position: 'absolute', bottom: 20, left: 20,
                                    background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)',
                                    borderRadius: 16, padding: '12px 16px',
                                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                                    display: 'flex', alignItems: 'center', gap: 12
                                } },
                                React.createElement("div", { style: {
                                        width: 36, height: 36, background: '#f0fdf4', borderRadius: 10,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    } },
                                    React.createElement(lucide_react_1.TrendingUp, { style: { width: 18, height: 18, color: '#16a34a' } })),
                                React.createElement("div", null,
                                    React.createElement("div", { style: { fontSize: 10, fontWeight: 700, color: '#9ca3af', letterSpacing: 0.5 } }, "BUGUNGI SOTUV"),
                                    React.createElement("div", { style: { fontSize: 15, fontWeight: 900, color: '#0f0f14', letterSpacing: '-0.5px' } },
                                        "$",
                                        (totalValue / 1000).toFixed(1),
                                        "k \u00A0\u00B7\u00A0 ",
                                        React.createElement("span", { style: { color: '#16a34a' } }, "+24%"))))))))),
        React.createElement("main", { style: { maxWidth: 1320, margin: '0 auto', padding: '40px 2.5rem 80px' } },
            React.createElement("div", { style: { display: 'grid', gridTemplateColumns: '260px 1fr', gap: 28, alignItems: 'start' } },
                React.createElement("div", { style: { display: 'flex', flexDirection: 'column', gap: 16 } },
                    React.createElement("div", { style: { background: '#fff', border: '1px solid #e5e7eb', borderRadius: 20, padding: '18px 14px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' } },
                        React.createElement("div", { style: { fontSize: 10, fontWeight: 800, color: '#9ca3af', letterSpacing: 2, marginBottom: 12 } }, "KATEGORIYALAR"),
                        [
                            { id: 'all', label: 'Barcha mahsulotlar', icon: React.createElement(lucide_react_1.Package, { style: { width: 14, height: 14 } }), count: products.length },
                            { id: 'home', label: 'Maishiy texnika', icon: React.createElement(lucide_react_1.Home, { style: { width: 14, height: 14 } }) },
                            { id: 'audio', label: 'Audio jihozlar', icon: React.createElement(lucide_react_1.Music, { style: { width: 14, height: 14 } }) },
                            { id: 'tech', label: 'Elektronika', icon: React.createElement(lucide_react_1.Smartphone, { style: { width: 14, height: 14 } }) },
                        ].map(function (cat) { return (React.createElement("div", { key: cat.id, onClick: function () { return setActiveCategory(cat.id); }, style: {
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                padding: '9px 12px', borderRadius: 12, cursor: 'pointer', marginBottom: 3,
                                background: activeCategory === cat.id ? '#f5f3ff' : 'transparent',
                                color: activeCategory === cat.id ? '#6366f1' : '#6b7280',
                                fontWeight: 600, fontSize: 13, transition: 'all 0.15s'
                            } },
                            React.createElement("span", { style: { display: 'flex', alignItems: 'center', gap: 8 } },
                                cat.icon,
                                cat.label),
                            cat.count !== undefined && (React.createElement("span", { style: {
                                    background: activeCategory === cat.id ? '#6366f1' : '#f3f4f6',
                                    color: activeCategory === cat.id ? '#fff' : '#6b7280',
                                    fontSize: 10, fontWeight: 800, padding: '2px 7px', borderRadius: 8
                                } }, cat.count)))); })),
                    React.createElement("div", { style: { background: '#fff', border: '1px solid #e5e7eb', borderRadius: 20, padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' } },
                        React.createElement("h3", { style: { fontSize: 13, fontWeight: 800, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6, color: '#0f0f14' } },
                            React.createElement(lucide_react_1.PlusCircle, { style: { width: 14, height: 14, color: '#6366f1' } }),
                            " Tovar qo'shish"),
                        React.createElement("form", { onSubmit: handleSubmit, style: { display: 'flex', flexDirection: 'column', gap: 11 } },
                            [
                                { label: 'SKU KOD', val: sku, set: setSku, ph: 'SKU-001', mono: true },
                                { label: 'MAHSULOT NOMI', val: name, set: setName, ph: 'Headphone R175' },
                            ].map(function (f) { return (React.createElement("div", { key: f.label },
                                React.createElement("label", { style: { fontSize: 10, fontWeight: 700, color: '#9ca3af', letterSpacing: 1, display: 'block', marginBottom: 5 } }, f.label),
                                React.createElement("input", { type: "text", value: f.val, onChange: function (e) { return f.set(e.target.value); }, required: true, placeholder: f.ph, style: {
                                        width: '100%', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 10,
                                        padding: '8px 12px', fontSize: 12, color: '#0f0f14', outline: 'none',
                                        fontFamily: f.mono ? 'monospace' : 'inherit',
                                        boxSizing: 'border-box',
                                        transition: 'border-color 0.15s'
                                    } }))); }),
                            React.createElement("div", { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 } }, [
                                { label: 'MIQDOR', val: quantity, isNum: true, set: function (v) { return setQuantity(Number(v)); } },
                                { label: 'NARX ($)', val: price, isNum: false, ph: '29.90', set: setPrice },
                            ].map(function (f) { return (React.createElement("div", { key: f.label },
                                React.createElement("label", { style: { fontSize: 10, fontWeight: 700, color: '#9ca3af', letterSpacing: 1, display: 'block', marginBottom: 5 } }, f.label),
                                React.createElement("input", { type: f.isNum ? 'number' : 'text', value: f.val, onChange: function (e) { return f.set(e.target.value); }, required: true, placeholder: f.ph || '', style: {
                                        width: '100%', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 10,
                                        padding: '8px 12px', fontSize: 12, color: '#0f0f14', outline: 'none',
                                        boxSizing: 'border-box'
                                    } }))); })),
                            React.createElement("button", { type: "submit", style: {
                                    width: '100%', background: '#0f0f14', color: '#fff',
                                    border: 'none', borderRadius: 12, padding: '10px',
                                    fontSize: 11, fontWeight: 800, cursor: 'pointer', letterSpacing: 1, marginTop: 4,
                                    transition: 'opacity 0.15s'
                                } }, "BAZAGA JOYLASH")))),
                React.createElement("div", null,
                    React.createElement("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 } },
                        React.createElement("div", { style: { fontSize: 13, color: '#9ca3af', fontWeight: 600 } },
                            filteredProducts.length,
                            " ta mahsulot"),
                        lowStock > 0 && (React.createElement("div", { style: {
                                background: '#fef3c7', border: '1px solid #fde68a', color: '#92400e',
                                fontSize: 11, fontWeight: 700, padding: '5px 12px', borderRadius: 20
                            } },
                            "\u26A0 ",
                            lowStock,
                            " ta kam zaxira"))),
                    loading && (React.createElement("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 } }, __spreadArrays(Array(6)).map(function (_, i) { return (React.createElement("div", { key: i, style: { background: '#f3f4f6', borderRadius: 20, height: 300, animation: 'pulse 1.5s ease-in-out infinite' } })); }))),
                    error && (React.createElement("div", { style: { background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 16, padding: '14px 18px', color: '#dc2626', fontSize: 13 } },
                        "Xatolik: ",
                        error)),
                    !loading && filteredProducts.length === 0 && (React.createElement("div", { style: { background: '#fff', borderRadius: 24, border: '1px solid #e5e7eb', padding: 60, textAlign: 'center', color: '#9ca3af', fontSize: 14 } },
                        React.createElement(lucide_react_1.Package, { style: { width: 36, height: 36, margin: '0 auto 12px', opacity: 0.3 } }),
                        React.createElement("div", null, "Mahsulot topilmadi"))),
                    React.createElement("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 } }, filteredProducts.map(function (product) {
                        var isLow = product.quantity > 0 && product.quantity <= 5;
                        var isOut = product.quantity === 0;
                        var imgSrc = imgErrors[product.sku] ? null : (product.image_url || null);
                        return (React.createElement("div", { key: product.id, style: {
                                background: '#fff', border: '1px solid #e5e7eb', borderRadius: 20,
                                overflow: 'hidden', display: 'flex', flexDirection: 'column',
                                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                                transition: 'transform 0.2s ease, box-shadow 0.2s ease', cursor: 'pointer'
                            }, onMouseEnter: function (e) {
                                e.currentTarget.style.transform = 'translateY(-3px)';
                                e.currentTarget.style.boxShadow = '0 12px 32px rgba(99,102,241,0.12), 0 4px 12px rgba(0,0,0,0.06)';
                            }, onMouseLeave: function (e) {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)';
                            } },
                            React.createElement("div", { style: { position: 'relative', height: 168, background: 'linear-gradient(145deg, #f8f9ff, #f0f4ff)', overflow: 'hidden' } },
                                imgSrc ? (React.createElement("img", { src: imgSrc, alt: product.name, style: { width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.35s ease' }, onError: function () { return setImgErrors(function (prev) {
                                        var _a;
                                        return (__assign(__assign({}, prev), (_a = {}, _a[product.sku] = true, _a)));
                                    }); }, onMouseEnter: function (e) { return e.target.style.transform = 'scale(1.06)'; }, onMouseLeave: function (e) { return e.target.style.transform = 'scale(1)'; } })) : (React.createElement("div", { style: { width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                                    React.createElement(lucide_react_1.Package, { style: { width: 44, height: 44, color: '#d1d5db' } }))),
                                React.createElement("div", { style: {
                                        position: 'absolute', top: 10, right: 10,
                                        background: isOut ? '#fef2f2' : isLow ? '#fffbeb' : '#f0fdf4',
                                        color: isOut ? '#dc2626' : isLow ? '#d97706' : '#16a34a',
                                        border: "1px solid " + (isOut ? '#fecaca' : isLow ? '#fde68a' : '#bbf7d0'),
                                        fontSize: 9, fontWeight: 800, padding: '3px 9px',
                                        borderRadius: 20, letterSpacing: 0.5
                                    } }, isOut ? 'TUGAGAN' : isLow ? 'KAM QOLDI' : 'MAVJUD')),
                            React.createElement("div", { style: { padding: '14px 16px', flex: 1, display: 'flex', flexDirection: 'column' } },
                                React.createElement("span", { style: {
                                        fontSize: 10, fontWeight: 700, color: '#6366f1',
                                        background: '#f5f3ff', padding: '2px 8px',
                                        borderRadius: 6, display: 'inline-block',
                                        marginBottom: 8, fontFamily: 'monospace'
                                    } }, product.sku),
                                React.createElement("h4", { style: { fontSize: 13, fontWeight: 700, color: '#0f0f14', lineHeight: 1.35, marginBottom: 6, flex: 1 } }, product.name),
                                React.createElement("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 12 } },
                                    React.createElement("div", null,
                                        React.createElement("div", { style: { fontSize: 19, fontWeight: 900, color: '#0f0f14', letterSpacing: '-0.5px' } },
                                            "$",
                                            parseFloat(product.price).toFixed(2)),
                                        React.createElement("div", { style: { fontSize: 10, color: '#9ca3af', fontWeight: 600 } },
                                            product.quantity,
                                            " dona zaxira"))),
                                React.createElement("div", { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, borderTop: '1px solid #f3f4f6', paddingTop: 12 } },
                                    React.createElement("button", { style: {
                                            background: '#f9fafb', border: '1px solid #e5e7eb', color: '#374151',
                                            borderRadius: 10, padding: '7px 0', fontSize: 11, fontWeight: 700, cursor: 'pointer',
                                            transition: 'background 0.15s'
                                        } }, "Ko'rish"),
                                    React.createElement("button", { style: {
                                            background: '#0f0f14', border: 'none', color: '#fff',
                                            borderRadius: 10, padding: '7px 0', fontSize: 11, fontWeight: 700, cursor: 'pointer',
                                            transition: 'opacity 0.15s'
                                        } }, "Tahrirlash")))));
                    }))))),
        React.createElement("footer", { style: { borderTop: '1px solid #e5e7eb', background: '#fff', padding: '28px 2.5rem' } },
            React.createElement("div", { style: { maxWidth: 1320, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
                React.createElement("div", { style: { fontSize: 14, fontWeight: 800, color: '#0f0f14' } }, "Stuffus shop"),
                React.createElement("div", { style: { fontSize: 12, color: '#9ca3af' } }, "\u00A9 2026 Stuffus Shop. Hamma huquqlar himoyalangan."))),
        React.createElement("style", null, "\n        * { box-sizing: border-box; margin: 0; padding: 0; }\n        input::placeholder { color: #9ca3af !important; }\n        @keyframes pulse { 0%,100%{opacity:.5} 50%{opacity:.8} }\n      ")));
}
exports["default"] = StuffusShop;
