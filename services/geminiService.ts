import { GoogleGenAI } from "@google/genai";

const getApiKey = (): string => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY environment variable not set.");
  }
  return apiKey;
};

export const generateCertificateImage = async (name: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    
    const prompt = `Crea un certificado de logro digital, moderno y muy atractivo para un adolescente llamado "${name}". El certificado es por completar el "Reto de Sueño Saludable". El diseño debe ser épico y digno de compartir en redes sociales. Usa una paleta de colores vibrante con tonos de azul profundo, violeta y toques de cian y dorado. Incorpora elementos abstractos y dinámicos que sugieran energía, descanso y tecnología (como ondas de sueño o constelaciones estilizadas). El texto debe ser claro y estar bien integrado. Incluye los siguientes textos: 1. Título principal: "Certificado de Logro". 2. Nombre del galardonado: "${name}" (con una fuente destacada y elegante). 3. Razón del logro: "Por conquistar el Reto de Sueño Saludable". El estilo general debe ser limpio, profesional y motivador.`;

    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: 1,
        aspectRatio: '1:1',
        outputMimeType: 'image/png',
      },
    });
    
    const base64ImageBytes = response.generatedImages[0].image.imageBytes;
    if (!base64ImageBytes) {
      throw new Error("La API no devolvió datos de imagen.");
    }

    return base64ImageBytes;
  } catch (error) {
    console.error("Error calling Imagen API:", error);
    throw new Error("No se pudo generar la imagen del certificado.");
  }
};