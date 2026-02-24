import React, { useMemo, useState, useCallback } from 'react';
import SuggestionCard from '../dashboard/SuggestionCard';
import { getRandomPrompts } from '../../data/prompts';

// ✅ Pass onSuggestClick as a prop from the parent (Chat.jsx)
const EmptyChatPlaceholder = ({ onSuggestClick }) => {
    // ✅ State-managed prompts to allow shuffling
  const [suggestions, setSuggestions] = useState(getRandomPrompts(3));
  const [isShuffling, setIsShuffling] = useState(false);

  const handleShuffle = () => {
    setIsShuffling(true);
    // FAST Shuffle: 200ms for a snappy feel
    setTimeout(() => {
      setSuggestions(getRandomPrompts(3));
      setIsShuffling(false);
    }, 200);
  };
  // useMemo ensures prompts don't change every time the component re-renders
  const randomPrompts = useMemo(() => getRandomPrompts(3), []);

  return (
    <div className="h-full flex font-body flex-col items-center justify-center p-8 text-center animate-in fade-in duration-700">
      <div className="w-20 h-20 rounded-[2.5rem] bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-primary mb-6 shadow-soft">
        <span className="material-icons-round text-4xl opacity-40">psychology</span>
      </div>
      
      <h2 className="font-display text-xl font-bold text-slate-800 dark:text-white mb-2">
  Welcome to Awaren
</h2>

<p className="text-sm text-slate-400 max-w-[260px] leading-relaxed font-medium mb-10">
  Awaren is a conscious conversational space designed for reflection, clarity,
  and thoughtful exploration.
  <br />
</p>

      
      <div className="flex items-center justify-between w-full max-w-sm mb-4 px-2">
        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] opacity-60">
          Notorious Suggestions
        </h3>
        <button 
          onClick={handleShuffle}
          className={`p-2 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 text-primary transition-all active:scale-90`}
        >
          <span className={`material-icons-round text-lg ${isShuffling ? 'animate-spin' : ''}`}>casino</span>
        </button>
      </div>
      
      <div className="space-y-3 w-full max-w-sm min-h-[280px]">
        {isShuffling ? (
          // Fast Skeleton Loaders
          [1, 2, 3].map((i) => (
            <div key={i} className="w-full h-20 bg-slate-100 dark:bg-slate-800/40 rounded-2xl animate-pulse border border-slate-50 dark:border-slate-800" />
          ))
        ) : (
          suggestions.map((p, i) => (
            <div key={i} className="animate-in fade-in zoom-in duration-200">
              <SuggestionCard prompt={p} onClick={onSuggestClick} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EmptyChatPlaceholder;