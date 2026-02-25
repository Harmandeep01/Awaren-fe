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
  const handleSendMessage = async (e, forcedText = null) => {
    if (e) e.preventDefault();

    const userMsg = forcedText || inputText;
    if (!userMsg.trim() || isTyping) return;

    setInputText('');
    setMessages(prev => [...prev, { id: Date.now(), type: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const response = await fetch(`${api}/chat/stream`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      text: userMsg,
      conversation_id: conversationId,
    }),
  });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let currentAiResponse = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
               const data = JSON.parse(line.slice(6));

              if (data.chunk) {
                currentAiResponse += data.chunk;
                setMessages(prev => {
                  // Use a stable ID for the streaming message
                  const otherMsgs = prev.filter(m => m.id !== 'streaming-ai');
                  return [...otherMsgs, { id: 'streaming-ai', type: 'ai', text: currentAiResponse }];
                });
              }

              if (data.conversation_id && data.conversation_id !== conversationId) {
                // IMPORTANT: Update the ID without triggering a history wipe
                setConversationId(data.conversation_id);
              }
            } catch (err) {
              console.error("Error parsing stream chunk", err);
            }
          }
        }
      }
      
      // 3. CRITICAL: Once the stream is done, convert 'streaming-ai' to a real ID
      // so it doesn't get filtered out by the next message sent.
      setMessages(prev => 
        prev.map(m => m.id === 'streaming-ai' ? { ...m, id: Date.now() + Math.random() } : m)
      );

    } catch (error) {
      console.error('Streaming error:', error);
    } finally {
      setIsTyping(false);
    }
  };

  // // ORIGINAL background title trigger
  // const triggerBackgroundTitleGen = (id, firstMsg) => {
  //   fetch(`http://localhost:8000/api/v1/conversations/${id}/generate-title`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${localStorage.getItem('token')}`,
  //     },
  //     body: JSON.stringify({ first_message: firstMsg }),
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log('Title generated:', data.title);
  //     })
  //     .catch(err => console.error('Title generation failed:', err));
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
