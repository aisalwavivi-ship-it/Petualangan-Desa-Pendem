import React, { useState } from 'react';
import { Calculator, Play, RotateCcw, ChevronRight, CheckCircle, Lightbulb } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface PorogapitStep {
  stepType: 'BA' | 'KA' | 'KU' | 'TU' | 'FINISH';
  title: string;
  description: string;
  currentWorkingNum: number;
  digitBagi: number;
  hasilKali?: number;
  hasilKurang?: number;
  turunDigit?: number;
  currentQuotientStr: string;
}

export const PorogapitCalculator: React.FC = () => {
  const [dividend, setDividend] = useState<number>(75);
  const [divisor, setDivisor] = useState<number>(3);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isCalculated, setIsCalculated] = useState<boolean>(true);

  // Quick preset examples suitable for Grade 4
  const presets = [
    { div: 72, dis: 3, label: '72 ÷ 3 (Keripik Desa)' },
    { div: 84, dis: 4, label: '84 ÷ 4 (Wisatawan)' },
    { div: 96, dis: 6, label: '96 ÷ 6 (Peternakan Susu)' },
    { div: 125, dis: 5, label: '125 ÷ 5 (Apel Manalagi)' },
    { div: 85, dis: 4, label: '85 ÷ 4 (Ada Sisa)' },
  ];

  // Calculate detailed porogapit steps
  const computeSteps = (d: number, s: number): PorogapitStep[] => {
    if (s <= 0 || d < 0) return [];
    const steps: PorogapitStep[] = [];
    const digits = d.toString().split('').map(Number);

    let currentNum = 0;
    let quotientStr = '';
    let digitIdx = 0;

    while (digitIdx < digits.length) {
      currentNum = currentNum * 10 + digits[digitIdx];

      // If currentNum < s and we haven't produced any quotient digit yet, we can take the next digit if available
      if (currentNum < s && quotientStr === '' && digitIdx + 1 < digits.length) {
        digitIdx++;
        currentNum = currentNum * 10 + digits[digitIdx];
      }

      const qDigit = Math.floor(currentNum / s);
      quotientStr += qDigit.toString();

      // Step BA (Bagi)
      steps.push({
        stepType: 'BA',
        title: `1. BA (Bagi): ${currentNum} ÷ ${s}`,
        description: `Bagi ${currentNum} dengan ${s}. Hasil yang paling mendekati adalah ${qDigit}. Tulis angka ${qDigit} di atas!`,
        currentWorkingNum: currentNum,
        digitBagi: qDigit,
        currentQuotientStr: quotientStr,
      });

      // Step KA (Kali)
      const mul = qDigit * s;
      steps.push({
        stepType: 'KA',
        title: `2. KA (Kali): ${qDigit} × ${s} = ${mul}`,
        description: `Kalikan angka hasil ${qDigit} dengan pembagi ${s}. Tulis ${mul} tepat di bawah ${currentNum}.`,
        currentWorkingNum: currentNum,
        digitBagi: qDigit,
        hasilKali: mul,
        currentQuotientStr: quotientStr,
      });

      // Step KU (Kurang)
      const rem = currentNum - mul;
      steps.push({
        stepType: 'KU',
        title: `3. KU (Kurang): ${currentNum} - ${mul} = ${rem}`,
        description: `Kurangkan ${currentNum} dengan ${mul}, sehingga bersisa ${rem}.`,
        currentWorkingNum: currentNum,
        digitBagi: qDigit,
        hasilKali: mul,
        hasilKurang: rem,
        currentQuotientStr: quotientStr,
      });

      currentNum = rem;
      digitIdx++;

      // Step TU (Turunkan) if there are more digits
      if (digitIdx < digits.length) {
        const nextDigit = digits[digitIdx];
        steps.push({
          stepType: 'TU',
          title: `4. TU (Turunkan): Turunkan angka ${nextDigit}`,
          description: `Turunkan angka berikutnya (${nextDigit}) ke sebelah angka sisa ${rem}, sehingga sekarang menjadi ${rem * 10 + nextDigit}.`,
          currentWorkingNum: currentNum,
          digitBagi: qDigit,
          hasilKurang: rem,
          turunDigit: nextDigit,
          currentQuotientStr: quotientStr,
        });
      }
    }

    // Final step
    steps.push({
      stepType: 'FINISH',
      title: 'Selesai!',
      description:
        currentNum === 0
          ? `Pembagian selesai tanpa sisa! Hasil akhirnya adalah ${quotientStr}.`
          : `Pembagian selesai! Hasil akhirnya adalah ${quotientStr} dengan SISA ${currentNum}.`,
      currentWorkingNum: currentNum,
      digitBagi: 0,
      currentQuotientStr: quotientStr,
    });

    return steps;
  };

  const steps = computeSteps(dividend, divisor);
  const activeStep = steps[currentStepIndex] || steps[0];

  const handleNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
      soundFx.playPop();
    } else {
      soundFx.playSuccess();
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    soundFx.playPop();
  };

  const handleShowAll = () => {
    setCurrentStepIndex(steps.length - 1);
    soundFx.playSuccess();
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Title */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-700 text-white p-6 rounded-3xl shadow-xl border-4 border-blue-400/40">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-xs font-bold mb-2">
              <Calculator className="w-3.5 h-3.5" />
              <span>Laboratorium Interaktif Siswa & Guru</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-fredoka">
              Simulasi Porogapit (Ba-Ka-Ku-Tu)
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 max-w-lg mt-1">
              Kuasai metode pembagian bersusun khas Indonesia langkah demi langkah dengan panduan jurus Bagi, Kali, Kurang, dan Turunkan!
            </p>
          </div>
          <div className="bg-white/15 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 text-center shrink-0">
            <span className="text-3xl">📐</span>
            <p className="text-xs font-bold text-white mt-1">Materi Inti Kelas 4</p>
          </div>
        </div>
      </div>

      {/* Input Controls & Presets */}
      <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">
            Pilih Soal atau Masukkan Angkamu:
          </h3>
          <div className="flex flex-wrap items-center gap-1.5">
            {presets.map((p, i) => (
              <button
                key={i}
                onClick={() => {
                  setDividend(p.div);
                  setDivisor(p.dis);
                  setCurrentStepIndex(0);
                  soundFx.playPop();
                }}
                className={`text-xs px-2.5 py-1 rounded-xl font-bold transition border ${
                  dividend === p.div && divisor === p.dis
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">
              Bilangan yang Dibagi (Dividend):
            </label>
            <input
              type="number"
              min="1"
              max="999"
              value={dividend}
              onChange={(e) => {
                const val = Math.max(1, Math.min(999, parseInt(e.target.value) || 1));
                setDividend(val);
                setCurrentStepIndex(0);
              }}
              className="w-full px-4 py-2.5 rounded-2xl border-2 border-slate-300 focus:border-blue-500 focus:outline-none font-bold text-slate-800 text-lg shadow-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">
              Bilangan Pembagi (Divisor):
            </label>
            <input
              type="number"
              min="2"
              max="20"
              value={divisor}
              onChange={(e) => {
                const val = Math.max(2, Math.min(20, parseInt(e.target.value) || 2));
                setDivisor(val);
                setCurrentStepIndex(0);
              }}
              className="w-full px-4 py-2.5 rounded-2xl border-2 border-slate-300 focus:border-blue-500 focus:outline-none font-bold text-slate-800 text-lg shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Main Porogapit Interactive Board */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Visual Porogapit Bracket Display (6 cols) */}
        <div className="lg:col-span-6 bg-slate-900 text-white p-6 rounded-3xl shadow-xl border-4 border-slate-800 flex flex-col items-center justify-center min-h-[380px]">
          <div className="w-full flex items-center justify-between pb-3 border-b border-slate-700/80 mb-4 text-xs font-mono text-slate-400">
            <span>DIAGRAM POROGAPIT</span>
            <span className="text-emerald-400 font-bold">
              {dividend} ÷ {divisor}
            </span>
          </div>

          {/* Interactive Bracket Display */}
          <div className="font-mono text-xl sm:text-2xl tracking-wider select-none">
            {/* Quotient on top */}
            <div className="text-right text-emerald-400 font-extrabold pr-4 pb-1">
              Hasil: {activeStep.currentQuotientStr || '...'}
            </div>

            {/* Bracket line */}
            <div className="flex items-center text-slate-100">
              <span className="text-amber-400 font-bold pr-2">{divisor}</span>
              <div className="border-t-4 border-l-4 border-slate-300 rounded-tl-lg pl-3 pt-1 text-white font-black">
                {dividend}
              </div>
            </div>

            {/* Step-by-step subtraction rows */}
            <div className="pl-12 pt-2 space-y-1 text-sm sm:text-base text-slate-300">
              {activeStep.hasilKali !== undefined && (
                <div className="text-rose-400 font-bold">
                  - {activeStep.hasilKali}
                </div>
              )}
              {activeStep.hasilKurang !== undefined && (
                <div>
                  <div className="border-b-2 border-slate-600 w-24 mb-1" />
                  <div className="text-emerald-300 font-bold">
                    &nbsp;&nbsp;{activeStep.hasilKurang}
                    {activeStep.turunDigit !== undefined && (
                      <span className="text-yellow-400 font-black animate-bounce inline-block ml-0.5">
                        {activeStep.turunDigit}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Final conclusion */}
          {currentStepIndex === steps.length - 1 && (
            <div className="mt-8 bg-emerald-500/20 border border-emerald-400/40 p-3 rounded-2xl text-center text-emerald-300 text-sm font-bold animate-fade-in">
              🎉 {dividend} ÷ {divisor} = {Math.floor(dividend / divisor)}{' '}
              {dividend % divisor > 0 ? `(sisa ${dividend % divisor})` : '(habis dibagi)'}
            </div>
          )}
        </div>

        {/* Step Guide & Explanations (6 cols) */}
        <div className="lg:col-span-6 bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-500">
              Langkah {currentStepIndex + 1} dari {steps.length}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={handleReset}
                className="px-2.5 py-1 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition"
              >
                Reset
              </button>
              <button
                onClick={handleShowAll}
                className="px-2.5 py-1 text-xs font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg transition"
              >
                Lihat Semua
              </button>
            </div>
          </div>

          {/* Step Badge */}
          <div className="space-y-2">
            <div
              className={`inline-block px-3 py-1 rounded-xl text-xs font-black shadow-sm ${
                activeStep.stepType === 'BA'
                  ? 'bg-blue-100 text-blue-800'
                  : activeStep.stepType === 'KA'
                  ? 'bg-amber-100 text-amber-900'
                  : activeStep.stepType === 'KU'
                  ? 'bg-rose-100 text-rose-900'
                  : activeStep.stepType === 'TU'
                  ? 'bg-purple-100 text-purple-900'
                  : 'bg-emerald-100 text-emerald-900'
              }`}
            >
              {activeStep.title}
            </div>
            <p className="text-base text-slate-800 font-semibold leading-relaxed">
              {activeStep.description}
            </p>
          </div>

          {/* Ba-Ka-Ku-Tu Legend */}
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 space-y-2">
            <p className="text-xs font-bold text-slate-500 flex items-center gap-1">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" /> Rumus Ba-Ka-Ku-Tu:
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className={`p-2 rounded-xl border ${activeStep.stepType === 'BA' ? 'bg-blue-100 border-blue-400 font-bold' : 'bg-white border-slate-200'}`}>
                🔹 BA = Bagi angka
              </div>
              <div className={`p-2 rounded-xl border ${activeStep.stepType === 'KA' ? 'bg-amber-100 border-amber-400 font-bold' : 'bg-white border-slate-200'}`}>
                🔸 KA = Kali hasil
              </div>
              <div className={`p-2 rounded-xl border ${activeStep.stepType === 'KU' ? 'bg-rose-100 border-rose-400 font-bold' : 'bg-white border-slate-200'}`}>
                🔻 KU = Kurangkan
              </div>
              <div className={`p-2 rounded-xl border ${activeStep.stepType === 'TU' ? 'bg-purple-100 border-purple-400 font-bold' : 'bg-white border-slate-200'}`}>
                ⬇️ TU = Turunkan
              </div>
            </div>
          </div>

          {/* Next Step Button */}
          <div className="pt-2">
            <button
              onClick={handleNextStep}
              disabled={currentStepIndex >= steps.length - 1}
              className={`w-full py-3.5 rounded-2xl font-extrabold flex items-center justify-center gap-2 shadow-md transition ${
                currentStepIndex >= steps.length - 1
                  ? 'bg-emerald-100 text-emerald-800 cursor-default'
                  : 'bg-blue-600 hover:bg-blue-700 text-white active:scale-95'
              }`}
            >
              {currentStepIndex >= steps.length - 1 ? (
                <>
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span>Langkah Telah Lengkap!</span>
                </>
              ) : (
                <>
                  <span>Lanjut Langkah Berikutnya</span>
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
