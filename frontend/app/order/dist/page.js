'use client';
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var useStore_1 = require("../store/useStore");
var useAuthStore_1 = require("../store/useAuthStore");
var lucide_react_1 = require("lucide-react");
var STATUS_CONFIG = {
    completed: {
        label: 'Yakunlangan',
        icon: React.createElement(lucide_react_1.CheckCircle2, { className: "w-3 h-3" }),
        className: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
    },
    pending: {
        label: 'Kutilmoqda',
        icon: React.createElement(lucide_react_1.Clock, { className: "w-3 h-3" }),
        className: 'bg-amber-500/10 text-amber-400 border-amber-500/20'
    },
    cancelled: {
        label: 'Bekor qilindi',
        icon: React.createElement(lucide_react_1.XCircle, { className: "w-3 h-3" }),
        className: 'bg-red-500/10 text-red-400 border-red-500/20'
    }
};
function OrdersPage() {
    var _this = this;
    var _a = useStore_1.useOrdersStore(), orders = _a.orders, loading = _a.loading, error = _a.error, fetchOrders = _a.fetchOrders, updateOrderStatus = _a.updateOrderStatus;
    var user = useAuthStore_1.useAuthStore().user;
    var _b = react_1.useState(null), updatingId = _b[0], setUpdatingId = _b[1];
    react_1.useEffect(function () {
        if (user)
            fetchOrders();
    }, [user, fetchOrders]);
    // Statistika
    var totalRevenue = orders
        .filter(function (o) { return o.status === 'completed'; })
        .reduce(function (s, o) { return s + parseFloat(o.total_amount); }, 0);
    var pendingCount = orders.filter(function (o) { return o.status === 'pending'; }).length;
    var completedCount = orders.filter(function (o) { return o.status === 'completed'; }).length;
    var handleStatusChange = function (id, status) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setUpdatingId(id);
                    return [4 /*yield*/, updateOrderStatus(id, status)];
                case 1:
                    _a.sent();
                    setUpdatingId(null);
                    return [2 /*return*/];
            }
        });
    }); };
    // ─── Auth yo'q ───
    if (!user) {
        return (React.createElement("div", { className: "flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4" },
            React.createElement("div", { className: "w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center" },
                React.createElement(lucide_react_1.Lock, { className: "w-7 h-7 text-slate-600" })),
            React.createElement("h2", { className: "text-xl font-bold text-slate-300" }, "Kirish talab etiladi"),
            React.createElement("p", { className: "text-slate-500 text-sm max-w-xs" },
                "Buyurtmalarni ko'rish uchun yuqoridagi ",
                React.createElement("strong", { className: "text-emerald-400" }, "Kirish"),
                " tugmasini bosing.")));
    }
    return (React.createElement("div", { className: "space-y-8 animate-fade-in" },
        React.createElement("div", null,
            React.createElement("h1", { className: "text-2xl font-black tracking-tight bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent" }, "Buyurtmalar Boshqaruvi"),
            React.createElement("p", { className: "text-sm text-slate-400 mt-1" }, user.role === 'employee' ? 'Sizning buyurtmalaringiz' : 'Barcha buyurtmalar va ularning holati')),
        React.createElement("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4" }, [
            { label: 'Jami buyurtma', value: orders.length, icon: React.createElement(lucide_react_1.ShoppingCart, { className: "w-4 h-4 text-emerald-400" }) },
            { label: 'Yakunlangan', value: completedCount, icon: React.createElement(lucide_react_1.CheckCircle2, { className: "w-4 h-4 text-emerald-400" }) },
            { label: 'Kutilmoqda', value: pendingCount, icon: React.createElement(lucide_react_1.Clock, { className: "w-4 h-4 text-amber-400" }) },
            { label: 'Daromad', value: "$" + totalRevenue.toLocaleString(), icon: React.createElement(lucide_react_1.DollarSign, { className: "w-4 h-4 text-emerald-400" }), accent: true },
        ].map(function (s) { return (React.createElement("div", { key: s.label, className: "bg-slate-900/40 border border-slate-800 rounded-2xl p-4" },
            React.createElement("div", { className: "flex items-center justify-between mb-3" },
                React.createElement("div", { className: "w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center" }, s.icon)),
            React.createElement("div", { className: "text-2xl font-black " + (s.accent ? 'text-emerald-400' : 'text-white') }, s.value),
            React.createElement("div", { className: "text-[10px] text-slate-500 font-bold tracking-wider mt-1" }, s.label.toUpperCase()))); })),
        loading && (React.createElement("div", { className: "space-y-3" }, __spreadArrays(Array(4)).map(function (_, i) { return (React.createElement("div", { key: i, className: "h-16 bg-slate-900/40 border border-slate-800 rounded-xl animate-pulse" })); }))),
        error && (React.createElement("div", { className: "flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm" },
            React.createElement(lucide_react_1.AlertCircle, { className: "w-4 h-4 flex-shrink-0" }),
            error)),
        !loading && !error && (React.createElement("div", { className: "overflow-hidden rounded-2xl border border-emerald-500/10 bg-slate-900/40 backdrop-blur-md shadow-xl" },
            React.createElement("div", { className: "overflow-x-auto" },
                React.createElement("table", { className: "w-full text-left" },
                    React.createElement("thead", null,
                        React.createElement("tr", { className: "border-b border-emerald-500/10 bg-emerald-500/5" },
                            React.createElement("th", { className: "px-5 py-3.5 text-[10px] font-bold text-emerald-400 tracking-widest uppercase" }, "ID"),
                            (user.role === 'admin' || user.role === 'manager') && (React.createElement("th", { className: "px-5 py-3.5 text-[10px] font-bold text-emerald-400 tracking-widest uppercase" }, "Mijoz")),
                            React.createElement("th", { className: "px-5 py-3.5 text-[10px] font-bold text-emerald-400 tracking-widest uppercase" }, "Summa"),
                            React.createElement("th", { className: "px-5 py-3.5 text-[10px] font-bold text-emerald-400 tracking-widest uppercase" }, "Status"),
                            React.createElement("th", { className: "px-5 py-3.5 text-[10px] font-bold text-emerald-400 tracking-widest uppercase" }, "Sana"),
                            (user.role === 'admin' || user.role === 'manager') && (React.createElement("th", { className: "px-5 py-3.5 text-[10px] font-bold text-emerald-400 tracking-widest uppercase" }, "Amal")))),
                    React.createElement("tbody", { className: "divide-y divide-slate-800/60" },
                        orders.map(function (order) {
                            var cfg = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;
                            return (React.createElement("tr", { key: order.id, className: "hover:bg-emerald-500/5 transition-colors duration-150" },
                                React.createElement("td", { className: "px-5 py-4 font-mono text-xs text-emerald-500/70" },
                                    "#",
                                    order.id),
                                (user.role === 'admin' || user.role === 'manager') && (React.createElement("td", { className: "px-5 py-4" },
                                    React.createElement("div", { className: "text-sm font-semibold text-slate-200" }, order.client_name || '—'),
                                    React.createElement("div", { className: "text-[10px] text-slate-500" }, order.client_email))),
                                React.createElement("td", { className: "px-5 py-4 font-bold text-emerald-400" },
                                    "$",
                                    parseFloat(order.total_amount).toLocaleString()),
                                React.createElement("td", { className: "px-5 py-4" },
                                    React.createElement("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold border " + cfg.className },
                                        cfg.icon,
                                        " ",
                                        cfg.label)),
                                React.createElement("td", { className: "px-5 py-4 text-xs text-slate-400" }, new Date(order.created_at).toLocaleDateString('uz-UZ')),
                                (user.role === 'admin' || user.role === 'manager') && (React.createElement("td", { className: "px-5 py-4" }, order.status === 'pending' && (React.createElement("div", { className: "flex gap-2" },
                                    React.createElement("button", { onClick: function () { return handleStatusChange(order.id, 'completed'); }, disabled: updatingId === order.id, className: "text-[10px] font-bold px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500 hover:text-slate-950 transition-all disabled:opacity-50" }, "\u2713 Tasdiqlash"),
                                    React.createElement("button", { onClick: function () { return handleStatusChange(order.id, 'cancelled'); }, disabled: updatingId === order.id, className: "text-[10px] font-bold px-3 py-1 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all disabled:opacity-50" }, "\u2715 Rad etish")))))));
                        }),
                        orders.length === 0 && (React.createElement("tr", null,
                            React.createElement("td", { colSpan: 6, className: "px-5 py-16 text-center" },
                                React.createElement(lucide_react_1.Package, { className: "w-8 h-8 mx-auto mb-2 text-slate-700" }),
                                React.createElement("p", { className: "text-slate-500 text-sm" }, "Hozircha buyurtmalar mavjud emas")))))))))));
}
exports["default"] = OrdersPage;
