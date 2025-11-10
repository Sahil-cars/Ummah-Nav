import React, { useState } from 'react';
import { Dua } from '../types';
import { DUAS, DUA_CATEGORIES } from '../constants/duas';

const DuaCard: React.FC<{ dua: Dua }> = ({ dua }) => (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md border-l-4 border-blue-500">
        <h3 className="font-bold text-lg text-blue-800 dark:text-blue-300 mb-3">{dua.title}</h3>
        <div className="space-y-4">
            <p className="text-right font-arabic text-xl leading-relaxed text-gray-800 dark:text-gray-200">{dua.arabic}</p>
            <p className="italic text-gray-600 dark:text-gray-400">{dua.transliteration}</p>
            <p className="text-gray-700 dark:text-gray-300">"{dua.english}"</p>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-4">
            <p className="text-xs text-gray-500 dark:text-gray-400">Reference: {dua.reference}</p>
        </div>
    </div>
);

const Duas: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>(DUA_CATEGORIES[0]);

    const displayedDuas = DUAS[selectedCategory] || [];

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-6">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Duas</h1>
                <p className="text-gray-600 dark:text-gray-400">A collection of supplications for various occasions.</p>
                <div className="mt-4 flex flex-wrap gap-2">
                    {DUA_CATEGORIES.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${selectedCategory === category
                                    ? 'bg-blue-600 text-white shadow'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                {displayedDuas.length > 0 ? (
                    displayedDuas.map((dua, index) => <DuaCard key={index} dua={dua} />)
                ) : (
                    <p className="text-center text-gray-500">No duas available for this category.</p>
                )}
            </div>
        </div>
    );
};

export default Duas;