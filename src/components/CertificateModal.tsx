import React, { useState } from 'react';
import { X, Award, Printer, Star } from 'lucide-react';
import { StageInfo } from '../types';

interface CertificateModalProps {
  playerName: string;
  setPlayerName: (name: string) => void;
  stages: StageInfo[];
  totalStars: number;
  coins: number;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  playerName,
  setPlayerName,
  stages,
  totalStars,
  coins,
  onClose,
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const completedCount = stages.filter((s) => s.completed).length;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border-4 border-amber-400 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Card Printable */}
        <div className="border-8 border-double border-amber-600/60 rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-amber-50/50 via-white to-amber-50/40 text-center space-y-4 shadow-inner relative overflow-hidden">
          {/* Subtle watermark / background icon */}
          <div className="absolute -bottom-8 -right-8 text-9xl text-amber-500/10 pointer-events-none select-none font-black">
            🏆
          </div>

          {/* Header */}
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-amber-800 bg-amber-200/70 px-3 py-1 rounded-full">
              <span>🌟 SERTIFIKAT PRESTASI MATEMATIKA 🌟</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-amber-950 font-fredoka pt-1">
              Petualangan Berbagi di Desa Pendem
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Kecamatan Junrejo, Kota Batu, Jawa Timur • Materi Pembagian Kelas 4 SD
            </p>
          </div>

          <p className="text-xs text-slate-600 italic pt-2">
            Dengan bangga diberikan kepada Petualang Hebat:
          </p>

          {/* Student Name */}
          <div className="py-2">
            {isEditingName ? (
              <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="Ketik Namamu..."
                  className="px-4 py-1.5 rounded-xl border-2 border-amber-400 text-center font-bold text-lg text-slate-800 focus:outline-none w-full"
                />
                <button
                  onClick={() => setIsEditingName(false)}
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold rounded-xl text-xs"
                >
                  Simpan
                </button>
              </div>
            ) : (
              <div
                onClick={() => setIsEditingName(true)}
                className="cursor-pointer group inline-block"
                title="Klik untuk ubah nama"
              >
                <h3 className="text-2xl sm:text-3xl font-extrabold text-emerald-800 font-fredoka underline decoration-amber-400 decoration-wavy group-hover:text-emerald-600 transition">
                  {playerName || 'Siswa Berprestasi'}
                </h3>
                <span className="text-[10px] text-amber-700 block mt-0.5 group-hover:underline">
                  ✏️ (Klik untuk ubah nama)
                </span>
              </div>
            )}
          </div>

          {/* Statement */}
          <p className="text-xs sm:text-sm text-slate-700 max-w-md mx-auto leading-relaxed">
            Telah berhasil menyelesaikan pos penjelajahan matematika pembagian di Desa Pendem Kota Batu mencakup konsep berbagi adil, pengurangan berulang, jurus porogapit (Ba-Ka-Ku-Tu), dan pembagian bersisa.
          </p>

          {/* Stats & Badges */}
          <div className="grid grid-cols-3 gap-2 py-2 max-w-md mx-auto text-xs font-bold text-slate-700">
            <div className="bg-amber-100/70 p-2.5 rounded-xl border border-amber-300">
              <span className="text-lg">⭐</span>
              <p className="text-amber-950 mt-0.5">{totalStars} / 15 Bintang</p>
            </div>
            <div className="bg-emerald-100/70 p-2.5 rounded-xl border border-emerald-300">
              <span className="text-lg">🏕️</span>
              <p className="text-emerald-950 mt-0.5">{completedCount} / 5 Pos Tuntas</p>
            </div>
            <div className="bg-blue-100/70 p-2.5 rounded-xl border border-blue-300">
              <span className="text-lg">🪙</span>
              <p className="text-blue-950 mt-0.5">{coins} Koin Desa</p>
            </div>
          </div>

          {/* Badges Earned */}
          <div className="pt-1">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Lencana Petualang yang Diraih:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              {stages.map((st) => (
                <span
                  key={st.id}
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border ${
                    st.completed
                      ? 'bg-amber-100 text-amber-950 border-amber-300 shadow-sm'
                      : 'bg-slate-100 text-slate-400 border-slate-200'
                  }`}
                >
                  <Award className={`w-3 h-3 ${st.completed ? 'text-amber-600' : 'text-slate-400'}`} />
                  <span>{st.badge}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Signatures */}
          <div className="flex items-center justify-between pt-6 text-xs text-slate-600 border-t border-amber-200/80 px-4">
            <div className="text-center">
              <p className="font-bold text-slate-800">Pak Kades Pendem</p>
              <p className="text-[10px] text-slate-500">Pemerintah Desa Pendem</p>
            </div>
            <div className="w-14 h-14 rounded-full border-2 border-dashed border-amber-600 flex items-center justify-center text-[10px] font-black text-amber-800 rotate-[-12deg]">
              CAP DESA
            </div>
            <div className="text-center">
              <p className="font-bold text-slate-800">Guru Matematika</p>
              <p className="text-[10px] text-slate-500">Fase B Kelas 4 SD</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 pt-4">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Sertifikat</span>
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
};
