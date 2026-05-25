'use client';
"use strict";
exports.__esModule = true;
var react_1 = require("react");
function ClientsPage() {
    var _a = react_1.useState([]), clients = _a[0], setClients = _a[1];
    var _b = react_1.useState(true), loading = _b[0], setLoading = _b[1];
    var _c = react_1.useState(''), error = _c[0], setError = _c[1];
    react_1.useEffect(function () {
        var backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://shop-backend-yax6.onrender.com';
        fetch(backendUrl + "/api/clients")
            .then(function (res) {
            if (!res.ok)
                throw new Error('Mijozlar maʼlumotlarini yuklashda xatolik yuz berdi');
            return res.json();
        })
            .then(function (data) {
            setClients(data);
            setLoading(false);
        })["catch"](function (err) {
            setError(err.message);
            setLoading(false);
        });
    }, []);
    return (React.createElement("div", { className: "space-y-6 animate-fade-in" },
        React.createElement("div", null,
            React.createElement("h1", { className: "text-2xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent" }, "Mijozlar Bazasi (CRM)"),
            React.createElement("p", { className: "text-sm text-slate-400" }, "ERP tizimidagi barcha ro\u02BByxatdan o\u02BBtgan hamkorlar va mijozlar")),
        loading && (React.createElement("div", { className: "flex justify-center py-12" },
            React.createElement("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500" }))),
        error && (React.createElement("div", { className: "p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm" }, error)),
        !loading && !error && (React.createElement("div", { className: "overflow-hidden rounded-xl border border-emerald-500/10 bg-slate-900/40 backdrop-blur-md shadow-xl" },
            React.createElement("div", { className: "overflow-x-auto" },
                React.createElement("table", { className: "w-full text-left border-collapse" },
                    React.createElement("thead", null,
                        React.createElement("tr", { className: "border-b border-emerald-500/10 bg-emerald-500/5 text-xs font-semibold uppercase tracking-wider text-emerald-400" },
                            React.createElement("th", { className: "p-4" }, "ID"),
                            React.createElement("th", { className: "p-4" }, "F.I.SH"),
                            React.createElement("th", { className: "p-4" }, "Email"),
                            React.createElement("th", { className: "p-4" }, "Telefon"),
                            React.createElement("th", { className: "p-4" }, "Kompaniya"),
                            React.createElement("th", { className: "p-4" }, "Qo\u02BBshilgan sana"))),
                    React.createElement("tbody", { className: "divide-y divide-emerald-500/5 text-sm text-slate-300" },
                        clients.map(function (client) { return (React.createElement("tr", { key: client.id, className: "hover:bg-emerald-500/5 transition-colors duration-200" },
                            React.createElement("td", { className: "p-4 font-mono text-emerald-500/70" },
                                "#",
                                client.id),
                            React.createElement("td", { className: "p-4 font-medium text-slate-200" }, client.name),
                            React.createElement("td", { className: "p-4 text-slate-300" }, client.email),
                            React.createElement("td", { className: "p-4 font-mono text-xs text-slate-400" }, client.phone || '—'),
                            React.createElement("td", { className: "p-4" },
                                React.createElement("span", { className: "text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded border border-slate-700" }, client.company || 'Jismoniy shaxs')),
                            React.createElement("td", { className: "p-4 text-xs text-slate-400" }, new Date(client.created_at).toLocaleDateString('uz-UZ')))); }),
                        clients.length === 0 && (React.createElement("tr", null,
                            React.createElement("td", { colSpan: 6, className: "p-8 text-center text-slate-500" }, "Hozircha mijozlar mavjud emas."))),
                        ")}")))))));
}
exports["default"] = ClientsPage;
