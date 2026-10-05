import React, { useState } from 'react';
import { Sparkles, RotateCcw, Play, CheckCircle2, Info } from 'lucide-react';
import { soundFx } from '../utils/audio';

export const ManipulativeLab: React.FC = () => {
  const [totalItems, setTotalItems] = useState<number>(18);
  const [basketCount, setBasketCount] = useState<number>(3);
  const [itemType, setItemType] = useState<'apple' | 'milk' | 'chip' | 'flower'>('apple');
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [baskets, setBaskets] = useState<number[]>([0, 0, 0]);
  const [unassigned, setUnassigned] = useState<number>(18);

  const itemMeta = {
    apple: { name: 'Apel Manalagi Batu', icon: '🍎' },
    milk: { name: 'Susu Murni Desa Pendem', icon: '🥛' },
    chip: { name: 'Keripik Apel Renyah', icon: '🍪' },
    flower: { name: 'Bunga Matahari Caru', icon: '🌻' },
  };

  const handleReset = (newTotal = totalItems, newBaskets = basketCount) => {
    setTotalItems(newTotal);
    setBasketCount(newBaskets);
    setBaskets(new Array(newBaskets).fill(0));
    setUnassigned(newTotal);
    soundFx.playPop();
  };

  // Instant share
  const handleInstantShare = () => {
    const perBasket = Math.floor(totalItems / basketCount);
    const remainder = totalItems % basketCount;
    setBaskets(new Array(basketCount).fill(perBasket));
    setUnassigned(remainder);
    soundFx.playSuccess();
  };

  // Step-by-step automatic share round-by-round
  const handleAnimateShare = async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    let currentUnassigned = totalItems;
    let currentBaskets = new Array(basketCount).fill(0);
    setBaskets(currentBaskets);
    setUnassigned(currentUnassigned);

    const perBasket = Math.floor(totalItems / basketCount);

    for (let round = 0; round < perBasket; round++) {
      await new Promise((res) => setTimeout(res, 350));
      currentBaskets = currentBaskets.map((b) => b + 1);
      currentUnassigned -= basketCount;
      setBaskets([...currentBaskets]);
      setUnassigned(currentUnassigned);
      soundFx.playPop();
    }

    soundFx.playSuccess();
    setIsAnimating(false);
  };

  const perBasket = Math.floor(totalItems / basketCount);
  const remainder = totalItems % basketCount;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700 text-white p-6 rounded-3xl shadow-xl border-4 border-emerald-400/40">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Manipulatif Digital Konkret</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-fredoka">
              Laboratorium Berbagi Benda Nyata
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-lg mt-1">
              Eksplorasi pembagian secara konkret dengan membagikan buah apel, susu sapi, keripik, atau bunga Desa Pendem ke dalam keranjang-keranjang!
            </p>
          </div>
          <div className="text-4xl animate-bounce shrink-0">🧺</div>
        </div>
      </div>

      {/* Settings / Controls */}
      <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm space-y-4">
        {/* Item Type Selector */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Pilih Benda yang Ingin Dibagikan:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(Object.keys(itemMeta) as (keyof typeof itemMeta)[]).map((type) => (
              <button
                key={type}
                onClick={() => {
                  setItemType(type);
                  soundFx.playPop();
                }}
                className={`p-3 rounded-2xl border-2 text-center transition font-bold text-xs flex items-center justify-center gap-2 ${
                  itemType === type
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-300'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span className="text-xl">{itemMeta[type].icon}</span>
                <span>{itemMeta[type].name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sliders / Number Pickers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
              <span>Banyak Benda (Jumlah Awal):</span>
              <span className="bg-emerald-600 text-white px-2.5 py-0.5 rounded-full text-sm">
                {totalItems} buah
              </span>
            </div>
            <input
              type="range"
              min="4"
              max="40"
              value={totalItems}
              onChange={(e) => handleReset(Number(e.target.value), basketCount)}
              className="w-full accent-emerald-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-1">
              <span>4 benda</span>
              <span>20 benda</span>
              <span>40 benda</span>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
              <span>Banyak Keranjang / Wadah:</span>
              <span className="bg-blue-600 text-white px-2.5 py-0.5 rounded-full text-sm">
                {basketCount} wadah
              </span>
            </div>
            <input
              type="range"
              min="2"
              max="6"
              value={basketCount}
              onChange={(e) => handleReset(totalItems, Number(e.target.value))}
              className="w-full accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-1">
              <span>2 wadah</span>
              <span>4 wadah</span>
              <span>6 wadah</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2">
            <button
              onClick={handleAnimateShare}
              disabled={isAnimating}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 disabled:opacity-50 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition"
            >
              <Play className="w-4 h-4" />
              <span>Simulasi Bagi Satu per Satu</span>
            </button>
            <button
              onClick={handleInstantShare}
              disabled={isAnimating}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 disabled:opacity-50 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Bagi Cepat</span>
            </button>
          </div>
          <button
            onClick={() => handleReset(totalItems, basketCount)}
            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition flex items-center gap-1.5 text-xs font-bold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Kembalikan Benda</span>
          </button>
        </div>
      </div>

      {/* Visual Workspace */}
      <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm space-y-6">
        {/* Unassigned Items Box */}
        <div className="bg-amber-50 p-4 rounded-2xl border-2 border-dashed border-amber-300 text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-amber-900 mb-2">
            <span>Meja Panen (Benda yang Belum Masuk Keranjang):</span>
            <span className="bg-amber-400 text-amber-950 px-2 py-0.5 rounded-full text-xs font-black">
              {unassigned} {itemMeta[itemType].name}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-1.5 min-h-[50px] p-2">
            {Array.from({ length: unassigned }).map((_, i) => (
              <span key={i} className="text-2xl animate-fade-in hover:scale-125 transition">
                {itemMeta[itemType].icon}
              </span>
            ))}
            {unassigned === 0 && (
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                ✨ Semua benda sudah dibagikan habis ke keranjang!
              </span>
            )}
          </div>
        </div>

        {/* Baskets Grid */}
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            Keranjang Hasil Pembagian:
          </p>
          <div
            className={`grid gap-4 ${
              basketCount <= 3
                ? 'grid-cols-1 sm:grid-cols-3'
                : basketCount <= 4
                ? 'grid-cols-2 sm:grid-cols-4'
                : 'grid-cols-2 sm:grid-cols-3'
            }`}
          >
            {baskets.map((count, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-b from-slate-50 to-emerald-50/30 p-4 rounded-2xl border-2 border-emerald-300 text-center shadow-sm"
              >
                <div className="text-xs font-bold text-emerald-900 mb-2 flex items-center justify-center gap-1">
                  <span>🧺 Keranjang #{idx + 1}</span>
                </div>

                <div className="h-24 flex flex-wrap items-center justify-center gap-1 overflow-y-auto bg-white p-2 rounded-xl border border-slate-200 mb-2">
                  {Array.from({ length: count }).map((_, i) => (
                    <span key={i} className="text-xl">
                      {itemMeta[itemType].icon}
                    </span>
                  ))}
                  {count === 0 && (
                    <span className="text-xs text-slate-300 italic">Kosong</span>
                  )}
                </div>

                <div className="font-black text-slate-800 text-lg">
                  {count} <span className="text-xs font-normal text-slate-500">buah</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mathematical Conclusion Card */}
        <div className="bg-emerald-50 p-5 rounded-2xl border-2 border-emerald-300 space-y-2">
          <div className="flex items-center gap-2 text-emerald-950 font-bold text-sm">
            <Info className="w-4 h-4 text-emerald-600" />
            <span>Kesimpulan Matematika Pembagian:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-center">
            <div className="bg-white p-3 rounded-xl border border-emerald-200 shadow-sm">
              <p className="text-[11px] font-bold text-slate-500">Rumus Pembagian</p>
              <p className="text-lg font-black text-emerald-700 font-fredoka mt-0.5">
                {totalItems} ÷ {basketCount} = {perBasket}
                {remainder > 0 && <span className="text-xs text-amber-700"> (sisa {remainder})</span>}
              </p>
            </div>

            <div className="bg-white p-3 rounded-xl border border-emerald-200 shadow-sm">
              <p className="text-[11px] font-bold text-slate-500">Hubungan Perkalian</p>
              <p className="text-base font-bold text-slate-800 font-fredoka mt-0.5">
                ({basketCount} × {perBasket}) + {remainder} = {totalItems}
              </p>
            </div>

            <div className="bg-white p-3 rounded-xl border border-emerald-200 shadow-sm">
              <p className="text-[11px] font-bold text-slate-500">Pengurangan Berulang</p>
              <p className="text-xs font-semibold text-slate-700 font-mono mt-1">
                {totalItems}
                {Array.from({ length: perBasket })
                  .map(() => ` - ${basketCount}`)
                  .join('')}{' '}
                = {remainder}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
