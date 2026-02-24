/* src/components/chat/MessageBubble.jsx */
import React from 'react';

const MessageBubble = ({ message }) => {
  const isAI = message.type === 'ai';

  return (
    <div className={`flex w-full mb-6 ${isAI ? 'justify-start gap-3' : 'justify-end'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
      {isAI && (
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white shrink-0 shadow-lg mt-1">
          <span className="material-icons-round text-lg">psychology</span>
        </div>
      )}
      
      <div className={`max-w-[85%] ${!isAI ? 'flex flex-col items-end' : ''}`}>
        {isAI && (
          <span className="text-[10px] text-slate-400 mb-1 ml-1 font-black uppercase tracking-widest">
            AWAREN
          </span>
        )}
        
        <div className={`p-4 rounded-2xl shadow-sm text-[15px] leading-relaxed transition-all hover:shadow-md ${
          isAI 
          ? 'bg-primary text-white rounded-tl-none font-medium' 
          : 'bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-tr-none'
        }`}>
          {message.text}
        </div>

        {/* {!isAI && (
          <div className="flex justify-end mt-1.5 mr-1 gap-1 items-center opacity-60">
            <span className="text-[9px] font-black uppercase tracking-tighter">Read</span>
            <span className="material-icons-round text-[14px] text-primary">done_all</span>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default React.memo(MessageBubble);