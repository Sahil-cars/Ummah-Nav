
import React, { useState, useCallback } from 'react';
import { getFactCheckResponse } from '../services/geminiService';

const UserIcon: React.FC = () => (
    <svg className="h-8 w-8 text-white bg-teal-600 rounded-full p-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const AIIcon: React.FC = () => (
    <svg className="h-8 w-8 text-teal-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
    </svg>
);


const FactChecker: React.FC = () => {
    const [query, setQuery] = useState<string>('');
    const [response, setResponse] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [lastQuery, setLastQuery] = useState<string>('');

    const handleSubmit = useCallback(async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!query.trim() || loading) return;

        setLoading(true);
        setError(null);
        setResponse('');
        setLastQuery(query);

        try {
            const result = await getFactCheckResponse(query);
            setResponse(result);
        } catch (err) {
            setError('An error occurred. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
            setQuery('');
        }
    }, [query, loading]);

    return (
        <div className="flex flex-col h-full max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-6 flex-shrink-0">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">AI Islamic Fact Checker</h1>
                <p className="text-gray-600 dark:text-gray-400">Ask a question or present an idea to check its validity against Islamic sources.</p>
            </div>
            
            <div className="flex-grow bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg overflow-y-auto mb-6">
                {!lastQuery && !loading && (
                    <div className="text-center text-gray-500 dark:text-gray-400 h-full flex flex-col justify-center">
                        <p className="text-lg">Your AI Scholar, Nur, is ready to assist.</p>
                        <p className="text-sm mt-2">Enter a topic below to begin.</p>
                    </div>
                )}
                
                {lastQuery && (
                    <div className="flex items-start gap-4 mb-6">
                        <UserIcon />
                        <div className="bg-teal-50 dark:bg-teal-900/50 p-4 rounded-lg rounded-tl-none flex-1">
                            <p className="font-semibold text-teal-800 dark:text-teal-200">You Asked:</p>
                            <p className="text-gray-800 dark:text-gray-200 mt-1">{lastQuery}</p>
                        </div>
                    </div>
                )}
                
                {loading && (
                    <div className="flex items-start gap-4">
                        <AIIcon />
                         <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg rounded-bl-none flex-1">
                            <p className="font-semibold text-gray-800 dark:text-gray-200">Nur is thinking...</p>
                             <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded-full w-full mt-3 overflow-hidden">
                                <div className="bg-teal-500 h-2 rounded-full animate-pulse w-full"></div>
                             </div>
                        </div>
                    </div>
                )}

                {response && !loading && (
                    <div className="flex items-start gap-4">
                        <AIIcon />
                        <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg rounded-bl-none flex-1">
                             <p className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Nur Responds:</p>
                            <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: response.replace(/\n/g, '<br />') }} />
                        </div>
                    </div>
                )}

                {error && <p className="text-center text-red-500">{error}</p>}
            </div>

            <div className="mt-auto flex-shrink-0">
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="e.g., Is music haram? What does the Quran say about..."
                        className="flex-grow bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        disabled={loading}
                    />
                    <button
                        type="submit"
                        disabled={loading || !query.trim()}
                        className="bg-teal-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-teal-700 disabled:bg-teal-400 transition-colors flex justify-center items-center"
                    >
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                           <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FactChecker;

   