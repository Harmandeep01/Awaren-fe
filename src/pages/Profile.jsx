import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen bg-[#f6f8f8] dark:bg-[#102022] font-['Space_Grotesk'] antialiased animate-in fade-in duration-500">
      
      {/* Header - Matching Chat.jsx height and padding */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-slate-200/60 dark:border-[#13daec1a] bg-white dark:bg-[#102022] z-20">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 text-slate-500 dark:text-slate-100 hover:text-[#13daec] transition-all"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>

        <div className="flex flex-col items-center">
          <h1 className="font-bold text-lg text-slate-800 dark:text-white uppercase tracking-[0.2em]">
            AWAREN
          </h1>
          <div className="flex items-center gap-1.5 mt-0.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#13daec] shadow-[0_0_8px_#13daec]" />
            <span className="text-[9px] uppercase tracking-widest font-black text-[#13daec]">
              Identity
            </span>
          </div>
        </div>

        <div className="w-10" /> {/* Spacer to center the title */}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto px-6 flex flex-col items-center justify-center no-scrollbar">
        
        <p className="text-[#13daecCC] text-sm font-medium tracking-[0.2em] uppercase mb-12 text-center animate-pulse">
          AWAREN is observing you...
        </p>

        {/* Central Orb Visual */}
        <div className="relative w-72 h-72 flex items-center justify-center mb-16">
          {/* Outer Blur Glow */}
          <div className="absolute inset-0 bg-[#13daec0d] rounded-full blur-3xl"></div>
          
          {/* Glass Orb */}
          <div className="relative w-64 h-64 rounded-full overflow-hidden border border-[#13daec1a] backdrop-blur-xl bg-[#13daec0d] flex items-center justify-center">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_#d4af37_0%,_transparent_70%)]"></div>
            
            {/* Inner Core */}
            <div className="w-32 h-32 rounded-full bg-[#d4af3766] shadow-[0_0_60px_10px_rgba(212,175,55,0.2)] flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-[#d4af3799] blur-md animate-pulse"></div>
            </div>
            
            {/* Identity Icon overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-40">
              <span className="material-symbols-outlined text-[120px] text-[#d4af37]" style={{ fontVariationSettings: "'FILL' 1" }}>
                person_search
              </span>
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="text-center space-y-4 max-w-sm">
          <h2 className="text-slate-900 dark:text-slate-100 text-2xl font-bold tracking-tight uppercase">
            Profile System Offline
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed font-light">
            The consciousness is still mapping your identity. Full access arriving in the next evolution.
          </p>
        </div>

        {/* Action Button */}
        <div className="mt-12 w-full max-w-xs">
          <button 
            onClick={() => navigate('/home')}
            className="flex items-center justify-center w-full py-4 px-6 bg-[#13daec] text-[#102022] font-bold rounded-xl transition-transform active:scale-95 shadow-lg shadow-[#13daec33]"
          >
            Return to Source
          </button>
        </div>
      </main>

      {/* Navigation - Matching Footer structure from Chat.jsx */}
      <nav className="sticky bottom-0 w-full border-t border-[#13daec1a] bg-[#f6f8f8] dark:bg-[#102022f2] backdrop-blur-md px-4 pb-8 pt-3 z-40">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <button onClick={() => navigate('/home')} className="flex flex-col items-center gap-1 group">
            <div className="text-slate-400 group-hover:text-[#13daec] transition-colors flex h-8 items-center justify-center">
              <span className="material-symbols-outlined">home</span>
            </div>
            <p className="text-slate-400 group-hover:text-[#13daec] text-[10px] font-medium tracking-wider uppercase">Home</p>
          </button>

          <button className="flex flex-col items-center gap-1 group">
            <div className="text-slate-400 group-hover:text-[#13daec] transition-colors flex h-8 items-center justify-center">
              <span className="material-symbols-outlined">psychology</span>
            </div>
            <p className="text-slate-400 group-hover:text-[#13daec] text-[10px] font-medium tracking-wider uppercase">Mind</p>
          </button>

          <button className="flex flex-col items-center gap-1">
            <div className="text-[#13daec] flex h-8 items-center justify-center">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>account_circle</span>
            </div>
            <p className="text-[#13daec] text-[10px] font-medium tracking-wider uppercase">Profile</p>
          </button>

          <button className="flex flex-col items-center gap-1 group">
            <div className="text-slate-400 group-hover:text-[#13daec] transition-colors flex h-8 items-center justify-center">
              <span className="material-symbols-outlined">auto_awesome</span>
            </div>
            <p className="text-slate-400 group-hover:text-[#13daec] text-[10px] font-medium tracking-wider uppercase">Evolve</p>
          </button>
        </div>
      </nav>

    </div>
  );
};

export default Profile;