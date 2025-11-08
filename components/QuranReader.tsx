
import React, { useState, useCallback } from 'react';
import { getSurahFromGemini, getAyahTafsir } from '../services/geminiService';
import { Surah, Ayah, LanguageOption } from '../types';
import { SURAHS } from '../constants';

const Spinner: React.FC = () => (
    <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
    </div>
);

const AyahCard: React.FC<{
    ayah: Ayah;
    surahName: string;
    language: LanguageOption;
    showTafsir: boolean;
    onExplain: (ayahNumber: number, ayahText: string) => void;
    isExplaining: boolean;
}> = ({ ayah, surahName, language, showTafsir, onExplain, isExplaining }) => {
    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border-l-4 border-teal-500 mb-4">
            <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-teal-600 dark:text-teal-400">{surahName}:{ayah.number}</span>
                <button
                    onClick={() => onExplain(ayah.number, ayah.english)}
                    className="text-xs bg-teal-100 dark:bg-teal-800 text-teal-700 dark:text-teal-300 px-2 py-1 rounded-full hover:bg-teal-200 dark:hover:bg-teal-700 transition"
                    disabled={isExplaining}
                >
                    {isExplaining ? 'Loading...' : 'Explain Ayah'}
                </button>
            </div>

            {language === 'arabic' && <p className="text-2xl font-arabic text-right leading-loose mb-2">{ayah.arabic}</p>}
            {language === 'transliteration' && <p className="italic text-gray-700 dark:text-gray-300 mb-2">{ayah.transliteration}</p>}
            {language === 'english' && <p className="text-gray-800 dark:text-gray-200">{ayah.english}</p>}

            {showTafsir && ayah.tafsir && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="font-semibold text-teal-700 dark:text-teal-300 mb-2">Tafsir (Explanation)</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap">{ayah.tafsir}</p>
                </div>
            )}
        </div>
    );
};


const QuranReader: React.FC = () => {
    const [selectedSurah, setSelectedSurah] = useState<string>('1');
    const [surahData, setSurahData] = useState<Surah | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [language, setLanguage] = useState<LanguageOption>('english');
    const [showTafsir, setShowTafsir] = useState<boolean>(false);
    const [explainingAyah, setExplainingAyah] = useState<number | null>(null);

    const fetchSurah = useCallback(async () => {
        setLoading(true);
        setError(null);
        setSurahData(null);
        const data = await getSurahFromGemini(parseInt(selectedSurah, 10));
        if (data) {
            setSurahData(data);
        } else {
            setError('Failed to fetch Surah. Please try again.');
        }
        setLoading(false);
    }, [selectedSurah]);

    const handleExplainAyah = useCallback(async (ayahNumber: number, ayahText: string) => {
        if (!surahData) return;
        setExplainingAyah(ayahNumber);
        const tafsir = await getAyahTafsir(surahData.englishName, ayahNumber, ayahText);
        setSurahData(prevData => {
            if (!prevData) return null;
            const newVerses = prevData.verses.map(v => v.number === ayahNumber ? { ...v, tafsir } : v);
            return { ...prevData, verses: newVerses };
        });
        setShowTafsir(true);
        setExplainingAyah(null);
    }, [surahData]);

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-6">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Quran Reader</h1>
                <p className="text-gray-600 dark:text-gray-400">Select a Surah to begin your reading and exploration.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div>
                        <label htmlFor="surah-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Surah</label>
                        <select
                            id="surah-select"
                            value={selectedSurah}
                            onChange={(e) => setSelectedSurah(e.target.value)}
                            className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                            {SURAHS.map(s => <option key={s.number} value={s.number}>{s.number}. {s.englishName} ({s.name})</option>)}
                        </select>
                    </div>
                    <div className="self-end">
                        <button
                            onClick={fetchSurah}
                            disabled={loading}
                            className="w-full bg-teal-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-teal-700 disabled:bg-teal-400 transition-colors flex justify-center items-center"
                        >
                             {loading ? 'Loading...' : 'Read Surah'}
                        </button>
                    </div>
                </div>
            </div>

            {loading && <Spinner />}
            {error && <p className="text-center text-red-500">{error}</p>}
            
            {surahData && (
                 <div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg mb-6 sticky top-4 z-10">
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                            <div>
                                <h2 className="text-2xl font-bold text-teal-700 dark:text-teal-300">{surahData.number}. {surahData.englishName}</h2>
                                <p className="text-gray-500 dark:text-gray-400">{surahData.revelationType} - {surahData.numberOfAyahs} Ayahs</p>
                            </div>
                            <div className="flex flex-col gap-4 w-full sm:w-auto">
                                <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
                                    {(['english', 'arabic', 'transliteration'] as LanguageOption[]).map(lang => (
                                        <button key={lang} onClick={() => setLanguage(lang)} className={`px-3 py-1 text-sm font-medium rounded-md capitalize transition ${language === lang ? 'bg-white dark:bg-gray-900 text-teal-600 shadow' : 'text-gray-600 dark:text-gray-300'}`}>
                                            {lang}
                                        </button>
                                    ))}
                                </div>
                                 <label className="flex items-center space-x-2 cursor-pointer self-center sm:self-auto">
                                    <input type="checkbox" checked={showTafsir} onChange={() => setShowTafsir(!showTafsir)} className="form-checkbox h-5 w-5 text-teal-600 rounded focus:ring-teal-500" />
                                    <span className="text-gray-700 dark:text-gray-300">Show Tafsir</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        {surahData.verses.map(ayah => (
                            <AyahCard 
                                key={ayah.number} 
                                ayah={ayah} 
                                surahName={surahData.englishName}
                                language={language} 
                                showTafsir={showTafsir} 
                                onExplain={handleExplainAyah}
                                isExplaining={explainingAyah === ayah.number}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuranReader;
   