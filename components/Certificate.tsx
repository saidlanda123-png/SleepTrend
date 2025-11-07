
import React, { useState, useEffect, useRef } from 'react';
import { getCongratulatoryMessage } from '../services/geminiService';

interface CertificateProps {
  userName: string;
  onReset: () => void;
}

const Certificate: React.FC<CertificateProps> = ({ userName, onReset }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const certificateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        setLoading(true);
        const aiMessage = await getCongratulatoryMessage(userName);
        setMessage(aiMessage);
      } catch (err) {
        setError('No se pudo generar el mensaje. ¡Pero tu logro es real!');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userName]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen animate-fade-in p-4">
      <div 
        ref={certificateRef}
        className="w-full max-w-lg bg-gradient-to-br from-slate-800 via-indigo-900 to-slate-800 border-2 border-cyan-500/50 rounded-2xl shadow-2xl shadow-cyan-500/20 p-8 text-center"
      >
        <h1 className="text-2xl font-bold text-amber-300 tracking-wider uppercase">Certificado de Logro</h1>
        <p className="mt-4 text-slate-300">Otorgado a</p>
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-violet-400 my-4">
          {userName}
        </h2>
        <p className="text-slate-300">Por completar exitosamente el</p>
        <h3 className="text-2xl font-semibold text-white mt-2 mb-6">Reto de Sueño Saludable</h3>

        <div className="bg-slate-900/50 rounded-lg p-4 min-h-[100px] flex items-center justify-center">
          {loading && <div className="animate-pulse text-slate-400">Generando mensaje épico...</div>}
          {error && <p className="text-red-400">{error}</p>}
          {message && <p className="text-lg text-slate-200 italic">"{message}"</p>}
        </div>
      </div>
      
      <p className="mt-8 text-slate-400">¡Comparte tu logro en redes sociales!</p>

      <button
        onClick={onReset}
        className="mt-4 px-6 py-3 bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold rounded-lg shadow-lg hover:shadow-cyan-500/50 transform hover:-translate-y-1 transition-all duration-300"
      >
        Comenzar un Nuevo Reto
      </button>
    </div>
  );
};

export default Certificate;
