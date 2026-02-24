/* src/components/ui/NavButton.jsx */
import React from 'react';

const NavButton = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-all active:scale-90 border-none outline-none ring-0 ${
      active ? 'text-primary' : 'text-slate-400 dark:text-slate-500'
    }`}
  >
    <span className="material-icons-round text-2xl">{icon}</span>
    <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
  </button>
);

export default NavButton;