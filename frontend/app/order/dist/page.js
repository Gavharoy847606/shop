'use client';
"use strict";
exports.__esModule = true;
var react_1 = require("react");
function OrdersPage() {
    var _a = react_1.useState([]), orders = _a[0], setOrders = _a[1];
    var _b = react_1.useState(true), loading = _b[0], setLoading = _b[1];
    var _c = react_1.useState(''), error = _c[0], setError = _c[1];
    react_1.useEffect(function () {
        // Renderdagi backend manzilingiz (muhit o'zgaruvchisidan yoki to'g'ridan-to'g'ri)
        var backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://shop-backend-yax6.onrender.com';
        fetch(backendUrl + "/api/orders")
            .then(function (res) {
            if (!res.ok)
                throw new Error('Maʼlumotlarni yuklashda xatolik yuz berdi');
            return res.json();
        })
            .then(function (data) {
            setOrders(data);
            setLoading(false);
        })["catch"](function (err) {
            setError(err.message);
            setLoading(false);
        });
    }, []);
    return (React.createElement("div", { className: "space-y-6 animate-fade-in" },
        React.createElement("div", null,
            React.createElement("h1", { className: "text-2xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent" }, "Buyurtmalar Boshqaruvi"),
            React.createElement("p", { className: "text-sm text-slate-400" }, "Tizimdagi barcha buyurtmalar va ularning statuslari")),
        loading && (React.createElement("div", { className: "flex justify-center py-12" },
            React.createElement("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500" }))),
        error && (React.createElement("div", { className: "p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm" }, error)),
        !loading && !error && (React.createElement("div", { className: "overflow-hidden rounded-xl border border-emerald-500/10 bg-slate-900/40 backdrop-blur-md shadow-xl" },
            React.createElement("div", { className: "overflow-x-auto" },
                React.createElement("table", { className: "w-full text-left border-collapse" },
                    React.createElement("thead", null,
                        React.createElement("tr", { className: "border-b border-emerald-500/10 bg-emerald-500/5 text-xs font-semibold uppercase tracking-wider text-emerald-400" },
                            React.createElement("th", { className: "p-4" }, "ID"),
                            React.createElement("th", { className: "p-4" }, "Mahsulot"),
                            React.createElement("th", { className: "p-4" }, "Soni"),
                            React.createElement("th", { className: "p-4" }, "Umumiy Summa"),
                            React.createElement("th", { className: "p-4" }, "Status"),
                            React.createElement("th", { className: "p-4" }, "Sana"))),
                    React.createElement("tbody", { className: "divide-y divide-emerald-500/5 text-sm text-slate-300" },
                        orders.map(function (order) { return (React.createElement("tr", { key: order.id, className: "hover:bg-emerald-500/5 transition-colors duration-200" },
                            React.createElement("td", { className: "p-4 font-mono text-emerald-500/70" },
                                "#",
                                order.id),
                            React.createElement("td", { className: "p-4 font-medium text-slate-200" }, order.product_name),
                            React.createElement("td", { className: "p-4" },
                                order.quantity,
                                " dona"),
                            React.createElement("td", { className: "p-4 font-semibold text-emerald-400" },
                                "$",
                                Number(order.total_price).toLocaleString()),
                            React.createElement("td", { className: "p-4" },
                                React.createElement("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border " + (order.status === 'completed'
                                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                        : 'bg-amber-500/10 text-amber-400 border-amber-500/20') }, order.status)),
                            React.createElement("td", { className: "p-4 text-xs text-slate-400" }, new Date(order.created_at).toLocaleDateString('uz-UZ')))); }),
                        orders.length === 0 && (React.createElement("tr", null,
                            React.createElement("td", { colSpan: 6, className: "p-8 text-center text-slate-500" }, "Hozircha buyurtmalar mavjud emas."))),
                        ")}")))))));
}
exports["default"] = OrdersPage;
