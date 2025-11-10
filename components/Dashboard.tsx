import React, { useState } from 'react';
import ChallengeCard from './ChallengeCard';
import { CHALLENGES } from '../constants';
import { LinkIcon } from './icons/Icons';
import AchievementModal from './AchievementModal';
import type { Challenge } from '../types';

interface DashboardProps {
  userName: string;
  completedChallenges: string[];
  onToggleChallenge: (id: string) => void;
  onReset: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ userName, completedChallenges, onToggleChallenge, onReset }) => {
  const [copied, setCopied] = useState(false);
  const [showAchievementModalFor, setShowAchievementModalFor] = useState<{ challenge: Challenge; totalCompleted: number; } | null>(null);
  const progress = (completedChallenges.length / CHALLENGES.length) * 100;

  const handleToggleChallenge = (challengeId: string) => {
    const isCompleting = !completedChallenges.includes(challengeId);
    onToggleChallenge(challengeId);

    if (isCompleting) {
      setTimeout(() => {
        const challenge = CHALLENGES.find(c => c.id === challengeId);
        if (challenge) {
          const newCompletedCount = completedChallenges.length + 1;
          setShowAchievementModalFor({ challenge, totalCompleted: newCompletedCount });
        }
      }, 350); // Small delay for the animation
    }
  };

  const handleShare = () => {
    const nameData = btoa(encodeURIComponent(userName));
    const progressData = completedChallenges.join(',');
    const shareUrl = `${window.location.origin}/profile?name=${nameData}&progress=${progressData}`;
    
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
      alert('No se pudo copiar el enlace. Por favor, cópialo manualmente.');
    });
  };
  
  const easyChallenges = CHALLENGES.filter(c => c.difficulty === 'Fácil');
  const mediumChallenges = CHALLENGES.filter(c => c.difficulty === 'Intermedio');
  const hardChallenges = CHALLENGES.filter(c => c.difficulty === 'Difícil');

  const welcomeSubtitle = completedChallenges.length > 0 && completedChallenges.length < CHALLENGES.length
    ? "¡Qué bueno verte de nuevo! Sigamos con el reto."
    : `Bienvenido al Reto Sueño Saludable. ¡Tú puedes!`;

  return (
    <>
      <div className="animate-fade-in">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">¡Hola, {userName}!</h1>
            <p className="text-slate-400 mt-1">{welcomeSubtitle}</p>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleShare}
              className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors text-sm flex items-center gap-2"
            >
              <LinkIcon className="w-4 h-4" />
              {copied ? '¡Copiado!' : 'Compartir Progreso'}
            </button>
            <button 
              onClick={onReset}
              className="px-4 py-2 bg-red-900/50 text-red-400 rounded-lg hover:bg-red-800/50 transition-colors text-sm"
            >
              Reiniciar
            </button>
          </div>
        </header>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-cyan-400">Tu Progreso</h2>
            <span className="text-lg font-bold">{completedChallenges.length} / {CHALLENGES.length}</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-4">
            <div
              className="bg-gradient-to-r from-cyan-500 to-violet-500 h-4 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-green-400 mb-4 border-b-2 border-green-400/30 pb-2">Fáciles (de aplicación diaria)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {easyChallenges.map(challenge => (
                <ChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  isCompleted={completedChallenges.includes(challenge.id)}
                  onToggleComplete={handleToggleChallenge}
                />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-yellow-400 mb-4 border-b-2 border-yellow-400/30 pb-2">🟡 Intermedios</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mediumChallenges.map(challenge => (
                <ChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  isCompleted={completedChallenges.includes(challenge.id)}
                  onToggleComplete={handleToggleChallenge}
                />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-red-400 mb-4 border-b-2 border-red-400/30 pb-2">🔵 Difíciles (retos de constancia)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {hardChallenges.map(challenge => (
                <ChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  isCompleted={completedChallenges.includes(challenge.id)}
                  onToggleComplete={handleToggleChallenge}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
      {showAchievementModalFor && (
        <AchievementModal
          challenge={showAchievementModalFor.challenge}
          totalCompleted={showAchievementModalFor.totalCompleted}
          userName={userName}
          onClose={() => setShowAchievementModalFor(null)}
        />
      )}
    </>
  );
};

export default Dashboard;