
import { GoogleGenAI, Type } from "@google/genai";
import { Surah, Hadith } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION_SCHOLAR = `You are an expert Islamic scholar and AI assistant named 'Nur'. Your purpose is to provide accurate, well-sourced information about Islam based on the Quran and authentic Hadith. When citing sources, be precise (e.g., Quran 2:183, Sahih al-Bukhari 52). If a topic has diverse scholarly opinions, present the main viewpoints respectfully without favoring one. Your tone must be informative, wise, and compassionate.`;

export const getSurahFromGemini = async (surahNumber: number): Promise<Surah | null> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Fetch the complete Surah number ${surahNumber} from the Quran.`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION_SCHOLAR,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING, description: "The Arabic name of the Surah." },
            number: { type: Type.INTEGER, description: "The number of the Surah (1-114)." },
            englishName: { type: Type.STRING, description: "The English transliterated name of the Surah." },
            revelationType: { type: Type.STRING, description: "Meccan or Medinan." },
            numberOfAyahs: { type: Type.INTEGER, description: "Total number of verses in the Surah." },
            verses: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  number: { type: Type.INTEGER, description: "The verse number within the Surah." },
                  arabic: { type: Type.STRING, description: "The verse text in Arabic script." },
                  english: { type: Type.STRING, description: "The English translation of the verse." },
                  transliteration: { type: Type.STRING, description: "The transliteration of the Arabic verse." },
                },
              },
            },
          },
        },
      },
    });

    const jsonString = response.text;
    if (jsonString) {
        return JSON.parse(jsonString) as Surah;
    }
    return null;
  } catch (error) {
    console.error("Error fetching Surah from Gemini:", error);
    return null;
  }
};


export const getAyahTafsir = async (surahName: string, ayahNumber: number, ayahText: string): Promise<string> => {
    try {
        const prompt = `Provide a concise and clear explanation (Tafsir) for Surah ${surahName}, Ayah ${ayahNumber}: "${ayahText}". Base your explanation on classical Tafsir works like Ibn Kathir, al-Jalalayn, and al-Tabari. Explain the historical context, linguistic nuances, and the key lessons or rulings. Keep the language accessible for a general audience.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt,
            config: {
                systemInstruction: SYSTEM_INSTRUCTION_SCHOLAR,
            }
        });
        return response.text;
    } catch (error) {
        console.error("Error fetching Ayah Tafsir:", error);
        return "Could not fetch explanation at this time.";
    }
};

export const searchHadithFromGemini = async (query: string): Promise<Hadith[]> => {
    try {
        const prompt = `Find up to 5 authentic Hadith from Sahih al-Bukhari and Sahih Muslim about '${query}'. For each Hadith, provide the collection, book name, hadith number, the full text in Arabic, the English translation, and the full reference.`;
        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: prompt,
            config: {
                systemInstruction: SYSTEM_INSTRUCTION_SCHOLAR,
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            collection: { type: Type.STRING, description: "The Hadith collection (e.g., Sahih al-Bukhari)." },
                            book: { type: Type.STRING, description: "The name of the book within the collection." },
                            hadithNumber: { type: Type.STRING, description: "The number of the Hadith." },
                            arabic: { type: Type.STRING, description: "The full Hadith text in Arabic script." },
                            english: { type: Type.STRING, description: "The English translation of the Hadith." },
                            reference: { type: Type.STRING, description: "The full reference for the Hadith." },
                        },
                    },
                },
            }
        });

        const jsonString = response.text;
        if (jsonString) {
            return JSON.parse(jsonString) as Hadith[];
        }
        return [];
    } catch (error) {
        console.error("Error fetching Hadith from Gemini:", error);
        return [];
    }
};


export const getFactCheckResponse = async (query: string): Promise<string> => {
    try {
        const prompt = `Fact-check the following idea or question based on primary Islamic texts: "${query}". Provide a detailed, well-reasoned answer citing the Quran and authentic Hadith. If the topic is complex, explain the different scholarly perspectives.`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt,
            config: {
                systemInstruction: SYSTEM_INSTRUCTION_SCHOLAR,
                tools: [{googleSearch: {}}],
            }
        });
        
        return response.text;
    } catch (error) {
        console.error("Error fetching fact-check response from Gemini:", error);
        return "Sorry, I encountered an error while processing your request. Please try again.";
    }
};
   