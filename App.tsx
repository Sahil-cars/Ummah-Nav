
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import QuranReader from './components/QuranReader';
import FactChecker from './components/FactChecker';
import HadithExplorer from './components/HadithExplorer';
import { View } from './types';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('quran');

  const renderContent = () => {
    switch (activeView) {
      case 'quran':
        return <QuranReader />;
      case 'hadith':
        return <HadithExplorer />;
      case 'fact-check':
        return <FactChecker />;
      default:
        return <QuranReader />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
   