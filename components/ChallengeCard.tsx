
import React from 'react';
import type { Challenge } from '../types';
import { CheckIcon } from './icons/Icons';

interface ChallengeCardProps {
  challenge: Challenge;
  isCompleted: boolean;
  onToggleComplete: (id: string) => void;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge, isCompleted, onToggleComplete }) => {
  const Icon = challenge.icon;

  return (
    <div className={`
      bg-slate-800/50 border border-slate-700 rounded-xl p-6 transition-all duration-300
      flex flex-col justify-between
      ${isCompleted ? 'ring-2 ring-cyan-500 bg-slate-800' : 'hover:border-slate-600 hover:bg-slate-800/70'}
    `}>
      <div>
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 bg-slate-700/50 rounded-lg p-3">
            <Icon className={`w-8 h-8 ${isCompleted ? 'text-cyan-400' : 'text-slate-400'}`} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-100">{challenge.title}</h3>
            <p className="text-slate-400 mt-2">{challenge.description}</p>
          </div>
        </div>
      </div>
      <button
        onClick={() => onToggleComplete(challenge.id)}
        className={`
          w-full mt-6 py-3 px-4 rounded-lg font-semibold transition-all duration-300
          flex items-center justify-center gap-2
          ${isCompleted 
            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' 
            : 'bg-slate-700 hover:bg-slate-600 text-slate-300'}
        `}
      >
        {isCompleted ? (
          <>
            <CheckIcon className="w-5 h-5" />
            <span>Completado</span>
          </>
        ) : (
          <span>Marcar como completado</span>
        )}
      </button>
    </div>
  );
};

export default ChallengeCard;
