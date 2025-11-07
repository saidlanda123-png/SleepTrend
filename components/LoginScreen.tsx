import React, { useState } from 'react';
import { SunIcon, MoonIcon } from './icons/Icons';
import { signInWithGoogle } from '../services/authService';

const GoogleIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
    <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path>
    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.223 0-9.641-3.657-11.303-8.591l-6.571 4.819C9.656 39.663 16.318 44 24 44z"></path>
    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.012 35.195 44 30.027 44 24c0-1.341-.138-2.65-.389-3.917z"></path>
  </svg>
);

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


const LoginScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAboutModal, setShowAboutModal] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await signInWithGoogle();
      // El listener onAuthStateChanged en App.tsx se encargará de la redirección
    } catch (err) {
      console.error("Error de inicio de sesión:", err);
      setError("No se pudo iniciar sesión. Por favor, intenta de nuevo.");
      setIsLoading(false);
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
          
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full mt-4 px-6 py-4 bg-slate-100 text-slate-800 font-bold rounded-lg shadow-lg hover:shadow-white/20 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex items-center justify-center gap-4"
          >
            {isLoading ? (
              <span>Autenticando...</span>
            ) : (
              <>
                <GoogleIcon />
                <span>Iniciar Sesión con Google</span>
              </>
            )}
          </button>

          {error && <p className="mt-4 text-red-400">{error}</p>}

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