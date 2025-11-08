
import React, { useState, useCallback } from 'react';
import { searchHadithFromGemini } from '../services/geminiService';
import { Hadith } from '../types';

const Spinner: React.FC = () => (
    <div className="flex justify-center items-center py-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
    </div>
);

const HadithCard: React.FC<{ hadith: Hadith }> = ({ hadith }) => (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md border-l-4 border-amber-500">
        <p className="text-right font-arabic text-xl leading-relaxed text-gray-800 dark:text-gray-200 mb-4">{hadith.arabic}</p>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{hadith.english}</p>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
            <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">{hadith.reference}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{hadith.collection} - {hadith.book}</p>
        </div>
    </div>
);


const HadithExplorer: React.FC = () => {
    const [query, setQuery] = useState<string>('');
    const [results, setResults] = useState<Hadith[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [searched, setSearched] = useState<boolean>(false);

    const handleSearch = useCallback(async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        setError(null);
        setResults([]);
        setSearched(true);
        const data = await searchHadithFromGemini(query);
        if (data) {
            setResults(data);
        } else {
            setError('Failed to fetch Hadith. The API might be busy, please try again.');
        }
        setLoading(false);
    }, [query]);

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-6">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Hadith Explorer</h1>
                <p className="text-gray-600 dark:text-gray-400">Search for authentic Hadith from major collections.</p>
                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 mt-6">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="e.g., charity, prayer, fasting..."
                        className="flex-grow bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <button
                        type="submit"
                        disabled={loading || !query.trim()}
                        className="bg-amber-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-amber-700 disabled:bg-amber-400 transition-colors flex justify-center items-center"
                    >
                        {loading ? 'Searching...' : 'Search'}
                    </button>
                </form>
            </div>

            {loading && <Spinner />}
            {error && <p className="text-center text-red-500">{error}</p>}

            <div className="space-y-4">
                {results.length > 0 && results.map((hadith, index) => (
                    <HadithCard key={index} hadith={hadith} />
                ))}
                {searched && !loading && results.length === 0 && (
                    <div className="text-center py-10">
                        <p className="text-gray-500 dark:text-gray-400">No results found for "{query}". Try a different search term.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HadithExplorer;
   