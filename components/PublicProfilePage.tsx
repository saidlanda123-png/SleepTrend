import React, { useState, useEffect } from 'react';
import { CHALLENGES } from '../constants';
import ChallengeCard from './ChallengeCard';

const PublicProfilePage: React.FC = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const nameData = params.get('name');
    const progressData = params.get('progress');

    if (!nameData || !progressData) {
      setError('Falta información para mostrar este perfil.');
      return;
    }

    try {
      const decodedName = decodeURIComponent(atob(nameData));
      // Handle empty progress string for new users
      const completedIds = progressData ? progressData.split(',') : [];
      setUserName(decodedName);
      setCompletedChallenges(completedIds);
    } catch (e) {
      setError('El enlace de perfil no es válido o está dañado.');
      console.error("Error decoding profile data from URL:", e);
    }
  }, []);

  const progress = (completedChallenges.length / CHALLENGES.length) * 100;

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-center p-4">
        <div className="bg-red-900/50 border border-red-700 p-8 rounded-xl">
            <h1 className="text-2xl text-red-400 font-bold">Error</h1>
            <p className="text-slate-300 mt-2">{error}</p>
        </div>
      </div>
    );
  }
  
  if (!userName) {
     return (
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-xl text-slate-400">Cargando perfil...</div>
        </div>
      );
  }

  return (
     <div className="container mx-auto p-4 md:p-8 max-w-4xl animate-fade-in">
      <header className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold">Progreso de {userName}</h1>
        <p className="text-slate-400 mt-1">Viendo el progreso del Reto Sueño Saludable.</p>
      </header>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold text-cyan-400">Progreso Total</h2>
          <span className="text-lg font-bold">{completedChallenges.length} / {CHALLENGES.length}</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-4">
          <div
            className="bg-gradient-to-r from-cyan-500 to-violet-500 h-4 rounded-full"
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
            onToggleComplete={() => {}} // No-op for read-only
            readOnly={true}
          />
        ))}
      </div>
       <div className="mt-8 text-center">
          <a href="/" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              ¿Quieres empezar tu propio reto? ¡Haz clic aquí!
          </a>
      </div>
    </div>
  );
};

export default PublicProfilePage;