import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import QuranReader from './components/QuranReader';
import FactChecker from './components/FactChecker';
import HadithExplorer from './components/HadithExplorer';
import Bookmarks from './components/Bookmarks';
import Duas from './components/Duas';
import MosqueFinder from './components/MosqueFinder';
import Chatbot from './components/Chatbot';
import IslamicFacts from './components/IslamicFacts';
import { View } from './types';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('quran');

  const renderContent = () => {
    switch (activeView) {
      case 'quran':
        return <QuranReader />;
      case 'hadith':
        return <HadithExplorer />;
      case 'duas':
        return <Duas />;
      case 'mosque-finder':
        return <MosqueFinder />;
      case 'chatbot':
        return <Chatbot />;
      case 'fact-check':
        return <FactChecker />;
      case 'islamic-facts':
        return <IslamicFacts />;
      case 'bookmarks':
        return <Bookmarks />;
      default:
        return <QuranReader />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="flex-1 flex flex-col overflow-y-auto p-4 sm:p-6 md:p-8">
        <Header />
        <div className="flex-grow mt-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
