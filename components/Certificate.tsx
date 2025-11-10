import React, { useRef, useState } from 'react';
import { ShareIcon, DownloadIcon } from './icons/Icons';

interface CertificateProps {
  userName: string;
  onReset: () => void;
}

// Este componente renderiza el certificado como un SVG.
// Se usa React.forwardRef para pasar la ref al elemento SVG subyacente.
const CertificateSVG: React.ForwardRefRenderFunction<SVGSVGElement, { userName: string; date: string }> = ({ userName, date }, ref) => (
  <svg
    ref={ref}
    width="800"
    height="600"
    viewBox="0 0 800 600"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full object-contain rounded-lg animate-fade-in"
  >
    <defs>
      <linearGradient id="cert-background" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#020617" />
        <stop offset="100%" stopColor="#1e1b4b" />
      </linearGradient>
      <linearGradient id="neon-accent" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06b6d4" />
        <stop offset="100%" stopColor="#c026d3" />
      </linearGradient>
      <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
       <filter id="star-glow">
        <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* Fondo Galáctico */}
    <rect width="100%" height="100%" fill="url(#cert-background)" />

    {/* Estrellas */}
    <g opacity="0.7" filter="url(#star-glow)">
      <circle cx="120" cy="90" r="2" fill="#fff" /><circle cx="750" cy="450" r="2" fill="#fff" />
      <circle cx="180" cy="200" r="1.5" fill="#fff" /><circle cx="680" cy="150" r="1.5" fill="#fff" />
      <circle cx="90" cy="450" r="1" fill="#fff" /><circle cx="650" cy="550" r="1" fill="#fff" />
      <circle cx="220" cy="500" r="2" fill="#fff" /><circle cx="50" cy="50" r="1.5" fill="#fff" />
      <circle cx="350" cy="80" r="1.5" fill="#fff" /><circle cx="450" cy="520" r="1.5" fill="#fff" />
      <circle cx="400" cy="300" r="2.5" fill="#fff" /><circle cx="380" cy="550" r="2" fill="#fff" />
      <circle cx="580" cy="80" r="1" fill="#fff" /><circle cx="280" cy="320" r="1" fill="#fff" />
    </g>

    {/* Marco Futurista */}
    <g stroke="url(#neon-accent)" strokeWidth="2" fill="none" opacity="0.6">
        <path d="M 20 50 L 20 20 L 50 20" />
        <path d="M 780 50 L 780 20 L 750 20" />
        <path d="M 20 550 L 20 580 L 50 580" />
        <path d="M 780 550 L 780 580 L 750 580" />
    </g>
    <rect x="10" y="10" width="780" height="580" fill="none" stroke="#475569" strokeWidth="1" strokeOpacity="0.5" />


    {/* Contenido */}
    <text x="50%" y="80" fontFamily="Inter, sans-serif" fontSize="32" fontWeight="bold" fill="#f1f5f9" textAnchor="middle" letterSpacing="1">
      Sello de Honor del Sueño Profundo
    </text>
    <line x1="200" y1="105" x2="600" y2="105" stroke="url(#neon-accent)" strokeWidth="1" opacity="0.5" />

    {/* Nombre de Usuario con Efecto Neón */}
    <g transform="translate(0, 40)">
        <text x="50%" y="270" fontFamily="Inter, sans-serif" fontSize="80" fontWeight="900" fill="#06b6d4" textAnchor="middle" filter="url(#neon-glow)" opacity="0.8">
          {userName}
        </text>
        <text x="50%" y="270" fontFamily="Inter, sans-serif" fontSize="80" fontWeight="900" fill="white" textAnchor="middle">
          {userName}
        </text>
    </g>


    <text x="50%" y="400" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="18" fill="#cbd5e1" letterSpacing="0.5">
      <tspan x="50%" dy="0">Por Dominar el Desafío de 7 Días de Sueño Óptimo</tspan>
      <tspan x="50%" dy="1.5em">y establecer un ritmo circadiano perfecto.</tspan>
    </text>
    
    {/* Footer */}
    <g transform="translate(0, 550)">
      <text x="150" y="0" fontFamily="Inter, sans-serif" fontSize="14" fill="#94a3b8" textAnchor="middle">
        {date}
      </text>
      <line x1="280" y1="-8" x2="520" y2="-8" stroke="#475569" strokeWidth="1" />
      <text x="400" y="0" fontFamily="Inter, sans-serif" fontSize="16" fontWeight="bold" fill="#94a3b8" textAnchor="middle">
        SleepTrend
      </text>
       <text x="650" y="0" fontFamily="Inter, sans-serif" fontSize="14" fill="#94a3b8" textAnchor="middle">
        #SleepTrendMaster
      </text>
    </g>

    <text x="50%" y="500" fontFamily="Inter, sans-serif" fontSize="20" fontWeight="600" fill="url(#neon-accent)" textAnchor="middle">
      ¡Comparte tu Conquista Nocturna!
    </text>

  </svg>
);
const ForwardedCertificateSVG = React.forwardRef(CertificateSVG);


const Certificate: React.FC<CertificateProps> = ({ userName, onReset }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const completionDate = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

  // Convierte el SVG a un Blob de PNG usando un Canvas
  const getPngBlob = async (): Promise<Blob | null> => {
    if (!svgRef.current) return null;

    return new Promise((resolve) => {
      const svgElement = svgRef.current!;
      const svgString = new XMLSerializer().serializeToString(svgElement);
      const url = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgString)))}`;

      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const scale = 2; // Para mejor resolución
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

      const file = new File([blob], `certificado-${userName.replace(/\s+/g, '-')}.png`, { type: 'image/png' });
      const shareData = {
        title: `¡Completé el Reto Sueño Saludable!`,
        text: `¡${userName} ha dominado el Reto de 7 Días de Sueño Óptimo! #SleepTrendMaster`,
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
    link.download = `certificado-${userName.replace(/\s+/g, '-')}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-2xl aspect-[4/3] bg-slate-800 border-2 border-slate-700 rounded-2xl shadow-2xl shadow-cyan-500/20 flex items-center justify-center p-2 md:p-4">
        <ForwardedCertificateSVG userName={userName} date={completionDate} ref={svgRef} />
      </div>
      
      <>
        <h2 className="text-2xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500 mt-8 mb-2">
          ¡Felicitaciones, {userName}!
        </h2>
        <p className="mb-6 text-slate-400 text-center">Has obtenido el Sello de Honor del Sueño Profundo.</p>
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
              className="w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold rounded-lg shadow-lg hover:shadow-cyan-500/50 transform hover:-translate-y-1 transition-all duration-300"
            >
              Comenzar un Nuevo Reto
            </button>
          </div>
      </>
    </div>
  );
};

export default Certificate;
