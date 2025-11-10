import React, { useState, useRef, useEffect } from 'react';
import type { Challenge } from '../types';
import { DownloadIcon, ShareIcon } from './icons/Icons';

interface PhotoSharerProps {
  challenge: Challenge;
  badgeRef: React.RefObject<SVGSVGElement>;
}

const PhotoSharer: React.FC<PhotoSharerProps> = ({ challenge, badgeRef }) => {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [compositeImage, setCompositeImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserImage(e.target?.result as string);
        setCompositeImage(null); // Reset composite image when new user image is selected
      };
      reader.readAsDataURL(file);
    }
  };

  const drawCanvas = () => {
    if (!userImage || !badgeRef.current || !canvasRef.current) return;
    setIsLoading(true);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const canvasSize = 1080; // For social media
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    const userImg = new Image();
    userImg.src = userImage;

    const badgeSvgString = new XMLSerializer().serializeToString(badgeRef.current);
    const badgeUrl = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(badgeSvgString)))}`;
    const badgeImg = new Image();
    badgeImg.src = badgeUrl;

    Promise.all([
        new Promise(resolve => userImg.onload = resolve),
        new Promise(resolve => badgeImg.onload = resolve)
    ]).then(() => {
        // Clear and set background
        ctx.clearRect(0, 0, canvasSize, canvasSize);
        const gradient = ctx.createLinearGradient(0, 0, canvasSize, canvasSize);
        gradient.addColorStop(0, '#0f172a');
        gradient.addColorStop(1, '#1e1b4b');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvasSize, canvasSize);

        // Draw user image with "cover" effect
        const hRatio = canvasSize / userImg.width;
        const vRatio = canvasSize / userImg.height;
        const ratio = Math.max(hRatio, vRatio);
        const centerShift_x = (canvasSize - userImg.width * ratio) / 2;
        const centerShift_y = (canvasSize - userImg.height * ratio) / 2;
        ctx.drawImage(userImg, 0, 0, userImg.width, userImg.height, centerShift_x, centerShift_y, userImg.width * ratio, userImg.height * ratio);
        
        // Overlay
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.fillRect(0, 0, canvasSize, canvasSize);

        // Draw badge
        const badgeSize = canvasSize * 0.3;
        ctx.drawImage(badgeImg, canvasSize - badgeSize - 40, 40, badgeSize, badgeSize * (220/200));

        // Draw text
        ctx.textAlign = 'left';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = 'bold 48px Inter, sans-serif';
        ctx.fillText('Reto Completado:', 40, canvasSize - 160);
        
        ctx.fillStyle = challenge.badgeColor;
        ctx.font = '60px Inter, sans-serif';
        ctx.fillText(challenge.title, 40, canvasSize - 90);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '36px Inter, sans-serif';
        ctx.fillText('#SleepTrendMaster', 40, canvasSize - 40);

        setCompositeImage(canvas.toDataURL('image/jpeg', 0.9));
        setIsLoading(false);
    });
  };

  useEffect(() => {
    if (userImage) {
        drawCanvas();
    }
  }, [userImage]);

  const handleAction = async (type: 'download' | 'share') => {
    if (!canvasRef.current) return;
    canvasRef.current.toBlob(async (blob) => {
      if (!blob) return;
      if (type === 'download') {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `sleeptrend-logro.jpg`;
        a.click();
        URL.revokeObjectURL(url);
      } else if (navigator.share) {
        const file = new File([blob], 'sleeptrend-logro.jpg', { type: 'image/jpeg' });
        try {
            await navigator.share({
                title: '¡Logro Desbloqueado en SleepTrend!',
                text: `¡Completé el desafío "${challenge.title}"! #SleepTrendMaster`,
                files: [file]
            });
        } catch(e) {
            console.error('Share failed', e);
        }
      }
    }, 'image/jpeg', 0.9);
  };


  return (
    <div className="text-center">
        {!userImage && (
            <>
                <p className="text-slate-400 mb-4">Sube una foto tuya haciendo el reto para crear una imagen única y compartirla.</p>
                <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full px-4 py-3 bg-slate-700 hover:bg-slate-600 text-slate-300 font-semibold rounded-lg transition-colors"
                >
                    Seleccionar Foto
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                />
            </>
        )}

        {(isLoading || compositeImage) && (
            <div className="aspect-square w-full rounded-lg bg-slate-900/50 flex items-center justify-center mb-4 overflow-hidden border border-slate-700">
                {isLoading && <div className="text-slate-400">Generando imagen...</div>}
                {!isLoading && compositeImage && <img src={compositeImage} alt="Fotomontaje del logro" className="w-full h-full object-cover"/>}
            </div>
        )}
        
        {/* Hidden canvas for drawing */}
        <canvas ref={canvasRef} className="hidden"></canvas>
        
        {compositeImage && !isLoading && (
            <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                        onClick={() => handleAction('download')}
                        className="w-full px-4 py-3 bg-slate-700 hover:bg-slate-600 text-slate-300 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                        <DownloadIcon className="w-5 h-5" />
                        Descargar
                    </button>
                    {navigator.share && (
                        <button
                            onClick={() => handleAction('share')}
                            className="w-full px-4 py-3 bg-slate-700 hover:bg-slate-600 text-slate-300 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                            <ShareIcon className="w-5 h-5" />
                            Compartir
                        </button>
                    )}
                </div>
                 <button
                    onClick={() => setUserImage(null)}
                    className="w-full px-4 py-2 text-sm text-slate-400 hover:text-slate-200 transition-colors"
                >
                    Elegir otra foto
                </button>
            </div>
        )}
    </div>
  );
};

export default PhotoSharer;