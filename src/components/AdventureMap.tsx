import React from 'react';
import { StageInfo } from '../types';
import { Lock, Star, CheckCircle, ArrowRight, Play, BookOpen, Award } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface AdventureMapProps {
  stages: StageInfo[];
  selectedStageId: string | null;
  onSelectStage: (stage: StageInfo) => void;
  onStartLesson: (stage: StageInfo) => void;
  onStartMission: (stage: StageInfo) => void;
  onStartQuiz: (stage: StageInfo) => void;
}

export const AdventureMap: React.FC<AdventureMapProps> = ({
  stages,
  selectedStageId,
  onSelectStage,
  onStartLesson,
  onStartMission,
  onStartQuiz,
}) => {
  const selectedStage = stages.find((s) => s.id === selectedStageId) || stages[0];

  return (
    <div className="space-y-6">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 via-teal-600 to-green-800 text-white p-6 shadow-xl border-4 border-emerald-400/40">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-yellow-300/20 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-emerald-100 border border-white/20">
              <span>🌾 Gerbang Wisata Kota Batu</span>
              <span>•</span>
              <span>Matematika Berbagi Ceria</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-wide font-fredoka drop-shadow-sm">
              Jelajahi Desa Pendem & Taklukkan Pembagian!
            </h2>
            <p className="text-sm sm:text-base text-emerald-50 max-w-xl leading-relaxed">
              Mbah Slamet, Cak Budi, Bu Minah, dan Bu Sri membutuhkan bantuanmu untuk membagikan hasil panen dan produk desa secara adil! Selesaikan 5 pos petualangan untuk meraih Piala Juara Desa Pendem! 🍎🥛🍪🌻🏆
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/15 backdrop-blur-md p-4 rounded-2xl border border-white/30 shadow-inner">
            <div className="text-4xl animate-bounce">🎒</div>
            <div>
              <p className="text-xs uppercase tracking-wider text-emerald-200 font-bold">Misi Utama</p>
              <p className="text-sm font-bold text-white">5 Pos Petualangan Berbagi</p>
              <div className="flex items-center gap-1 mt-1">
                {stages.map((st, i) => (
                  <div
                    key={st.id}
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                      st.completed
                        ? 'bg-yellow-400 text-yellow-950 font-black'
                        : st.unlocked
                        ? 'bg-white/40 text-white'
                        : 'bg-black/20 text-white/40'
                    }`}
                  >
                    {st.completed ? '✓' : i + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Adventure Grid & Interactive Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Stage List / Map Path (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-emerald-950 flex items-center gap-2">
              <span className="text-xl">🗺️</span> Pos Petualangan Desa Pendem
            </h3>
            <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
              Pilih pos untuk memulai
            </span>
          </div>

          <div className="space-y-3.5">
            {stages.map((stage, index) => {
              const isSelected = stage.id === selectedStage.id;
              return (
                <div
                  key={stage.id}
                  onClick={() => {
                    if (stage.unlocked) {
                      onSelectStage(stage);
                      soundFx.playPop();
                    } else {
                      soundFx.playError();
                    }
                  }}
                  className={`relative p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                    !stage.unlocked
                      ? 'bg-slate-100 border-slate-200 opacity-60 cursor-not-allowed'
                      : isSelected
                      ? 'bg-gradient-to-r from-emerald-50 via-teal-50 to-white border-emerald-500 shadow-md ring-2 ring-emerald-400/30 -translate-y-0.5'
                      : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-emerald-300 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    {/* Left: Icon & Pos Number */}
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center text-2xl shadow-sm border ${
                          !stage.unlocked
                            ? 'bg-slate-200 text-slate-400 border-slate-300'
                            : stage.completed
                            ? 'bg-amber-100 text-amber-900 border-amber-300'
                            : 'bg-emerald-100 text-emerald-900 border-emerald-300'
                        }`}
                      >
                        <span>{stage.icon}</span>
                        <span className="text-[10px] font-bold text-slate-600 mt-0.5">Pos {index + 1}</span>
                      </div>

                      {/* Middle: Title & Topic */}
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-900 text-base leading-tight">
                            {stage.name}
                          </h4>
                          {stage.completed && (
                            <span className="inline-flex items-center gap-0.5 bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">
                              <CheckCircle className="w-3.5 h-3.5" /> Selesai
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">{stage.subName}</p>
                        <p className="text-xs text-emerald-700 font-semibold mt-1 bg-emerald-50 inline-block px-2 py-0.5 rounded-md">
                          🎯 {stage.topic}
                        </p>
                      </div>
                    </div>

                    {/* Right: Stars / Lock */}
                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      {!stage.unlocked ? (
                        <div className="flex items-center gap-1 bg-slate-200 text-slate-600 text-xs px-2.5 py-1 rounded-full font-bold">
                          <Lock className="w-3.5 h-3.5" /> Terkunci
                        </div>
                      ) : (
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3].map((starIdx) => (
                            <Star
                              key={starIdx}
                              className={`w-4 h-4 ${
                                starIdx <= stage.stars
                                  ? 'fill-amber-400 text-amber-500'
                                  : 'text-slate-300 fill-slate-100'
                              }`}
                            />
                          ))}
                        </div>
                      )}

                      <span className="text-[11px] font-bold text-slate-400">
                        {stage.unlocked ? (isSelected ? 'Sedang Dipilih' : 'Ketuk untuk Buka') : 'Selesaikan Pos Sebelumnya'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Stage Detail & Character Box (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border-2 border-emerald-200/80 shadow-lg space-y-5 sticky top-20">
          {/* Character Header */}
          <div className="flex items-center gap-4 bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-2xl border border-emerald-100">
            <div className="w-16 h-16 rounded-2xl bg-white shadow flex items-center justify-center text-4xl border border-emerald-200 animate-gentle-bounce shrink-0">
              {selectedStage.character.avatar}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-emerald-950 text-base">{selectedStage.character.name}</h4>
                <span className="text-[11px] bg-emerald-200/60 text-emerald-900 font-bold px-2 py-0.5 rounded-full">
                  {selectedStage.character.role}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 italic">
                "{selectedStage.character.greeting.slice(0, 110)}..."
              </p>
            </div>
          </div>

          {/* Pos Description & Objectives */}
          <div className="space-y-3">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tentang Pos Ini</p>
              <p className="text-sm text-slate-700 font-medium leading-relaxed mt-1">
                {selectedStage.description}
              </p>
            </div>

            <div className="bg-amber-50/70 p-3.5 rounded-xl border border-amber-200 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-amber-900">
                <span>Lencana yang Diperoleh:</span>
                <span className="flex items-center gap-1 bg-amber-200 text-amber-950 px-2 py-0.5 rounded-md">
                  <Award className="w-3.5 h-3.5 text-amber-700" /> {selectedStage.badge}
                </span>
              </div>
              <p className="text-[11px] text-amber-800 leading-tight">
                Dapatkan 3 bintang dengan membaca materi, menyelesaikan misi membagi, dan menjawab kuis dengan tepat!
              </p>
            </div>
          </div>

          {/* Action Buttons for this Stage */}
          <div className="space-y-2.5 pt-2">
            <button
              onClick={() => {
                onStartLesson(selectedStage);
                soundFx.playPop();
              }}
              className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-md hover:shadow transition"
            >
              <BookOpen className="w-4 h-4" />
              <span>1. Pelajari Konsep & Materi</span>
              <ArrowRight className="w-4 h-4 ml-auto" />
            </button>

            <button
              onClick={() => {
                onStartMission(selectedStage);
                soundFx.playPop();
              }}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-md hover:shadow transition"
            >
              <Play className="w-4 h-4" />
              <span>2. Misi Praktik Berbagi ({selectedStage.interactiveTask.itemName})</span>
              <ArrowRight className="w-4 h-4 ml-auto" />
            </button>

            <button
              onClick={() => {
                onStartQuiz(selectedStage);
                soundFx.playPop();
              }}
              className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-600 active:scale-[0.98] text-amber-950 rounded-2xl font-extrabold flex items-center justify-center gap-2 shadow-md hover:shadow transition"
            >
              <Award className="w-4 h-4" />
              <span>3. Kuis Juara Pos (Raih Bintang & Koin)</span>
              <ArrowRight className="w-4 h-4 ml-auto" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
