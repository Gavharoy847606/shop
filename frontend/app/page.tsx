'use client';

import { useEffect, useState } from 'react';
import { useStore } from './store/useStore';
import {
  Package, PlusCircle, Search, Home, Music,
  Smartphone, Activity, TrendingUp, Shield, BarChart2, ChevronRight
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
  if (n.includes('watch') || n.includes('apple watch')) return 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&q=80';
  if (n.includes('power') || n.includes('strip') || n.includes('plug')) return 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80';
  return 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&q=80';
}

export default function StuffusShop() {
  const { products, loading, error, fetchProducts, addProduct } = useStore();

  const [sku, setSku] = useState('');
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sku || !name || quantity <= 0 || !price) return;
    const success = await addProduct({ sku, name, quantity, price });
    if (success) { setSku(''); setName(''); setQuantity(0); setPrice(''); }
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalValue = products.reduce((s, p) => s + parseFloat(p.price) * p.quantity, 0);
  const lowStock = products.filter(p => p.quantity > 0 && p.quantity <= 5).length;

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fc', color: '#0f0f14', fontFamily: "'Inter', -apple-system, sans-serif" }}>

      {/* ── NAVBAR ── */}
      <nav style={{
        background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        position: 'sticky', top: 0, zIndex: 50, padding: '0 2.5rem',
        boxShadow: '0 1px 0 rgba(0,0,0,0.05)'
      }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 48 }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 36, height: 36, background: '#0f0f14', borderRadius: 10,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <span style={{ color: '#fff', fontSize: 14, fontWeight: 900 }}>S</span>
              </div>
              <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: '-0.4px', color: '#0f0f14' }}>Stuffus shop</span>
            </div>
            {/* Nav links */}
            <div style={{ display: 'flex', gap: 32, fontSize: 14, fontWeight: 500 }}>
              {['Boshqaruv', 'Ombor', 'Tarmoq hisoboti'].map((item, i) => (
                <span key={item} style={{
                  color: i === 0 ? '#0f0f14' : '#9ca3af', cursor: 'pointer',
                  paddingBottom: 3, borderBottom: i === 0 ? '2px solid #0f0f14' : 'none',
                  transition: 'color 0.15s'
                }}>{item}</span>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: '#f0fdf4', color: '#16a34a',
              padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600,
              border: '1px solid #bbf7d0'
            }}>
              <Activity style={{ width: 12, height: 12 }} />
              Render Cloud DB: Onlayn
            </div>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              cursor: 'pointer'
            }} />
          </div>
        </div>
      </nav>

      {/* ── HERO SECTION ── */}
      <div style={{ background: '#fff', borderBottom: '1px solid rgba(0,0,0,0.06)', padding: '64px 2.5rem 72px', overflow: 'hidden', position: 'relative' }}>
        {/* Soft bg blobs */}
        <div style={{ position: 'absolute', top: -120, right: -80, width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -60, left: '30%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 65%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1320, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>

            {/* Left text */}
            <div>
              {/* Badge */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                background: '#f5f3ff', border: '1px solid #e9d5ff',
                borderRadius: 20, padding: '5px 14px', fontSize: 12, fontWeight: 600,
                color: '#7c3aed', marginBottom: 28
              }}>
                <span style={{ fontSize: 13 }}>✦</span>
                Premium Inventory Suite · v2.6
              </div>

              <h1 style={{ fontSize: 'clamp(2.6rem,4.5vw,3.8rem)', fontWeight: 900, lineHeight: 1.08, letterSpacing: '-2.5px', marginBottom: 20, color: '#0f0f14' }}>
                Mahsulot sotuvini<br />
                bir joydan<br />
                <span style={{ color: '#6366f1' }}>boshqaring.</span>
              </h1>

              <p style={{ fontSize: 15, color: '#6b7280', lineHeight: 1.75, marginBottom: 36, maxWidth: 460 }}>
                Bulutli infratuzilma, real vaqt rejimidagi inventarizatsiya va premium tahlil —
                barchasi sizning omboringiz va sotuv jamoangizni tezlashtirish uchun.
              </p>

              {/* Search */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 10,
                background: '#f9fafb', border: '1.5px solid #e5e7eb',
                borderRadius: 50, padding: '6px 6px 6px 18px',
                maxWidth: 480, boxShadow: '0 1px 4px rgba(0,0,0,0.05)'
              }}>
                <Search style={{ width: 16, height: 16, color: '#9ca3af', flexShrink: 0 }} />
                <input
                  type="text"
                  placeholder="Mahsulot nomi yoki SKU bo'yicha qidirish..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{
                    flex: 1, background: 'transparent', border: 'none', outline: 'none',
                    fontSize: 13, color: '#0f0f14', caretColor: '#6366f1'
                  }}
                />
                <button style={{
                  background: '#0f0f14', color: '#fff', border: 'none',
                  borderRadius: 40, padding: '9px 22px', fontSize: 13,
                  fontWeight: 700, cursor: 'pointer', letterSpacing: '-0.2px'
                }}>Qidirish</button>
              </div>

              {/* Stats row */}
              <div style={{ display: 'flex', gap: 8, marginTop: 32 }}>
                {[
                  { label: 'MAHSULOTLAR', value: products.length, icon: <Package style={{ width: 16, height: 16 }} /> },
                  { label: 'BU OY SOTUV', value: '+18%', icon: <TrendingUp style={{ width: 16, height: 16 }} />, accent: true },
                  { label: 'UPTIME', value: '99.9%', icon: <Shield style={{ width: 16, height: 16 }} /> },
                ].map(s => (
                  <div key={s.label} style={{
                    flex: 1, background: '#f9fafb', border: '1px solid #e5e7eb',
                    borderRadius: 16, padding: '16px 18px'
                  }}>
                    <div style={{ color: '#9ca3af', marginBottom: 8 }}>{s.icon}</div>
                    <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: '-1px', color: s.accent ? '#16a34a' : '#0f0f14' }}>{s.value}</div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: '#9ca3af', letterSpacing: 1, marginTop: 3 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Hero image card */}
            <div style={{ position: 'relative' }}>
              <div style={{
                background: 'linear-gradient(145deg, #f0f4ff 0%, #f8f0ff 50%, #fff5f0 100%)',
                borderRadius: 28, overflow: 'hidden', position: 'relative',
                aspectRatio: '4/3',
                boxShadow: '0 32px 80px rgba(99,102,241,0.15), 0 8px 24px rgba(0,0,0,0.08)',
                border: '1px solid rgba(255,255,255,0.8)'
              }}>
                {/* LIVE badge */}
                <div style={{
                  position: 'absolute', top: 18, right: 18, zIndex: 10,
                  background: '#0f0f14', color: '#fff',
                  fontSize: 10, fontWeight: 800, letterSpacing: 1.5,
                  padding: '6px 14px', borderRadius: 20
                }}>LIVE INVENTORY</div>

                {/* Floating product images */}
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80"
                    alt="hero products"
                    style={{ width: '75%', height: '75%', objectFit: 'contain', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.18))' }}
                    onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80'; }}
                  />
                </div>

                {/* Bottom sales card */}
                <div style={{
                  position: 'absolute', bottom: 20, left: 20,
                  background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)',
                  borderRadius: 16, padding: '12px 16px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                  display: 'flex', alignItems: 'center', gap: 12
                }}>
                  <div style={{
                    width: 36, height: 36, background: '#f0fdf4', borderRadius: 10,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <TrendingUp style={{ width: 18, height: 18, color: '#16a34a' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: '#9ca3af', letterSpacing: 0.5 }}>BUGUNGI SOTUV</div>
                    <div style={{ fontSize: 15, fontWeight: 900, color: '#0f0f14', letterSpacing: '-0.5px' }}>
                      ${(totalValue / 1000).toFixed(1)}k &nbsp;·&nbsp; <span style={{ color: '#16a34a' }}>+24%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── MAIN WORKSPACE ── */}
      <main style={{ maxWidth: 1320, margin: '0 auto', padding: '40px 2.5rem 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 28, alignItems: 'start' }}>

          {/* ── SIDEBAR ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Categories */}
            <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 20, padding: '18px 14px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
              <div style={{ fontSize: 10, fontWeight: 800, color: '#9ca3af', letterSpacing: 2, marginBottom: 12 }}>KATEGORIYALAR</div>
              {[
                { id: 'all', label: 'Barcha mahsulotlar', icon: <Package style={{ width: 14, height: 14 }} />, count: products.length },
                { id: 'home', label: 'Maishiy texnika', icon: <Home style={{ width: 14, height: 14 }} /> },
                { id: 'audio', label: 'Audio jihozlar', icon: <Music style={{ width: 14, height: 14 }} /> },
                { id: 'tech', label: 'Elektronika', icon: <Smartphone style={{ width: 14, height: 14 }} /> },
              ].map(cat => (
                <div key={cat.id} onClick={() => setActiveCategory(cat.id)} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '9px 12px', borderRadius: 12, cursor: 'pointer', marginBottom: 3,
                  background: activeCategory === cat.id ? '#f5f3ff' : 'transparent',
                  color: activeCategory === cat.id ? '#6366f1' : '#6b7280',
                  fontWeight: 600, fontSize: 13, transition: 'all 0.15s'
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>{cat.icon}{cat.label}</span>
                  {cat.count !== undefined && (
                    <span style={{
                      background: activeCategory === cat.id ? '#6366f1' : '#f3f4f6',
                      color: activeCategory === cat.id ? '#fff' : '#6b7280',
                      fontSize: 10, fontWeight: 800, padding: '2px 7px', borderRadius: 8
                    }}>{cat.count}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Add product form */}
            <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 20, padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
              <h3 style={{ fontSize: 13, fontWeight: 800, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6, color: '#0f0f14' }}>
                <PlusCircle style={{ width: 14, height: 14, color: '#6366f1' }} /> Tovar qo'shish
              </h3>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                {[
                  { label: 'SKU KOD', val: sku, set: setSku, ph: 'SKU-001', mono: true },
                  { label: 'MAHSULOT NOMI', val: name, set: setName, ph: 'Headphone R175' },
                ].map(f => (
                  <div key={f.label}>
                    <label style={{ fontSize: 10, fontWeight: 700, color: '#9ca3af', letterSpacing: 1, display: 'block', marginBottom: 5 }}>{f.label}</label>
                    <input type="text" value={f.val} onChange={e => f.set(e.target.value)} required placeholder={f.ph} style={{
                      width: '100%', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 10,
                      padding: '8px 12px', fontSize: 12, color: '#0f0f14', outline: 'none',
                      fontFamily: f.mono ? 'monospace' : 'inherit', boxSizing: 'border-box' as const,
                      transition: 'border-color 0.15s'
                    }} />
                  </div>
                ))}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {[
                    { label: 'MIQDOR', val: quantity, isNum: true, set: (v: string) => setQuantity(Number(v)) },
                    { label: 'NARX ($)', val: price, isNum: false, ph: '29.90', set: setPrice },
                  ].map(f => (
                    <div key={f.label}>
                      <label style={{ fontSize: 10, fontWeight: 700, color: '#9ca3af', letterSpacing: 1, display: 'block', marginBottom: 5 }}>{f.label}</label>
                      <input type={f.isNum ? 'number' : 'text'} value={f.val}
                        onChange={e => f.set(e.target.value)} required
                        placeholder={(f as any).ph || ''}
                        style={{
                          width: '100%', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 10,
                          padding: '8px 12px', fontSize: 12, color: '#0f0f14', outline: 'none', boxSizing: 'border-box' as const
                        }} />
                    </div>
                  ))}
                </div>
                <button type="submit" style={{
                  width: '100%', background: '#0f0f14', color: '#fff',
                  border: 'none', borderRadius: 12, padding: '10px',
                  fontSize: 11, fontWeight: 800, cursor: 'pointer', letterSpacing: 1, marginTop: 4,
                  transition: 'opacity 0.15s'
                }}>BAZAGA JOYLASH</button>
              </form>
            </div>
          </div>

          {/* ── PRODUCT GRID ── */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div style={{ fontSize: 13, color: '#9ca3af', fontWeight: 600 }}>{filteredProducts.length} ta mahsulot</div>
              {lowStock > 0 && (
                <div style={{
                  background: '#fef3c7', border: '1px solid #fde68a', color: '#92400e',
                  fontSize: 11, fontWeight: 700, padding: '5px 12px', borderRadius: 20
                }}>⚠ {lowStock} ta kam zaxira</div>
              )}
            </div>

            {loading && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
                {[...Array(6)].map((_, i) => (
                  <div key={i} style={{ background: '#f3f4f6', borderRadius: 20, height: 300, animation: 'pulse 1.5s ease-in-out infinite' }} />
                ))}
              </div>
            )}
            {error && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 16, padding: '14px 18px', color: '#dc2626', fontSize: 13 }}>
                Xatolik: {error}
              </div>
            )}
            {!loading && filteredProducts.length === 0 && (
              <div style={{ background: '#fff', borderRadius: 24, border: '1px solid #e5e7eb', padding: 60, textAlign: 'center', color: '#9ca3af', fontSize: 14 }}>
                <Package style={{ width: 36, height: 36, margin: '0 auto 12px', opacity: 0.3 }} />
                <div>Mahsulot topilmadi</div>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
              {filteredProducts.map(product => {
                const isLow = product.quantity > 0 && product.quantity <= 5;
                const isOut = product.quantity === 0;
                const imgSrc = imgErrors[product.sku]
                  ? null
                  : getProductImage(product.name);

                return (
                  <div key={product.id}
                    style={{
                      background: '#fff', border: '1px solid #e5e7eb', borderRadius: 20,
                      overflow: 'hidden', display: 'flex', flexDirection: 'column',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease', cursor: 'pointer'
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)';
                      (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 32px rgba(99,102,241,0.12), 0 4px 12px rgba(0,0,0,0.06)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                      (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)';
                    }}
                  >
                    {/* Image area */}
                    <div style={{ position: 'relative', height: 168, background: 'linear-gradient(145deg, #f8f9ff, #f0f4ff)', overflow: 'hidden' }}>
                      {imgSrc ? (
                        <img src={imgSrc} alt={product.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.35s ease' }}
                          onError={() => setImgErrors(prev => ({ ...prev, [product.sku]: true }))}
                          onMouseEnter={e => (e.target as HTMLImageElement).style.transform = 'scale(1.06)'}
                          onMouseLeave={e => (e.target as HTMLImageElement).style.transform = 'scale(1)'}
                        />
                      ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Package style={{ width: 44, height: 44, color: '#d1d5db' }} />
                        </div>
                      )}
                      {/* Stock badge */}
                      <div style={{
                        position: 'absolute', top: 10, right: 10,
                        background: isOut ? '#fef2f2' : isLow ? '#fffbeb' : '#f0fdf4',
                        color: isOut ? '#dc2626' : isLow ? '#d97706' : '#16a34a',
                        border: `1px solid ${isOut ? '#fecaca' : isLow ? '#fde68a' : '#bbf7d0'}`,
                        fontSize: 9, fontWeight: 800, padding: '3px 9px',
                        borderRadius: 20, letterSpacing: 0.5
                      }}>
                        {isOut ? 'TUGAGAN' : isLow ? 'KAM QOLDI' : 'MAVJUD'}
                      </div>
                    </div>

                    {/* Info */}
                    <div style={{ padding: '14px 16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <span style={{
                        fontSize: 10, fontWeight: 700, color: '#6366f1',
                        background: '#f5f3ff', padding: '2px 8px',
                        borderRadius: 6, display: 'inline-block',
                        marginBottom: 8, fontFamily: 'monospace'
                      }}>{product.sku}</span>

                      <h4 style={{ fontSize: 13, fontWeight: 700, color: '#0f0f14', lineHeight: 1.35, marginBottom: 6, flex: 1 }}>
                        {product.name}
                      </h4>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 12 }}>
                        <div>
                          <div style={{ fontSize: 19, fontWeight: 900, color: '#0f0f14', letterSpacing: '-0.5px' }}>
                            ${parseFloat(product.price).toFixed(2)}
                          </div>
                          <div style={{ fontSize: 10, color: '#9ca3af', fontWeight: 600 }}>{product.quantity} dona zaxira</div>
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, borderTop: '1px solid #f3f4f6', paddingTop: 12 }}>
                        <button style={{
                          background: '#f9fafb', border: '1px solid #e5e7eb', color: '#374151',
                          borderRadius: 10, padding: '7px 0', fontSize: 11, fontWeight: 700, cursor: 'pointer',
                          transition: 'background 0.15s'
                        }}>Ko'rish</button>
                        <button style={{
                          background: '#0f0f14', border: 'none', color: '#fff',
                          borderRadius: 10, padding: '7px 0', fontSize: 11, fontWeight: 700, cursor: 'pointer',
                          transition: 'opacity 0.15s'
                        }}>Tahrirlash</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: '1px solid #e5e7eb', background: '#fff', padding: '28px 2.5rem' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: '#0f0f14' }}>Stuffus shop</div>
          <div style={{ fontSize: 12, color: '#9ca3af' }}>© 2026 Stuffus Shop. Hamma huquqlar himoyalangan.</div>
        </div>
      </footer>

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input::placeholder { color: #9ca3af !important; }
        @keyframes pulse { 0%,100%{opacity:.5} 50%{opacity:.8} }
      `}</style>
    </div>
  );
}