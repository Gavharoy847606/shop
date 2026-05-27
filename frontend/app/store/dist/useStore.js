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
exports.__esModule = true;
exports.useOrdersStore = exports.useStore = void 0;
var zustand_1 = require("zustand");
var useAuthStore_1 = require("./useAuthStore");
var BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'https://erp-backend-815e.onrender.com';
// Token olish helper
function getToken() {
    return useAuthStore_1.useAuthStore.getState().token;
}
function authHeaders() {
    var token = getToken();
    return __assign({ 'Content-Type': 'application/json' }, (token ? { Authorization: "Bearer " + token } : {}));
}
exports.useStore = zustand_1.create(function (set, get) { return ({
    products: [],
    loading: false,
    error: null,
    fetchProducts: function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, data, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    set({ loading: true, error: null });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(BACKEND_URL + "/api/products")];
                case 2:
                    res = _a.sent();
                    if (!res.ok)
                        throw new Error('Mahsulotlarni yuklashda xatolik');
                    return [4 /*yield*/, res.json()];
                case 3:
                    data = _a.sent();
                    set({ products: data, loading: false });
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    set({ error: err_1.message, loading: false });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); },
    addProduct: function (product) { return __awaiter(void 0, void 0, void 0, function () {
        var res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch(BACKEND_URL + "/api/products", {
                            method: 'POST',
                            headers: authHeaders(),
                            body: JSON.stringify(product)
                        })];
                case 1:
                    res = _b.sent();
                    if (res.status === 401 || res.status === 403) {
                        useAuthStore_1.useAuthStore.getState().logout();
                        return [2 /*return*/, false];
                    }
                    if (!res.ok)
                        return [2 /*return*/, false];
                    return [4 /*yield*/, get().fetchProducts()];
                case 2:
                    _b.sent();
                    return [2 /*return*/, true];
                case 3:
                    _a = _b.sent();
                    return [2 /*return*/, false];
                case 4: return [2 /*return*/];
            }
        });
    }); },
    updateProduct: function (id, product) { return __awaiter(void 0, void 0, void 0, function () {
        var res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch(BACKEND_URL + "/api/products/" + id, {
                            method: 'PUT',
                            headers: authHeaders(),
                            body: JSON.stringify(product)
                        })];
                case 1:
                    res = _b.sent();
                    if (res.status === 401 || res.status === 403) {
                        useAuthStore_1.useAuthStore.getState().logout();
                        return [2 /*return*/, false];
                    }
                    if (!res.ok)
                        return [2 /*return*/, false];
                    return [4 /*yield*/, get().fetchProducts()];
                case 2:
                    _b.sent();
                    return [2 /*return*/, true];
                case 3:
                    _a = _b.sent();
                    return [2 /*return*/, false];
                case 4: return [2 /*return*/];
            }
        });
    }); },
    deleteProduct: function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch(BACKEND_URL + "/api/products/" + id, {
                            method: 'DELETE',
                            headers: authHeaders()
                        })];
                case 1:
                    res = _b.sent();
                    if (!res.ok)
                        return [2 /*return*/, false];
                    return [4 /*yield*/, get().fetchProducts()];
                case 2:
                    _b.sent();
                    return [2 /*return*/, true];
                case 3:
                    _a = _b.sent();
                    return [2 /*return*/, false];
                case 4: return [2 /*return*/];
            }
        });
    }); }
}); });
exports.useOrdersStore = zustand_1.create(function (set, get) { return ({
    orders: [],
    loading: false,
    error: null,
    fetchOrders: function () { return __awaiter(void 0, void 0, void 0, function () {
        var token, res, data, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = getToken();
                    if (!token) {
                        set({ error: 'Avval tizimga kiring', loading: false });
                        return [2 /*return*/];
                    }
                    set({ loading: true, error: null });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(BACKEND_URL + "/api/orders", {
                            headers: authHeaders()
                        })];
                case 2:
                    res = _a.sent();
                    if (res.status === 401) {
                        useAuthStore_1.useAuthStore.getState().logout();
                        set({ error: "Sessiya tugagan, qayta kiring", loading: false });
                        return [2 /*return*/];
                    }
                    if (!res.ok)
                        throw new Error('Buyurtmalarni yuklashda xatolik');
                    return [4 /*yield*/, res.json()];
                case 3:
                    data = _a.sent();
                    set({ orders: data, loading: false });
                    return [3 /*break*/, 5];
                case 4:
                    err_2 = _a.sent();
                    set({ error: err_2.message, loading: false });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); },
    updateOrderStatus: function (id, status) { return __awaiter(void 0, void 0, void 0, function () {
        var res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch(BACKEND_URL + "/api/orders/" + id + "/status", {
                            method: 'PUT',
                            headers: authHeaders(),
                            body: JSON.stringify({ status: status })
                        })];
                case 1:
                    res = _b.sent();
                    if (!res.ok)
                        return [2 /*return*/, false];
                    return [4 /*yield*/, get().fetchOrders()];
                case 2:
                    _b.sent();
                    return [2 /*return*/, true];
                case 3:
                    _a = _b.sent();
                    return [2 /*return*/, false];
                case 4: return [2 /*return*/];
            }
        });
    }); }
}); });
