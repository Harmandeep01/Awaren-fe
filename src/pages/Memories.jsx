import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../config/api';

export default function Memories() {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') === 'dark');
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const abortControllerRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    fetchMemories();
    return () => abortControllerRef.current?.abort();
  }, []);

  const fetchMemories = async () => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();
    setLoading(true);
    try {
      const { data } = await api.get(`/memory/all`, {
        signal: abortControllerRef.current.signal
      });
      
      const validatedData = data.map(item => {
        const sa = item.structured_attributes || {};
        return {
          ...item,
          memory: item.memory || item.content,
          category: item.categories?.[0]?.split(':').pop().trim() || 'Insight',
          timeDisplay: sa.day_of_week 
            ? `${sa.day_of_week.charAt(0).toUpperCase() + sa.day_of_week.slice(1)}, ${new Date(item.created_at).toLocaleDateString([], { month: 'short', day: 'numeric' })}` 
            : "Recently Recorded",
          icon: getCategoryIcon(item.categories?.[0])
        };
      });

      setMemories(validatedData);
    } catch (err) {
      if (err.name !== 'CanceledError') console.error("Sync failed:", err);
    } finally {
      // Small delay to ensure the exit animation of skeleton is smooth
      setTimeout(() => setLoading(false), 600);
    }
  };

  const getCategoryIcon = (cat) => {
    const category = cat?.toLowerCase() || '';
    if (category.includes('preference')) return 'restaurant';
    if (category.includes('context')) return 'flight_takeoff';
    if (category.includes('insight')) return 'auto_graph';
    return 'psychology';
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-100 font-body transition-colors duration-500 overflow-x-hidden pb-32">
      <header className="max-w-4xl mx-auto bg-surface-light dark:bg-surface-dark px-6 pb-8 pt-10 rounded-b-[2.5rem] shadow-sm z-10 relative transition-colors duration-500">
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-xs font-bold text-primary tracking-widest uppercase mb-1">Cognitive Log</p>
            <h1 className="font-display text-4xl font-semibold text-slate-800 dark:text-white">Memories</h1>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setIsDark(!isDark)} className="w-10 h-10 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-primary bg-white/10 backdrop-blur-md transition-all duration-500">
              <span className="material-icons-round text-xl">{isDark ? 'light_mode' : 'dark_mode'}</span>
            </button>
            <div className="w-12 h-12 rounded-full border-2 border-white/50 overflow-hidden bg-slate-200 shadow-md">
              <img alt="User" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuisiLe08YK_OQJV1Sxcb4_ZHnHSiB3AZKj20yV7PKtY-3cThRjuDYIpnPNrIJCf4mqhO_FrsPWvy2XdezwoPtbWWeOQPGk_zsiMkaR-ksWaODP9Ul8b2FPQPH20AVkK_w83bXtqEBSY5lqRkl0r1IbG0xUiyiXmCXJ2NGFxx3eRQ2QDSyy_Xy0_yTHjrIKBwFVFLKoZbJEDq_-PDGE1x00oNi7JbPS57gblpFiJN0CF_dgcrUBPo1azvwKIRe88pelLI0eMFbZA0"/>
            </div>
          </div>
        </div>

        <div className="relative mb-6 group max-w-2xl">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="material-icons-round text-slate-400 group-focus-within:text-primary transition-colors">search</span>
          </div>
          <input className="block w-full pl-12 pr-12 py-4 bg-slate-100 dark:bg-slate-800 border-none rounded-2xl text-sm placeholder-slate-400 outline-none transition-all text-slate-700 dark:text-slate-200" placeholder="Search memories..." type="text"/>
        </div>

        <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1">
          {['All', 'Preferences', 'Context', 'Learned Insights'].map(f => (
            <button key={f} onClick={() => setActiveFilter(f)} className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${activeFilter === f ? 'bg-slate-800 dark:bg-white text-white dark:text-slate-900 shadow-lg' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'}`}>
              {f}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10 space-y-6 relative">
        <div className="mb-4 flex items-center gap-4">
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">Neural Threads</h2>
          <div className="h-px bg-slate-200 dark:bg-slate-700 flex-1"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading 
            ? Array(4).fill(0).map((_, i) => <MemorySkeleton key={i} />) 
            : memories.map((m, idx) => (
              <div 
                key={m.id}
                onClick={() => navigate(`/memory/${m.id}`)}
                className="group bg-white dark:bg-slate-800 p-6 rounded-[2rem] shadow-soft border border-slate-100 dark:border-slate-800 relative overflow-hidden transition-all duration-500 hover:shadow-xl hover:scale-[1.01] cursor-pointer animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <div className={`absolute top-0 left-0 w-2 h-full ${m.category === 'Preference' ? 'bg-secondary' : m.category === 'Context' ? 'bg-primary' : 'bg-indigo-500'}`}></div>
                <div className="flex justify-between items-start mb-4">
                  <span className={`text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-widest ${m.category === 'Preference' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-secondary' : m.category === 'Context' ? 'bg-teal-100 dark:bg-teal-900/30 text-primary' : 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600'}`}>
                    {m.category}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{m.timeDisplay}</span>
                </div>
                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 bg-slate-100 dark:bg-slate-700/50">
                    <span className="material-icons-round text-2xl text-slate-400">{m.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-slate-800 dark:text-slate-100 text-xl leading-tight mb-2">{m.memory}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 italic opacity-80">Insights captured during session.</p>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </main>
    </div>
  );
}

const MemorySkeleton = () => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 animate-pulse">
    <div className="flex justify-between items-start mb-4">
      <div className="w-20 h-5 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
      <div className="w-16 h-3 bg-slate-100 dark:bg-slate-700 rounded-full"></div>
    </div>
    <div className="flex gap-5">
      <div className="w-12 h-12 rounded-2xl bg-slate-200 dark:bg-slate-700 shrink-0"></div>
      <div className="flex-1 space-y-3">
        <div className="w-3/4 h-5 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
        <div className="w-full h-3 bg-slate-100 dark:bg-slate-700 rounded-md"></div>
      </div>
    </div>
  </div>
);