import React from 'react';
import type { Challenge } from '../types';
import BadgeSVG from './BadgeSVG';
import { RANKS } from '../constants';

interface AchievementModalProps {
  challenge: Challenge;
  totalCompleted: number;
  userName: string;
  onClose: () => void;
}

const AchievementModal: React.FC<AchievementModalProps> = ({ challenge, totalCompleted, userName, onClose }) => {
  // Find the highest rank achieved that has not been surpassed
  const currentRank = RANKS.slice().reverse().find(r => totalCompleted === r.threshold);

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="achievement-title"
    >
      <div
        className="relative bg-slate-800/90 border border-slate-700 rounded-2xl max-w-sm w-full shadow-2xl shadow-violet-500/20 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-slate-700 text-center">
            <h2 id="achievement-title" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">
                ¡Logro Desbloqueado!
            </h2>
        </div>

        <div className="p-6 flex-grow overflow-y-auto text-center">
            <div className="animate-fade-in">
                <div className="w-52 h-auto mx-auto mb-4">
                    <BadgeSVG challenge={challenge} userName={userName} />
                </div>
                <p className="text-slate-300 text-lg">Has ganado la insignia:</p>
                <p className="text-xl font-bold mt-1" style={{ color: challenge.badgeColor }}>{challenge.badgeTitle}</p>

                {currentRank && (
                  <div className="mt-6 border-t border-slate-700 pt-5">
                    <p className="text-slate-300 text-lg">¡Nuevo Rango Obtenido!</p>
                    <p 
                      className={`text-2xl font-bold mt-1 ${currentRank.name === 'Sleep Master' ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500' : ''}`}
                      style={{ color: currentRank.name !== 'Sleep Master' ? currentRank.color : undefined }}
                    >
                      {currentRank.name}
                    </p>
                  </div>
                )}
                
                <div className="mt-6 bg-slate-900/50 p-3 rounded-lg border border-slate-700">
                   <p className="text-slate-400 text-sm">
                       ¡Tómale una captura a esta insignia y súbela a tus redes para presumir!
                   </p>
                </div>
            </div>
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

export default AchievementModal;
