'use client';

import { useEffect, useState } from 'react';
import { useStore } from './store/useStore';
import { Package, PlusCircle, Search, Home, Music, Smartphone, Database, ChevronRight, Activity } from 'lucide-react';

export default function ERPDashboard() {
  const { products, loading, error, fetchProducts, addProduct } = useStore();
  
  const [sku, setSku] = useState('');
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sku || !name || quantity <= 0 || !price) return;
    
    const success = await addProduct({ sku, name, quantity, price });
    if (success) {
      setSku('');
      setName('');
      setQuantity(0);
      setPrice('');
    }
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F4F4F4] text-[#111111] font-sans antialiased">
      
      {/* 1. Premium Navbar */}
      <nav className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-8">
            <span className="text-xl font-black tracking-tight text-black flex items-center gap-2">
              <Database className="w-5 h-5 text-blue-600" /> Stuffus ERP
            </span>
            <div className="hidden md:flex gap-6 text-sm font-medium text-gray-500">
              <span className="text-black cursor-pointer border-b-2 border-black pb-1">Boshqaruv</span>
              <span className="hover:text-black cursor-pointer transition-colors">Ombor</span>
              <span className="hover:text-black cursor-pointer transition-colors">Tarmoq hisoboti</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-200">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              Render Cloud DB: Onlayn
            </div>
          </div>
        </div>
      </nav>

      {/* 2. Big Visual Hero Section */}
      <div className="relative bg-white pt-16 pb-20 border-b border-gray-200 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white opacity-60" />
        <div className="max-w-7xl mx-auto px-8 relative z-10 text-center">
          <h1 className="text-[10rem] font-extrabold leading-none tracking-tighter text-gray-100 select-none absolute left-1/2 -translate-x-1/2 top-4">
            ERP
          </h1>
          <h2 className="text-5xl font-black tracking-tight text-black mb-4 relative z-20">
            Give All You Need
          </h2>
          <p className="text-gray-500 max-w-md mx-auto text-sm mb-8">
            Bulutli infratuzilma va real vaqt rejimidagi inventarizatsiyani boshqarishning premium va oson tizimi.
          </p>
          
          {/* Search Bar matching image styling */}
          <div className="max-w-xl mx-auto flex items-center bg-[#F4F4F4] p-1.5 rounded-full border border-gray-200 shadow-inner">
            <Search className="w-4 h-4 text-gray-400 ml-4 mr-2" />
            <input 
              type="text" 
              placeholder="Mahsulot nomi yoki SKU bo'yicha qidirish..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-sm text-black focus:outline-none placeholder-gray-400"
            />
            <button className="bg-black hover:bg-gray-800 text-white text-xs font-bold px-6 py-2.5 rounded-full transition-all">
              Qidirish
            </button>
          </div>
        </div>
      </div>

      {/* 3. Main Workspace */}
      <main className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Left Sidebar Layout: Form & Filters */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Kategoriyalar</h3>
              <div className="space-y-3 text-sm font-medium text-gray-600">
                <div className="flex items-center justify-between text-black bg-gray-100 px-3 py-2 rounded-xl cursor-pointer">
                  <span className="flex items-center gap-2"><Package className="w-4 h-4" /> Barcha mahsulotlar</span>
                  <span className="text-xs font-bold bg-black text-white px-2 py-0.5 rounded-md">{products.length}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 hover:text-black cursor-pointer transition-colors"><Home className="w-4 h-4" /> Maishiy texnika</div>
                <div className="flex items-center gap-2 px-3 py-1.5 hover:text-black cursor-pointer transition-colors"><Music className="w-4 h-4" /> Audio jihozlar</div>
                <div className="flex items-center gap-2 px-3 py-1.5 hover:text-black cursor-pointer transition-colors"><Smartphone className="w-4 h-4" /> Elektronika</div>
              </div>
            </div>

            {/* Input Form Box as a clean product insertion sheet */}
            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
              <h3 className="text-base font-black mb-4 flex items-center gap-2 text-black">
                <PlusCircle className="w-4 h-4 text-gray-700" /> Tovar qo'shish
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">SKU KOD</label>
                  <input type="text" value={sku} onChange={(e) => setSku(e.target.value)} required className="w-full bg-[#F4F4F4] border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-black text-black font-mono" placeholder="Masalan: SKU-908" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">MAHSULOT NOMI</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full bg-[#F4F4F4] border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-black text-black" placeholder="Masalan: Headphone R175" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">MIQDOR</label>
                    <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} required className="w-full bg-[#F4F4F4] border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-black text-black" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">NARX ($)</label>
                    <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} required className="w-full bg-[#F4F4F4] border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-black text-black" placeholder="29.90" />
                  </div>
                </div>
                <button type="submit" className="w-full bg-black hover:bg-gray-800 text-white font-bold py-2.5 rounded-xl text-xs transition-colors tracking-wide mt-2">
                  BAZAGA JOYLASH
                </button>
              </form>
            </div>
          </div>

          {/* Right Product Grid matching image 3-column system */}
          <div className="lg:col-span-3">
            {loading && <p className="text-gray-400 text-sm">Bulutli tarmoq orqali yuklanmoqda...</p>}
            {error && <p className="text-red-500 text-sm">Xatolik: {error}</p>}
            
            {!loading && filteredProducts.length === 0 && (
              <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 text-gray-400 text-sm">
                Qidiruvga mos yoki omborda mahsulotlar topilmadi.
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-3xl p-5 border border-gray-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative group">
                  {/* Category mini badge */}
                  <div className="absolute top-4 right-4 bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {product.quantity > 10 ? 'Omborda bor' : 'Kam qoldi'}
                  </div>

                  {/* Placeholder box for asset illustration like in the picture */}
                  <div className="w-full h-44 bg-[#F9F9F9] rounded-2xl mb-4 flex items-center justify-center border border-gray-100 group-hover:bg-[#F4F4F4] transition-colors">
                    <Package className="w-12 h-12 text-gray-300 group-hover:scale-110 transition-transform duration-300" />
                  </div>

                  {/* Info details */}
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-[11px] font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                        {product.sku}
                      </span>
                      <span className="text-xs text-gray-400 font-medium">· {product.quantity} dona zaxira</span>
                    </div>
                    <h4 className="font-bold text-gray-900 text-base mb-2 tracking-tight">
                      {product.name}
                    </h4>
                    <div className="text-lg font-black text-black">
                      ${parseFloat(product.price).toFixed(2)}
                    </div>
                  </div>

                  {/* Actions row resembling the design card buttons */}
                  <div className="grid grid-cols-2 gap-2 mt-4 pt-2 border-t border-gray-50">
                    <button className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-bold py-2 rounded-xl transition-colors">
                      Ko'rish
                    </button>
                    <button className="bg-black text-white hover:bg-gray-800 text-xs font-bold py-2 rounded-xl transition-colors">
                      Tahrirlash
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* 4. Banner CTA Section at the bottom */}
      <footer className="bg-black text-white mt-24 py-12 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 bg-[#111111] p-12 rounded-[2rem] border border-gray-800">
          <div>
            <h3 className="text-3xl font-black mb-2 tracking-tight">Ready to Get Our New Stuff?</h3>
            <p className="text-gray-400 text-xs max-w-md">
              Hujjatlashtirish va bulutli tizim integratsiyasi yakuniy bosqichga tayyor. Tizim to'liq nazorat ostida.
            </p>
          </div>
          <div className="flex gap-2 w-full md:w-auto bg-[#222222] p-1.5 rounded-full border border-gray-700">
            <input type="email" placeholder="Sizning elektron pochtangiz" className="bg-transparent text-xs text-white px-4 py-2 focus:outline-none w-full md:w-48 placeholder-gray-500" />
            <button className="bg-white text-black text-xs font-bold px-6 py-2 rounded-full hover:bg-gray-200 transition-colors whitespace-nowrap">
              Yuborish
            </button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto text-center text-xs text-gray-600 mt-12 pt-4 border-t border-gray-900">
          © 2026 Stuffus ERP System. Hamma huquqlar himoyalangan.
        </div>
      </footer>
    </div>
  );
}