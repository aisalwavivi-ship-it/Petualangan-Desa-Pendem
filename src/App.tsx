import React, { useState, useEffect } from 'react';
import { initialStages } from './data/stages';
import { StageInfo } from './types';
import { Navbar } from './components/Navbar';
import { AdventureMap } from './components/AdventureMap';
import { LessonModal } from './components/LessonModal';
import { InteractiveMission } from './components/InteractiveMission';
import { QuizModal } from './components/QuizModal';
import { PorogapitCalculator } from './components/PorogapitCalculator';
import { ManipulativeLab } from './components/ManipulativeLab';
import { CurriculumGuide } from './components/CurriculumGuide';
import { CertificateModal } from './components/CertificateModal';
import { soundFx } from './utils/audio';

export const App: React.FC = () => {
  const [stages, setStages] = useState<StageInfo[]>(() => {
    try {
      const saved = localStorage.getItem('desa_pendem_stages');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
    return initialStages;
  });

  const [coins, setCoins] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('desa_pendem_coins');
      return saved ? Number(saved) : 50; // starting bonus
    } catch {
      return 50;
    }
  });

  const [playerName, setPlayerName] = useState<string>(() => {
    try {
      return localStorage.getItem('desa_pendem_player') || 'Petualang Cilik';
    } catch {
      return 'Petualang Cilik';
    }
  });

  const [activeTab, setActiveTab] = useState<'adventure' | 'porogapit' | 'manipulative' | 'curriculum'>('adventure');
  const [selectedStageId, setSelectedStageId] = useState<string>('kebun-apel');
  const [activeModal, setActiveModal] = useState<'lesson' | 'mission' | 'quiz' | 'certificate' | null>(null);
  const [modalStage, setModalStage] = useState<StageInfo | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('desa_pendem_stages', JSON.stringify(stages));
      localStorage.setItem('desa_pendem_coins', coins.toString());
      localStorage.setItem('desa_pendem_player', playerName);
    } catch (e) {
      console.warn('Saving to localStorage failed', e);
    }
  }, [stages, coins, playerName]);

  const totalStars = stages.reduce((acc, s) => acc + (s.stars || 0), 0);
  const currentStage = stages.find((s) => s.id === selectedStageId) || stages[0];

  // Actions
  const handleSelectStage = (stage: StageInfo) => {
    setSelectedStageId(stage.id);
  };

  const handleStartLesson = (stage: StageInfo) => {
    setModalStage(stage);
    setActiveModal('lesson');
  };

  const handleStartMission = (stage: StageInfo) => {
    setModalStage(stage);
    setActiveModal('mission');
  };

  const handleStartQuiz = (stage: StageInfo) => {
    setModalStage(stage);
    setActiveModal('quiz');
  };

  const handleCompleteMission = (coinsEarned: number) => {
    setCoins((prev) => prev + coinsEarned);
    // Proceed straight to quiz
    if (modalStage) {
      setActiveModal('quiz');
    } else {
      setActiveModal(null);
    }
  };

  const handleCompleteQuiz = (stageId: string, starsEarned: number, coinsEarned: number) => {
    setCoins((prev) => prev + coinsEarned);

    // Update current stage and unlock next stage
    setStages((prevStages) => {
      const idx = prevStages.findIndex((s) => s.id === stageId);
      if (idx === -1) return prevStages;

      const updated = [...prevStages];
      updated[idx] = {
        ...updated[idx],
        completed: true,
        stars: Math.max(updated[idx].stars, starsEarned),
      };

      // Unlock next stage if exists
      if (idx + 1 < updated.length) {
        updated[idx + 1] = {
          ...updated[idx + 1],
          unlocked: true,
        };
      }

      return updated;
    });

    setActiveModal(null);
  };

  const handleResetProgress = () => {
    if (window.confirm('Apakah kamu yakin ingin mengulang petualangan Desa Pendem dari Pos pertama?')) {
      setStages(initialStages);
      setCoins(50);
      setSelectedStageId('kebun-apel');
      setActiveModal(null);
      soundFx.playPop();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-fredoka antialiased selection:bg-emerald-200 selection:text-emerald-900">
      {/* Top Navbar */}
      <Navbar
        coins={coins}
        totalStars={totalStars}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        onOpenCertificate={() => setActiveModal('certificate')}
        onResetProgress={handleResetProgress}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6">
        {activeTab === 'adventure' && (
          <AdventureMap
            stages={stages}
            selectedStageId={selectedStageId}
            onSelectStage={handleSelectStage}
            onStartLesson={handleStartLesson}
            onStartMission={handleStartMission}
            onStartQuiz={handleStartQuiz}
          />
        )}

        {activeTab === 'porogapit' && <PorogapitCalculator />}

        {activeTab === 'manipulative' && <ManipulativeLab />}

        {activeTab === 'curriculum' && <CurriculumGuide />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200/80 py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌿</span>
            <span className="font-bold text-emerald-800">Petualangan Berbagi di Desa Pendem</span>
            <span>• Media Pembelajaran Matematika SD Kelas 4</span>
          </div>
          <p className="text-slate-400">
            Didedikasikan untuk pendidikan anak Indonesia berbasis kearifan lokal Kota Batu.
          </p>
        </div>
      </footer>

      {/* Modals */}
      {activeModal === 'lesson' && modalStage && (
        <LessonModal
          stage={modalStage}
          onClose={() => setActiveModal(null)}
          onContinueToMission={() => setActiveModal('mission')}
        />
      )}

      {activeModal === 'mission' && modalStage && (
        <InteractiveMission
          stage={modalStage}
          onClose={() => setActiveModal(null)}
          onComplete={handleCompleteMission}
        />
      )}

      {activeModal === 'quiz' && modalStage && (
        <QuizModal
          stage={modalStage}
          onClose={() => setActiveModal(null)}
          onCompleteQuiz={handleCompleteQuiz}
        />
      )}

      {activeModal === 'certificate' && (
        <CertificateModal
          playerName={playerName}
          setPlayerName={setPlayerName}
          stages={stages}
          totalStars={totalStars}
          coins={coins}
          onClose={() => setActiveModal(null)}
        />
      )}
    </div>
  );
};
