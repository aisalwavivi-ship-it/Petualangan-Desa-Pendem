import React from 'react';
import { soundFx } from '../utils/audio';
import { Volume2, VolumeX, Star, Award, BookOpen, MapPin, Calculator, HelpCircle, Compass } from 'lucide-react';

interface Props {
  activeTab: 'adventure' | 'lessons' | 'lab' | 'quickquiz' | 'guide';
  setActiveTab: (tab: 'adventure' | 'lessons' | 'lab' | 'quickquiz' | 'guide') => void;
  totalStars: number;
  coins: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenCertificate: () => void;
}

export const Header: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  totalStars,
  coins,
  soundEnabled,
  onToggleSound,
  onOpenCertificate,
}) => {
  return (
    <header className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 text-white shadow-xl sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
        {/* Top Info Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-emerald-600/60">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-3xl shadow-inner animate-gentle-bounce">
              🍎
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-black uppercase tracking-widest bg-amber-400 text-emerald-950 px-2 py-0.5 rounded-full">
                  Matematika SD Kelas 4
                </span>
                <span className="text-[11px] text-emerald-200 flex items-center gap-1 font-medium">
                  <MapPin className="w-3 h-3 text-emerald-300" /> Desa Pendem, Kota Batu
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-1.5 drop-shadow-sm">
                Petualangan Berbagi di Desa Pendem
              </h1>
            </div>
          </div>

          {/* Stats & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Stars */}
            <div className="flex items-center gap-1.5 bg-emerald-900/60 border border-emerald-500/40 px-3 py-1.5 rounded-2xl">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="font-black text-amber-300 text-sm">{totalStars}</span>
              <span className="text-[10px] text-emerald-300 font-semibold uppercase">Bintang</span>
            </div>

            {/* Coins */}
            <div className="flex items-center gap-1.5 bg-emerald-900/60 border border-emerald-500/40 px-3 py-1.5 rounded-2xl">
              <span className="text-sm">🪙</span>
              <span className="font-black text-yellow-300 text-sm">{coins}</span>
              <span className="text-[10px] text-emerald-300 font-semibold uppercase">Koin</span>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={() => {
                soundFx.playPop();
                onToggleSound();
              }}
              title={soundEnabled ? 'Matikan Suara' : 'Nyalakan Suara'}
              className="p-2 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-95 transition border border-white/20 text-white"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-200" /> : <VolumeX className="w-4 h-4 text-rose-300" />}
            </button>

            {/* Certificate */}
            <button
              onClick={() => {
                soundFx.playPop();
                onOpenCertificate();
              }}
              className="px-3 py-1.5 rounded-2xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-emerald-950 font-black text-xs flex items-center gap-1.5 shadow-md transition"
            >
              <Award className="w-4 h-4" />
              <span className="hidden sm:inline">Piala & Sertifikat</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1.5 sm:gap-2 mt-3 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => {
              soundFx.playPop();
              setActiveTab('adventure');
            }}
            className={`px-3.5 py-1.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 whitespace-nowrap transition ${
              activeTab === 'adventure'
                ? 'bg-white text-emerald-900 shadow-md font-extrabold'
                : 'text-emerald-100 hover:bg-white/10'
            }`}
          >
            <Compass className="w-4 h-4" /> Peta Petualangan
          </button>

          <button
            onClick={() => {
              soundFx.playPop();
              setActiveTab('lessons');
            }}
            className={`px-3.5 py-1.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 whitespace-nowrap transition ${
              activeTab === 'lessons'
                ? 'bg-white text-emerald-900 shadow-md font-extrabold'
                : 'text-emerald-100 hover:bg-white/10'
            }`}
          >
            <BookOpen className="w-4 h-4" /> Buku Materi
          </button>

          <button
            onClick={() => {
              soundFx.playPop();
              setActiveTab('lab');
            }}
            className={`px-3.5 py-1.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 whitespace-nowrap transition ${
              activeTab === 'lab'
                ? 'bg-white text-emerald-900 shadow-md font-extrabold'
                : 'text-emerald-100 hover:bg-white/10'
            }`}
          >
            <Calculator className="w-4 h-4" /> Lab Porogapit (Ba-Ka-Ku-Tu)
          </button>

          <button
            onClick={() => {
              soundFx.playPop();
              setActiveTab('quickquiz');
            }}
            className={`px-3.5 py-1.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 whitespace-nowrap transition ${
              activeTab === 'quickquiz'
                ? 'bg-white text-emerald-900 shadow-md font-extrabold'
                : 'text-emerald-100 hover:bg-white/10'
            }`}
          >
            <Award className="w-4 h-4" /> Kuis Tangkas Cepat
          </button>

          <button
            onClick={() => {
              soundFx.playPop();
              setActiveTab('guide');
            }}
            className={`px-3.5 py-1.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 whitespace-nowrap transition ${
              activeTab === 'guide'
                ? 'bg-white text-emerald-900 shadow-md font-extrabold'
                : 'text-emerald-100 hover:bg-white/10'
            }`}
          >
            <HelpCircle className="w-4 h-4" /> Panduan Belajar
          </button>
        </nav>
      </div>
    </header>
  );
};
