import React from 'react';

const SuggestionCard = ({ prompt, onClick }) => (
  <button 
  onClick={() => onClick(prompt.text)}
  className="w-full flex items-center gap-4 p-4 bg-white dark:bg-slate-800/40 rounded-2xl border border-transparent shadow-sm hover:shadow-md transition-all active:scale-[0.98] text-left outline-none ring-0 focus:outline-none focus:ring-0 focus:border-transparent focus-visible:outline-none focus-visible:ring-0 focus-visible:border-transparent"
>
    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700/50 flex items-center justify-center text-slate-500">
      <span className="material-icons-round text-xl">{prompt.icon}</span>
    </div>
    <div className="flex-1 min-w-0">
      <span className="text-[9px] font-black text-primary uppercase tracking-widest block mb-0.5 opacity-70">
        {prompt.category}
      </span>
      <p className="text-sm text-slate-700 dark:text-slate-200 font-medium leading-snug truncate-2-lines">
        "{prompt.text}"
      </p>
    </div>
    <span className="material-icons-round text-slate-300 text-sm">
      arrow_forward_ios
    </span>
  </button>
);

export default React.memo(SuggestionCard);