import React, { useState, useEffect, useCallback } from 'react';
import { getIslamicFact } from '../services/geminiService';
import { marked } from 'marked';

const Spinner: React.FC = () => (
    <div className="flex justify-center items-center py-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
    </div>
);

const IslamicFacts: React.FC = () => {
    const [fact, setFact] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    const fetchFact = useCallback(async () => {
        setLoading(true);
        const newFact = await getIslamicFact();
        setFact(newFact);
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchFact();
    }, [fetchFact]);
    
    const renderMarkdown = (text: string) => ({ __html: marked(text) as string });

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-6">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Did You Know?</h1>
                <p className="text-gray-600 dark:text-gray-400">Discover interesting facts from the Islamic world.</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center min-h-[200px] flex flex-col justify-center items-center">
                {loading ? (
                    <Spinner />
                ) : (
                    <blockquote className="text-xl italic text-gray-700 dark:text-gray-300 border-l-4 border-teal-500 pl-6">
                         <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={renderMarkdown(fact)} />
                    </blockquote>
                )}
            </div>

            <div className="text-center mt-6">
                <button
                    onClick={fetchFact}
                    disabled={loading}
                    className="bg-teal-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-teal-700 disabled:bg-teal-400 transition-colors flex justify-center items-center gap-2 mx-auto"
                >
                    {loading ? 'Generating...' : 'Show Me Another Fact'}
                </button>
            </div>
        </div>
    );
};

export default IslamicFacts;
