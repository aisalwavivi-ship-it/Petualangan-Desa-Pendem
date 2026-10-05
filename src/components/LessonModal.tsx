import React, { useState } from 'react';
import { StageInfo } from '../types';
import { X, ChevronLeft, ChevronRight, CheckCircle2, Sparkles, Lightbulb } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface LessonModalProps {
  stage: StageInfo;
  onClose: () => void;
  onContinueToMission: () => void;
}

export const LessonModal: React.FC<LessonModalProps> = ({ stage, onClose, onContinueToMission }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const slide = stage.lessons[slideIndex] || stage.lessons[0];

  const handleNext = () => {
    if (slideIndex < stage.lessons.length - 1) {
      setSlideIndex(slideIndex + 1);
      soundFx.playPop();
    } else {
      soundFx.playSuccess();
      onContinueToMission();
    }
  };

  const handlePrev = () => {
    if (slideIndex > 0) {
      setSlideIndex(slideIndex - 1);
      soundFx.playPop();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border-4 border-emerald-400 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Character */}
        <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-3xl">
            {stage.character.avatar}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                Materi {slideIndex + 1} dari {stage.lessons.length}
              </span>
              <span className="text-xs text-slate-400">• {stage.name}</span>
            </div>
            <h3 className="font-extrabold text-xl text-slate-800 font-fredoka mt-0.5">
              {slide.title}
            </h3>
          </div>
        </div>

        {/* Slide Body */}
        <div className="py-6 space-y-5">
          <h4 className="text-sm font-bold text-emerald-700 uppercase tracking-wide">
            {slide.subtitle}
          </h4>

          {/* Educational Content */}
          <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 text-slate-800 leading-relaxed font-medium whitespace-pre-line text-sm sm:text-base">
            {slide.content}
          </div>

          {/* Visual Demonstrator */}
          <div className="bg-gradient-to-br from-slate-50 to-blue-50/50 p-5 rounded-2xl border-2 border-dashed border-emerald-300 space-y-4">
            <p className="text-xs font-bold text-slate-500 flex items-center gap-1.5 uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Ilustrasi Visual Konsep
            </p>

            {/* Apple Visual */}
            {slide.visualType === 'apples' && (
              <div className="space-y-3 text-center">
                <p className="text-xs font-semibold text-slate-600">12 Apel dibagi ke 3 Keranjang = 4 Apel tiap keranjang</p>
                <div className="grid grid-cols-3 gap-3">
                  {[1, 2, 3].map((k) => (
                    <div key={k} className="bg-amber-50 p-3 rounded-2xl border-2 border-amber-300 text-center shadow-sm">
                      <p className="text-[11px] font-bold text-amber-800 mb-1.5">Keranjang {k}</p>
                      <div className="flex items-center justify-center gap-1 text-2xl">
                        <span>🍎</span>
                        <span>🍎</span>
                        <span>🍎</span>
                        <span>🍎</span>
                      </div>
                      <span className="text-xs font-bold text-emerald-700 mt-1 inline-block">4 Apel</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Milk Repeated Subtraction Visual */}
            {slide.visualType === 'milk' && (
              <div className="space-y-2 text-center">
                <p className="text-xs font-semibold text-slate-600">15 Liter Susu Murni dikurangi 5 liter secara berulang:</p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <div className="bg-white px-3 py-2 rounded-xl shadow-sm border border-slate-200 text-sm font-bold text-blue-700">
                    15 - 5 = 10 <span className="text-xs font-normal text-slate-400">(ke-1)</span>
                  </div>
                  <span className="text-slate-400 font-bold">➔</span>
                  <div className="bg-white px-3 py-2 rounded-xl shadow-sm border border-slate-200 text-sm font-bold text-blue-700">
                    10 - 5 = 5 <span className="text-xs font-normal text-slate-400">(ke-2)</span>
                  </div>
                  <span className="text-slate-400 font-bold">➔</span>
                  <div className="bg-emerald-100 px-3 py-2 rounded-xl shadow-sm border border-emerald-300 text-sm font-bold text-emerald-800">
                    5 - 5 = 0 <span className="text-xs font-normal text-emerald-600">(ke-3: Habis!)</span>
                  </div>
                </div>
                <div className="text-xs font-bold text-emerald-700 bg-emerald-50 py-1.5 rounded-lg border border-emerald-200 mt-2">
                  ✨ Kesimpulan: Pengurangan berulang sebanyak 3 kali, maka 15 ÷ 5 = 3!
                </div>
              </div>
            )}

            {/* Porogapit Visual */}
            {slide.visualType === 'porogapit' && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                  <div className="bg-blue-100 text-blue-900 font-bold p-2 rounded-xl border border-blue-200">
                    1. BA (Bagi)
                  </div>
                  <div className="bg-amber-100 text-amber-900 font-bold p-2 rounded-xl border border-amber-200">
                    2. KA (Kali)
                  </div>
                  <div className="bg-rose-100 text-rose-900 font-bold p-2 rounded-xl border border-rose-200">
                    3. KU (Kurang)
                  </div>
                  <div className="bg-emerald-100 text-emerald-900 font-bold p-2 rounded-xl border border-emerald-200">
                    4. TU (Turunkan)
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-center font-mono text-base font-bold text-slate-800">
                  <div className="text-left leading-relaxed">
                    <div className="text-right text-emerald-600 tracking-wider">Hasil: 24</div>
                    <div className="border-t-2 border-l-2 border-slate-800 pl-3 pt-1">
                      3 ) 72
                    </div>
                    <div className="pl-6 text-slate-500">
                      - 6 &nbsp;&nbsp;(2 × 3)
                    </div>
                    <div className="pl-6 border-b border-slate-400">
                      ---
                    </div>
                    <div className="pl-6 text-slate-800">
                      &nbsp;&nbsp;12 &nbsp;(Turunkan 2)
                    </div>
                    <div className="pl-6 text-slate-500">
                      - 12 &nbsp;(4 × 3)
                    </div>
                    <div className="pl-6 border-b border-slate-400">
                      ---
                    </div>
                    <div className="pl-6 text-emerald-600 font-extrabold">
                      &nbsp;&nbsp;&nbsp;0 &nbsp;(Selesai!)
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Remainder Visual */}
            {slide.visualType === 'remainder' && (
              <div className="space-y-2 text-center">
                <p className="text-xs font-semibold text-slate-600">
                  14 Tangkai Bunga dibagi ke 4 Vas Bunga:
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((v) => (
                    <div key={v} className="bg-white p-2.5 rounded-xl border border-pink-200 text-center shadow-sm">
                      <p className="text-[10px] font-bold text-pink-700">Vas {v}</p>
                      <div className="text-xl">🌸🌸🌸</div>
                      <span className="text-[11px] font-bold text-slate-600">3 bunga</span>
                    </div>
                  ))}
                </div>
                <div className="bg-amber-100 p-2.5 rounded-xl border border-amber-300 text-amber-900 text-xs font-bold flex items-center justify-center gap-2">
                  <span>🌸🌸</span>
                  <span>Sisa: 2 tangkai bunga (karena tidak cukup dibagi rata ke 4 vas)</span>
                </div>
                <p className="text-xs font-bold text-emerald-700">14 ÷ 4 = 3 (sisa 2)</p>
              </div>
            )}

            {/* Concept / Generic Visual */}
            {slide.visualType === 'concept' && (
              <div className="text-center py-2">
                <span className="text-2xl sm:text-3xl font-black text-emerald-700 font-fredoka bg-white px-6 py-2.5 rounded-2xl shadow-sm border border-emerald-200 inline-block">
                  {slide.visualData?.formula}
                </span>
              </div>
            )}

            {/* Pedagogical Hint */}
            <div className="flex items-start gap-2 bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-900 text-xs">
              <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Tips Cepat: </span>
                {slide.hint}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 gap-3">
          <button
            onClick={handlePrev}
            disabled={slideIndex === 0}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-sm transition ${
              slideIndex === 0
                ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Sebelumnya</span>
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-md hover:shadow transition"
          >
            <span>{slideIndex === stage.lessons.length - 1 ? 'Lanjut Praktik Berbagi' : 'Selanjutnya'}</span>
            {slideIndex === stage.lessons.length - 1 ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-200" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
