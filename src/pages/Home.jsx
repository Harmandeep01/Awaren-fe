/* src/pages/Home.jsx */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import SuggestionCard from '../components/dashboard/SuggestionCard';
import Sidebar from '../components/Layout/Sidebar';
import { getRandomPrompts } from '../data/prompts';

export default function Home() {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') === 'dark');
  const [name, setName] = useState("Alexander");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [homeSuggestions, setHomeSuggestions] = useState(getRandomPrompts(3));
  const [isHomeShuffling, setIsHomeShuffling] = useState(false);

  const decodeJWT = (token) => {
  try {
    const payload = token.split('.')[1];
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decoded);
  } catch (e) {
    return null;
  }
};



  useEffect(() => {
  document.documentElement.setAttribute(
    'data-theme',
    isDark ? 'dark' : 'light'
  );
  localStorage.setItem('theme', isDark ? 'dark' : 'light');

  const token = localStorage.getItem('token');
  if (!token) return;

  const decoded = decodeJWT(token);
  if (decoded?.user_name) {
    setName(decoded.user_name);
    localStorage.setItem('user_name', decoded.user_name); // optional cache
  }
}, [isDark]);


  const handleHomeShuffle = () => {
    setIsHomeShuffling(true);
    setTimeout(() => {
      setHomeSuggestions(getRandomPrompts(3));
      setIsHomeShuffling(false);
    }, 250);
  };

  

  return (
    <div className="min-h-screen bg-white font-body  dark:bg-black pb-40 overflow-x-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} userName={name} />
     <DashboardHeader 
        userName={name} 
        isDark={isDark} // ✅ This line is required for the icon to toggle
        onToggleTheme={() => setIsDark(!isDark)} 
        onMenuClick={() => setIsSidebarOpen(true)} 
      />

      <main className="max-w-4xl mx-auto px-6 relative z-20">
        {/* Streak Card */}
        <div className="-translate-y-12 bg-white dark:bg-slate-900 p-5 rounded-[2rem] shadow-xl border border-slate-50 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-icons-round text-2xl">psychology</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-white leading-none mb-1">Daily Mindfulness</h3>
              <p className="text-[11px] text-slate-400">Keep your streak going!</p>
            </div>
          </div>
          <span className="text-2xl font-display font-bold text-secondary">Day 12</span>
        </div>

        {/* Suggestions Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-800 dark:text-white">Suggestions for you</h2>
            <button onClick={handleHomeShuffle} className="p-2.5 bg-primary/10 text-primary rounded-xl active:scale-90 border-none outline-none ring-0">
              <span className={`material-icons-round text-xl block ${isHomeShuffling ? 'animate-spin' : ''}`}>casino</span>
            </button>
          </div>
          <div className="space-y-4">
            {!isHomeShuffling && homeSuggestions.map((p, i) => (
              <SuggestionCard key={i} prompt={p} onClick={(text) => navigate('/chat', { state: { initialMessage: text } })} />
            ))}
          </div>
        </section>
      </main>

      {/* NEW CHAT FAB */}
      <div className="fixed bottom-28 right-6 z-50">
        <button onClick={() => navigate('/chat')} className="flex items-center gap-3 bg-primary text-white px-6 py-4 rounded-full shadow-2xl active:scale-90 border-none outline-none ring-0">
          <span className="font-black tracking-[0.2em] text-[10px]">NEW CHAT</span>
          <span className="material-icons-round">add</span>
        </button>
      </div>
    </div>
  );
}