/* src/components/chat/ChatLoader.jsx */
const ChatLoader = () => (
  <div className="h-full w-full flex flex-col items-center justify-center p-12 text-center">
    <div className="relative flex items-center justify-center mb-6">
      <div className="w-12 h-12 border-4 border-primary/20 rounded-full" />
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin absolute" />
    </div>
    <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">
      Retrieving Context...
    </h3>
  </div>
);

export default ChatLoader;