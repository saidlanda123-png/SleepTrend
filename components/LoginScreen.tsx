
import React, { useState } from 'react';
import { SunIcon, MoonIcon } from './icons/Icons';

interface LoginScreenProps {
  onLogin: (name: string) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin(name);
    }
  };

  return (
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
                    className="w-full px-5 py-4 bg-slate-800/60 border-2 border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 text-center text-lg"
                />
                <button
                    type="submit"
                    disabled={!name.trim()}
                    className="w-full mt-4 px-6 py-4 bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold rounded-lg shadow-lg hover:shadow-cyan-500/50 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                >
                    ¡Comenzar el Reto!
                </button>
            </form>
        </div>
    </div>
  );
};

export default LoginScreen;
