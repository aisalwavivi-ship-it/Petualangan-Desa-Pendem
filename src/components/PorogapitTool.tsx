import React, { useState } from 'react';
import { soundFx } from '../utils/audio';
import { Play, RotateCcw, ChevronRight, HelpCircle, CheckCircle } from 'lucide-react';

interface Step {
  stepNumber: number;
  phase: 'BA' | 'KA' | 'KU' | 'TU' | 'FINISH';
  phaseName: string;
  explanation: string;
  quotientSoFar: string;
  currentWork: {
    digitToDivide: number;
    subtractionVal: number;
    remainder: number;
    nextDigitBroughtDown?: number;
  };
}

export const PorogapitTool: React.FC = () => {
  const [dividend, setDividend] = useState<number>(72);
  const [divisor, setDivisor] = useState<number>(3);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // Generate steps for standard 2 or 3 digit integer division
  const generateSteps = (num: number, den: number): Step[] => {
    if (den <= 0 || num <= 0) return [];
    const steps: Step[] = [];
    const numStr = num.toString();
    let currentPart = 0;
    let quotient = '';
    let stepCount = 1;

    for (let i = 0; i < numStr.length; i++) {
      const digit = parseInt(numStr[i], 10);
      currentPart = currentPart * 10 + digit;

      if (currentPart < den && quotient.length === 0 && i < numStr.length - 1) {
        continue;
      }

      const qDigit = Math.floor(currentPart / den);
      quotient += qDigit.toString();
      const product = qDigit * den;
      const rem = currentPart - product;

      // 1. BAGI
      steps.push({
        stepNumber: stepCount++,
        phase: 'BA',
        phaseName: 'BA (Bagi)',
        explanation: `Ambil angka ${currentPart}. Bagi dengan ${den}: ${currentPart} ÷ ${den} = dapat ${qDigit} (tulis di atas).`,
        quotientSoFar: quotient,
        currentWork: {
          digitToDivide: currentPart,
          subtractionVal: product,
          remainder: rem,
        },
      });

      // 2. KALI
      steps.push({
        stepNumber: stepCount++,
        phase: 'KA',
        phaseName: 'KA (Kali)',
        explanation: `Kalikan hasil tadi ${qDigit} dengan pembagi ${den}: ${qDigit} × ${den} = ${product}. Tulis di bawah angka ${currentPart}.`,
        quotientSoFar: quotient,
        currentWork: {
          digitToDivide: currentPart,
          subtractionVal: product,
          remainder: rem,
        },
      });

      // 3. KURANG
      steps.push({
        stepNumber: stepCount++,
        phase: 'KU',
        phaseName: 'KU (Kurang)',
        explanation: `Kurangkan: ${currentPart} - ${product} = ${rem}.`,
        quotientSoFar: quotient,
        currentWork: {
          digitToDivide: currentPart,
          subtractionVal: product,
          remainder: rem,
        },
      });

      // 4. TURUNKAN (if more digits exist)
      if (i < numStr.length - 1) {
        const nextDigit = parseInt(numStr[i + 1], 10);
        steps.push({
          stepNumber: stepCount++,
          phase: 'TU',
          phaseName: 'TU (Turunkan)',
          explanation: `Turunkan angka berikutnya yaitu ${nextDigit} ke samping ${rem}, sehingga menjadi ${rem * 10 + nextDigit}.`,
          quotientSoFar: quotient,
          currentWork: {
            digitToDivide: currentPart,
            subtractionVal: product,
            remainder: rem,
            nextDigitBroughtDown: nextDigit,
          },
        });
      }

      currentPart = rem;
    }

    steps.push({
      stepNumber: stepCount,
      phase: 'FINISH',
      phaseName: 'SELESAI!',
      explanation: `Pembagian selesai! Hasil akhir: ${Math.floor(num / den)} ${num % den > 0 ? `dengan sisa ${num % den}` : 'tanpa sisa (habis dibagi)'}.`,
      quotientSoFar: quotient,
      currentWork: {
        digitToDivide: currentPart,
        subtractionVal: 0,
        remainder: currentPart,
      },
    });

    return steps;
  };

  const steps = generateSteps(dividend, divisor);
  const currentStep = steps[activeStepIndex] || steps[0];

  const handleNextStep = () => {
    if (activeStepIndex < steps.length - 1) {
      soundFx.playPop();
      setActiveStepIndex(prev => prev + 1);
    } else {
      soundFx.playSuccess();
    }
  };

  const handleReset = () => {
    soundFx.playPop();
    setActiveStepIndex(0);
    setIsRunning(false);
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-emerald-100 max-w-4xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
        <div>
          <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold tracking-wide uppercase mb-1">
            Laboratorium Mandiri Kelas 4
          </span>
          <h3 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <span>📐</span> Simulasi Porogapit Interaktif (Ba-Ka-Ku-Tu)
          </h3>
          <p className="text-sm text-slate-500">
            Ketik angka yang ingin kamu bagi, lalu pelajari langkah Bagi - Kali - Kurang - Turunkan secara visual!
          </p>
        </div>

        {/* Preset quick buttons */}
        <div className="flex flex-wrap gap-2">
          {[
            { a: 72, b: 3 },
            { a: 48, b: 4 },
            { a: 96, b: 6 },
            { a: 85, b: 5 },
            { a: 126, b: 3 },
          ].map((preset, idx) => (
            <button
              key={idx}
              onClick={() => {
                soundFx.playPop();
                setDividend(preset.a);
                setDivisor(preset.b);
                setActiveStepIndex(0);
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-50 text-xs font-semibold text-slate-700 hover:text-emerald-700 transition"
            >
              {preset.a} ÷ {preset.b}
            </button>
          ))}
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200">
          <label className="block text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2">
            Angka yang Dibagi (Dividen):
          </label>
          <input
            type="number"
            min="10"
            max="999"
            value={dividend}
            onChange={(e) => {
              const val = Math.max(1, parseInt(e.target.value) || 0);
              setDividend(val);
              setActiveStepIndex(0);
            }}
            className="w-full text-2xl font-extrabold text-emerald-950 bg-white border-2 border-emerald-300 rounded-xl px-4 py-2 focus:ring-4 focus:ring-emerald-200 outline-none"
          />
          <p className="text-xs text-emerald-600 mt-1">Bisa puluhan atau ratusan (contoh: 72, 96, 126)</p>
        </div>

        <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200">
          <label className="block text-xs font-bold text-amber-800 uppercase tracking-wider mb-2">
            Angka Pembagi (Divisor):
          </label>
          <input
            type="number"
            min="2"
            max="9"
            value={divisor}
            onChange={(e) => {
              const val = Math.max(2, Math.min(9, parseInt(e.target.value) || 2));
              setDivisor(val);
              setActiveStepIndex(0);
            }}
            className="w-full text-2xl font-extrabold text-amber-950 bg-white border-2 border-amber-300 rounded-xl px-4 py-2 focus:ring-4 focus:ring-amber-200 outline-none"
          />
          <p className="text-xs text-amber-600 mt-1">Pembagi bilangan satuan (2 sampai 9)</p>
        </div>
      </div>

      {/* Porogapit Stage Visualization */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left: Porogapit Bracket Art */}
        <div className="md:col-span-6 bg-slate-900 text-white rounded-3xl p-6 shadow-inner relative overflow-hidden flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping inline-block"></span>
              Papan Tulis Porogapit
            </span>
            <span className="text-xs bg-slate-800 px-3 py-1 rounded-full text-slate-300 font-mono">
              Langkah {activeStepIndex + 1} dari {steps.length}
            </span>
          </div>

          {/* Porogapit Display Container */}
          <div className="font-mono text-3xl font-bold my-6 tracking-widest relative inline-block p-4">
            {/* Top quotient result */}
            <div className="text-right pr-6 mb-2 text-amber-400 text-4xl drop-shadow">
              {currentStep ? currentStep.quotientSoFar || '?' : '?'}
            </div>

            {/* The Porogapit bracket line */}
            <div className="flex items-center">
              <div className="text-rose-400 pr-4 text-4xl font-extrabold border-r-4 border-white">
                {divisor}
              </div>
              <div className="pl-4 border-t-4 border-white text-emerald-300 text-4xl font-extrabold">
                {dividend}
              </div>
            </div>

            {/* Current Step Annotations */}
            {currentStep && currentStep.phase !== 'FINISH' && (
              <div className="mt-4 pt-2 border-t border-slate-700/80 text-sm text-slate-300 font-sans">
                <div className="flex items-center gap-2 text-cyan-300">
                  <span className="font-bold">Fokus:</span>
                  <span>{currentStep.currentWork.digitToDivide} ÷ {divisor}</span>
                </div>
              </div>
            )}
          </div>

          {/* Phase Badge */}
          <div className="mt-2 w-full flex justify-center">
            <div
              className={`px-4 py-2 rounded-2xl font-black text-sm uppercase tracking-wider flex items-center gap-2 ${
                currentStep?.phase === 'BA'
                  ? 'bg-blue-600 text-white'
                  : currentStep?.phase === 'KA'
                  ? 'bg-amber-500 text-slate-950'
                  : currentStep?.phase === 'KU'
                  ? 'bg-rose-500 text-white'
                  : currentStep?.phase === 'TU'
                  ? 'bg-purple-600 text-white'
                  : 'bg-emerald-500 text-white'
              }`}
            >
              {currentStep?.phaseName}
            </div>
          </div>
        </div>

        {/* Right: Explanation & Step Controllers */}
        <div className="md:col-span-6 flex flex-col justify-between h-full bg-slate-50 p-6 rounded-3xl border border-slate-200">
          <div>
            <h4 className="text-xs uppercase font-extrabold text-slate-400 tracking-wider mb-2">
              Penjelasan Langkah Demi Langkah:
            </h4>
            <div className="bg-white p-5 rounded-2xl border-2 border-slate-200/80 shadow-sm min-h-[140px]">
              <p className="text-base text-slate-800 font-medium leading-relaxed">
                {currentStep?.explanation}
              </p>
            </div>

            {/* Mantra Ba-Ka-Ku-Tu reminder cards */}
            <div className="grid grid-cols-4 gap-2 mt-4 text-center">
              <div className={`p-2 rounded-xl border text-xs font-bold ${currentStep?.phase === 'BA' ? 'bg-blue-100 border-blue-400 text-blue-800 font-black scale-105' : 'bg-white border-slate-200 text-slate-500'}`}>
                1. BA<br/><span className="text-[10px] font-normal">Bagi</span>
              </div>
              <div className={`p-2 rounded-xl border text-xs font-bold ${currentStep?.phase === 'KA' ? 'bg-amber-100 border-amber-400 text-amber-800 font-black scale-105' : 'bg-white border-slate-200 text-slate-500'}`}>
                2. KA<br/><span className="text-[10px] font-normal">Kali</span>
              </div>
              <div className={`p-2 rounded-xl border text-xs font-bold ${currentStep?.phase === 'KU' ? 'bg-rose-100 border-rose-400 text-rose-800 font-black scale-105' : 'bg-white border-slate-200 text-slate-500'}`}>
                3. KU<br/><span className="text-[10px] font-normal">Kurang</span>
              </div>
              <div className={`p-2 rounded-xl border text-xs font-bold ${currentStep?.phase === 'TU' ? 'bg-purple-100 border-purple-400 text-purple-800 font-black scale-105' : 'bg-white border-slate-200 text-slate-500'}`}>
                4. TU<br/><span className="text-[10px] font-normal">Turunkan</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-200">
            <button
              onClick={handleReset}
              className="px-4 py-3 rounded-2xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-bold text-sm flex items-center gap-2 transition"
            >
              <RotateCcw className="w-4 h-4" /> Ulangi
            </button>

            <button
              onClick={handleNextStep}
              disabled={activeStepIndex >= steps.length - 1}
              className={`flex-1 py-3 px-6 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-lg transition ${
                activeStepIndex >= steps.length - 1
                  ? 'bg-emerald-600 text-white cursor-default'
                  : 'bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white'
              }`}
            >
              {activeStepIndex >= steps.length - 1 ? (
                <>
                  <CheckCircle className="w-5 h-5" /> Selesai! Hebat Sekali!
                </>
              ) : (
                <>
                  Langkah Berikutnya <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
