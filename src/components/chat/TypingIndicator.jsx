/* src/components/chat/TypingIndicator.jsx */
import React from 'react';

const TypingIndicator = () => (
  <div className="flex gap-3 mb-6 animate-in fade-in duration-500">
    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 opacity-40">
      <span className="material-icons-round text-lg">psychology</span>
    </div>
    <div className="bg-white dark:bg-slate-800 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1.5 items-center h-10 shadow-sm border border-slate-100 dark:border-slate-700">
      <div className="w-1.5 h-1.5 bg-primary rounded-full typing-dot" />
      <div className="w-1.5 h-1.5 bg-primary rounded-full typing-dot [animation-delay:0.2s]" />
      <div className="w-1.5 h-1.5 bg-primary rounded-full typing-dot [animation-delay:0.4s]" />
    </div>
  </div>
);

export default TypingIndicator;