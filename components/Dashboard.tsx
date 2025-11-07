import React, { useState } from 'react';
import ChallengeCard from './ChallengeCard';
import { CHALLENGES } from '../constants';
import { LinkIcon } from './icons/Icons';

interface DashboardProps {
  userName: string;
  completedChallenges: string[];
  onToggleChallenge: (id: string) => void;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ userName, completedChallenges, onToggleChallenge, onLogout }) => {
  const progress = (completedChallenges.length / CHALLENGES.length) * 100;
  const [copied, setCopied] = useState(false);

  const welcomeSubtitle = completedChallenges.length > 0 && completedChallenges.length < CHALLENGES.length
    ? "¡Qué bueno verte de nuevo! Sigamos con el reto."
    : "Bienvenido a tu reto de 7 días. ¡Tú puedes!";

  const handleShareProfile = () => {
    const dataToEncode = {
      name: userName,
      completed: completedChallenges,
    };
    const encodedData = btoa(JSON.stringify(dataToEncode));
    const shareableLink = `${window.location.origin}/public/${encodedData}`;
    
    navigator.clipboard.writeText(shareableLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }).catch(err => {
      console.error('No se pudo copiar el enlace: ', err);
      alert('No se pudo copiar el enlace. Por favor, cópialo manualmente.');
    });
  };

  return (
    <div className="animate-fade-in">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">¡Hola, {userName}!</h1>
          <p className="text-slate-400 mt-1">{welcomeSubtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleShareProfile}
            className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors text-sm flex items-center gap-2"
            title="Copiar enlace para compartir tu progreso"
          >
            <LinkIcon className="w-4 h-4" />
            <span>{copied ? '¡Enlace Copiado!' : 'Compartir Progreso'}</span>
          </button>
          <button 
            onClick={onLogout}
            className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors text-sm"
          >
            Salir
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CHALLENGES.map(challenge => (
          <ChallengeCard
            key={challenge.id}
            challenge={challenge}
            isCompleted={completedChallenges.includes(challenge.id)}
            onToggleComplete={onToggleChallenge}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
