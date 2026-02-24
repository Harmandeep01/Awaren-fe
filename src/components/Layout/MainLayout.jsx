import React from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';

const NavButton = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1.5 transition-all active:scale-90 border-none outline-none ring-0 appearance-none bg-transparent ${
      active ? 'text-primary' : 'text-slate-400 dark:text-slate-500'
    }`}
  >
    <span className="material-icons-round text-[26px]">{icon}</span>
    <span className={`text-[10px] font-black uppercase tracking-widest ${active ? 'opacity-100' : 'opacity-60'}`}>
      {label}
    </span>
  </button>
);

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: "home", label: "Home", path: "/home" },
    { icon: "psychology", label: "Memories", path: "/memories" },
    { icon: "insights", label: "Insights", path: "/insights" },
    { icon: "person", label: "Profile", path: "/profile" }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col">
      {/* Main Page Content Area */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Persistent Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full bg-white/95 dark:bg-black/95 backdrop-blur-md border-t border-slate-100 dark:border-slate-900 px-6 pt-4 pb-10 flex justify-around items-center z-40">
        {navItems.map((item) => (
          <NavButton 
            key={item.path}
            icon={item.icon} 
            label={item.label} 
            active={location.pathname === item.path} 
            onClick={() => navigate(item.path)}
          />
        ))}
      </nav>
    </div>
  );
}