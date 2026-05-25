'use client';

import { useEffect, useState } from 'react';

interface Order {
  id: number;
  client_id: number;
  product_name: string;
  quantity: number;
  total_price: number;
  status: string;
  created_at: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Renderdagi backend manzilingiz (muhit o'zgaruvchisidan yoki to'g'ridan-to'g'ri)
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://shop-backend-yax6.onrender.com';
    
    fetch(`${backendUrl}/api/orders`)
      .then((res) => {
        if (!res.ok) throw new Error('Maʼlumotlarni yuklashda xatolik yuz berdi');
        return res.json();
      })
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Sahifa sarlavhasi */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
          Buyurtmalar Boshqaruvi
        </h1>
        <p className="text-sm text-slate-400">Tizimdagi barcha buyurtmalar va ularning statuslari</p>
      </div>

      {/* Yuklanish yoki Xatolik holatlari */}
      {loading && (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* ✨ Glassmorphism Jadval */}
      {!loading && !error && (
        <div className="overflow-hidden rounded-xl border border-emerald-500/10 bg-slate-900/40 backdrop-blur-md shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-emerald-500/10 bg-emerald-500/5 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                  <th className="p-4">ID</th>
                  <th className="p-4">Mahsulot</th>
                  <th className="p-4">Soni</th>
                  <th className="p-4">Umumiy Summa</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Sana</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-500/5 text-sm text-slate-300">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-emerald-500/5 transition-colors duration-200">
                    <td className="p-4 font-mono text-emerald-500/70">#{order.id}</td>
                    <td className="p-4 font-medium text-slate-200">{order.product_name}</td>
                    <td className="p-4">{order.quantity} dona</td>
                    <td className="p-4 font-semibold text-emerald-400">
                      ${Number(order.total_price).toLocaleString()}
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        order.status === 'completed' 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 text-xs text-slate-400">
                      {new Date(order.created_at).toLocaleDateString('uz-UZ')}
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500">
                      Hozircha buyurtmalar mavjud emas.
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}