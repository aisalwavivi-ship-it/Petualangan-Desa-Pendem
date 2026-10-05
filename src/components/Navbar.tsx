import React from 'react';
import { Volume2, VolumeX, Sparkles, Trophy, BookOpen, Calculator, Compass, RotateCcw } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface NavbarProps {
  coins: number;
  totalStars: number;
  activeTab: 'adventure' | 'porogapit' | 'manipulative' | 'curriculum';
  setActiveTab: (tab: 'adventure' | 'porogapit' | 'manipulative' | 'curriculum') => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  onOpenCertificate: () => void;
  onResetProgress: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  coins,
  totalStars,
  activeTab,
  setActiveTab,
  soundEnabled,
  setSoundEnabled,
  onOpenCertificate,
  onResetProgress,
}) => {
  const toggleAudio = () => {
    const newState = soundFx.toggleSound();
    setSoundEnabled(newState);
    if (newState) soundFx.playPop();
  };

  return (
    <header className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700 text-white shadow-lg sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Title & Branding */}
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActiveTab('adventure')}>
          <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shadow-inner border border-white/30">
            ⛰️
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight tracking-wide flex items-center gap-1.5 font-fredoka">
              Petualangan Desa Pendem
              <span className="text-xs bg-amber-400 text-amber-950 font-bold px-2 py-0.5 rounded-full shadow-sm">
                Kelas 4 SD
              </span>
            </h1>
            <p className="text-xs text-emerald-100 font-medium">Kota Batu • Belajar Konsep Pembagian Ceria</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 bg-black/15 p-1 rounded-2xl backdrop-blur-sm border border-white/10 overflow-x-auto text-sm">
          <button
            onClick={() => {
              setActiveTab('adventure');
              soundFx.playPop();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium transition-all ${
              activeTab === 'adventure'
                ? 'bg-white text-emerald-800 shadow font-semibold'
                : 'text-white/90 hover:bg-white/10'
            }`}
          >
            <Compass className="w-4 h-4 text-emerald-500" />
            <span>Peta Desa</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('porogapit');
              soundFx.playPop();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium transition-all ${
              activeTab === 'porogapit'
                ? 'bg-white text-emerald-800 shadow font-semibold'
                : 'text-white/90 hover:bg-white/10'
            }`}
          >
            <Calculator className="w-4 h-4 text-blue-500" />
            <span>Lab Porogapit</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('manipulative');
              soundFx.playPop();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium transition-all ${
              activeTab === 'manipulative'
                ? 'bg-white text-emerald-800 shadow font-semibold'
                : 'text-white/90 hover:bg-white/10'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Bagi Apel Bebas</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('curriculum');
              soundFx.playPop();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium transition-all ${
              activeTab === 'curriculum'
                ? 'bg-white text-emerald-800 shadow font-semibold'
                : 'text-white/90 hover:bg-white/10'
            }`}
          >
            <BookOpen className="w-4 h-4 text-purple-500" />
            <span>Materi & Panduan</span>
          </button>
        </nav>

        {/* Stats & Actions */}
        <div className="flex items-center gap-2">
          {/* Stars */}
          <div className="flex items-center gap-1.5 bg-amber-500/30 border border-amber-300/40 px-2.5 py-1 rounded-xl text-amber-200 font-bold text-sm shadow-inner">
            <span className="text-base text-yellow-300">⭐</span>
            <span>{totalStars}</span>
          </div>

          {/* Coins */}
          <div className="flex items-center gap-1.5 bg-yellow-400 text-yellow-950 font-bold px-2.5 py-1 rounded-xl text-sm shadow">
            <span>🪙</span>
            <span>{coins}</span>
          </div>

          {/* Certificate */}
          <button
            onClick={onOpenCertificate}
            title="Lihat Sertifikat Prestasi"
            className="p-1.5 bg-amber-400 hover:bg-amber-300 text-amber-950 rounded-xl transition shadow flex items-center gap-1 text-xs font-bold"
          >
            <Trophy className="w-4 h-4" />
            <span className="hidden sm:inline">Piala</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleAudio}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-xl transition text-white"
            title={soundEnabled ? 'Matikan Suara Efek' : 'Nyalakan Suara Efek'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-red-200" />}
          </button>

          {/* Reset progress */}
          <button
            onClick={onResetProgress}
            className="p-2 bg-white/15 hover:bg-red-500/80 rounded-xl transition text-white/80 hover:text-white"
            title="Ulangi Petualangan dari Awal"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
