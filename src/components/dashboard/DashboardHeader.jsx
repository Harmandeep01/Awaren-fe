import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';

const DashboardHeader = ({ userName, onToggleTheme, onMenuClick, isDark }) => {
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const { logout } = useAuth();
  const cardRef = useRef(null);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        setShowProfileCard(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Dynamic Content Logic
  const hour = currentTime.getHours();
  const timeGreeting = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening';
  const monthName = currentTime.toLocaleString('default', { month: 'long' });
  const dayName = currentTime.toLocaleString('default', { weekday: 'short' });
  const formattedDate = `${dayName}, ${monthName} ${currentTime.getDate()}`;
  const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <header className="relative bg-gradient-to-br from-[#1E1B4B] via-[#1E1B4B] to-[#134E4A] pt-16 pb-12 px-6 rounded-b-[2.5rem] shadow-lg z-10 shrink-0 overflow-hidden transition-all duration-500">
      
      {/* Constellation Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute bg-white/40 rounded-full w-1 h-1 top-20 left-1/4 animate-pulse"></div>
        <div className="absolute bg-white/40 rounded-full w-0.5 h-0.5 top-24 left-[28%]"></div>
        <div className="absolute bg-white/40 rounded-full w-1 h-1 top-32 left-[35%] animate-pulse delay-75"></div>
        <div className="absolute bg-white/40 rounded-full w-0.5 h-0.5 top-16 left-[60%]"></div>
        <div className="absolute bg-white/40 rounded-full w-1 h-1 top-28 left-[75%] animate-pulse delay-150"></div>
        
        <div className="absolute -right-10 -top-10 w-48 h-48 bg-teal-400/10 blur-[60px] rounded-full"></div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/5 blur-[80px] rounded-full"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-6">
          <button 
            onClick={onMenuClick} 
            className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 active:scale-90 transition-all border-none outline-none"
          >
            <span className="material-icons-round">menu</span>
          </button>
          
          <div className="flex gap-3 items-center">
            {/* Dynamic Time Badge */}
            <div className="hidden sm:flex items-center px-3 py-1 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-[11px] font-bold text-teal-100 tracking-wider">
              <span className="w-1.5 h-1.5 bg-secondary rounded-full mr-2 animate-pulse"></span>
              {formattedTime}
            </div>

            <button 
              onClick={() => onToggleTheme(!isDark)}
              className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 active:scale-90 transition-all border-none outline-none"
            >
              <span className="material-icons-round text-xl">{isDark ? 'light_mode' : 'dark_mode'}</span>
            </button>

            {/* Profile Avatar Trigger */}
            <div className="relative">
              <button 
                onClick={() => setShowProfileCard(!showProfileCard)}
                className="w-10 h-10 rounded-full border-2 border-white/30 overflow-hidden bg-slate-800 active:scale-95 transition-all outline-none ring-0 flex items-center justify-center text-white font-bold text-xs"
              >
                {userName.substring(0, 2).toUpperCase()}
              </button>

              {showProfileCard && (
                <div 
                  ref={cardRef}
                  className="fixed right-6 top-24 w-56 bg-white/90 dark:bg-slate-900/95 backdrop-blur-xl rounded-[2xl] shadow-[0_20px_40px_rgba(0,0,0,0.3)] p-5 z-[999] border border-white/20 dark:border-white/5 animate-in fade-in zoom-in duration-200"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-2xl bg-[#0D9488] flex items-center justify-center text-white text-lg font-black mb-3 shadow-md">
                      {userName.substring(0, 2).toUpperCase()}
                    </div>
                    <h3 className="text-slate-900 dark:text-white font-bold text-base leading-tight">{userName}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-[10px] font-bold mb-4 italic">{formattedDate}</p>
                    <button 
                      onClick={logout} 
                      className="w-full py-3 bg-red-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-red-500/20 hover:bg-red-600 transition-all active:scale-95"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Updated Dynamic Text Content */}
        <div className="text-white">
          <div className="flex items-center gap-2 mb-2 opacity-80">
            <span className="uppercase tracking-[0.2em] text-[10px] font-bold text-teal-200">AWAREN AI</span>
            <span className="material-icons-round text-xs text-teal-200">verified</span>
            <span className="text-[10px] text-teal-200/50 ml-1 font-medium">• {formattedDate}</span>
          </div>
          <h1 className="font-display text-3xl font-medium leading-tight mb-1">
            Steady progress,<br/> 
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-[#CA8A04]">
              {userName}
            </span>
          </h1>
          <p className="text-teal-50/70 text-sm font-light mt-2 max-w-[85%]">
            Reflecting on your journey this {monthName} {timeGreeting}. How can I guide you today?
          </p>
        </div>
      </div>
      
      <div className="absolute -bottom-1 left-0 w-full h-8 bg-white dark:bg-slate-900 rounded-t-[50%] scale-x-150 opacity-5"></div>
    </header>
  );
};

export default DashboardHeader;