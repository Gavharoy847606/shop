'use client';

import { useEffect, useState } from 'react';

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  company?: string;
  created_at: string;
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://shop-backend-yax6.onrender.com';
    
    fetch(`${backendUrl}/api/clients`)
      .then((res) => {
        if (!res.ok) throw new Error('Mijozlar maʼlumotlarini yuklashda xatolik yuz berdi');
        return res.json();
      })
      .then((data) => {
        setClients(data);
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
          Mijozlar Bazasi (CRM)
        </h1>
        <p className="text-sm text-slate-400">ERP tizimidagi barcha roʻyxatdan oʻtgan hamkorlar va mijozlar</p>
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
                  <th className="p-4">F.I.SH</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Telefon</th>
                  <th className="p-4">Kompaniya</th>
                  <th className="p-4">Qoʻshilgan sana</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-500/5 text-sm text-slate-300">
                {clients.map((client) => (
                  <tr key={client.id} className="hover:bg-emerald-500/5 transition-colors duration-200">
                    <td className="p-4 font-mono text-emerald-500/70">#{client.id}</td>
                    <td className="p-4 font-medium text-slate-200">{client.name}</td>
                    <td className="p-4 text-slate-300">{client.email}</td>
                    <td className="p-4 font-mono text-xs text-slate-400">{client.phone || '—'}</td>
                    <td className="p-4">
                      <span className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded border border-slate-700">
                        {client.company || 'Jismoniy shaxs'}
                      </span>
                    </td>
                    <td className="p-4 text-xs text-slate-400">
                      {new Date(client.created_at).toLocaleDateString('uz-UZ')}
                    </td>
                  </tr>
                ))}
                {clients.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500">
                      Hozircha mijozlar mavjud emas.
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