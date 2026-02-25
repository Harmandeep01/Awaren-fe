import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../config/api';
import ChatLoader from '../components/chat/ChatLoader';
import MessageBubble from '../components/chat/MessageBubble';
import TypingIndicator from '../components/chat/TypingIndicator';
import EmptyChatPlaceholder from '../components/chat/EmptyChatPlaceholder';

export default function Chat() {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract ID from navigation state
  const incomingId = location.state?.conversationId || null;

  // Track the conversation ID (starts null for new chats)
  const [conversationId, setConversationId] = useState(location.state?.conversationId || null);
  const [messages, setMessages] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const sentInitialRef = useRef(false);

  const scrollRef = useRef(null);

  // Auto-scroll on new messages
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Sync internal state with navigation state
  useEffect(() => {
    if (incomingId !== conversationId) {
      setConversationId(incomingId);
      setMessages([]);
    }
  }, [incomingId]);

  // Load history when conversationId changes
useEffect(() => {
    if (conversationId) {
      // Only load history if the messages array is currently empty
      // this prevents the 'overwrite' flicker when a stream updates the ID
      if (messages.length === 0) {
        loadHistory();
      }
    }
  }, [conversationId]);

  // Handle initial suggested message
  useEffect(() => {
  const initialMsg = location.state?.initialMessage;

  if (!initialMsg) return;
  if (sentInitialRef.current) return;

  sentInitialRef.current = true;
  handleSendMessage(null, initialMsg);
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [location.state?.initialMessage]);

  const loadHistory = async () => {
    setLoadingHistory(true);
    try {
      const { data } = await api.get(`/conversations/${conversationId}/messages`);

      const formattedMessages = data.map((msg, index) => ({
        id: msg.id || `${conversationId}-${index}`,
        type: msg.role === 'assistant' ? 'ai' : 'user',
        text: msg.content,
      }));

      setMessages(formattedMessages);
    } catch (error) {
      console.error('Failed to load history:', error);
    } finally {
      setLoadingHistory(false);
    }
  };

// 2. MODIFIED: Prevent the second-message flicker
// Inside Chat.jsx
const handleSendMessage = async (e, forcedText = null) => {
  if (e) e.preventDefault();

  const userMsg = forcedText || inputText;
  if (!userMsg.trim() || isTyping) return;

  setInputText('');
  setMessages(prev => [...prev, { id: Date.now(), type: 'user', text: userMsg }]);
  setIsTyping(true);

  try {
    // ✅ STYLE MATCH: Using your requested api.post format
    // Note: For real-time streaming to work with Axios, the backend must support 
    // it and you'd need additional config. For standard POST:
    const response = await api.post('/api/v1/chat/stream', {
      text: userMsg,
      conversation_id: conversationId,
    });

    // If your backend returns the full text at once in this mode:
    const data = response.data; 
    
    if (data.text) {
      setMessages(prev => [
        ...prev, 
        { id: Date.now() + 1, type: 'ai', text: data.text }
      ]);
    }

    if (data.conversation_id && data.conversation_id !== conversationId) {
      setConversationId(data.conversation_id);
    }

  } catch (error) {
    console.error('Chat error:', error.response?.data?.detail || error.message);
  } finally {
    setIsTyping(false);
  }
};

// Add this inside your Chat component or as a helper function
// const triggerBackgroundTitleGen = async (id, firstMsg) => {
//   try {
//     // ✅ STYLE MATCH: Uses api.post with automatic baseURL and headers
//     const response = await api.post(`/api/v1/conversations/${id}/generate-title`, {
//       first_message: firstMsg,
//     });
    
//     // Axios returns the data in the .data object
//     console.log('Title generated:', response.data.title);
//   } catch (err) {
//     // Catch specific errors from your Render backend
//     console.error('Title generation failed:', err.response?.data?.detail || err.message);
//   }
// };

  return (
    <div className="flex flex-col h-screen bg-slate-50 font-body dark:bg-[#0b1120] animate-in fade-in zoom-in duration-300">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 z-20">
        <button
          onClick={() => navigate('/home')}
          className="p-2 -ml-2 text-slate-500 hover:text-primary transition-all"
        >
          <span className="material-icons-round">arrow_back</span>
        </button>

        <div className="flex flex-col items-center">
          <h1 className="font-display font-bold text-lg text-slate-800 dark:text-white uppercase tracking-wide">
            AWAREN
          </h1>
          <div className="flex items-center gap-1.5 mt-0.5">
            <div className={`w-1.5 h-1.5 rounded-full bg-primary ${isTyping ? 'status-light' : ''}`} />
            <span className="text-[9px] uppercase tracking-widest font-black text-primary">
              Conscious
            </span>
          </div>
        </div>

        <div className="w-10" />
      </header>

      {/* Chat Space */}
      <main className="flex-1 overflow-y-auto px-4 py-8 no-scrollbar">
        {loadingHistory ? (
          <ChatLoader />
        ) : (
          <>
            {messages.length === 0 && !isTyping && (
              <EmptyChatPlaceholder onSuggestClick={text => handleSendMessage(null, text)} />
            )}

            {messages.map(msg => (
              <MessageBubble key={msg.id} message={msg} />
            ))}

            {isTyping && <TypingIndicator />}
            <div ref={scrollRef} />
          </>
        )}
      </main>

      {/* Input */}
      <footer className="p-4 pb-8 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
        <form
          onSubmit={handleSendMessage}
          className="max-w-4xl mx-auto flex items-end gap-3 bg-slate-50 dark:bg-slate-800/50 p-2 rounded-[2rem] border border-slate-100 dark:border-slate-700"
        >
          <input
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            disabled={isTyping}
            className="flex-1 bg-transparent border-none focus:ring-0 text-[15px] text-slate-800 dark:text-slate-100 placeholder-slate-400 px-4 py-3 font-medium"
            placeholder={isTyping ? 'AWAREN is thinking...' : 'Type a message...'}
          />
          <button
            type="submit"
            disabled={isTyping || !inputText.trim()}
            className="p-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-full shadow-lg hover:scale-105 transition disabled:opacity-50 active:scale-95"
          >
            <span className="material-icons-round text-[22px] ml-0.5">send</span>
          </button>
        </form>
      </footer>
    </div>
  );
}
