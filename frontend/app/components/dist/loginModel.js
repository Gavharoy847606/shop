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
exports.__esModule = true;
var react_1 = require("react");
var useAuthStore_1 = require("../store/useAuthStore");
var lucide_react_1 = require("lucide-react");
function LoginModal(_a) {
    var _this = this;
    var onClose = _a.onClose;
    var _b = useAuthStore_1.useAuthStore(), login = _b.login, loading = _b.loading, error = _b.error, clearError = _b.clearError;
    var _c = react_1.useState(''), email = _c[0], setEmail = _c[1];
    var _d = react_1.useState(''), password = _d[0], setPassword = _d[1];
    var _e = react_1.useState(false), showPass = _e[0], setShowPass = _e[1];
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var ok;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    return [4 /*yield*/, login(email, password)];
                case 1:
                    ok = _a.sent();
                    if (ok)
                        onClose();
                    return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4" },
        React.createElement("div", { className: "absolute inset-0 bg-slate-950/80 backdrop-blur-sm", onClick: onClose }),
        React.createElement("div", { className: "relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-8 z-10" },
            React.createElement("button", { onClick: onClose, className: "absolute top-4 right-4 text-slate-500 hover:text-slate-300 transition-colors" },
                React.createElement(lucide_react_1.X, { className: "w-4 h-4" })),
            React.createElement("div", { className: "text-center mb-8" },
                React.createElement("div", { className: "inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mb-4" },
                    React.createElement(lucide_react_1.Lock, { className: "w-5 h-5 text-emerald-400" })),
                React.createElement("h2", { className: "text-xl font-black text-white tracking-tight" }, "Tizimga Kirish"),
                React.createElement("p", { className: "text-slate-400 text-xs mt-1" }, "STUFFUS ERP \u00B7 Admin Panel")),
            error && (React.createElement("div", { className: "flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-5 text-red-400 text-xs" },
                React.createElement(lucide_react_1.AlertCircle, { className: "w-4 h-4 flex-shrink-0" }),
                error,
                React.createElement("button", { onClick: clearError, className: "ml-auto" },
                    React.createElement(lucide_react_1.X, { className: "w-3 h-3" })))),
            React.createElement("form", { onSubmit: handleSubmit, className: "space-y-4" },
                React.createElement("div", null,
                    React.createElement("label", { className: "text-[10px] font-bold text-slate-500 tracking-widest block mb-1.5" }, "EMAIL"),
                    React.createElement("div", { className: "relative" },
                        React.createElement(lucide_react_1.Mail, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" }),
                        React.createElement("input", { type: "email", value: email, onChange: function (e) { return setEmail(e.target.value); }, required: true, placeholder: "anvar.admin@erp.com", className: "w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 outline-none focus:border-emerald-500/50 transition-colors placeholder-slate-600" }))),
                React.createElement("div", null,
                    React.createElement("label", { className: "text-[10px] font-bold text-slate-500 tracking-widest block mb-1.5" }, "PAROL"),
                    React.createElement("div", { className: "relative" },
                        React.createElement(lucide_react_1.Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" }),
                        React.createElement("input", { type: showPass ? 'text' : 'password', value: password, onChange: function (e) { return setPassword(e.target.value); }, required: true, placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", className: "w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-10 py-2.5 text-sm text-slate-200 outline-none focus:border-emerald-500/50 transition-colors placeholder-slate-600" }),
                        React.createElement("button", { type: "button", onClick: function () { return setShowPass(function (v) { return !v; }); }, className: "absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300" }, showPass ? React.createElement(lucide_react_1.EyeOff, { className: "w-4 h-4" }) : React.createElement(lucide_react_1.Eye, { className: "w-4 h-4" })))),
                React.createElement("button", { type: "submit", disabled: loading, className: "w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-black text-sm py-3 rounded-xl tracking-wider shadow-lg transition-all duration-150 active:scale-[0.98] mt-2" }, loading ? (React.createElement("span", { className: "flex items-center justify-center gap-2" },
                    React.createElement("span", { className: "w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" }),
                    "Tekshirilmoqda...")) : ('KIRISH'))),
            React.createElement("p", { className: "text-center text-slate-600 text-[10px] mt-6" }, "Test: anvar.admin@erp.com \u00B7 password123"))));
}
exports["default"] = LoginModal;
