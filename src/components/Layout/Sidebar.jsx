// /* src/components/layout/Sidebar.jsx */
// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../../hooks/useAuth';
// import api from '../../config/api';

// const Sidebar = ({ isOpen, onClose, userName }) => {
//   const { logout } = useAuth();
//   const [conversations, setConversations] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (isOpen) fetchConversations();
//   }, [isOpen]);

//   const fetchConversations = async () => {
//     setLoading(true);
//     try {
//       const { data } = await api.get('/conversations/');
//       setConversations(data);
//     } catch (err) {
//       console.error("Fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteConversation = async (id, e) => {
//     e.stopPropagation(); // Prevent opening the chat when deleting
//     try {
//       await api.delete(`/conversations/${id}`);
//       setConversations(prev => prev.filter(c => c.id !== id));
//     } catch (err) {
//       console.error("Delete error:", err);
//     }
//   };

//   const clearAllConversations = async () => {
//     if (!window.confirm("Are you sure you want to clear all history?")) return;
//     try {
//       // Assuming a bulk delete or mapping through current IDs
//       await Promise.all(conversations.map(c => api.delete(`/conversations/${c.id}`)));
//       setConversations([]);
//     } catch (err) {
//       console.error("Clear all error:", err);
//     }
//   };

//   const formatTime = (isoString) => {
//     const date = new Date(isoString);
//     const now = new Date();
//     const diffInHours = Math.abs(now - date) / 36e5;
//     if (diffInHours < 1) return 'Just now';
//     if (diffInHours < 24) return 'Today';
//     return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-[100] flex">
//       <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]" onClick={onClose} />
      
//       <aside className="relative w-[82%] max-w-[320px] h-full sidebar-glass border-r border-white/5 shadow-2xl flex flex-col text-white animate-sidebar">
//         <div className="pt-16 pb-6 px-6 bg-gradient-to-b from-[#0D2222] to-transparent">
//           <div className="flex items-center justify-between mb-8">
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
//                 <span className="material-icons-round text-white text-base">psychology</span>
//               </div>
//               <span className="font-display font-bold text-xl tracking-wide">AWAREN</span>
//             </div>
//             <button onClick={onClose} className="opacity-70 hover:opacity-100 transition-opacity">
//               <span className="material-icons-round">close</span>
//             </button>
//           </div>

//           <button className="w-full bg-secondary hover:bg-[#b87d03] text-white font-black py-4 px-4 rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95 uppercase text-xs tracking-widest">
//             <span className="material-icons-round">add</span>
//             New Chat
//           </button>
//         </div>

//         <div className="flex-1 overflow-y-auto px-4 no-scrollbar pb-4">
//           <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 px-2">
//             Recent Conversations
//           </h3>
          
//           <div className="space-y-2">
//             {loading ? (
//               <div className="p-4 text-center text-xs text-slate-500 italic">Loading your thoughts...</div>
//             ) : conversations.length === 0 ? (
//               <div className="p-4 text-center text-xs text-slate-500 italic">No conversations yet.</div>
//             ) : (
//               conversations.map((chat) => (
//                 <div key={chat.id} className="group flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-all cursor-pointer relative">
//                   <span className="material-icons-round text-slate-500 text-sm mt-0.5">chat_bubble</span>
//                   <div className="flex-1 min-w-0">
//                     <h4 className="font-semibold text-sm text-slate-200 truncate pr-6">{chat.title}</h4>
//                     <span className="text-[10px] text-slate-500 block mt-1">{formatTime(chat.created_at)}</span>
//                   </div>
//                   {/* Delete Individual Chat */}
//                   <button 
//                     onClick={(e) => deleteConversation(chat.id, e)}
//                     className="absolute right-2 top-3 opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 transition-all"
//                   >
//                     <span className="material-icons-round text-sm">delete_outline</span>
//                   </button>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>

//         <div className="p-6 bg-gradient-to-t from-[#081818] to-transparent">
//           <div className="space-y-1 mb-6">
//             <button 
//               onClick={clearAllConversations}
//               className="flex items-center gap-3 w-full p-3 rounded-xl transition-colors text-sm text-slate-400 hover:text-red-400 group"
//             >
//               <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 group-hover:bg-red-500/10 transition-colors">
//                 <span className="material-icons-round text-lg">delete_sweep</span>
//               </div>
//               <span className="font-bold tracking-tight">Clear All</span>
//             </button>
//           </div>

//           <div className="pt-6 border-t border-white/10 flex items-center gap-3">
//             <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white text-xs">
//               {userName.substring(0, 2).toUpperCase()}
//             </div>
//             <div className="flex-1 min-w-0">
//               <div className="text-sm font-bold text-white truncate">{userName}</div>
//               <div className="text-[9px] text-slate-400">Leaving so soon?</div>
//             </div>
//             <button onClick={logout} className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-400">
//               <span className="material-icons-round text-xl">logout</span>
//             </button>
//           </div>
//         </div>
//       </aside>
//     </div>
//   );
// };

// export default Sidebar;

/* src/components/layout/Sidebar.jsx */
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import api from '../../config/api';
import { useNavigate } from 'react-router-dom';
const Sidebar = ({ isOpen, onClose, userName }) => {
  const { logout } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    if (isOpen) fetchConversations();
  }, [isOpen]);

  const fetchConversations = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/conversations/');
      setConversations(data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const openConversation = (id) => {
  onClose(); // Close sidebar
  navigate('/chat', { state: { conversationId: id } }); // Pass ID via state
};

const handleNewChat = () => {
  onClose();
  // Navigate to chat with null state to trigger a fresh session
  navigate('/chat', { state: { conversationId: null } });
};

  const deleteConversation = async (id, e) => {
    e.preventDefault();
    e.stopPropagation(); // Critical: prevents the chat from "opening" when clicking delete
    
    try {
      await api.delete(`/conversations/${id}`);
      setConversations(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex">
      <div className="absolute font-body inset-0 bg-slate-900/60 backdrop-blur-[2px]" onClick={onClose} />
      
      <aside className="relative w-[85%] max-w-[320px] h-full sidebar-glass border-r border-white/5 shadow-2xl flex flex-col text-white animate-sidebar">
        
        {/* Header - New Chat */}
        <div className="pt-16 pb-6 px-6 bg-gradient-to-b from-[#0D2222] to-transparent">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="material-icons-round text-white text-base">psychology</span>
              </div>
              <span className="font-display font-bold text-xl tracking-wide">AWAREN</span>
            </div>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors">
              <span className="material-icons-round text-lg opacity-70">close</span>
            </button>
          </div>

          <button onClick={handleNewChat} className="w-full bg-secondary hover:bg-[#b87d03] text-white font-black py-4 rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95 uppercase text-[10px] tracking-[0.2em] border border-yellow-500/20">
            <span className="material-icons-round text-sm">add</span>
            New Chat
          </button>
        </div>

        {/* List Content */}
        <div className="flex-1 overflow-y-auto px-4 no-scrollbar pb-4">
          <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 px-2 opacity-60">
            Recent Conversations
          </h3>
          
          <div className="space-y-1.5">
            {loading ? (
              <div className="p-8 text-center"><div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto opacity-50"></div></div>
            ) : conversations.map((chat) => (
              <div 
  key={chat.id} 
  
  onClick={() => openConversation(chat.id)}
  className="group flex items-center justify-between p-3 rounded-2xl hover:bg-white/5 transition-all cursor-pointer border border-transparent hover:border-white/5"
>
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <span className="material-icons-round text-slate-500 text-sm">chat_bubble_outline</span>
                  <div className="truncate">
                    <h4 className="font-medium text-sm text-slate-200 truncate">{chat.title}</h4>
                    <span className="text-[9px] text-slate-500 uppercase font-black tracking-widest">
                      {new Date(chat.created_at).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>

                {/* DELETE BUTTON - Always visible on small screens / Visible on group-hover */}
                <button 
                  onClick={(e) => deleteConversation(chat.id, e)}
                  className="ml-2 w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all opacity-40 group-hover:opacity-100"
                  aria-label="Delete conversation"
                >
                  <span className="material-icons-round text-lg">delete_outline</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer with Logout */}
        <div className="p-6 bg-[#081818]/80 backdrop-blur-md border-t border-white/5">
           <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-black text-white text-xs shadow-lg">
              {userName.substring(0, 2).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-white truncate">{userName}</div>
              <div className="text-[10px] text-slate-500 italic">Leaving so soon?</div>
            </div>
            <button 
              onClick={logout} 
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
            >
              <span className="material-icons-round text-xl">logout</span>
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;

// router = APIRouter(prefix="/chat")

// # --- CHAT STREAM ENDPOINT ---
// @router.post("/stream")
// async def chat_stream(
//     request: Request, 
//     background_tasks: BackgroundTasks, 
//     session: AsyncSession = Depends(get_session), 
//     current_user = Depends(auth.get_current_user)
// ):
//     payload = await request.json()
//     user_input = payload.get("text", "")
    
//     # NEW: Get optional conversation_id from payload
//     conversation_id_str = payload.get("conversation_id")
//     print(f"Convo id: {conversation_id_str}")
//     if not user_input:
//         raise HTTPException(status_code=400, detail="No text provided")

//     user_id_uuid: UUID = current_user.user_id
//     user_id_str = str(user_id_uuid)
    
//     # =========================================================
//     # 1. SESSION MANAGEMENT (Create or Retrieve Conversation)
//     # =========================================================
//     conversation = None
//     if conversation_id_str:
//         try:
//             conversation_id_uuid = UUID(conversation_id_str)
//             # Retrieve and validate the conversation belongs to the user
//             conversation = await get_conversation_by_id(session, conversation_id_uuid, user_id_uuid)
//             if not conversation:
//                  raise HTTPException(status_code=404, detail="Conversation not found or access denied.")
//         except ValueError:
//             raise HTTPException(status_code=400, detail="Invalid conversation_id format.")
    
//     is_new_conversation = False

//     if not conversation:
//         conversation = await create_new_conversation(session, user_id_uuid)
//         await session.commit()
//         is_new_conversation = True

    
//     # Get the final ID for use in history/persistence
//     conversation_id_uuid = conversation.id


//     # =========================================================
//     # 2. SHORT-TERM CONTEXT: Retrieve History 
//     # =========================================================
//     # Now retrieves history *by conversation ID*
//     history = await get_last_n_messages(session, conversation_id_uuid, n=10)


//     # =========================================================
//     # 3. LONG-TERM CONTEXT: mem0 retrieval (filters by app_id/user_id)
//     # =========================================================
//     # We can optionally filter mem0 by conversation_id if we store it there (see background task update)
//     filters = {"AND": [{"user_id": user_id_str}, {"app_id": "health_bot"}]}
//     memories = mem0_service.mem0.search(user_input, user_id=user_id_str, limit=5, filters=filters)
//     context = "\n".join(m.get("memory", "") for m in memories) if memories else ""
    
//     system_prompt = f"You're Ray, a running coach... Here are past memories:\n{context}" if context else "You're Ray, a running coach..."


//     # 4. Stream response and handle events
//     async def event_generator():
//         full_reply = ""
        
//         try:
//             # STREAMING PHASE
//             async for chunk in vertex_service.stream_generate(system_prompt, user_input, history=history): 
//                 full_reply += chunk
//                 yield {
//                     "event": "message",
//                     "data": json.dumps({"chunk": chunk})
//                 }

//             # FINAL EVENT YIELDED IMMEDIATELY 
//             yield {
//                 "event": "done",
//                 "data": json.dumps({
//                     "conversation_id": str(conversation_id_uuid), # <-- RETURN THE ID TO THE FRONTEND
//                     "is_new": is_new_conversation,
//                     "memories": memories,
//                 })
//             }
            
//             # STORAGE PHASE (DECOUPLED)
//             background_tasks.add_task(
//                 persist_chat_data,
//                 # Pass the conversation ID to the background task
//                 session=session, 
//                 user_id_uuid=user_id_uuid,
//                 conversation_id=conversation_id_uuid, 
//                 user_id_str=user_id_str,
//                 user_input=user_input,
//                 full_reply=full_reply.strip()
//             )
//         except Exception as e:
//             yield {
//                 "event": "error",
//                 "data": json.dumps({"error": str(e)})
//             }

//     return EventSourceResponse(event_generator())