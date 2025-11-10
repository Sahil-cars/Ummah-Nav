import { GoogleGenAI, Type, Modality } from "@google/genai";
import { Surah, Hadith } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION_SCHOLAR = `You are an expert Islamic scholar and AI assistant named 'Nur'. Your purpose is to provide accurate, well-sourced information about Islam based on the Quran and authentic Hadith. When citing sources, be precise (e.g., Quran 2:183, Sahih al-Bukhari 52). If a topic has diverse scholarly opinions, present the main viewpoints respectfully without favoring one. Your tone must be informative, wise, and compassionate.`;

export const getSurahFromGemini = async (surahNumber: number): Promise<Surah | null> => {
    try {
        const prompt = `Provide the full data for Surah ${surahNumber} of the Quran. Include the Surah number, name in Arabic, English name, revelation type (Meccan/Medinan), total number of Ayahs, and an array of all its verses. For each verse, provide the verse number, the full Arabic text, the English translation, and a simple English transliteration. Also provide a concise Tafsir (explanation) in English for each verse.`;
        
        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: prompt,
            config: {
                systemInstruction: SYSTEM_INSTRUCTION_SCHOLAR,
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        number: { type: Type.INTEGER, description: "The number of the Surah." },
                        name: { type: Type.STRING, description: "The Arabic name of the Surah." },
                        englishName: { type: Type.STRING, description: "The English name of the Surah." },
                        revelationType: { type: Type.STRING, description: "Revelation type (Meccan or Medinan)." },
                        numberOfAyahs: { type: Type.INTEGER, description: "The total number of verses in the Surah." },
                        verses: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    number: { type: Type.INTEGER, description: "The verse number within the Surah." },
                                    arabic: { type: Type.STRING, description: "The Arabic text of the verse." },
                                    english: { type: Type.STRING, description: "The English translation of the verse." },
                                    transliteration: { type: Type.STRING, description: "English transliteration of the verse." },
                                    tafsir: { type: Type.STRING, description: "A concise explanation (Tafsir) of the verse in English." }
                                },
                                required: ["number", "arabic", "english", "transliteration", "tafsir"]
                            }
                        }
                    },
                    required: ["number", "name", "englishName", "revelationType", "numberOfAyahs", "verses"]
                }
            }
        });

        const jsonString = response.text;
        if (jsonString) {
            return JSON.parse(jsonString) as Surah;
        }
        return null;
    } catch (error) {
        console.error(`Error fetching Surah ${surahNumber} from Gemini:`, error);
        return null;
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

export const getFactCheckResponse = async (query: string): Promise<{text: string, sources: any[]}> => {
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
        
        const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.filter(c => c.web) || [];
        
        return { text: response.text, sources: sources };
    } catch (error) {
        console.error("Error fetching fact-check response from Gemini:", error);
        return { text: "Sorry, I encountered an error while processing your request. Please try again.", sources: [] };
    }
};

export const findMosques = async (latitude: number, longitude: number): Promise<{ prayerTimes: string, mosques: any[] }> => {
    try {
        const prompt = `What are some mosques near my location? Also list the Islamic prayer times for today.`;
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                tools: [{googleMaps: {}}],
                toolConfig: {
                    retrievalConfig: {
                        latLng: { latitude, longitude }
                    }
                }
            }
        });

        const mosques = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.filter(c => c.maps) || [];
        return { prayerTimes: response.text, mosques };
    } catch (error) {
        console.error("Error fetching mosque data:", error);
        return { prayerTimes: "Could not fetch prayer times or mosque data.", mosques: [] };
    }
};

export const getGeoInfoFromCoordinates = async (latitude: number, longitude: number): Promise<{ location: string, islamicDate: string }> => {
    try {
        const prompt = `Based on latitude ${latitude} and longitude ${longitude}, what is the city and country? And what is the current Islamic (Hijri) date?`;
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        location: { type: Type.STRING, description: "The city and country name, e.g., 'London, United Kingdom'." },
                        islamicDate: { type: Type.STRING, description: "The full Islamic date, e.g., '14 Muharram 1446 AH'." },
                    }
                }
            }
        });
        const jsonString = response.text;
        return JSON.parse(jsonString);
    } catch (error) {
        console.error("Error fetching geo info:", error);
        return { location: "Unknown Location", islamicDate: "Unknown Date" };
    }
};

export const getIslamicFact = async (): Promise<string> => {
    try {
        const prompt = `Tell me an interesting, uplifting, and little-known "Did you know?" style fact from Islamic history, science, or theology. Keep it concise and engaging.`;
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt,
            config: {
                systemInstruction: SYSTEM_INSTRUCTION_SCHOLAR,
            }
        });
        return response.text;
    } catch (error) {
        console.error("Error fetching Islamic fact:", error);
        return "Could not fetch a fact at this time. Please try again.";
    }
};

export const generateSpeech = async (text: string): Promise<string | null> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-tts",
            contents: [{ parts: [{ text: text }] }],
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                    voiceConfig: {
                      prebuiltVoiceConfig: { voiceName: 'Kore' },
                    },
                },
            },
        });
        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        return base64Audio || null;
    } catch (error) {
        console.error("Error generating speech:", error);
        return null;
    }
};
