import React from 'react';
import { RANKS } from '../constants';
import { TrophyIcon } from './icons/Icons';

interface RanksModalProps {
  currentRankName: string;
  completedChallengesCount: number;
  onClose: () => void;
}

const RanksModal: React.FC<RanksModalProps> = ({ currentRankName, completedChallengesCount, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="ranks-title"
    >
      <div
        className="relative bg-slate-800/90 border border-slate-700 rounded-2xl max-w-md w-full shadow-2xl shadow-violet-500/20 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-slate-700 text-center">
          <h2 id="ranks-title" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">
            Progreso de Rangos
          </h2>
        </div>

        <div className="p-8 flex-grow overflow-y-auto max-h-[70vh]">
          <ul className="space-y-4">
            {RANKS.map((rank, index) => {
              const isUnlocked = completedChallengesCount >= rank.threshold;
              const isCurrent = currentRankName === rank.name;

              return (
                <li key={rank.name} className="relative flex items-center gap-5 pl-10">
                  {index < RANKS.length - 1 && (
                     <div className="absolute left-[29px] top-10 h-full w-0.5 bg-slate-700" />
                  )}
                  {/* FIX: Moved style prop from TrophyIcon to the parent div to fix type error.
                      The TrophyIcon uses stroke="currentColor", so it will inherit the color from its parent. */}
                  <div
                    className={`
                      absolute left-0 p-3 rounded-full border-2 transition-all
                      ${isCurrent ? 'bg-slate-700 border-cyan-400 scale-110 shadow-lg shadow-cyan-500/30' : 'bg-slate-800 border-slate-700'}
                      ${!isUnlocked && 'opacity-50'}
                    `}
                    style={{ color: isUnlocked ? rank.color : '#475569' }} // slate-600 for locked
                  >
                    <TrophyIcon
                      className="w-6 h-6 transition-colors"
                    />
                  </div>
                  <div>
                    <h3
                      className={`text-lg font-bold transition-colors ${!isUnlocked && 'text-slate-500'}`}
                      style={{ color: isUnlocked ? rank.color : undefined }}
                    >
                      {rank.name}
                      {isCurrent && <span className="text-xs font-medium text-cyan-400 ml-2">(Actual)</span>}
                    </h3>
                    <p className={`text-sm transition-colors ${isUnlocked ? 'text-slate-400' : 'text-slate-600'}`}>
                      Se desbloquea con {rank.threshold} retos completados
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="p-6 border-t border-slate-700 bg-slate-800/50 rounded-b-2xl">
          <button
            onClick={onClose}
            className="w-full px-4 py-3 bg-slate-700 hover:bg-slate-600 text-slate-300 font-semibold rounded-lg transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default RanksModal;