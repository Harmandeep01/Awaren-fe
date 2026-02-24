import React, { useState, useEffect, useRef } from "react";
import api from "../config/api"; // Ensure you've run: npm install jwt-decode

export default function Insights() {
  const [hero, setHero] = useState(null);
  const [data, setData] = useState({ preferences: [], rhythm: [] });
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state added
  const [loading, setLoading] = useState({ hero: true, data: true });
  const [exploreData, setExploreData] = useState(null);
  const [loadingExplore, setLoadingExplore] = useState(false);

  const handleExploreClick = async () => {
    // 1. Open modal and show skeleton/loading state immediately
    setIsModalOpen(true);
    setLoadingExplore(true);
    
    try {
        // 2. Hit the new Deep Dive route
        // The user_id is handled by the backend auth dependency
        const res = await api.get('/insights/explore');
        
        // 3. Set the Nova-generated structured data
        setExploreData(res.data);
    } catch (err) {
        console.error("Neural Deep Dive failed:", err);
    } finally {
        setLoadingExplore(false);
    }
};

  /* src/pages/Insights.jsx */
  const hasFetched = useRef(false);
  useEffect(() => {
    // 1. Setup AbortController for clean unmounting
    const controller = new AbortController();

    const fetchAllInsights = async () => {
      // Check the guard inside the async function to prevent race conditions
      if (hasFetched.current) return;
      hasFetched.current = true;

      try {
        setLoading({ hero: true, data: true }); // Ensure loading state is reset

        // Fast Fetch: Deterministic Mem0 data
        const dataRes = await api.get("/insights/data", {
          signal: controller.signal,
        });
        setData(dataRes.data);
        setLoading((l) => ({ ...l, data: false }));

        // Slow Fetch: Amazon Nova Deep Pattern
        const heroRes = await api.get("/insights/hero", {
          signal: controller.signal,
        });
        setHero(heroRes.data);
        setLoading((l) => ({ ...l, hero: false }));
      } catch (err) {
        if (err.name !== "CanceledError") {
          console.error("Neural fetch interrupted:", err);
          // Reset guard on actual failure so user can retry/reload
          hasFetched.current = false;
        }
      }
    };

    fetchAllInsights();

    // 3. Cleanup: Reset guard and abort on unmount
    return () => {
      controller.abort();
      // This allows the component to fetch again if it remounts (e.g. navigation)
      hasFetched.current = false;
    };
  }, []);

  // Helper to get specific icons for preferences
  const getPrefIcon = (memory) => {
    const text = memory.toLowerCase();
    if (text.includes("sugar") || text.includes("diet")) return "restaurant";
    if (text.includes("decor") || text.includes("minimal")) return "chair";
    if (text.includes("mindful") || text.includes("meditation"))
      return "self_improvement";
    return "settings_heart"; // Default iconic choice
  };

  const ModalSkeleton = () => (
  <div className="animate-pulse space-y-8">
    {/* Icon and Title Skeleton */}
    <div className="mt-4 mb-8">
      <div className="w-16 h-16 mb-6 rounded-2xl bg-slate-200 dark:bg-white/5 shadow-lg" />
      <div className="h-10 w-3/4 bg-slate-200 dark:bg-white/5 rounded-lg mb-3" />
      <div className="h-10 w-1/2 bg-slate-200 dark:bg-white/5 rounded-lg" />
      <div className="h-0.5 w-12 bg-gold-accent/20 rounded-full mt-6" />
    </div>

    {/* Evolution Summary Skeleton */}
    <div className="space-y-3">
      <div className="h-4 bg-slate-200 dark:bg-white/5 rounded w-full" />
      <div className="h-4 bg-slate-200 dark:bg-white/5 rounded w-5/6" />
    </div>

    {/* Pattern Recognition Box Skeleton */}
    <div className="bg-slate-50 dark:bg-surface-dark/50 p-5 rounded-xl border border-slate-200 dark:border-white/5">
      <div className="h-3 w-32 bg-slate-200 dark:bg-white/5 rounded mb-4" />
      <div className="space-y-2">
        <div className="h-3 bg-slate-200 dark:bg-white/5 rounded w-full" />
        <div className="h-3 bg-slate-200 dark:bg-white/5 rounded w-full" />
        <div className="h-3 bg-slate-200 dark:bg-white/5 rounded w-4/5" />
      </div>
    </div>

    {/* Reflection Question Skeleton */}
    <div className="pt-4">
      <div className="h-3 w-24 bg-slate-200 dark:bg-white/5 rounded mb-3" />
      <div className="h-6 italic bg-slate-200 dark:bg-white/5 rounded w-full" />
    </div>
  </div>
);
// Sync theme with Home.jsx logic
  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);
  return (
    <div className="min-h-screen bg-background-light dark:bg-[#0e1a1f] font-body transition-colors duration-500 pb-40 selection:bg-primary/30">
      <div className="max-w-4xl mx-auto px-6 pt-12">
        {/* Header: Toggle positioned same as Home.jsx */}
        <header className="mb-10 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-light tracking-tight text-slate-800 dark:text-white/90 leading-tight">
              AWAREN has noticed <br/>
              <span className="text-primary font-bold">a distinct pattern...</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-4 text-sm font-medium">Synthesized from your neural archive.</p>
          </div>

          {/* <button 
            onClick={() => setIsDark(!isDark)}
            className="p-3 rounded-full bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/10 transition-all shadow-lg active:scale-90"
          >
            <span className="material-icons-round text-slate-600 dark:hidden">dark_mode</span>
            <span className="material-icons-round hidden dark:block text-gold-accent">light_mode</span>
          </button> */}
        </header>

        {/* Hero Section: Vertex AI Analysis */}
        <section className="mb-12">
          {loading.hero ? (
            <div className="h-64 rounded-[2.5rem] bg-slate-200 dark:bg-white/5 animate-pulse" />
          ) : (
            <div className="relative overflow-hidden rounded-[2.5rem] bg-[#16262c] p-8 shadow-2xl border border-white/5 group">
              <div className="absolute inset-0 opacity-20 bg-gradient-to-tr from-primary to-secondary transition-opacity group-hover:opacity-30"></div>
              <div className="relative z-10">
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black tracking-widest text-primary uppercase">
                  {hero?.badge || "Evolving Focus"}
                </span>
                <h2 className="text-3xl font-bold text-white mt-6 mb-4">
                  {hero?.title}
                </h2>
                <p className="text-slate-300 leading-relaxed text-sm max-w-xl opacity-90">
                  {hero?.description}
                </p>
                <button 
  onClick={handleExploreClick}
  className="mt-8 flex items-center gap-2 text-gold-accent font-black text-xs uppercase tracking-widest hover:text-white transition-all active:scale-95 group/btn"
>
  Explore evolution <span className="material-symbols-outlined text-lg group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
</button>
              </div>
            </div>
          )}
        </section>

        {/* Preferences Section: Filtered Retrieval */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold dark:text-white">
              Recurring Preferences
            </h3>
            <span className="material-icons-round text-slate-500 cursor-pointer hover:text-primary transition-colors">
              more_horiz
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loading.data
              ? [1, 2].map((i) => (
                  <div
                    key={i}
                    className="h-32 rounded-2xl bg-slate-200 dark:bg-white/5 animate-pulse"
                  />
                ))
              : data.preferences.map((p) => (
                  <div
                    key={p.id}
                    className="bg-[#16262c] p-6 rounded-2xl border border-white/5 flex flex-col justify-between group"
                  >
                    <div className="h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary mb-4">
                      <span className="material-icons-round">
                        {getPrefIcon(p.memory)}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-white uppercase tracking-tight line-clamp-2">
                      {p.memory.replace("User ", "")}{" "}
                      {/* Clean 'User prefers' prefix */}
                    </p>
                  </div>
                ))}
          </div>
        </section>

        {/* Rhythm Section: Temporal Reranking */}
        <section className="mb-12">
          <h3 className="text-xl font-bold dark:text-white mb-6">
            Behavioral Rhythm
          </h3>
          <div className="bg-[#16262c] rounded-[2rem] p-8 border border-white/5 shadow-xl relative overflow-hidden">
            <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 -translate-y-1/2" />
            <div className="flex justify-between items-center relative z-10">
              {loading.data ? (
                <div className="w-full h-12 bg-white/5 animate-pulse rounded-full" />
              ) : (
                data.rhythm.map((r, i) => (
                  <div
                    key={i}
                    className={`flex flex-col items-center gap-4 ${
                      i !== 1 ? "opacity-30" : "opacity-100"
                    }`}
                  >
                    <span className="text-[10px] font-black uppercase text-slate-400">
                      {r.structured_attributes?.day_of_week?.slice(0, 3) ||
                        "SAT"}
                    </span>
                    <div
                      className={`rounded-full ${
                        i === 1
                          ? "w-5 h-5 bg-secondary ring-8 ring-secondary/10"
                          : "w-3 h-3 bg-slate-600"
                      }`}
                    />
                    {/* Display full meaningful text instead of one word */}
                    <span className="text-[10px] font-bold text-white text-center max-w-[70px] leading-tight">
                      {r.memory.includes("mindfulness")
                        ? "Mindfulness"
                        : r.memory.includes("emails")
                        ? "Check Emails"
                        : "Routine"}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
        {isModalOpen && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-4 bg-slate-900/40 dark:bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
    {/* FORCED THEME CONTRAST: Uses bg-white for light and bg-[#16262c] for dark */}
    <div className="relative h-full w-full max-w-md mx-auto bg-white dark:bg-[#16262c] shadow-2xl overflow-hidden flex flex-col border-x border-slate-200 dark:border-white/10 md:h-[90dvh] md:rounded-[2.5rem] md:border">
      
      {/* 1. CRAFTED STAR DESIGN: Diamond Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/20 dark:bg-primary/10 rounded-full blur-[80px] mix-blend-multiply dark:mix-blend-screen animate-pulse-slow"></div>
        <div className="absolute -bottom-32 -left-20 w-80 h-80 bg-gold-accent/20 dark:bg-gold-accent/10 rounded-full blur-[60px] mix-blend-multiply dark:mix-blend-screen animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        
        {/* Crafted Diamond Star Pattern: Swaps fill color based on mode */}
        <div className="absolute inset-0 opacity-[0.1] dark:opacity-[0.05]" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0L22 18L40 20L22 22L20 40L18 22L0 20L18 18L20 0Z' fill='%23888888'/%3E%3C/svg%3E")` }}>
        </div>
      </div>

      {/* 2. Header */}
      <div className="relative z-10 flex justify-between items-center p-6 pt-8">
        <button onClick={() => setIsModalOpen(false)} className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>
        <div className="text-[10px] font-bold tracking-widest uppercase text-gold-accent border border-gold-accent/30 px-3 py-1 rounded-full bg-slate-50 dark:bg-white/5 backdrop-blur-sm">
          Evolution Insight
        </div>
      </div>

      <main className="relative z-10 flex-1 flex flex-col px-8 overflow-y-auto no-scrollbar">
        {loadingExplore ? (
          <ModalSkeleton />
        ) : (
          <>
            <div className="mt-4 mb-8">
              <div className="w-16 h-16 mb-6 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 flex items-center justify-center shadow-lg animate-float">
                <span className="material-symbols-outlined text-3xl text-gold-accent">spa</span>
              </div>
              <h1 className="text-4xl font-light text-slate-800 dark:text-white leading-[1.15] mb-4">
                Deep Dive: <br/>
                <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">
                  {exploreData?.modal_title}
                </span>
              </h1>
              <div className="h-0.5 w-12 bg-gold-accent/50 rounded-full mb-6"></div>
            </div>

            <div className="space-y-8 pb-10">
              <div className="relative">
                <div className="absolute -left-4 top-1 bottom-1 w-0.5 bg-gradient-to-b from-primary/50 to-transparent"></div>
                <p className="text-lg text-slate-700 dark:text-slate-200 font-light leading-relaxed">
                  {exploreData?.evolution_summary}
                </p>
              </div>

              {/* Pattern Recognition Block */}
              <div className="bg-slate-50 dark:bg-slate-900/50 backdrop-blur-sm p-5 rounded-xl border border-slate-200 dark:border-white/5">
                <h3 className="text-sm font-semibold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-base text-slate-500 dark:text-slate-400">query_stats</span>
                  Pattern Recognition
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                  {exploreData?.pattern_recognition}
                </p>
              </div>

              {/* RESTORED REFLECTION QUESTION */}
              <div>
                <h3 className="text-xs uppercase tracking-widest text-slate-500 mb-3 font-medium">For Your Reflection</h3>
                <p className="text-xl text-slate-800 dark:text-white font-serif italic leading-relaxed opacity-90">
                  "{exploreData?.reflection_question}"
                </p>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <div className="relative z-10 p-6 bg-gradient-to-t from-white dark:from-[#16262c] via-transparent to-transparent pt-12">
        <button onClick={() => setIsModalOpen(false)} className="w-full py-4 rounded-xl bg-slate-900 dark:bg-slate-900 border border-white/10 text-white font-medium hover:border-gold-accent/50 transition-all">
          Got it
        </button>
      </div>
    </div>
  </div>
)}
      </div>
    </div>
  );
}
