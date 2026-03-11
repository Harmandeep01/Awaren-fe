import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PullToRefresh from 'react-simple-pull-to-refresh';
import api from '../config/api';

export default function Memories() {
  const navigate = useNavigate();
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

const loadMemories = async (isRefresh = false) => {
  if (isRefresh) {
    setIsRefreshing(true);
    setMemories([]); // ✅ Wipes local UI state to match the backend cache deletion
  } else {
    setLoading(true);
  }

  try {
    const response = await api.get('/memory/all', {
      params: { refresh: isRefresh, limit: 20 }
    });
    setMemories(response.data);
  } catch (err) {
    console.error("Refresh failed:", err.response?.data?.detail || err.message);
  } finally {
    setLoading(false);
    setIsRefreshing(false);
  }
};

  useEffect(() => {
    loadMemories();
  }, []);

  // Handler for Pull-Down gesture
  const handlePullDown = async () => {
    await loadMemories(true);
  };

  return (
    <div className="flex flex-col h-screen bg-background-light dark:bg-background-dark font-display transition-colors duration-500 overflow-hidden">
      
      {/* Header with Manual Sync Option */}
      <header className="flex items-center justify-between p-6 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined filled">database</span>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight dark:text-white">Memories</h1>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              Personal Archive
            </p>
          </div>
        </div>
        
        <button 
          onClick={() => loadMemories(true)}
          disabled={isRefreshing || loading}
          className="w-10 h-10 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-primary hover:bg-primary/5 transition-all active:scale-90"
        >
          <span className={`material-symbols-outlined text-2xl ${isRefreshing ? 'animate-spin' : ''}`}>
            sync
          </span>
        </button>
      </header>

      {/* Main Content with Pull-To-Refresh */}
      <main className="flex-1 overflow-hidden">
        <PullToRefresh 
          onRefresh={handlePullDown}
          pullingContent={
            <div className="text-center py-4 text-slate-400 text-xs font-bold uppercase tracking-widest">
              Pull to re-sync consciousness
            </div>
          }
          refreshingContent={
            <div className="text-center py-4 text-primary text-xs font-bold uppercase tracking-widest animate-pulse">
              Bypassing Cache...
            </div>
          }
        >
          <div className="px-6 py-4 pb-32 h-full overflow-y-auto no-scrollbar">
            {loading && !isRefreshing ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4 opacity-50">
                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                <p className="text-sm font-medium dark:text-slate-400">Loading fragments...</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {memories.length === 0 ? (
                  <div className="text-center py-20">
                    <p className="text-slate-400 dark:text-slate-500 font-medium">
                      No memories recorded yet.
                    </p>
                  </div>
                ) : (
                  memories.map((m) => (
                    <div 
                      key={m.id}
                      onClick={() => navigate(`/memory/${m.id}`)}
                      className="group p-5 bg-white dark:bg-surface-dark rounded-[2rem] border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-md hover:border-primary/20 transition-all active:scale-[0.98]"
                    >
                      <div className="flex flex-wrap gap-2 mb-3">
                        {m.categories.map((cat, idx) => (
                          <span 
                            key={idx} 
                            className="px-2 py-0.5 bg-primary/10 text-primary text-[9px] font-black uppercase tracking-widest rounded-full"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                      <p className="text-slate-700 dark:text-slate-200 font-medium leading-relaxed">
                        {m.memory}
                      </p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </PullToRefresh>
      </main>

      {/* Footer Gradient Over Nav */}
      <div className="absolute bottom-[4.5rem] left-0 w-full h-12 bg-gradient-to-t from-background-light dark:from-background-dark to-transparent pointer-events-none z-20"></div>
    </div>
  );
}