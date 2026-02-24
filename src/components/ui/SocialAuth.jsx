import React from 'react';

const SocialAuth = () => (
  <div className="grid grid-cols-2 gap-4 w-full">
    {/* Google Button */}
    <button className="flex items-center justify-center gap-3 px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all bg-white dark:bg-slate-900 active:scale-95 shadow-sm">
      <img alt="Google" className="w-5 h-5" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" />
      <span className="font-semibold text-slate-700 dark:text-slate-200 text-sm">Google</span>
    </button>

    {/* Apple Button */}
    <button className="flex items-center justify-center gap-3 px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all bg-white dark:bg-slate-900 active:scale-95 shadow-sm">
      {/* Note: dark:invert makes the black apple logo white in dark mode */}
      <img alt="Apple" className="w-5 h-5 dark:invert transition-all" src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" />
      <span className="font-semibold text-slate-700 dark:text-slate-200 text-sm">Apple</span>
    </button>
  </div>
);

export default SocialAuth;