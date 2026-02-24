import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  // Sync theme with document root
  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') === 'dark');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    user_name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  
  try {
    // ✅ Use the centralized axios instance
    // This automatically prepends 'https://awaren-backend-1.onrender.com'
    const response = await api.post('/user/register', {
      email: formData.email,
      password: formData.password,
      full_name: formData.fullName, // Adjust keys based on your backend schema
    });

    // Axios returns the body in the .data property
    if (response.status === 200 || response.status === 201) {
      console.log('Account created successfully');
      navigate('/login');
    }
  } catch (err) {
    // Catch specific error messages from your FastAPI backend
    const errorMsg = err.response?.data?.detail || "Registration failed";
    console.error("Error:", errorMsg);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-background-light font-body dark:bg-background-dark text-slate-900 dark:text-white font-display flex flex-col transition-colors duration-500 selection:bg-primary/30">
      
      {/* Header aligned with Screenshot Reference */}
      <header className="max-w-md mx-auto w-full px-6 pt-10 pb-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-sm shadow-primary/5">
              <span className="material-symbols-outlined filled text-[22px]">psychology</span>
            </div>
            <span className="text-xl font-bold tracking-tight">AWAREN</span>
          </div>
          <button 
            onClick={() => setIsDark(!isDark)}
            className="w-10 h-10 rounded-full bg-slate-100 dark:bg-surface-dark border border-slate-200 dark:border-white/5 flex items-center justify-center text-slate-500 dark:text-gold-accent transition-all active:scale-90"
          >
            <span className="material-symbols-outlined text-[22px]">
              {isDark ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
        </div>

        <div className="animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-3xl font-bold tracking-tight mb-2 leading-tight">Join AWAREN</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Start your journey to conscious guidance.</p>
        </div>
      </header>

      {/* Main Registration Form */}
      <main className="flex-1 flex flex-col w-full max-w-md mx-auto px-6 pb-12">
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          
          {/* Full Name field maps to user_name in DB */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold tracking-wide ml-1 text-slate-700 dark:text-slate-200">Full Name</label>
            <input 
              name="user_name"
              type="text" 
              required 
              value={formData.user_name}
              onChange={handleInputChange}
              placeholder="Enter your name" 
              className="w-full h-12 bg-white dark:bg-surface-dark border border-slate-200 dark:border-white/10 rounded-2xl px-5 text-base focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold tracking-wide ml-1 text-slate-700 dark:text-slate-200">Email Address</label>
            <input 
              name="email"
              type="email" 
              required 
              value={formData.email}
              onChange={handleInputChange}
              placeholder="name@example.com" 
              className="w-full h-12 bg-white dark:bg-surface-dark border border-slate-200 dark:border-white/10 rounded-2xl px-5 text-base focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
            />
          </div>

          <div className="flex flex-col gap-1.5 relative">
            <label className="text-sm font-semibold tracking-wide ml-1 text-slate-700 dark:text-slate-200">Password</label>
            <div className="relative">
              <input 
                name="password"
                type={showPassword ? "text" : "password"} 
                required 
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Create a password" 
                className="w-full h-12 bg-white dark:bg-surface-dark border border-slate-200 dark:border-white/10 rounded-2xl px-5 pr-12 text-base focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showPassword ? 'visibility' : 'visibility_off'}
                </span>
              </button>
            </div>
            <p className="text-[10px] text-slate-400 mt-1 ml-1 uppercase font-bold tracking-widest">Must be at least 8 characters</p>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold tracking-wide ml-1 text-slate-700 dark:text-slate-200">Confirm Password</label>
            <input 
              name="confirmPassword"
              type="password" 
              required 
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm your password" 
              className="w-full h-12 bg-white dark:bg-surface-dark border border-slate-200 dark:border-white/10 rounded-2xl px-5 text-base focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
            />
          </div>

          <button 
            type="submit"
            className="mt-2 w-full h-13 bg-primary hover:bg-primary/90 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
          >
            Register
          </button>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-slate-200 dark:border-white/5"></div>
            <span className="mx-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Or register with</span>
            <div className="flex-grow border-t border-slate-200 dark:border-white/5"></div>
          </div>

          <button 
            type="button"
            className="flex w-full items-center justify-center gap-3 h-13 bg-white dark:bg-[#eeeeee] rounded-2xl text-slate-700 font-bold transition-all active:scale-[0.98] shadow-md border border-slate-200"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
            </svg>
            Sign up with Google
          </button>
        </form>

        <footer className="mt-10 text-center">
          <p className="text-sm text-slate-500 font-medium">
            Already have an account? 
            <Link to="/login" className="font-bold text-primary dark:text-gold-accent hover:underline ml-1">
              Log In
            </Link>
          </p>
        </footer>
      </main>
    </div>
  );
}