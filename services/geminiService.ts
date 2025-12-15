import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateAdDescription = async (title: string, category: string, keywords: string): Promise<string> => {
  if (!apiKey) {
    console.warn("API Key is missing. Returning mock data.");
    return "API Key отсутствует. Пожалуйста, напишите описание самостоятельно или настройте ключ.";
  }

  try {
    const prompt = `
      Ты профессиональный копирайтер для доски объявлений.
      Напиши привлекательное, честное и продающее описание для объявления.
      
      Товар/Услуга: ${title}
      Категория: ${category}
      Ключевые особенности: ${keywords}
      
      Тон: Дружелюбный, но профессиональный.
      Длина: 3-4 коротких абзаца. Используй эмодзи умеренно.
      Язык: Русский.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Не удалось сгенерировать описание. Попробуйте еще раз.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Произошла ошибка при генерации. Пожалуйста, попробуйте позже.";
  }
};