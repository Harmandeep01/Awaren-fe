import React, { useEffect, useRef, useState } from "react";
import { Menu, Activity, Plus } from "lucide-react";
import { useAuthContext } from "./auth/authProvider";
import { useStreamChat } from "./hooks/useStreamChat";

import Sidebar from "./components/Sidebar";
import ChatInput from "./components/ChatInput";
import Message from "./components/Message";
import MemoryPanel from "./components/MemoryPanel";
import AwarenStatus from "./components/AwarenStatus";
import HomeView from "./components/HomeView";

export default function ChatApp() {
  const { token, user } = useAuthContext();
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showMemoryMobile, setShowMemoryMobile] = useState(false);
  const endRef = useRef(null);

  const { messages, loading, send, cancel, memories } = useStreamChat(token, activeConversationId);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, loading]);

  const isHome = !activeConversationId && messages.length === 0;

  return (
    <div className="relative flex h-screen w-full flex-col bg-background-dark font-display text-white selection:bg-primary">
      {/* Top Navigation Bar */}
      <header className="flex items-center justify-between px-5 py-4 z-20 bg-background-dark/95 backdrop-blur-sm border-b border-white/5">
        <button onClick={() => setSidebarOpen(true)} className="size-10 flex items-center justify-center rounded-full hover:bg-white/5 transition-all">
          <Menu size={24} />
        </button>
        
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-primary shadow-glow"></div>
          <h1 className="text-xl font-bold tracking-tight">Awaren</h1>
        </div>

        <button 
          onClick={() => setShowMemoryMobile(!showMemoryMobile)}
          className={`size-10 flex items-center justify-center rounded-full border transition-all ${showMemoryMobile ? 'border-primary bg-primary/20 text-primary' : 'border-white/10 bg-white/5 text-white'}`}
        >
          <Activity size={20} />
        </button>
      </header>

      <div className="relative flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto custom-scrollbar flex flex-col relative pb-32">
          {isHome ? (
            <HomeView userName={user?.name || "Alex"} onSelect={setActiveConversationId} />
          ) : (
            <div className="max-w-3xl mx-auto w-full p-4 space-y-6">
              {messages.map((m, i) => (
                <Message key={i} role={m.role} text={m.text} />
              ))}
              {loading && <AwarenStatus />}
              <div ref={endRef} />
            </div>
          )}
          
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background-dark via-background-dark/90 to-transparent">
            <ChatInput loading={loading} onSend={(val) => send(val, activeConversationId)} onStop={cancel} />
          </div>
        </main>

        {/* Sidebar and Mobile Memory Panel */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} activeId={activeConversationId} onSelect={setActiveConversationId} token={token} />
        
        {/* Mobile Memory Dropdown (Stitch Style) */}
        {showMemoryMobile && (
          <div className="absolute top-[72px] right-4 z-40 w-72 max-h-[60vh] overflow-hidden glass-effect rounded-2xl border border-white/10 shadow-2xl animate-in fade-in slide-in-from-top-2">
            <MemoryPanel memories={memories} />
          </div>
        )}
      </div>
    </div>
  );
}