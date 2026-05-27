'use client';

import { useEffect, useState } from 'react';

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  created_at: string;
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://shop-backend-yax6.onrender.com';

    fetch(`${backendUrl}/api/clients`, { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error('Mijozlarni yuklashda xatolik');
        return res.json();
      })
      .then(data => { setClients(data); setLoading(false); })
      .catch(err => {
        if (err.name === 'AbortError') return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
          Mijozlar Boshqaruvi
        </h1>
        <p className="text-sm text-slate-400">Barcha ro'yxatdan o'tgan mijozlar</p>
      </div>

      {loading && (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500" />
        </div>
      )}

      {error && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="overflow-hidden rounded-xl border border-emerald-500/10 bg-slate-900/40 backdrop-blur-md shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-emerald-500/10 bg-emerald-500/5 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                  <th className="p-4">ID</th>
                  <th className="p-4">Ism</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Telefon</th>
                  <th className="p-4">Sana</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-500/5 text-sm text-slate-300">
                {clients.map(client => (
                  <tr key={client.id} className="hover:bg-emerald-500/5 transition-colors duration-200">
                    <td className="p-4 font-mono text-emerald-500/70">#{client.id}</td>
                    <td className="p-4 font-medium text-slate-200">{client.name}</td>
                    <td className="p-4">{client.email}</td>
                    <td className="p-4">{client.phone}</td>
                    <td className="p-4 text-xs text-slate-400">
                      {new Date(client.created_at).toLocaleDateString('uz-UZ')}
                    </td>
                  </tr>
                ))}
                {clients.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-500">
                      Hozircha mijozlar mavjud emas.
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