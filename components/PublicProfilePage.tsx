import React from 'react';
import { CHALLENGES } from '../constants';
import { CheckIcon, MoonIcon, SunIcon } from './icons/Icons';

interface PublicProfileData {
  name: string;
  completed: string[];
}

interface PublicProfilePageProps {
  data: PublicProfileData;
}

const PublicProfilePage: React.FC<PublicProfilePageProps> = ({ data }) => {
  const { name, completed } = data;
  const progress = (completed.length / CHALLENGES.length) * 100;
  
  const allCompleted = completed.length === CHALLENGES.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-slate-100 flex flex-col items-center justify-center p-4">
        <div className="container mx-auto max-w-2xl animate-fade-in">
            <header className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">
                    Progreso de {name}
                </h1>
                <p className="text-slate-400 mt-2">¡Mira los logros de {name} en el Reto de Sueño Saludable!</p>
            </header>

            <div className="mb-8 bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-semibold text-cyan-400">Progreso del Reto</h2>
                    <span className="text-lg font-bold">{completed.length} / {CHALLENGES.length}</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-4">
                    <div
                        className="bg-gradient-to-r from-cyan-500 to-violet-500 h-4 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                 {allCompleted && (
                    <p className="text-center mt-4 text-amber-300 font-semibold">
                        ¡Felicidades! ¡{name} ha completado todos los desafíos! 🎉
                    </p>
                )}
            </div>
            
            <div className="space-y-4">
                {CHALLENGES.map(challenge => {
                    const isCompleted = completed.includes(challenge.id);
                    const Icon = challenge.icon;
                    return (
                        <div key={challenge.id} className={`
                           bg-slate-800/50 border border-slate-700 rounded-lg p-4 flex items-center gap-4 transition-colors
                           ${isCompleted ? 'bg-slate-800' : ''}
                        `}>
                            <div className={`
                                flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
                                ${isCompleted ? 'bg-cyan-500' : 'bg-slate-700'}
                            `}>
                                {isCompleted ? (
                                     <CheckIcon className="w-5 h-5 text-slate-900" />
                                ) : (
                                    <Icon className="w-5 h-5 text-slate-400" />
                                )}
                            </div>
                            <span className={`
                                font-medium
                                ${isCompleted ? 'text-slate-300 line-through' : 'text-slate-300'}
                            `}>
                                {challenge.title}
                            </span>
                        </div>
                    );
                })}
            </div>

            <div className="mt-12 text-center">
                 <a 
                    href="/" 
                    className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold rounded-lg shadow-lg hover:shadow-cyan-500/50 transform hover:-translate-y-1 transition-all duration-300"
                >
                    ¡Crea Tu Propio Reto!
                </a>
            </div>
        </div>
    </div>
  );
};

export default PublicProfilePage;
