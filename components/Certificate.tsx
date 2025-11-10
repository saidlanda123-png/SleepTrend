import React, { useRef, useState } from 'react';
import { ShareIcon, DownloadIcon } from './icons/Icons';

interface CertificateProps {
  userName: string;
  onReset: () => void;
}

// Este componente renderiza el certificado como un SVG.
// Se usa React.forwardRef para pasar la ref al elemento SVG subyacente.
const CertificateSVG: React.ForwardRefRenderFunction<SVGSVGElement, { userName: string }> = ({ userName }, ref) => (
  <svg
    ref={ref}
    width="500"
    height="500"
    viewBox="0 0 500 500"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full object-contain rounded-lg animate-fade-in"
  >
    <defs>
      <linearGradient id="cert-background" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0f172a" />
        <stop offset="100%" stopColor="#1e1b4b" />
      </linearGradient>
      <linearGradient id="cert-accent" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#22d3ee" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#cert-background)" rx="16" />
    <rect x="10" y="10" width="480" height="480" fill="none" stroke="#475569" strokeWidth="2" rx="10" />
    <rect x="15" y="15" width="470" height="470" fill="none" stroke="url(#cert-accent)" strokeWidth="1.5" strokeOpacity="0.5" rx="8" />

    <text x="50%" y="80" fontFamily="Inter, sans-serif" fontSize="32" fontWeight="bold" fill="url(#cert-accent)" textAnchor="middle">
      Certificado de Logro
    </text>

    <text x="50%" y="130" fontFamily="Inter, sans-serif" fontSize="16" fill="#94a3b8" textAnchor="middle">
      Otorgado a
    </text>

    <text x="50%" y="220" fontFamily="Inter, sans-serif" fontSize="48" fontWeight="800" fill="white" textAnchor="middle">
      {userName}
    </text>

    <text x="50%" y="290" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="18" fill="#cbd5e1">
      <tspan x="50%" dy="0">Por conquistar el</tspan>
      <tspan x="50%" dy="1.4em">Reto de Sueño Saludable</tspan>
    </text>

    <text x="50%" y="420" fontFamily="Inter, sans-serif" fontSize="16" fontWeight="500" fill="#64748b" textAnchor="middle">
      SleepTrend
    </text>
  </svg>
);
const ForwardedCertificateSVG = React.forwardRef(CertificateSVG);


const Certificate: React.FC<CertificateProps> = ({ userName, onReset }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Convierte el SVG a un Blob de PNG usando un Canvas
  const getPngBlob = async (): Promise<Blob | null> => {
    if (!svgRef.current) return null;

    return new Promise((resolve) => {
      const svgElement = svgRef.current!;
      const svgString = new XMLSerializer().serializeToString(svgElement);
      const url = `data:image/svg+xml;base64,${btoa(svgString)}`;

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
        text: `¡${userName} ha completado el reto de 7 días para mejorar sus hábitos de sueño! #RetoSueñoSaludable`,
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
      <div className="w-full max-w-lg aspect-square bg-slate-800 border-2 border-slate-700 rounded-2xl shadow-2xl shadow-cyan-500/20 flex items-center justify-center p-4">
        <ForwardedCertificateSVG userName={userName} ref={svgRef} />
      </div>
      
      <>
        <h2 className="text-2xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500 mt-8 mb-2">
          ¡Felicitaciones, {userName}!
        </h2>
        <p className="mb-6 text-slate-400 text-center">¡Comparte tu épico logro en redes sociales!</p>
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
            <DownloadIcon className="w-5 h-5" />
            <span>Descargar Imagen</span>
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
