import React, { useState, useRef } from 'react';
import type { Challenge } from '../types';
import BadgeSVG from './BadgeSVG';
import PhotoSharer from './PhotoSharer';

interface AchievementModalProps {
  challenge: Challenge;
  onClose: () => void;
}

const AchievementModal: React.FC<AchievementModalProps> = ({ challenge, onClose }) => {
  const [view, setView] = useState<'badge' | 'photo'>('badge');
  const badgeRef = useRef<SVGSVGElement>(null);
  
  const handleViewChange = (newView: 'badge' | 'photo') => {
    // Reset scroll to top when changing views
    const modalContent = document.getElementById('modal-content');
    if (modalContent) modalContent.scrollTop = 0;
    setView(newView);
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="achievement-title"
    >
      <div
        className="relative bg-slate-800/90 border border-slate-700 rounded-2xl max-w-md w-full max-h-[90vh] shadow-2xl shadow-violet-500/20 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-slate-700 text-center">
            {view === 'badge' ? (
                <h2 id="achievement-title" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">
                    ¡Logro Desbloqueado!
                </h2>
            ) : (
                <h2 id="achievement-title" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">
                    Crea tu Fotomontaje
                </h2>
            )}
        </div>

        <div id="modal-content" className="p-6 flex-grow overflow-y-auto">
            {view === 'badge' ? (
                <div className="text-center animate-fade-in">
                    <div className="w-60 h-auto mx-auto mb-4">
                        <BadgeSVG ref={badgeRef} challenge={challenge} />
                    </div>
                    <p className="text-slate-300 text-lg">Has ganado la insignia:</p>
                    <p className="text-xl font-bold mt-1" style={{ color: challenge.badgeColor }}>{challenge.badgeTitle}</p>
                </div>
            ) : (
                 <div className="animate-fade-in">
                     <PhotoSharer 
                        badgeRef={badgeRef} 
                        challenge={challenge} 
                    />
                 </div>
            )}
        </div>

        <div className="p-6 border-t border-slate-700 bg-slate-800/50 rounded-b-2xl">
          {view === 'badge' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => handleViewChange('photo')}
                className="w-full px-4 py-3 bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold rounded-lg shadow-lg hover:shadow-cyan-500/50 transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Crear Fotomontaje
              </button>
              <button
                onClick={onClose}
                className="w-full px-4 py-3 bg-slate-700 hover:bg-slate-600 text-slate-300 font-semibold rounded-lg transition-colors"
              >
                Cerrar
              </button>
            </div>
          ) : (
             <button
                onClick={() => handleViewChange('badge')}
                className="w-full px-4 py-3 bg-slate-700 hover:bg-slate-600 text-slate-300 font-semibold rounded-lg transition-colors"
              >
                Volver
              </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AchievementModal;