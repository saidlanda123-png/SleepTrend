import React, { useState } from 'react';
import { SunIcon, MoonIcon } from './icons/Icons';

const AboutModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div 
    className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in"
    onClick={onClose}
  >
    <div 
      className="relative bg-slate-800 border border-slate-700 rounded-xl max-w-lg w-full p-8 shadow-2xl shadow-violet-500/20 text-center"
      onClick={(e) => e.stopPropagation()} // Evita que el modal se cierre al hacer clic dentro
    >
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-slate-500 hover:text-slate-200 transition-colors"
        aria-label="Cerrar modal"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500 mb-4">
        Sobre SleepTrend
      </h2>
      <p className="text-slate-300 text-lg leading-relaxed">
        SleepTrend es el proyecto de Educación para la Salud diseñado por estudiantes para estudiantes. Monitorea tus patrones de sueño, entiende cómo impactan tu rendimiento académico y salud física, y establece metas de descanso alcanzables. ¡Transforma tu "ZzZ" en tu mejor estrategia de estudio!
      </p>
    </div>
  </div>
);

interface LoginScreenProps {
  onLogin: (name: string) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [showAboutModal, setShowAboutModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin(name.trim());
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
        <div className="absolute top-0 left-0 w-full h-full bg-slate-900/50 backdrop-blur-sm z-0"></div>
        <div className="relative z-10 max-w-md w-full">
          <div className="flex justify-center items-center gap-4 mb-6">
            <SunIcon className="w-12 h-12 text-amber-300" />
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">
              Reto Sueño Saludable
            </h1>
            <MoonIcon className="w-10 h-10 text-violet-400" />
          </div>
          <p className="text-slate-300 mb-8 text-lg">
            Únete al reto de 7 días y descubre el impacto de una buena higiene del sueño.
          </p>
          
          <form onSubmit={handleSubmit} className="w-full">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Escribe tu nombre para empezar"
              className="w-full px-6 py-4 bg-slate-800/70 border-2 border-slate-700 rounded-lg text-lg text-center placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 focus:outline-none transition-all"
              required
              aria-label="Tu nombre"
            />
            <button
              type="submit"
              className="w-full mt-4 px-6 py-4 bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold rounded-lg shadow-lg hover:shadow-cyan-500/50 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              disabled={!name.trim()}
            >
              Comenzar Reto
            </button>
          </form>

          <div className="mt-8">
            <button
              onClick={() => setShowAboutModal(true)}
              className="text-slate-400 hover:text-cyan-400 transition-colors duration-300 underline underline-offset-4"
            >
              Sobre nosotros
            </button>
          </div>

        </div>
      </div>
      {showAboutModal && <AboutModal onClose={() => setShowAboutModal(false)} />}
    </>
  );
};

export default LoginScreen;