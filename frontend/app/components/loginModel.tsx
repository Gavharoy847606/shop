'use client';

import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { X, Lock, Mail, Eye, EyeOff, AlertCircle } from 'lucide-react';

interface LoginModalProps {
  onClose: () => void;
}

export default function LoginModal({ onClose }: LoginModalProps) {
  const { login, loading, error, clearError } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await login(email, password);
    if (ok) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-8 z-10">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-300 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mb-4">
            <Lock className="w-5 h-5 text-emerald-400" />
          </div>
          <h2 className="text-xl font-black text-white tracking-tight">Tizimga Kirish</h2>
          <p className="text-slate-400 text-xs mt-1">STUFFUS ERP · Admin Panel</p>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-5 text-red-400 text-xs">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
            <button onClick={clearError} className="ml-auto">
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="text-[10px] font-bold text-slate-500 tracking-widest block mb-1.5">
              EMAIL
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="anvar.admin@erp.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 outline-none focus:border-emerald-500/50 transition-colors placeholder-slate-600"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-[10px] font-bold text-slate-500 tracking-widest block mb-1.5">
              PAROL
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-10 py-2.5 text-sm text-slate-200 outline-none focus:border-emerald-500/50 transition-colors placeholder-slate-600"
              />
              <button
                type="button"
                onClick={() => setShowPass(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-black text-sm py-3 rounded-xl tracking-wider shadow-lg transition-all duration-150 active:scale-[0.98] mt-2"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                Tekshirilmoqda...
              </span>
            ) : (
              'KIRISH'
            )}
          </button>
        </form>

        <p className="text-center text-slate-600 text-[10px] mt-6">
          Test: anvar.admin@erp.com · password123
        </p>
      </div>
    </div>
  );
}