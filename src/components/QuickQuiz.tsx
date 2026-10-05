import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/audio';
import { RotateCcw, CheckCircle2, XCircle, Award, Timer, Sparkles } from 'lucide-react';

interface Question {
  dividend: number;
  divisor: number;
  correct: number;
  options: number[];
}

export const QuickQuiz: React.FC<{ onAddCoins: (amt: number) => void }> = ({ onAddCoins }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [selectedAns, setSelectedAns] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const generateQuiz = () => {
    const list: Question[] = [];
    for (let i = 0; i < 8; i++) {
      const divisor = Math.floor(Math.random() * 8) + 2; // 2 to 9
      const quotient = Math.floor(Math.random() * 11) + 2; // 2 to 12
      const dividend = divisor * quotient;

      // Distractors
      const opts = new Set<number>([quotient]);
      while (opts.size < 4) {
        const offset = Math.floor(Math.random() * 7) - 3;
        const candidate = quotient + offset;
        if (candidate > 0 && candidate !== quotient) {
          opts.add(candidate);
        }
      }

      list.push({
        dividend,
        divisor,
        correct: quotient,
        options: Array.from(opts).sort(() => Math.random() - 0.5),
      });
    }
    setQuestions(list);
    setCurrentIndex(0);
    setScore(0);
    setSelectedAns(null);
    setIsAnswered(false);
    setIsFinished(false);
  };

  useEffect(() => {
    generateQuiz();
  }, []);

  const handleSelect = (val: number) => {
    if (isAnswered) return;
    setSelectedAns(val);
    setIsAnswered(true);

    const current = questions[currentIndex];
    if (val === current.correct) {
      soundFx.playSuccess();
      setScore(prev => prev + 1);
      onAddCoins(5);
    } else {
      soundFx.playError();
    }
  };

  const handleNext = () => {
    soundFx.playPop();
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAns(null);
      setIsAnswered(false);
    } else {
      soundFx.playFanfare();
      confetti({ particleCount: 90, spread: 70 });
      setIsFinished(true);
    }
  };

  if (questions.length === 0) return null;
  const currentQ = questions[currentIndex];

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border-4 border-emerald-100 shadow-xl">
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
            Latihan Ketangkasan
          </span>
          <h3 className="text-2xl font-black text-slate-800 mt-1">Kuis Tangkas Pembagian</h3>
        </div>

        <button
          onClick={generateQuiz}
          className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-1.5 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Soal Baru
        </button>
      </div>

      {!isFinished ? (
        <div>
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-4">
            <span>Soal {currentIndex + 1} dari {questions.length}</span>
            <span className="text-emerald-600 font-extrabold">Skor Benar: {score}</span>
          </div>

          {/* Math Card Display */}
          <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-3xl p-8 text-center shadow-lg mb-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-200 block mb-2">
              Berapakah Hasil Dari:
            </span>
            <div className="text-5xl sm:text-6xl font-black tracking-wider">
              {currentQ.dividend} ÷ {currentQ.divisor} = <span className="text-amber-300">?</span>
            </div>
          </div>

          {/* Options */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedAns === opt;
              const isCorrect = opt === currentQ.correct;

              let btnStyle = 'bg-slate-50 hover:bg-emerald-50 border-slate-200 text-slate-800';
              if (isAnswered) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-500 border-emerald-600 text-white font-black shadow-md';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'bg-rose-500 border-rose-600 text-white font-black';
                } else {
                  btnStyle = 'bg-slate-100 text-slate-400 border-slate-200 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(opt)}
                  disabled={isAnswered}
                  className={`p-5 rounded-2xl border-2 text-2xl font-black transition active:scale-95 shadow-sm flex items-center justify-center gap-2 ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {isAnswered && isCorrect && <CheckCircle2 className="w-6 h-6 text-white" />}
                </button>
              );
            })}
          </div>

          {/* Next Button */}
          {isAnswered && (
            <div className="flex justify-end">
              <button
                onClick={handleNext}
                className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-sm shadow-md transition"
              >
                {currentIndex < questions.length - 1 ? 'Soal Berikutnya' : 'Lihat Hasil Akhir'}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-6">
          <div className="text-6xl mb-3">🎉</div>
          <h4 className="text-2xl font-black text-slate-800 mb-2">Kuis Tangkas Selesai!</h4>
          <p className="text-slate-600 text-sm mb-6">
            Kamu berhasil menjawab <span className="font-bold text-emerald-600">{score}</span> dari {questions.length} soal dengan tepat!
          </p>

          <button
            onClick={generateQuiz}
            className="px-8 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-lg transition"
          >
            Mulai Kuis Lagi
          </button>
        </div>
      )}
    </div>
  );
};
