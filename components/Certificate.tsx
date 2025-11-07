import React, { useState, useEffect } from 'react';
import { generateCertificateImage } from '../services/geminiService';
import { ShareIcon, DownloadIcon } from './icons/Icons';

interface CertificateProps {
  userName: string;
  onReset: () => void;
}

const Certificate: React.FC<CertificateProps> = ({ userName, onReset }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSharing, setIsSharing] = useState<boolean>(false);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        setLoading(true);
        setError(null);
        const base64Image = await generateCertificateImage(userName);
        setImageUrl(`data:image/png;base64,${base64Image}`);
      } catch (err) {
        setError('No se pudo generar tu certificado. ¡Pero tu logro es real!');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userName]);
  
  const handleShare = async () => {
    if (!imageUrl || !navigator.share) return;
    
    setIsSharing(true);
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      const file = new File([blob], `certificado-${userName.replace(/\s+/g, '-')}.png`, { type: 'image/png' });
      const shareData = {
        title: `¡Completé el Reto Sueño Saludable!`,
        text: `¡${userName} ha completado el reto de 7 días para mejorar sus hábitos de sueño! #RetoSueñoSaludable`,
        files: [file],
      };

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share(shareData);
      } else {
        handleDownload();
      }
    } catch (err) {
      console.error("Error al compartir el certificado:", err);
    } finally {
        setIsSharing(false);
    }
  };

  const handleDownload = () => {
    if (!imageUrl) return;
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `certificado-${userName.replace(/\s+/g, '-')}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen animate-fade-in p-4">
      <div className="w-full max-w-lg aspect-square bg-slate-800 border-2 border-slate-700 rounded-2xl shadow-2xl shadow-cyan-500/20 flex items-center justify-center p-4">
        {loading && (
            <div className="text-center">
                <div className="animate-pulse text-slate-400 text-lg">Estamos diseñando tu certificado personalizado...</div>
                <p className="text-slate-500 mt-2">Esto puede tardar unos segundos.</p>
            </div>
        )}
        {error && !loading && <p className="text-red-400 text-center p-4">{error}</p>}
        {imageUrl && !loading && (
            <img 
                src={imageUrl} 
                alt={`Certificado para ${userName}`}
                className="w-full h-full object-contain rounded-lg animate-fade-in"
            />
        )}
      </div>
      
      {!loading && imageUrl && (
        <>
          <p className="mt-8 text-slate-400">¡Comparte tu épico logro en redes sociales!</p>
          <div className="mt-4 flex flex-col sm:flex-row gap-4 w-full max-w-lg">
            {navigator.share && (
                <button
                onClick={handleShare}
                disabled={isSharing}
                className="flex-1 px-6 py-3 bg-slate-700 text-white font-bold rounded-lg shadow-lg hover:bg-slate-600 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-wait disabled:transform-none"
              >
                {isSharing ? (
                  'Procesando...'
                ) : (
                  <>
                    <ShareIcon className="w-5 h-5" />
                    <span>Compartir</span>
                  </>
                )}
              </button>
            )}
            <button
              onClick={handleDownload}
              className="flex-1 px-6 py-3 bg-slate-700 text-white font-bold rounded-lg shadow-lg hover:bg-slate-600 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <DownloadIcon className="w-5 h-5" />
              <span>Descargar Imagen</span>
            </button>
          </div>
           <div className="mt-4 w-full max-w-lg">
             <button
                onClick={onReset}
                className="w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold rounded-lg shadow-lg hover:shadow-cyan-500/50 transform hover:-translate-y-1 transition-all duration-300"
              >
                Cerrar Sesión
              </button>
            </div>
        </>
      )}
      
       {!loading && error && (
         <div className="mt-8 w-full max-w-lg">
            <button
                onClick={onReset}
                className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-orange-600 text-white font-bold rounded-lg shadow-lg hover:shadow-red-500/50 transform hover:-translate-y-1 transition-all duration-300"
            >
                Cerrar Sesión y Volver a Empezar
            </button>
         </div>
       )}

    </div>
  );
};

export default Certificate;