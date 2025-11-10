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

const BookmarkIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
    </svg>
);

const DuaIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 11.5V14m0-2.5c0-1.38 1.12-2.5 2.5-2.5h5c1.38 0 2.5 1.12 2.5 2.5v.5c0 1.38-1.12 2.5-2.5 2.5h-5c-1.38 0-2.5-1.12-2.5-2.5v-.5zM7 11.5a2.5 2.5 0 00-5 0V14a2.5 2.5 0 005 0V11.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 11.5a2.5 2.5 0 015 0V14a2.5 2.5 0 01-5 0V11.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 14v4.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 14v4.5" />
    </svg>
);

const MosqueIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const ChatIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
);

const LightbulbIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
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
          view="duas"
          label="Duas"
          icon={<DuaIcon className="h-6 w-6" />}
          activeView={activeView}
          onClick={() => setActiveView('duas')}
        />
        <NavItem
          view="mosque-finder"
          label="Mosque Finder"
          icon={<MosqueIcon className="h-6 w-6" />}
          activeView={activeView}
          onClick={() => setActiveView('mosque-finder')}
        />
        <hr className="my-2 border-gray-200 dark:border-gray-700" />
        <NavItem
          view="chatbot"
          label="AI Scholar"
          icon={<ChatIcon className="h-6 w-6" />}
          activeView={activeView}
          onClick={() => setActiveView('chatbot')}
        />
        <NavItem
          view="fact-check"
          label="AI Fact Checker"
          icon={<FactCheckIcon className="h-6 w-6" />}
          activeView={activeView}
          onClick={() => setActiveView('fact-check')}
        />
        <NavItem
          view="islamic-facts"
          label="Did You Know?"
          icon={<LightbulbIcon className="h-6 w-6" />}
          activeView={activeView}
          onClick={() => setActiveView('islamic-facts')}
        />
        <hr className="my-2 border-gray-200 dark:border-gray-700" />
        <NavItem
          view="bookmarks"
          label="Bookmarks"
          icon={<BookmarkIcon className="h-6 w-6" />}
          activeView={activeView}
          onClick={() => setActiveView('bookmarks')}
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