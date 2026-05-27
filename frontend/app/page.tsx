'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from "./store/useAuthStore";
import { useStore } from "./store/useStore";
import LoginModal from "./components/loginModel";
// import { useStore } from 'zustand';

import {
  Package, PlusCircle, Search, Home, Music,
  Smartphone, TrendingUp, Shield, Trash2, Pencil, X, Check, Lock
} from 'lucide-react';

function getProductImage(name: string): string {
  const n = name.toLowerCase();
  if (n.includes('laptop') || n.includes('dell') || n.includes('macbook')) return 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80';
  if (n.includes('monitor') || n.includes('lg')) return 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80';
  if (n.includes('chair')) return 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=400&q=80';
  if (n.includes('iphone') || n.includes('phone')) return 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400&q=80';
  if (n.includes('keyboard')) return 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80';
  if (n.includes('mouse')) return 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80';
  if (n.includes('printer')) return 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400&q=80';
  if (n.includes('headphone') || n.includes('sony') || n.includes('audio')) return 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80';
  if (n.includes('tablet') || n.includes('samsung') || n.includes('tab') || n.includes('ipad')) return 'https://images.unsplash.com/photo-1544244015-0df4512b7049?w=400&q=80';
  if (n.includes('desk')) return 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80';
  if (n.includes('hub') || n.includes('usb') || n.includes('adapter')) return 'https://images.unsplash.com/photo-1625961332771-3f40b0e2bdcf?w=400&q=80';
  if (n.includes('ssd') || n.includes('drive')) return 'https://images.unsplash.com/photo-1597838816882-4435b1977fbe?w=400&q=80';
  if (n.includes('watch')) return 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&q=80';
  if (n.includes('power') || n.includes('strip') || n.includes('plug')) return 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80';
  return 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&q=80';
}

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  audio: ['headphone', 'sony', 'audio', 'speaker'],
  home: ['chair', 'desk', 'printer', 'power', 'strip', 'plug'],
  tech: ['laptop', 'monitor', 'phone', 'tablet', 'keyboard', 'mouse', 'hub', 'usb', 'ssd', 'watch'],
};

export default function StuffusShop() {
  const { products, loading, error, fetchProducts, addProduct, deleteProduct } = useStore();
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'admin';

  const [sku, setSku] = useState('');
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState('');
  const [addError, setAddError] = useState('');
  const [addSuccess, setAddSuccess] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddError('');
    if (!sku || !name || quantity <= 0 || !price) return;

    if (!isAdmin) {
      setAddError("Faqat admin mahsulot qo'sha oladi");
      return;
    }

    const success = await addProduct({ sku, name, quantity, price });
    if (success) {
      setSku(''); setName(''); setQuantity(0); setPrice('');
      setAddSuccess(true);
      setTimeout(() => setAddSuccess(false), 3000);
    } else {
      setAddError("Xatolik: SKU band bo'lishi yoki token muammosi bo'lishi mumkin");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Bu mahsulotni o'chirmoqchimisiz?")) return;
    setDeletingId(id);
    await deleteProduct(id);
    setDeletingId(null);
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (activeCategory === 'all') return true;

    const keywords = CATEGORY_KEYWORDS[activeCategory] || [];
    return keywords.some(kw => p.name.toLowerCase().includes(kw));
  });

  const totalValue = products.reduce((s, p) => s + parseFloat(p.price) * p.quantity, 0);
  const lowStock = products.filter(p => p.quantity > 0 && p.quantity <= 5).length;

  return (
    <div className="space-y-10 text-slate-100 antialiased">

      {/* ── HERO ── */}
      <div className="relative overflow-hidden rounded-3xl border border-emerald-500/10 bg-slate-900/40 backdrop-blur-md p-8 md:p-12 shadow-2xl">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-emerald-500/10 blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-20 left-1/3 w-80 h-80 rounded-full bg-teal-500/5 blur-[80px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="animate-pulse">✦</span> Premium Inventory Suite · v2.6
            </div>

            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              Mahsulot sotuvini <br />
              bir joydan <br />
              <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">boshqaring.</span>
            </h1>

            {/* Search */}
            <div className="flex items-center gap-2 bg-slate-950/60 border border-slate-800 rounded-full p-1.5 pl-4 max-w-md shadow-inner focus-within:border-emerald-500/50 transition-all duration-200">
              <Search className="w-4 h-4 text-slate-500 flex-shrink-0" />
              <input
                type="text"
                placeholder="Mahsulot nomi yoki SKU..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-xs text-slate-200 placeholder-slate-500"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="text-slate-500 hover:text-slate-300">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 pt-4">
              {[
                { label: 'MAHSULOTLAR', value: products.length, icon: <Package className="w-4 h-4 text-emerald-400" /> },
                { label: 'UMUMIY QIYMAT', value: `$${(totalValue / 1000).toFixed(0)}k`, icon: <TrendingUp className="w-4 h-4 text-emerald-400" />, accent: true },
                { label: 'KAM ZAXIRA', value: lowStock, icon: <Shield className="w-4 h-4 text-amber-400" /> },
              ].map(s => (
                <div key={s.label} className="bg-slate-950/40 border border-slate-800/60 rounded-2xl p-4 flex flex-col justify-between">
                  <div className="opacity-80">{s.icon}</div>
                  <div className={`text-xl font-extrabold tracking-tight mt-2 ${s.accent ? 'text-emerald-400' : 'text-white'}`}>{s.value}</div>
                  <div className="text-[9px] font-bold text-slate-500 tracking-wider mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero image */}
          <div className="relative flex justify-center">
            <div className="w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden relative border border-slate-800 bg-slate-950/50 shadow-2xl flex items-center justify-center group">
              <div className="absolute top-4 right-4 z-10 bg-emerald-500/10 backdrop-blur-md text-emerald-400 border border-emerald-500/20 text-[9px] font-black tracking-widest px-3 py-1 rounded-full">
                LIVE INVENTORY
              </div>
              <img
                src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80"
                alt="Inventory"
                className="w-2/3 h-2/3 object-contain filter drop-shadow-[0_20px_50px_rgba(16,185,129,0.2)] group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur-md border border-emerald-500/10 rounded-xl p-3 flex items-center gap-3 shadow-xl">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[9px] font-bold text-slate-500">UMUMIY QIYMAT</div>
                  <div className="text-sm font-black text-white">${(totalValue / 1000).toFixed(1)}k</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN WORKSPACE ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start">

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Categories */}
          <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl p-4 shadow-xl">
            <div className="text-[10px] font-bold text-slate-500 tracking-widest mb-3 uppercase">Kategoriyalar</div>
            <div className="space-y-1">
              {[
                { id: 'all', label: 'Barcha mahsulotlar', icon: <Package className="w-4 h-4" />, count: products.length },
                { id: 'home', label: 'Maishiy texnika', icon: <Home className="w-4 h-4" /> },
                { id: 'audio', label: 'Audio jihozlar', icon: <Music className="w-4 h-4" /> },
                { id: 'tech', label: 'Elektronika', icon: <Smartphone className="w-4 h-4" /> },
              ].map(cat => {
                const active = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                      active ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">{cat.icon} {cat.label}</span>
                    {cat.count !== undefined && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${active ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
                        {cat.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Add Product Form — faqat admin uchun */}
          <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl p-5 shadow-xl">
            <h3 className="text-xs font-bold text-white tracking-wider mb-4 flex items-center gap-2">
              <PlusCircle className="w-4 h-4 text-emerald-400" /> TOVAR QO'SHISH
            </h3>

            {!user ? (
              <div className="text-center py-4 space-y-2">
                <Lock className="w-6 h-6 text-slate-600 mx-auto" />
                <p className="text-slate-500 text-xs">Mahsulot qo'shish uchun tizimga kiring</p>
              </div>
            ) : !isAdmin ? (
              <div className="text-center py-4 space-y-2">
                <Lock className="w-6 h-6 text-amber-600/50 mx-auto" />
                <p className="text-amber-500/70 text-xs">Faqat admin mahsulot qo'sha oladi</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {addError && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 text-red-400 text-[10px]">
                    {addError}
                  </div>
                )}
                {addSuccess && (
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2 text-emerald-400 text-[10px] flex items-center gap-1.5">
                    <Check className="w-3 h-3" /> Mahsulot muvaffaqiyatli qo'shildi!
                  </div>
                )}

                <div>
                  <label className="text-[10px] font-bold text-slate-500 tracking-wider block mb-1">SKU KOD</label>
                  <input type="text" value={sku} onChange={e => setSku(e.target.value)} required placeholder="SKU-001"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 font-mono outline-none focus:border-emerald-500/50 transition-colors" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 tracking-wider block mb-1">MAHSULOT NOMI</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="Headphone R175"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none focus:border-emerald-500/50 transition-colors" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 tracking-wider block mb-1">MIQDORI</label>
                    <input type="number" value={quantity || ''} onChange={e => setQuantity(Number(e.target.value))} required min={1}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none focus:border-emerald-500/50 transition-colors" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 tracking-wider block mb-1">NARX ($)</label>
                    <input type="text" value={price} onChange={e => setPrice(e.target.value)} required placeholder="29.90"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none focus:border-emerald-500/50 transition-colors" />
                  </div>
                </div>
                <button type="submit"
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs py-2.5 rounded-xl tracking-wider shadow-md active:scale-[0.98] transition-all duration-150">
                  BAZAGA JOYLASH
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Products Grid */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="text-xs text-slate-400 font-medium">{filteredProducts.length} ta mahsulot</div>
            {lowStock > 0 && (
              <div className="bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[11px] font-bold px-3 py-1 rounded-full">
                ⚠ {lowStock} ta kam zaxira
              </div>
            )}
          </div>

          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-slate-900/40 border border-slate-800 rounded-2xl h-64 animate-pulse" />
              ))}
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 text-xs">
              Xatolik: {error}
            </div>
          )}

          {!loading && filteredProducts.length === 0 && (
            <div className="bg-slate-900/20 border border-slate-800/80 rounded-2xl py-16 text-center text-slate-500 text-sm">
              <Package className="w-10 h-10 mx-auto mb-3 opacity-20" />
              Mahsulot topilmadi
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map(product => {
              const isLow = product.quantity > 0 && product.quantity <= 5;
              const isOut = product.quantity === 0;
              const imgSrc = imgErrors[product.sku] ? null : (product.image_url || getProductImage(product.name));

              return (
                <div key={product.id}
                  className="group bg-slate-900/40 backdrop-blur-sm border border-slate-800/80 hover:border-emerald-500/30 rounded-2xl overflow-hidden flex flex-col shadow-lg transition-all duration-300">

                  <div className="relative h-40 bg-slate-950 flex items-center justify-center overflow-hidden">
                    {imgSrc ? (
                      <img src={imgSrc} alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={() => setImgErrors(prev => ({ ...prev, [product.sku]: true }))} />
                    ) : (
                      <Package className="w-10 h-10 text-slate-700" />
                    )}
                    <div className={`absolute top-3 right-3 text-[9px] font-black tracking-wider px-2 py-0.5 rounded-md border ${
                      isOut ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                      isLow ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                      'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    }`}>
                      {isOut ? 'TUGAGAN' : isLow ? 'KAM QOLDI' : 'MAVJUD'}
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 px-2 py-0.5 rounded font-mono">
                        {product.sku}
                      </span>
                      <h4 className="text-xs font-bold text-slate-200 mt-2 line-clamp-2 leading-tight group-hover:text-white transition-colors">
                        {product.name}
                      </h4>
                    </div>

                    <div className="flex justify-between items-end pt-2 border-t border-slate-800/60">
                      <div>
                        <div className="text-lg font-black text-white">${parseFloat(product.price).toFixed(2)}</div>
                        <div className="text-[10px] text-slate-500 font-semibold">{product.quantity} dona</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button className="bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 text-[11px] font-bold py-1.5 rounded-lg transition-colors">
                        Ko'rish
                      </button>
                      {isAdmin ? (
                        <button
                          onClick={() => product.id && handleDelete(product.id)}
                          disabled={deletingId === product.id}
                          className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-[11px] font-bold py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1 disabled:opacity-50"
                        >
                          <Trash2 className="w-3 h-3" />
                          {deletingId === product.id ? '...' : "O'chirish"}
                        </button>
                      ) : (
                        <button className="bg-slate-100 hover:bg-white text-slate-950 text-[11px] font-black py-1.5 rounded-lg transition-colors">
                          Tahrirlash
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-900/60 pt-6 mt-12 text-center sm:flex sm:justify-between sm:text-left text-xs text-slate-500">
        <div className="font-bold text-slate-400 mb-2 sm:mb-0">STUFFUS.ERP</div>
        <div>© 2026 Stuffus Shop. Hamma huquqlar himoyalangan.</div>
      </footer>
    </div>
  );
}