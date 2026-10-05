import React, { useState } from 'react';
import { StageInfo } from '../types';
import { X, Star, CheckCircle, XCircle, ArrowRight, Lightbulb, Trophy } from 'lucide-react';
import { soundFx } from '../utils/audio';
import confetti from 'canvas-confetti';

interface QuizModalProps {
  stage: StageInfo;
  onClose: () => void;
  onCompleteQuiz: (stageId: string, starsEarned: number, coinsEarned: number) => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({ stage, onClose, onCompleteQuiz }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const question = stage.quizzes[currentQuestionIndex];

  const handleSelectOption = (value: number) => {
    if (showExplanation) return;
    setSelectedOption(value);
    setShowExplanation(true);

    const isCorrect = value === question.correctAnswer;
    if (isCorrect) {
      soundFx.playSuccess();
      setCorrectAnswersCount((prev) => prev + 1);
    } else {
      soundFx.playError();
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < stage.quizzes.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
      setShowHint(false);
      soundFx.playPop();
    } else {
      // Finished quiz!
      setIsFinished(true);
      const total = stage.quizzes.length;
      const correct = correctAnswersCount + (selectedOption === question.correctAnswer ? 0 : 0);
      let stars = 1;
      if (correct === total) stars = 3;
      else if (correct >= total - 1) stars = 2;

      soundFx.playFanfare();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
      });
    }
  };

  const handleClaimReward = () => {
    const total = stage.quizzes.length;
    let stars = 1;
    if (correctAnswersCount === total) stars = 3;
    else if (correctAnswersCount >= total - 1) stars = 2;

    const coinsEarned = stars * 20;
    onCompleteQuiz(stage.id, stars, coinsEarned);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border-4 border-amber-400 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {!isFinished ? (
          <div className="space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{stage.icon}</span>
                <div>
                  <h3 className="font-extrabold text-lg text-slate-800 font-fredoka">
                    Kuis {stage.name}
                  </h3>
                  <p className="text-xs text-slate-500">Soal {currentQuestionIndex + 1} dari {stage.quizzes.length}</p>
                </div>
              </div>

              {/* Progress dots */}
              <div className="flex items-center gap-1.5">
                {stage.quizzes.map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full transition-all ${
                      i === currentQuestionIndex
                        ? 'bg-amber-500 scale-125 ring-2 ring-amber-300'
                        : i < currentQuestionIndex
                        ? 'bg-emerald-500'
                        : 'bg-slate-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Question Text */}
            <div className="space-y-2">
              {question.storyContext && (
                <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full inline-block">
                  📖 {question.storyContext}
                </span>
              )}
              <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {question.question}
              </h4>
            </div>

            {/* Options */}
            <div className="space-y-3 pt-2">
              {question.options.map((opt, idx) => {
                const isSelected = selectedOption === opt.value;
                const isCorrect = opt.value === question.correctAnswer;

                let btnStyle = 'bg-slate-50 border-slate-200 hover:border-amber-300 hover:bg-amber-50/50';
                if (showExplanation) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-300';
                  } else if (isSelected && !isCorrect) {
                    btnStyle = 'bg-rose-100 border-rose-400 text-rose-950 font-bold';
                  } else {
                    btnStyle = 'bg-slate-50 border-slate-200 opacity-50';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(opt.value)}
                    disabled={showExplanation}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-white shadow-sm border border-slate-200 flex items-center justify-center font-bold text-sm text-slate-700">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-sm font-semibold">{opt.text}</span>
                    </div>

                    {showExplanation && (
                      <div>
                        {isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-emerald-600" />
                        ) : isSelected ? (
                          <XCircle className="w-5 h-5 text-rose-600" />
                        ) : null}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Hint Box (Collapsible) */}
            <div className="pt-1">
              {!showHint && !showExplanation && (
                <button
                  onClick={() => setShowHint(true)}
                  className="text-xs text-amber-700 hover:text-amber-800 font-bold flex items-center gap-1 transition"
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Butuh Bantuan / Petunjuk?</span>
                </button>
              )}
              {showHint && !showExplanation && (
                <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Petunjuk: </span>
                    {question.hint}
                  </div>
                </div>
              )}
            </div>

            {/* Explanation after selection */}
            {showExplanation && (
              <div
                className={`p-4 rounded-2xl border text-sm font-medium space-y-1 ${
                  selectedOption === question.correctAnswer
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                    : 'bg-rose-50 border-rose-300 text-rose-900'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold">
                  {selectedOption === question.correctAnswer ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span>Jawabanmu Tepat Sekali!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-rose-600" />
                      <span>Belum Tepat, Jangan Menyerah!</span>
                    </>
                  )}
                </div>
                <p className="text-xs leading-relaxed text-slate-700">{question.explanation}</p>
              </div>
            )}

            {/* Next Button */}
            {showExplanation && (
              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  className="flex items-center gap-2 px-6 py-2.5 bg-amber-500 hover:bg-amber-600 active:scale-95 text-amber-950 rounded-xl font-extrabold text-sm shadow-md transition"
                >
                  <span>
                    {currentQuestionIndex === stage.quizzes.length - 1
                      ? 'Lihat Hasil Kuis'
                      : 'Soal Berikutnya'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Finished Quiz Screen */
          <div className="text-center py-4 space-y-6">
            <div className="w-20 h-20 rounded-full bg-amber-100 border-4 border-amber-300 mx-auto flex items-center justify-center text-4xl shadow-lg animate-bounce">
              🏆
            </div>

            <div className="space-y-2">
              <h3 className="font-extrabold text-2xl text-slate-900 font-fredoka">
                Selamat! Pos Selesai!
              </h3>
              <p className="text-sm text-slate-600">
                Kamu menjawab benar <span className="font-bold text-emerald-600">{correctAnswersCount}</span> dari{' '}
                <span className="font-bold text-slate-800">{stage.quizzes.length}</span> soal.
              </p>
            </div>

            {/* Stars Awarded */}
            <div className="flex items-center justify-center gap-2 py-2">
              {[1, 2, 3].map((starIdx) => {
                const total = stage.quizzes.length;
                let active = false;
                if (correctAnswersCount === total) active = true;
                else if (correctAnswersCount >= total - 1 && starIdx <= 2) active = true;
                else if (starIdx === 1) active = true;

                return (
                  <Star
                    key={starIdx}
                    className={`w-10 h-10 ${
                      active
                        ? 'fill-amber-400 text-amber-500 scale-110'
                        : 'fill-slate-100 text-slate-300'
                    } transition-all duration-300`}
                  />
                );
              })}
            </div>

            {/* Reward Box */}
            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 inline-flex items-center gap-6 text-sm font-bold text-amber-900">
              <div className="flex items-center gap-1.5">
                <span>🪙</span>
                <span>+{correctAnswersCount === stage.quizzes.length ? 60 : 40} Koin Desa</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-amber-600" />
                <span>Lencana: {stage.badge}</span>
              </div>
            </div>

            <div>
              <button
                onClick={handleClaimReward}
                className="w-full py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-2xl font-extrabold text-base shadow-lg transition"
              >
                Klaim Hadiah & Buka Pos Selanjutnya! 🌟
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
