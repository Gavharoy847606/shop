'use client';

import { useEffect, useState } from 'react';
import { useOrdersStore } from '../store/useStore';
import { useAuthStore } from '../store/useAuthStore';
import {
  ShoppingCart, Clock, CheckCircle2, XCircle,
  TrendingUp, DollarSign, Package, AlertCircle, Lock
} from 'lucide-react';

const STATUS_CONFIG = {
  completed: {
    label: 'Yakunlangan',
    icon: <CheckCircle2 className="w-3 h-3" />,
    className: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  },
  pending: {
    label: 'Kutilmoqda',
    icon: <Clock className="w-3 h-3" />,
    className: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  },
  cancelled: {
    label: 'Bekor qilindi',
    icon: <XCircle className="w-3 h-3" />,
    className: 'bg-red-500/10 text-red-400 border-red-500/20',
  },
};

export default function OrdersPage() {
  const { orders, loading, error, fetchOrders, updateOrderStatus } = useOrdersStore();
  const { user } = useAuthStore();
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  useEffect(() => {
    if (user) fetchOrders();
  }, [user, fetchOrders]);

  // Statistika
  const totalRevenue = orders
    .filter(o => o.status === 'completed')
    .reduce((s, o) => s + parseFloat(o.total_amount), 0);

  const pendingCount = orders.filter(o => o.status === 'pending').length;
  const completedCount = orders.filter(o => o.status === 'completed').length;

  const handleStatusChange = async (id: number, status: 'completed' | 'cancelled') => {
    setUpdatingId(id);
    await updateOrderStatus(id, status);
    setUpdatingId(null);
  };

  // ─── Auth yo'q ───
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center">
          <Lock className="w-7 h-7 text-slate-600" />
        </div>
        <h2 className="text-xl font-bold text-slate-300">Kirish talab etiladi</h2>
        <p className="text-slate-500 text-sm max-w-xs">
          Buyurtmalarni ko'rish uchun yuqoridagi <strong className="text-emerald-400">Kirish</strong> tugmasini bosing.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
          Buyurtmalar Boshqaruvi
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          {user.role === 'employee' ? 'Sizning buyurtmalaringiz' : 'Barcha buyurtmalar va ularning holati'}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Jami buyurtma', value: orders.length, icon: <ShoppingCart className="w-4 h-4 text-emerald-400" /> },
          { label: 'Yakunlangan', value: completedCount, icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" /> },
          { label: 'Kutilmoqda', value: pendingCount, icon: <Clock className="w-4 h-4 text-amber-400" /> },
          { label: 'Daromad', value: `$${totalRevenue.toLocaleString()}`, icon: <DollarSign className="w-4 h-4 text-emerald-400" />, accent: true },
        ].map(s => (
          <div key={s.label} className="bg-slate-900/40 border border-slate-800 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center">{s.icon}</div>
            </div>
            <div className={`text-2xl font-black ${s.accent ? 'text-emerald-400' : 'text-white'}`}>{s.value}</div>
            <div className="text-[10px] text-slate-500 font-bold tracking-wider mt-1">{s.label.toUpperCase()}</div>
          </div>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-16 bg-slate-900/40 border border-slate-800 rounded-xl animate-pulse" />
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      {/* Table */}
      {!loading && !error && (
        <div className="overflow-hidden rounded-2xl border border-emerald-500/10 bg-slate-900/40 backdrop-blur-md shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-emerald-500/10 bg-emerald-500/5">
                  <th className="px-5 py-3.5 text-[10px] font-bold text-emerald-400 tracking-widest uppercase">ID</th>
                  {(user.role === 'admin' || user.role === 'manager') && (
                    <th className="px-5 py-3.5 text-[10px] font-bold text-emerald-400 tracking-widest uppercase">Mijoz</th>
                  )}
                  <th className="px-5 py-3.5 text-[10px] font-bold text-emerald-400 tracking-widest uppercase">Summa</th>
                  <th className="px-5 py-3.5 text-[10px] font-bold text-emerald-400 tracking-widest uppercase">Status</th>
                  <th className="px-5 py-3.5 text-[10px] font-bold text-emerald-400 tracking-widest uppercase">Sana</th>
                  {(user.role === 'admin' || user.role === 'manager') && (
                    <th className="px-5 py-3.5 text-[10px] font-bold text-emerald-400 tracking-widest uppercase">Amal</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {orders.map(order => {
                  const cfg = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;
                  return (
                    <tr key={order.id} className="hover:bg-emerald-500/5 transition-colors duration-150">
                      <td className="px-5 py-4 font-mono text-xs text-emerald-500/70">#{order.id}</td>
                      {(user.role === 'admin' || user.role === 'manager') && (
                        <td className="px-5 py-4">
                          <div className="text-sm font-semibold text-slate-200">{order.client_name || '—'}</div>
                          <div className="text-[10px] text-slate-500">{order.client_email}</div>
                        </td>
                      )}
                      <td className="px-5 py-4 font-bold text-emerald-400">
                        ${parseFloat(order.total_amount).toLocaleString()}
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold border ${cfg.className}`}>
                          {cfg.icon} {cfg.label}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-xs text-slate-400">
                        {new Date(order.created_at).toLocaleDateString('uz-UZ')}
                      </td>
                      {(user.role === 'admin' || user.role === 'manager') && (
                        <td className="px-5 py-4">
                          {order.status === 'pending' && (
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleStatusChange(order.id, 'completed')}
                                disabled={updatingId === order.id}
                                className="text-[10px] font-bold px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500 hover:text-slate-950 transition-all disabled:opacity-50"
                              >
                                ✓ Tasdiqlash
                              </button>
                              <button
                                onClick={() => handleStatusChange(order.id, 'cancelled')}
                                disabled={updatingId === order.id}
                                className="text-[10px] font-bold px-3 py-1 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all disabled:opacity-50"
                              >
                                ✕ Rad etish
                              </button>
                            </div>
                          )}
                        </td>
                      )}
                    </tr>
                  );
                })}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-5 py-16 text-center">
                      <Package className="w-8 h-8 mx-auto mb-2 text-slate-700" />
                      <p className="text-slate-500 text-sm">Hozircha buyurtmalar mavjud emas</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}