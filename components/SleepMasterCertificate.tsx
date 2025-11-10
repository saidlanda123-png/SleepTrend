import React, { useRef, useState } from 'react';
import { ShareIcon, DownloadIcon } from './icons/Icons';

interface SleepMasterCertificateProps {
  userName: string;
  onReset: () => void;
}

const SleepMasterCertificateSVG: React.ForwardRefRenderFunction<SVGSVGElement, { userName: string; date: string }> = ({ userName, date }, ref) => (
  <svg
    ref={ref}
    width="800"
    height="600"
    viewBox="0 0 800 600"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full object-contain rounded-lg animate-fade-in"
  >
    <defs>
      <radialGradient id="master-background" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" stopColor="#2e1065" />
        <stop offset="100%" stopColor="#0f172a" />
      </radialGradient>
      <linearGradient id="master-accent" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fde047" />
        <stop offset="100%" stopColor="#d946ef" />
      </linearGradient>
      <filter id="master-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* Fondo */}
    <rect width="100%" height="100%" fill="url(#master-background)" />

    {/* Patrón de fondo sutil */}
    <g opacity="0.1" stroke="#fde047">
      <line x1="0" y1="0" x2="800" y2="600" strokeWidth="0.5" />
      <line x1="800" y1="0" x2="0" y2="600" strokeWidth="0.5" />
    </g>

    {/* Marco de maestría */}
    <rect x="10" y="10" width="780" height="580" fill="none" stroke="url(#master-accent)" strokeWidth="3" opacity="0.8" rx="10"/>
    <g fill="none" stroke="url(#master-accent)" strokeWidth="2">
        <path d="M 30 60 L 30 30 L 60 30" />
        <path d="M 770 60 L 770 30 L 740 30" />
        <path d="M 30 540 L 30 570 L 60 570" />
        <path d="M 770 540 L 770 570 L 740 570" />
    </g>
    
    {/* Contenido */}
    <text x="50%" y="80" fontFamily="Inter, sans-serif" fontSize="30" fontWeight="bold" fill="#f1f5f9" textAnchor="middle" letterSpacing="2">
      CERTIFICADO DE MAESTRÍA
    </text>
    
    {/* Emblema de Corona */}
    <g transform="translate(365, 110)" fill="url(#master-accent)" filter="url(#master-glow)" opacity="0.8">
      <path d="M10 20 L20 40 L35 15 L50 40 L60 20 L45 30 Z M35 0 L45 10 L25 10 Z" />
    </g>
     <g transform="translate(365, 110)" fill="url(#master-accent)">
      <path d="M10 20 L20 40 L35 15 L50 40 L60 20 L45 30 Z M35 0 L45 10 L25 10 Z" />
    </g>

    <g transform="translate(0, 40)">
        <text x="50%" y="270" fontFamily="Inter, sans-serif" fontSize="80" fontWeight="900" fill="#fde047" textAnchor="middle" filter="url(#master-glow)" opacity="0.7">
          {userName}
        </text>
        <text x="50%" y="270" fontFamily="Inter, sans-serif" fontSize="80" fontWeight="900" fill="white" textAnchor="middle">
          {userName}
        </text>
    </g>


    <text x="50%" y="400" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="18" fill="#cbd5e1" letterSpacing="0.5">
      <tspan x="50%" dy="0">Por conquistar todos los desafíos y alcanzar el dominio total</tspan>
      <tspan x="50%" dy="1.5em">sobre los hábitos del descanso.</tspan>
    </text>
    
    {/* Footer */}
    <g transform="translate(0, 550)">
      <text x="150" y="0" fontFamily="Inter, sans-serif" fontSize="14" fill="#a5b4fc" textAnchor="middle">
        {date}
      </text>
      <line x1="280" y1="-8" x2="520" y2="-8" stroke="#475569" strokeWidth="1" />
       <text x="650" y="0" fontFamily="Inter, sans-serif" fontSize="14" fill="#a5b4fc" textAnchor="middle">
        #SleepTrendMaster
      </text>
    </g>

    <text x="50%" y="500" fontFamily="Inter, sans-serif" fontSize="24" fontWeight="800" fill="url(#master-accent)" textAnchor="middle" letterSpacing="1">
      SLEEP MASTER
    </text>

  </svg>
);
const ForwardedSleepMasterCertificateSVG = React.forwardRef(SleepMasterCertificateSVG);


const SleepMasterCertificate: React.FC<SleepMasterCertificateProps> = ({ userName, onReset }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const completionDate = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

  const getPngBlob = async (): Promise<Blob | null> => {
    if (!svgRef.current) return null;

    return new Promise((resolve) => {
      const svgElement = svgRef.current!;
      const svgString = new XMLSerializer().serializeToString(svgElement);
      const url = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgString)))}`;

      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const scale = 2; // For better resolution
        canvas.width = svgElement.width.baseVal.value * scale;
        canvas.height = svgElement.height.baseVal.value * scale;
        
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
        
        canvas.toBlob((blob) => {
          resolve(blob);
        }, 'image/png');
      };
      img.onerror = () => {
        resolve(null);
      };
      img.src = url;
    });
  };

  const handleShare = async () => {
    if (!navigator.share) return;
    
    setIsProcessing(true);
    try {
      const blob = await getPngBlob();
      if (!blob) throw new Error("No se pudo generar el blob de la imagen.");

      const file = new File([blob], `certificado-sleep-master-${userName.replace(/\s+/g, '-')}.png`, { type: 'image/png' });
      const shareData = {
        title: `¡Soy un Sleep Master!`,
        text: `¡${userName} ha completado todos los desafíos y es un Sleep Master! #SleepTrendMaster`,
        files: [file],
      };

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share(shareData);
      } else {
        handleDownload(); // Fallback
      }
    } catch (err) {
      console.error("Error al compartir el certificado:", err);
      alert("No se pudo compartir la imagen. Intenta descargarla.");
    } finally {
        setIsProcessing(false);
    }
  };

  const handleDownload = async () => {
    setIsProcessing(true);
    const blob = await getPngBlob();
    setIsProcessing(false);

    if (!blob) {
      alert("No se pudo generar la imagen para descargar.");
      return;
    }

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `certificado-sleep-master-${userName.replace(/\s+/g, '-')}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-2xl aspect-[4/3] bg-slate-900 border-2 border-fuchsia-500/50 rounded-2xl shadow-2xl shadow-yellow-500/20 flex items-center justify-center p-2 md:p-4">
        <ForwardedSleepMasterCertificateSVG userName={userName} date={completionDate} ref={svgRef} />
      </div>
      
      <>
        <h2 className="text-2xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-fuchsia-500 mt-8 mb-2">
          ¡Felicidades, {userName}! Eres un verdadero Sleep Master.
        </h2>
        <p className="mb-6 text-slate-400 text-center">Has obtenido el Certificado de Maestría del Sueño. ¡Comparte tu logro!</p>
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg">
          {navigator.share && (
              <button
              onClick={handleShare}
              disabled={isProcessing}
              className="flex-1 px-6 py-3 bg-slate-700 text-white font-bold rounded-lg shadow-lg hover:bg-slate-600 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-wait disabled:transform-none"
            >
              {isProcessing ? (
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
            disabled={isProcessing}
            className="flex-1 px-6 py-3 bg-slate-700 text-white font-bold rounded-lg shadow-lg hover:bg-slate-600 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-wait disabled:transform-none"
          >
            {isProcessing ? (
                'Procesando...'
              ) : (
                <>
                    <DownloadIcon className="w-5 h-5" />
                    <span>Descargar Imagen</span>
                </>
            )}
          </button>
        </div>
          <div className="mt-4 w-full max-w-lg">
            <button
              onClick={onReset}
              className="w-full px-6 py-4 bg-gradient-to-r from-yellow-400 via-fuchsia-500 to-purple-600 text-white font-bold rounded-lg shadow-lg hover:shadow-fuchsia-500/50 transform hover:-translate-y-1 transition-all duration-300"
            >
              Comenzar un Nuevo Reto
            </button>
          </div>
      </>
    </div>
  );
};

export default SleepMasterCertificate;
