import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Surah, Ayah, LanguageOption, Bookmark } from '../types';
import { SURAHS } from '../constants';
import { QURAN_DATA } from '../constants/quranWithTafsir';
import { getSurahFromGemini } from '../services/geminiService';


const BOOKMARKS_KEY = 'ummah_navigator_bookmarks';

const RECITERS = [
    { id: 'Alafasy_128kbps', name: 'Mishary Rashid Alafasy' },
    { id: 'Abdul_Basit_Murattal_192kbps', name: 'Abdul Basit (Murattal)' },
    { id: 'Maher_AlMuaiqly_128kbps', name: 'Maher Al Muaiqly' },
    { id: 'Ghamadi_40kbps', name: 'Saad Al Ghamdi' },
];

const getBookmarks = (): Bookmark[] => {
    try {
        const item = window.localStorage.getItem(BOOKMARKS_KEY);
        return item ? JSON.parse(item) : [];
    } catch (error) {
        console.warn('Error reading bookmarks from localStorage', error);
        return [];
    }
};

const saveBookmarks = (bookmarks: Bookmark[]) => {
    try {
        window.localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
    } catch (error) {
        console.warn('Error saving bookmarks to localStorage', error);
    }
};

const Spinner: React.FC = () => (
    <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
    </div>
);

const BookmarkIcon: React.FC<{ isBookmarked: boolean, className?: string }> = ({ isBookmarked, className = "h-5 w-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill={isBookmarked ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
    </svg>
);

const CopyIcon: React.FC<{ className?: string }> = ({ className = "h-5 w-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

const CheckIcon: React.FC<{ className?: string }> = ({ className = "h-5 w-5" }) => (
     <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg> 
);

const PlayIcon: React.FC<{ className?: string }> = ({ className = "h-5 w-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
    </svg>
);

const PauseIcon: React.FC<{ className?: string }> = ({ className = "h-5 w-5" }) => (
     <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h1a1 1 0 001-1V8a1 1 0 00-1-1H8zm4 0a1 1 0 00-1 1v4a1 1 0 001 1h1a1 1 0 001-1V8a1 1 0 00-1-1h-1z" clipRule="evenodd" />
    </svg>
);

interface AyahCardProps {
    ayah: Ayah;
    surahName: string;
    language: LanguageOption;
    showTafsir: boolean;
    isBookmarked: boolean;
    onToggleBookmark: () => void;
    onPlayPause: () => void;
    isPlaying: boolean;
}

const AyahCard: React.FC<AyahCardProps> = ({ ayah, surahName, language, showTafsir, isBookmarked, onToggleBookmark, onPlayPause, isPlaying }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = useCallback(() => {
        let textToCopy = `${ayah.arabic}\n${ayah.transliteration}\n${ayah.english}`;
        navigator.clipboard.writeText(`${textToCopy}\n\n- Surah ${surahName}, Ayah ${ayah.number}`).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        });
    }, [language, ayah, surahName]);

    const cardClasses = isPlaying
        ? 'bg-teal-100 dark:bg-teal-900/50 ring-2 ring-teal-500 shadow-xl transform scale-[1.02]'
        : 'bg-white dark:bg-gray-800';

    return (
        <div className={`p-4 rounded-lg shadow-md border-l-4 border-teal-500 transition-all duration-300 ${cardClasses}`}>
            <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-teal-600 dark:text-teal-400">{surahName}:{ayah.number}</span>
                 <div className="flex items-center gap-2">
                    <button
                        onClick={onPlayPause}
                        title={isPlaying ? 'Pause' : 'Play Ayah'}
                        className="p-1.5 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                        aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
                    >
                        {isPlaying ? <PauseIcon className="h-5 w-5 text-teal-500" /> : <PlayIcon />}
                    </button>
                    <button
                        onClick={onToggleBookmark}
                        title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Ayah'}
                        className={`p-1.5 rounded-full transition ${isBookmarked ? 'text-purple-500 bg-purple-100 dark:bg-purple-800/50' : 'text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                        aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
                    >
                        <BookmarkIcon isBookmarked={isBookmarked} />
                    </button>
                    <button
                        onClick={handleCopy}
                        title="Copy Ayah"
                        className="p-1.5 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                        aria-label="Copy verse"
                    >
                        {isCopied ? <CheckIcon className="h-5 w-5 text-green-500" /> : <CopyIcon />}
                    </button>
                </div>
            </div>

            {language === 'arabic' && <p className="text-2xl font-arabic text-right leading-loose mb-2">{ayah.arabic}</p>}
            {language === 'transliteration' && <p className="italic text-gray-700 dark:text-gray-300 mb-2">{ayah.transliteration}</p>}
            {language === 'english' && <p className="text-gray-800 dark:text-gray-200">{ayah.english}</p>}
            {language === 'combined' && (
                <div className="space-y-3">
                    <p className="text-2xl font-arabic text-right leading-loose">{ayah.arabic}</p>
                    <p className="italic text-gray-700 dark:text-gray-300">{ayah.transliteration}</p>
                    <p className="text-gray-800 dark:text-gray-200">{ayah.english}</p>
                </div>
            )}

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
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
    
    const [selectedReciter, setSelectedReciter] = useState(RECITERS[0].id);
    const [currentlyPlaying, setCurrentlyPlaying] = useState<{ surah: number; ayah: number } | null>(null);
    const [isSurahPlaying, setIsSurahPlaying] = useState(false);
    
    const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
    const currentAyahIndexRef = useRef<number>(0);
    const isSurahPlayingRef = useRef(isSurahPlaying);
    const ayahRefs = useRef<Record<number, HTMLDivElement | null>>({});

    useEffect(() => {
        isSurahPlayingRef.current = isSurahPlaying;
    }, [isSurahPlaying]);
    
    useEffect(() => {
        if (currentlyPlaying) {
            const element = ayahRefs.current[currentlyPlaying.ayah];
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                });
            }
        }
    }, [currentlyPlaying]);

    useEffect(() => {
        setBookmarks(getBookmarks());
        // Load the first surah by default
        loadSurah(selectedSurah);
    }, []);

    const stopAudio = useCallback(() => {
        if (audioPlayerRef.current) {
            audioPlayerRef.current.pause();
            audioPlayerRef.current.src = '';
            audioPlayerRef.current = null;
        }
        setCurrentlyPlaying(null);
        setIsSurahPlaying(false);
    }, []);

    useEffect(() => {
        return () => {
            stopAudio();
        };
    }, [stopAudio]);
    
    useEffect(() => {
        stopAudio();
    }, [selectedReciter, selectedSurah]);


    const playAudioForAyah = useCallback((surahNumber: number, ayahNumber: number, onEnded: () => void) => {
        if (audioPlayerRef.current) {
            audioPlayerRef.current.pause();
        }

        const pad = (num: number) => num.toString().padStart(3, '0');
        const surahPadded = pad(surahNumber);
        const ayahPadded = pad(ayahNumber);
        const audioUrl = `https://everyayah.com/data/${selectedReciter}/${surahPadded}${ayahPadded}.mp3`;
        
        const newAudioPlayer = new Audio(audioUrl);
        audioPlayerRef.current = newAudioPlayer;
        
        newAudioPlayer.play().catch(e => {
            console.error("Audio playback failed:", e);
            setError(`Could not play audio for Ayah ${ayahNumber}. Please check your connection or try a different reciter.`);
            stopAudio();
        });

        newAudioPlayer.addEventListener('ended', onEnded);
        
        setCurrentlyPlaying({ surah: surahNumber, ayah: ayahNumber });

    }, [selectedReciter, stopAudio]);

    const playNextAyahInSurah = useCallback(() => {
        if (!isSurahPlayingRef.current || !surahData) {
            stopAudio();
            return;
        }
        
        currentAyahIndexRef.current += 1;
        const nextAyah = surahData.verses[currentAyahIndexRef.current];

        if (nextAyah) {
            playAudioForAyah(surahData.number, nextAyah.number, playNextAyahInSurah);
        } else {
            stopAudio();
        }
    }, [surahData, playAudioForAyah, stopAudio]);

    const handleSingleAyahPlay = useCallback((surahNumber: number, ayahNumber: number) => {
        if (currentlyPlaying?.surah === surahNumber && currentlyPlaying?.ayah === ayahNumber) {
            stopAudio();
        } else {
            setIsSurahPlaying(false);
            playAudioForAyah(surahNumber, ayahNumber, () => {
                setCurrentlyPlaying(null);
            });
        }
    }, [currentlyPlaying, playAudioForAyah, stopAudio]);

    const handleFullSurahPlay = useCallback(() => {
        if (isSurahPlaying) {
            stopAudio();
        } else {
            if (!surahData || surahData.verses.length === 0) return;
            setIsSurahPlaying(true);
            currentAyahIndexRef.current = 0;
            const firstAyah = surahData.verses[0];
            playAudioForAyah(surahData.number, firstAyah.number, playNextAyahInSurah);
        }
    }, [isSurahPlaying, surahData, playAudioForAyah, playNextAyahInSurah, stopAudio]);


    const isBookmarked = useCallback((surahNumber: number, ayahNumber: number) => {
        return bookmarks.some(b => b.surahNumber === surahNumber && b.ayah.number === ayahNumber);
    }, [bookmarks]);

    const toggleBookmark = useCallback((surahNumber: number, surahName: string, ayah: Ayah) => {
        const currentlyBookmarked = isBookmarked(surahNumber, ayah.number);
        let newBookmarks;
        if (currentlyBookmarked) {
            newBookmarks = bookmarks.filter(b => !(b.surahNumber === surahNumber && b.ayah.number === ayah.number));
        } else {
            const newBookmark: Bookmark = { surahNumber, surahName, ayah };
            newBookmarks = [...bookmarks, newBookmark];
        }
        saveBookmarks(newBookmarks);
        setBookmarks(newBookmarks);
    }, [bookmarks, isBookmarked]);

    const loadSurah = useCallback(async (surahNum: string) => {
        stopAudio();
        setLoading(true);
        setError(null);
        setSurahData(null);
        ayahRefs.current = {}; // Clear refs for new surah
        
        const surahNumInt = parseInt(surahNum, 10);
        const localData = QURAN_DATA.find(s => s.number === surahNumInt);

        if (localData) {
            // Data found in the static file, load it quickly.
            setTimeout(() => {
                setSurahData(localData);
                setLoading(false);
            }, 50);
        } else {
            // Data not found locally, fetch from Gemini as a fallback.
            try {
                const geminiData = await getSurahFromGemini(surahNumInt);
                if (geminiData) {
                    setSurahData(geminiData);
                } else {
                    setError(`Failed to load Surah ${surahNum}. The data was not found locally and could not be fetched from the AI.`);
                }
            } catch (e) {
                console.error(e);
                setError(`An error occurred while fetching Surah ${surahNum}. Please try again.`);
            } finally {
                setLoading(false);
            }
        }
    }, [stopAudio]);

    const handleReadSurah = () => {
        loadSurah(selectedSurah);
    }

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
                            onClick={handleReadSurah}
                            disabled={loading}
                            className="w-full bg-teal-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-teal-700 disabled:bg-teal-400 transition-colors flex justify-center items-center"
                        >
                             {loading ? 'Loading...' : 'Read Surah'}
                        </button>
                    </div>
                </div>
            </div>

            {loading && <Spinner />}
            {error && <p className="text-center text-red-500 bg-red-100 dark:bg-red-900/50 p-3 rounded-lg">{error}</p>}
            
            {surahData && (
                 <div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg mb-6 sticky top-4 z-10">
                        <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
                             <div className="text-center lg:text-left flex-shrink-0">
                                <h2 className="text-2xl font-bold text-teal-700 dark:text-teal-300">{surahData.number}. {surahData.englishName}</h2>
                                <p className="text-gray-500 dark:text-gray-400">{surahData.revelationType} - {surahData.numberOfAyahs} Ayahs</p>
                            </div>
                            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                                 <button
                                    onClick={handleFullSurahPlay}
                                    title={isSurahPlaying ? 'Pause Surah' : 'Play Full Surah'}
                                    className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors bg-teal-100 dark:bg-teal-800 text-teal-700 dark:text-teal-200 hover:bg-teal-200 dark:hover:bg-teal-700"
                                >
                                    {isSurahPlaying ? <PauseIcon className="h-5 w-5" /> : <PlayIcon className="h-5 w-5" />}
                                    <span>{isSurahPlaying ? 'Pause' : 'Play'}</span>
                                </button>
                                <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
                                    {(['english', 'arabic', 'transliteration', 'combined'] as LanguageOption[]).map(lang => (
                                        <button key={lang} onClick={() => setLanguage(lang)} className={`px-3 py-1 text-sm font-medium rounded-md capitalize transition ${language === lang ? 'bg-white dark:bg-gray-900 text-teal-600 shadow' : 'text-gray-600 dark:text-gray-300'}`}>
                                            {lang}
                                        </button>
                                    ))}
                                </div>
                                <div>
                                    <select
                                        id="reciter-select"
                                        title="Select Reciter"
                                        value={selectedReciter}
                                        onChange={(e) => setSelectedReciter(e.target.value)}
                                        className="w-full sm:w-auto bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-1.5 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    >
                                        {RECITERS.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                                    </select>
                                </div>
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input type="checkbox" checked={showTafsir} onChange={() => setShowTafsir(!showTafsir)} className="form-checkbox h-5 w-5 text-teal-600 rounded focus:ring-teal-500 dark:bg-gray-700" />
                                    <span className="text-sm text-gray-700 dark:text-gray-300">Show Tafsir</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        {surahData.verses.map(ayah => (
                            <div key={ayah.number} ref={el => { ayahRefs.current[ayah.number] = el; }}>
                                <AyahCard 
                                    ayah={ayah} 
                                    surahName={surahData.englishName}
                                    language={language} 
                                    showTafsir={showTafsir} 
                                    isBookmarked={isBookmarked(surahData.number, ayah.number)}
                                    onToggleBookmark={() => toggleBookmark(surahData.number, surahData.englishName, ayah)}
                                    onPlayPause={() => handleSingleAyahPlay(surahData.number, ayah.number)}
                                    isPlaying={currentlyPlaying?.surah === surahData.number && currentlyPlaying?.ayah === ayah.number}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuranReader;