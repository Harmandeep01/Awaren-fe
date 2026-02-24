/* src/components/ui/Input.jsx */
import React from 'react';

const Input = ({ label, icon, type = "text", placeholder, name, value, onChange, rightElement }) => (
  <div className="w-full group">
    <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-2 ml-1">
      {label}
    </label>
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
        <span className="material-icons-round text-xl">{icon}</span>
      </div>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 py-4 pl-12 pr-12 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm md:text-base font-medium text-slate-900 dark:text-white"
      />
      {rightElement && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center">
          {rightElement}
        </div>
      )}
    </div>
  </div>
);

export default React.memo(Input);