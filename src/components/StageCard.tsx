import React from 'react';
import { soundFx } from '../utils/audio';
import { StageInfo } from '../types';
import { Star, Lock, CheckCircle2, ChevronRight, Play } from 'lucide-react';

interface Props {
  stage: StageInfo;
  index: number;
  onSelectStage: (stage: StageInfo) => void;
}

export const StageCard: React.FC<Props> = ({ stage, index, onSelectStage }) => {
  const isUnlocked = stage.unlocked;

  return (
    <div
      className={`relative rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between border-4 shadow-lg ${
        !isUnlocked
          ? 'bg-slate-100/90 border-slate-200 opacity-75'
          : stage.completed
          ? 'bg-white border-emerald-300 hover:border-emerald-400 hover:shadow-xl'
          : 'bg-white border-amber-300 hover:border-amber-400 hover:shadow-xl scale-[1.01]'
      }`}
    >
      {/* Top Tag & Number */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <span
            className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${
              !isUnlocked
                ? 'bg-slate-200 text-slate-500'
                : 'bg-emerald-600 text-white shadow-sm'
            }`}
          >
            {index + 1}
          </span>
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Pos {index + 1}
          </span>
        </div>

        {/* Stars or Lock */}
        {isUnlocked ? (
          <div className="flex items-center gap-1">
            {[1, 2, 3].map((starIdx) => (
              <Star
                key={starIdx}
                className={`w-4 h-4 ${
                  starIdx <= stage.stars
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-slate-200'
                }`}
              />
            ))}
          </div>
        ) : (
          <div className="p-1.5 bg-slate-200 rounded-full text-slate-400">
            <Lock className="w-4 h-4" />
          </div>
        )}
      </div>

      {/* Main Info */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-50 border border-emerald-200/60 flex items-center justify-center text-3xl shadow-sm shrink-0">
          {stage.icon}
        </div>
        <div>
          <span className="text-[11px] font-semibold text-emerald-700 block">
            {stage.subName}
          </span>
          <h3 className="text-lg font-black text-slate-800 leading-snug">
            {stage.name}
          </h3>
          <p className="text-xs text-slate-500 font-medium line-clamp-2 mt-1">
            {stage.description}
          </p>
        </div>
      </div>

      {/* Character Snippet */}
      <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200 mb-5 flex items-center gap-2.5">
        <span className="text-xl">{stage.character.avatar}</span>
        <div className="text-xs">
          <span className="font-bold text-slate-700 block">{stage.character.name}</span>
          <span className="text-[11px] text-slate-500">{stage.topic}</span>
        </div>
      </div>

      {/* Action Button */}
      <div>
        <button
          onClick={() => {
            if (isUnlocked) {
              soundFx.playPop();
              onSelectStage(stage);
            }
          }}
          disabled={!isUnlocked}
          className={`w-full py-3 px-4 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition ${
            !isUnlocked
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : stage.completed
              ? 'bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white'
              : 'bg-amber-500 hover:bg-amber-600 active:scale-95 text-white'
          }`}
        >
          {!isUnlocked ? (
            <>
              <Lock className="w-4 h-4" /> Terkunci (Selesaikan Pos Sebelumnya)
            </>
          ) : stage.completed ? (
            <>
              <CheckCircle2 className="w-4 h-4" /> Mainkan Lagi (Ulangi Pos)
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-white" /> Masuk Petualangan Pos!
            </>
          )}
        </button>
      </div>
    </div>
  );
};
