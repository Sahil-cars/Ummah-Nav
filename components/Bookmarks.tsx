
import React, { useState, useEffect, useCallback } from 'react';
import { Bookmark } from '../types';

const BOOKMARKS_KEY = 'ummah_navigator_bookmarks';

const getBookmarks = (): Bookmark[] => {
    try {
        const stored = localStorage.getItem(BOOKMARKS_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error("Error reading bookmarks:", e);
        return [];
    }
};

const saveBookmarks = (bookmarks: Bookmark[]) => {
    try {
        localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
    } catch (e) {
        console.error("Error saving bookmarks:", e);
    }
};

const Bookmarks: React.FC = () => {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>(getBookmarks());

    const removeBookmark = useCallback((surahNumber: number, ayahNumber: number) => {
        const newBookmarks = bookmarks.filter(
            b => !(b.surahNumber === surahNumber && b.ayah.number === ayahNumber)
        );
        saveBookmarks(newBookmarks);
        setBookmarks(newBookmarks);
    }, [bookmarks]);

    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === BOOKMARKS_KEY) {
                setBookmarks(getBookmarks());
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    if (bookmarks.length === 0) {
        return (
             <div className="max-w-4xl mx-auto text-center py-20">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                <h2 className="mt-4 text-2xl font-bold text-gray-800 dark:text-white">No Bookmarks Yet</h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400">You can bookmark verses from the Quran Reader to see them here.</p>
            </div>
        );
    }

    return (
         <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-6">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Bookmarked Verses</h1>
                <p className="text-gray-600 dark:text-gray-400">Your saved verses for quick access and reflection.</p>
            </div>
            <div className="space-y-4">
                {bookmarks.sort((a, b) => a.surahNumber - b.surahNumber || a.ayah.number - b.ayah.number).map((bookmark) => (
                    <div key={`${bookmark.surahNumber}-${bookmark.ayah.number}`} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border-l-4 border-purple-500">
                         <div className="flex justify-between items-center mb-2">
                            <span className="font-bold text-purple-600 dark:text-purple-400">{bookmark.surahName} ({bookmark.surahNumber}:{bookmark.ayah.number})</span>
                            <button
                                onClick={() => removeBookmark(bookmark.surahNumber, bookmark.ayah.number)}
                                className="text-xs bg-red-100 dark:bg-red-800/50 text-red-700 dark:text-red-300 px-2 py-1 rounded-full hover:bg-red-200 dark:hover:bg-red-700 transition"
                            >
                                Remove
                            </button>
                        </div>
                        <p className="text-2xl font-arabic text-right leading-loose mb-2 text-gray-800 dark:text-gray-200">{bookmark.ayah.arabic}</p>
                        <p className="italic text-gray-600 dark:text-gray-400 mb-2">{bookmark.ayah.transliteration}</p>
                        <p className="text-gray-700 dark:text-gray-300">{bookmark.ayah.english}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Bookmarks;
