import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../config/api';

export default function MemoryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') === 'dark');
  const [memory, setMemory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/memory/${id}`);
        setMemory(data);
      } catch (err) {
        console.error("Retrieval failed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-white dark:bg-[#102222] flex items-center justify-center">
      <div className="animate-pulse text-[#11d4d4] font-bold text-xs tracking-widest uppercase">Deep Syncing...</div>
    </div>
  );

  if (!memory) return null;
  const sa = memory.structured_attributes || {};

  return (
    <div className="min-h-screen bg-white dark:bg-[#102222] font-display antialiased transition-colors duration-500">
      <div className="max-w-md mx-auto min-h-screen flex flex-col relative text-slate-800 dark:text-white shadow-2xl overflow-hidden">
        
        <header className="sticky top-0 z-20 flex items-center justify-between px-4 py-4 bg-white/80 dark:bg-[#102222]/80 backdrop-blur-md border-b border-slate-100 dark:border-white/5">
          <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 transition-all group">
            <span className="material-symbols-outlined group-hover:text-[#11d4d4]">arrow_back</span>
          </button>
          <p className="text-[10px] font-black tracking-widest text-[#e0c988] uppercase opacity-70">Memory Insight</p>
          <button onClick={() => setIsDark(!isDark)} className="p-2 rounded-full text-[#11d4d4]">
            <span className="material-symbols-outlined">{isDark ? 'light_mode' : 'dark_mode'}</span>
          </button>
        </header>

        <main className="relative z-10 flex-1 px-6 pb-40 overflow-y-auto no-scrollbar animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="mt-8 mb-8">
            <h1 className="text-3xl font-bold leading-tight">{memory.memory || memory.content}</h1>
            <div className="h-1.5 w-12 bg-[#11d4d4] mt-6 rounded-full shadow-[0_0_12px_rgba(17,212,212,0.4)]"></div>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-8 border-t border-slate-100 dark:border-white/5 py-8">
            <DetailMeta label="ID" value={memory.id.substring(0, 12)} mono />
            <DetailMeta label="SCORE" value={memory.score || '0.98'} hasDot />
            <DetailMeta label="CREATED" value={new Date(memory.created_at).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })} />
            <DetailMeta label="USER" value={memory.user_id.substring(0, 8)} mono />
          </div>

          <div className="py-8 border-t border-slate-100 dark:border-white/5">
            <p className="text-[#e0c988] text-[10px] font-black tracking-[0.2em] mb-5 opacity-90">CATEGORIES</p>
            <div className="flex flex-wrap gap-3">
              {(memory.categories || ['Fragment']).map((cat, i) => (
                <div key={i} className="rounded-xl border border-[#e0c988]/30 bg-[#e0c988]/5 px-4 py-2 text-[#e0c988] text-[11px] font-bold uppercase tracking-wide">
                  {cat}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t border-slate-100 dark:border-white/5">
            <p className="text-[#e0c988] text-[10px] font-black tracking-[0.2em] mb-5 opacity-90 uppercase">Structured Attributes</p>
            <div className="flex flex-col gap-4">
              {Object.entries(sa).map(([key, value], i) => (
                <div key={i} className="bg-slate-50 dark:bg-[#162e2e] border border-slate-100 dark:border-white/5 rounded-2xl p-5 relative overflow-hidden group">
                  <span className="text-slate-400 dark:text-white/40 text-[9px] font-black tracking-[0.2em] uppercase">{key.replace(/_/g, ' ')}</span>
                  <p className="text-sm font-bold mt-1">{String(value)}</p>
                  <span className="absolute right-4 top-4 material-symbols-outlined opacity-5 text-[#11d4d4]">database</span>
                </div>
              ))}
            </div>
          </div>
        </main>

        <div className="fixed bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-white dark:from-[#102222] via-white dark:via-[#102222] to-transparent z-30 max-w-md mx-auto">
          <button className="w-full h-14 bg-[#11d4d4] text-[#102222] text-base font-black rounded-2xl shadow-[0_12px_24px_rgba(17,212,212,0.2)] active:scale-95 transition-all uppercase tracking-widest">
            Edit Memory
          </button>
        </div>
      </div>
    </div>
  );
}

const DetailMeta = ({ label, value, mono, hasDot }) => (
  <div className="flex flex-col gap-2">
    <p className="text-[#e0c988] text-[9px] font-black tracking-[0.2em] opacity-80 uppercase">{label}</p>
    <div className="flex items-center gap-2">
      <p className={`text-sm font-bold ${mono ? 'font-mono opacity-70' : ''}`}>{value}</p>
      {hasDot && <div className="h-1.5 w-1.5 rounded-full bg-[#11d4d4] shadow-[0_0_8px_#11d4d4]"></div>}
    </div>
  </div>
);