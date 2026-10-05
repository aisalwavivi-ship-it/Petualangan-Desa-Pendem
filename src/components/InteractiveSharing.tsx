import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/audio';
import { InteractiveTask } from '../types';
import { ArrowRight, RotateCcw, CheckCircle2, Sparkles, Award } from 'lucide-react';

interface Props {
  task: InteractiveTask;
  onComplete: () => void;
}

export const InteractiveSharing: React.FC<Props> = ({ task, onComplete }) => {
  // Array of items per basket
  const [baskets, setBaskets] = useState<number[]>(new Array(task.totalBaskets).fill(0));
  // Remaining items outside baskets
  const [unassignedItems, setUnassignedItems] = useState<number>(task.totalItems);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Distribute 1 item to target basket
  const handleAddItemToBasket = (basketIndex: number) => {
    if (unassignedItems <= 0) {
      soundFx.playError();
      return;
    }
    soundFx.playPop();
    const newBaskets = [...baskets];
    newBaskets[basketIndex] += 1;
    setBaskets(newBaskets);
    setUnassignedItems(prev => prev - 1);
    setFeedback(null);
  };

  // Remove 1 item from target basket back to pool
  const handleRemoveItemFromBasket = (basketIndex: number) => {
    if (baskets[basketIndex] <= 0) return;
    soundFx.playPop();
    const newBaskets = [...baskets];
    newBaskets[basketIndex] -= 1;
    setBaskets(newBaskets);
    setUnassignedItems(prev => prev + 1);
    setFeedback(null);
  };

  // Auto-distribute one round (one item to each basket)
  const handleDistributeOneRound = () => {
    if (unassignedItems < task.totalBaskets) {
      soundFx.playError();
      setFeedback(`Sisa ${task.itemName} (${unassignedItems}) kurang untuk dibagikan rata ke semua ${task.totalBaskets} ${task.basketName}!`);
      return;
    }
    soundFx.playCoin();
    const newBaskets = baskets.map(b => b + 1);
    setBaskets(newBaskets);
    setUnassignedItems(prev => prev - task.totalBaskets);
    setFeedback(null);
  };

  // Check validation
  const handleCheckAnswer = () => {
    // If task has remainder requirement
    const requiredRemainder = task.correctRemainder ?? 0;
    const isRemainderCorrect = unassignedItems === requiredRemainder;
    const isBasketsEqual = baskets.every(count => count === task.correctPerBasket);

    if (isBasketsEqual && isRemainderCorrect) {
      soundFx.playFanfare();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      setIsCompleted(true);
      setFeedback('Luar biasa! Pembagianmu sangat tepat dan adil!');
      setTimeout(() => {
        onComplete();
      }, 1500);
    } else {
      soundFx.playError();
      if (!isRemainderCorrect && requiredRemainder > 0) {
        setFeedback(`Belum tepat! Untuk ${task.totalItems} ${task.itemName} dibagi ke ${task.totalBaskets} wadah, seharusnya tiap wadah berisi ${task.correctPerBasket} dan bersisa ${requiredRemainder}.`);
      } else {
        setFeedback(`Belum adil! Pastikan setiap wadah memiliki jumlah yang sama (${task.correctPerBasket} ${task.itemName}).`);
      }
    }
  };

  const handleReset = () => {
    soundFx.playPop();
    setBaskets(new Array(task.totalBaskets).fill(0));
    setUnassignedItems(task.totalItems);
    setIsCompleted(false);
    setFeedback(null);
  };

  return (
    <div className="bg-gradient-to-b from-amber-50/70 to-emerald-50/70 rounded-3xl p-6 border-2 border-emerald-200 shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">
            Misi Interaktif Berbagi
          </span>
          <h3 className="text-xl font-extrabold text-slate-800 mt-1 flex items-center gap-2">
            <span>{task.itemIcon}</span> {task.title}
          </h3>
          <p className="text-sm text-slate-600 mt-0.5">{task.instruction}</p>
        </div>

        <button
          onClick={handleReset}
          className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-xs font-bold text-slate-600 flex items-center gap-1.5 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Ulangi
        </button>
      </div>

      {/* Story prompt box */}
      <div className="bg-white/90 p-4 rounded-2xl border border-emerald-100 mb-6 flex items-start gap-3 shadow-sm">
        <div className="text-2xl p-2 bg-emerald-100 rounded-xl">🎒</div>
        <div>
          <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wide">Cerita Misi:</h4>
          <p className="text-sm text-slate-700 font-medium">{task.storyPrompt}</p>
        </div>
      </div>

      {/* Unassigned Items Pool */}
      <div className="bg-white p-5 rounded-2xl border-2 border-dashed border-amber-300 mb-6 text-center shadow-sm">
        <div className="flex items-center justify-between mb-3 px-2">
          <span className="text-xs font-black uppercase text-amber-800 tracking-wider">
            Sisa {task.itemName} di Gudang:
          </span>
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-black text-sm">
            {unassignedItems} {task.itemName}
          </span>
        </div>

        {/* Visual Icons */}
        <div className="flex flex-wrap justify-center gap-1.5 min-h-[50px] max-h-[140px] overflow-y-auto p-2 bg-amber-50/50 rounded-xl">
          {Array.from({ length: unassignedItems }).map((_, i) => (
            <span
              key={i}
              className="text-2xl hover:scale-125 transition-transform cursor-pointer"
              title={`Klik wadah di bawah untuk memasukkan`}
            >
              {task.itemIcon}
            </span>
          ))}
          {unassignedItems === 0 && (
            <span className="text-sm text-slate-400 font-medium my-auto">
              Semua {task.itemName} sudah dibagikan ke dalam wadah!
            </span>
          )}
        </div>

        {/* Quick Helper Button: Berbagi 1 putaran */}
        <div className="mt-3 flex justify-center">
          <button
            onClick={handleDistributeOneRound}
            disabled={unassignedItems < task.totalBaskets}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition"
          >
            <Sparkles className="w-3.5 h-3.5" /> Bagikan 1 {task.itemName} ke Tiap Wadah (Membagi Rata)
          </button>
        </div>
      </div>

      {/* Baskets Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-6">
        {baskets.map((count, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-3 border-2 border-emerald-200 flex flex-col items-center justify-between shadow-sm hover:border-emerald-400 transition"
          >
            <span className="text-xs font-bold text-emerald-800 mb-1">
              {task.basketName} #{idx + 1}
            </span>

            {/* Container art */}
            <div className="w-full bg-emerald-50 rounded-xl p-2 min-h-[70px] max-h-[90px] overflow-y-auto flex flex-wrap justify-center content-center gap-1 border border-emerald-100">
              {Array.from({ length: count }).map((_, i) => (
                <span key={i} className="text-xl animate-fade-in">
                  {task.itemIcon}
                </span>
              ))}
              {count === 0 && (
                <span className="text-[11px] text-slate-400 font-medium">Kosong</span>
              )}
            </div>

            {/* Counter */}
            <div className="text-xs font-extrabold text-slate-700 my-2">
              Isi: <span className="text-emerald-600 text-sm font-black">{count}</span>
            </div>

            {/* Controller buttons */}
            <div className="flex gap-2 w-full">
              <button
                onClick={() => handleRemoveItemFromBasket(idx)}
                disabled={count === 0}
                className="flex-1 py-1 bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 disabled:opacity-30 rounded-lg text-xs font-bold transition"
              >
                -
              </button>
              <button
                onClick={() => handleAddItemToBasket(idx)}
                disabled={unassignedItems === 0}
                className="flex-1 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 disabled:opacity-30 rounded-lg text-xs font-bold transition"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Feedback Alert */}
      {feedback && (
        <div
          className={`p-4 rounded-2xl mb-4 text-sm font-semibold flex items-center gap-2 ${
            isCompleted
              ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
              : 'bg-rose-100 text-rose-900 border border-rose-300'
          }`}
        >
          {isCompleted ? <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" /> : <div className="text-lg">💡</div>}
          <span>{feedback}</span>
        </div>
      )}

      {/* Verification button */}
      <div className="flex justify-end">
        <button
          onClick={handleCheckAnswer}
          disabled={isCompleted}
          className={`px-6 py-3 rounded-2xl font-black text-sm flex items-center gap-2 shadow-lg transition ${
            isCompleted
              ? 'bg-emerald-600 text-white cursor-default'
              : 'bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white'
          }`}
        >
          <Award className="w-5 h-5" /> Periksa Pembagianku!
        </button>
      </div>
    </div>
  );
};
