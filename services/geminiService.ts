
import { GoogleGenAI } from "@google/genai";

const getApiKey = (): string => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY environment variable not set.");
  }
  return apiKey;
};

export const getCongratulatoryMessage = async (name: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    
    const prompt = `Genera un mensaje de felicitación corto, positivo y en español para un adolescente llamado ${name}. Acaba de completar un reto de 7 días para mejorar su higiene del sueño reduciendo el uso de pantallas. El tono debe ser de celebración, moderno y motivador, como un logro épico. Menciona su increíble disciplina y el súper poder que ha desbloqueado para su bienestar. Máximo 40 palabras. No uses hashtags.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return `¡Felicidades, ${name}! Has completado el Reto del Sueño Saludable. Tu esfuerzo y dedicación son inspiradores. ¡Sigue así!`;
  }
};
