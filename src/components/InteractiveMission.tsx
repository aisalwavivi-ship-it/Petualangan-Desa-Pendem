import React, { useState } from 'react';
import { StageInfo } from '../types';
import { X, CheckCircle, RotateCcw, Sparkles, ArrowRight, Check } from 'lucide-react';
import { soundFx } from '../utils/audio';
import confetti from 'canvas-confetti';

interface InteractiveMissionProps {
  stage: StageInfo;
  onClose: () => void;
  onComplete: (coinsEarned: number) => void;
}

export const InteractiveMission: React.FC<InteractiveMissionProps> = ({
  stage,
  onClose,
  onComplete,
}) => {
  const task = stage.interactiveTask;
  // State: array representing count of items in each basket
  const [baskets, setBaskets] = useState<number[]>(() => new Array(task.totalBaskets).fill(0));
  const [isSuccess, setIsSuccess] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const assignedCount = baskets.reduce((a, b) => a + b, 0);
  const remainingCount = task.totalItems - assignedCount;

  // Add 1 item to basket
  const handleAddToBasket = (basketIndex: number) => {
    if (remainingCount <= 0) {
      soundFx.playError();
      return;
    }
    const newBaskets = [...baskets];
    newBaskets[basketIndex] += 1;
    setBaskets(newBaskets);
    soundFx.playPop();
    checkCompletion(newBaskets);
  };

  // Remove 1 item from basket
  const handleRemoveFromBasket = (basketIndex: number) => {
    if (baskets[basketIndex] <= 0) return;
    const newBaskets = [...baskets];
    newBaskets[basketIndex] -= 1;
    setBaskets(newBaskets);
    soundFx.playPop();
    setIsSuccess(false);
    setFeedbackMsg('');
  };

  // Distribute one item into each basket simultaneously (round-robin equal share)
  const handleDistributeOneRound = () => {
    if (remainingCount < task.totalBaskets) {
      soundFx.playError();
      setFeedbackMsg(`Sisa ${task.itemName.toLowerCase()} (${remainingCount}) tidak cukup untuk dibagikan rata ke semua ${task.totalBaskets} ${task.basketName.toLowerCase()}!`);
      return;
    }
    const newBaskets = baskets.map((val) => val + 1);
    setBaskets(newBaskets);
    soundFx.playCoin();
    checkCompletion(newBaskets);
  };

  // Reset
  const handleReset = () => {
    setBaskets(new Array(task.totalBaskets).fill(0));
    setIsSuccess(false);
    setFeedbackMsg('');
    soundFx.playPop();
  };

  // Validate completion
  const checkCompletion = (currentBaskets: number[]) => {
    const totalAssigned = currentBaskets.reduce((a, b) => a + b, 0);
    const expectedRemainder = task.correctRemainder || 0;
    const expectedDistributed = task.totalItems - expectedRemainder;

    const allBasketsEqual = currentBaskets.every((b) => b === task.correctPerBasket);

    if (totalAssigned === expectedDistributed && allBasketsEqual) {
      setIsSuccess(true);
      soundFx.playFanfare();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
      if (expectedRemainder > 0) {
        setFeedbackMsg(`Luar biasa! Masing-masing ${task.basketName} berisi tepat ${task.correctPerBasket} ${task.itemName.toLowerCase()}, dengan sisa ${expectedRemainder} ${task.itemName.toLowerCase()}!`);
      } else {
        setFeedbackMsg(`Hebat sekali! Semua ${task.basketName} terisi adil dan rata: ${task.correctPerBasket} ${task.itemName.toLowerCase()} setiap wadah (${task.totalItems} ÷ ${task.totalBaskets} = ${task.correctPerBasket})!`);
      }
    }
  };

  const handleFinish = () => {
    onComplete(25); // award 25 coins
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border-4 border-blue-400 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 border border-blue-300 flex items-center justify-center text-3xl">
            {task.itemIcon}
          </div>
          <div>
            <span className="text-xs font-bold bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full">
              Praktik Interaktif • {stage.name}
            </span>
            <h3 className="font-extrabold text-xl text-slate-800 font-fredoka mt-0.5">
              {task.title}
            </h3>
          </div>
        </div>

        {/* Prompt */}
        <div className="my-4 bg-blue-50/80 p-4 rounded-2xl border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-slate-700 font-medium">
            🎯 <span className="font-bold">{task.storyPrompt}</span>
          </p>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleDistributeOneRound}
              disabled={isSuccess || remainingCount < task.totalBaskets}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 shadow-sm transition ${
                isSuccess || remainingCount < task.totalBaskets
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bagi 1 ke Semua</span>
            </button>
            <button
              onClick={handleReset}
              className="p-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl transition"
              title="Mulai Ulang"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Remaining Items Counter & Visual Bag */}
        <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-center mb-6">
          <div className="flex items-center justify-center gap-2 text-sm font-bold text-amber-950">
            <span>Barang Tersisa yang Belum Dibagi:</span>
            <span className="text-lg bg-amber-400 text-amber-950 px-3 py-0.5 rounded-full shadow-sm">
              {remainingCount} {task.itemName}
            </span>
          </div>

          {/* Visual representations (dots or small icons) */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-2.5 max-h-24 overflow-y-auto p-1">
            {Array.from({ length: Math.min(remainingCount, 60) }).map((_, i) => (
              <span key={i} className="text-xl animate-fade-in hover:scale-125 transition cursor-default">
                {task.itemIcon}
              </span>
            ))}
            {remainingCount > 60 && (
              <span className="text-xs font-bold text-slate-500 self-center">+{remainingCount - 60} lainnya</span>
            )}
          </div>
        </div>

        {/* Target Baskets Grid */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Ketuk {task.basketName} untuk memasukkan atau mengeluarkan:
          </p>
          <div
            className={`grid gap-3.5 ${
              task.totalBaskets <= 3
                ? 'grid-cols-1 sm:grid-cols-3'
                : task.totalBaskets <= 4
                ? 'grid-cols-2 sm:grid-cols-4'
                : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-6'
            }`}
          >
            {baskets.map((count, idx) => {
              const isCorrectTarget = count === task.correctPerBasket;
              return (
                <div
                  key={idx}
                  className={`relative p-3.5 rounded-2xl border-2 text-center transition-all ${
                    isCorrectTarget
                      ? 'bg-emerald-50 border-emerald-500 shadow-md ring-2 ring-emerald-300'
                      : count > task.correctPerBasket
                      ? 'bg-rose-50 border-rose-400'
                      : 'bg-white border-slate-200 hover:border-blue-400'
                  }`}
                >
                  <p className="text-xs font-bold text-slate-600 mb-1">
                    Wadah #{idx + 1}
                  </p>

                  <div className="h-16 flex flex-wrap items-center justify-center gap-0.5 overflow-hidden p-1 bg-slate-50 rounded-xl border border-slate-200/60 mb-2">
                    {Array.from({ length: Math.min(count, 12) }).map((_, i) => (
                      <span key={i} className="text-lg leading-none">
                        {task.itemIcon}
                      </span>
                    ))}
                    {count === 0 && (
                      <span className="text-xs text-slate-300 italic">Kosong</span>
                    )}
                    {count > 12 && (
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-200 px-1 rounded">
                        +{count - 12}
                      </span>
                    )}
                  </div>

                  <div className="font-extrabold text-slate-900 text-lg mb-2">
                    {count} <span className="text-xs font-medium text-slate-500">buah</span>
                  </div>

                  {/* Add / Remove buttons */}
                  <div className="flex items-center justify-center gap-1.5">
                    <button
                      onClick={() => handleRemoveFromBasket(idx)}
                      disabled={count === 0 || isSuccess}
                      className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed font-black text-slate-700 flex items-center justify-center text-sm shadow-sm"
                    >
                      -
                    </button>
                    <button
                      onClick={() => handleAddToBasket(idx)}
                      disabled={remainingCount === 0 || isSuccess}
                      className="w-8 h-8 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed font-black text-white flex items-center justify-center text-sm shadow-sm"
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Feedback Message */}
        {feedbackMsg && (
          <div
            className={`mt-5 p-3.5 rounded-2xl border text-sm font-semibold flex items-center gap-2 ${
              isSuccess
                ? 'bg-emerald-100 border-emerald-300 text-emerald-900'
                : 'bg-amber-100 border-amber-300 text-amber-900'
            }`}
          >
            {isSuccess ? <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" /> : <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />}
            <span>{feedbackMsg}</span>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-6 gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl font-bold text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
          >
            Tutup
          </button>

          {isSuccess && (
            <button
              onClick={handleFinish}
              className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition animate-pulse"
            >
              <span>Lanjut ke Kuis Pos & Raih Bintang</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
