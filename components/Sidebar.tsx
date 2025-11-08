
import React from 'react';
import { View } from '../types';

interface SidebarProps {
  activeView: View;
  setActiveView: (view: View) => void;
}

const QuranIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v11.494m0 0a2.494 2.494 0 01-4.988 0M12 17.747a2.494 2.494 0 004.988 0M12 17.747v-1.494" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.75 3.75l7.5 3 7.5-3v13.5l-7.5 3-7.5-3V3.75z" />
    </svg>
);

const HadithIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v11.494m0 0a2.494 2.494 0 01-4.988 0M12 17.747a2.494 2.494 0 004.988 0M12 17.747v-1.494" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6.313a2.494 2.494 0 01-2.494 2.494H9.994A2.494 2.494 0 017.5 6.313M16.5 17.687a2.494 2.494 0 01-2.494-2.494H9.994a2.494 2.494 0 01-2.494 2.494" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 3.75v16.5" />
    </svg>
);


const FactCheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const NavItem: React.FC<{
  view: View;
  label: string;
  icon: React.ReactNode;
  activeView: View;
  onClick: () => void;
}> = ({ view, label, icon, activeView, onClick }) => {
  const isActive = activeView === view;
  return (
    <button
      onClick={onClick}
      className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
        isActive
          ? 'bg-teal-600 text-white shadow-lg'
          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
      }`}
    >
      {icon}
      <span className="ml-4 hidden md:inline">{label}</span>
    </button>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  return (
    <aside className="flex flex-col w-16 md:w-64 bg-white dark:bg-gray-800 shadow-xl transition-all duration-300 ease-in-out">
      <div className="flex items-center justify-center h-20 border-b dark:border-gray-700">
        <div className="flex items-center">
            <QuranIcon className="h-8 w-8 text-teal-600 dark:text-teal-400" />
            <h1 className="text-xl font-bold ml-2 text-gray-800 dark:text-white hidden md:block">Ummah Nav</h1>
        </div>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-2">
        <NavItem
          view="quran"
          label="Quran Reader"
          icon={<QuranIcon className="h-6 w-6" />}
          activeView={activeView}
          onClick={() => setActiveView('quran')}
        />
        <NavItem
          view="hadith"
          label="Hadith Explorer"
          icon={<HadithIcon className="h-6 w-6" />}
          activeView={activeView}
          onClick={() => setActiveView('hadith')}
        />
        <NavItem
          view="fact-check"
          label="AI Fact Checker"
          icon={<FactCheckIcon className="h-6 w-6" />}
          activeView={activeView}
          onClick={() => setActiveView('fact-check')}
        />
      </nav>
       <div className="px-4 py-4 border-t dark:border-gray-700 text-center text-xs text-gray-500 dark:text-gray-400 hidden md:block">
        <p>&copy; {new Date().getFullYear()} Ummah Navigator</p>
        <p>Your guide to Islamic knowledge.</p>
      </div>
    </aside>
  );
};

export default Sidebar;
   