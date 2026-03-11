import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../config/api';

export default function Register() {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') === 'dark');
  const [formData, setFormData] = useState({ 
    fullName: '', 
    email: '', 
    password: '',
    confirmPassword: '' 
  });
  const [isLoading, setIsLoading] = useState(false);

  // Sync theme with document root
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setIsLoading(true); // Disable button immediately
    
    try {
      // ✅ Using central api config for production URL
      const response = await api.post('/user/register', {
        email: formData.email,
        password: formData.password,
        user_name: formData.fullName, // Adjust key to match your app/schema
      });

      if (response.status === 200 || response.status === 201) {
        console.log('Account created successfully');
        navigate('/login');
      }
    } catch (err) {
      console.error("Registration failed:", err.response?.data?.detail || err.message);
    } finally {
      setIsLoading(false); // Re-enable button on completion
    }
  };

  // const handleGoogleLogin = () => {
  //   // Uses the baseURL defined in your config
  //   window.location.href = `${api.defaults.baseURL}/api/v1/auth/google`;
  // };

  return (
    <div className="min-h-screen font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-white transition-colors duration-500 flex flex-col">
      
      <header className="flex items-center justify-between p-6 z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-sm shadow-primary/5">
            <span className="material-symbols-outlined filled text-[22px]">psychology</span>
          </div>
          <span className="text-xl font-bold tracking-tight">AWAREN</span>
        </div>
        <button 
          onClick={() => setIsDark(!isDark)}
          className="w-10 h-10 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-gold-accent hover:bg-white/5 transition-all"
        >
          <span className="material-symbols-outlined text-2xl">
            {isDark ? 'light_mode' : 'dark_mode'}
          </span>
        </button>
      </header>

      <main className="flex-1 flex flex-col justify-center px-6 py-8 w-full max-w-[440px] mx-auto">
        
        <div className="mb-8 text-center animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-[32px] font-bold tracking-tight mb-2">Create Account</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Begin your journey with AWAREN.</p>
        </div>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold tracking-wide ml-1">Full Name</label>
            <input 
              type="text" 
              name="fullName"
              required 
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="John Doe" 
              className="w-full h-14 bg-white dark:bg-surface-dark border border-slate-200 dark:border-white/10 rounded-2xl px-5 text-base focus:ring-2 focus:ring-primary transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold tracking-wide ml-1">Email Address</label>
            <input 
              type="email" 
              name="email"
              required 
              value={formData.email}
              onChange={handleInputChange}
              placeholder="name@example.com" 
              className="w-full h-14 bg-white dark:bg-surface-dark border border-slate-200 dark:border-white/10 rounded-2xl px-5 text-base focus:ring-2 focus:ring-primary transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold tracking-wide ml-1">Password</label>
            <input 
              type="password" 
              name="password"
              required 
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Create a password" 
              className="w-full h-14 bg-white dark:bg-surface-dark border border-slate-200 dark:border-white/10 rounded-2xl px-5 text-base focus:ring-2 focus:ring-primary transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold tracking-wide ml-1">Confirm Password</label>
            <input 
              type="password" 
              name="confirmPassword"
              required 
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Repeat your password" 
              className="w-full h-14 bg-white dark:bg-surface-dark border border-slate-200 dark:border-white/10 rounded-2xl px-5 text-base focus:ring-2 focus:ring-primary transition-all"
            />
          </div>

          {/* Register Button with Loading State */}
          <button 
            type="submit"
            disabled={isLoading}
            className="mt-2 w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Generating Soul..." : "Register"}
            {!isLoading && <span className="material-symbols-outlined text-xl">person_add</span>}
          </button>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-slate-200 dark:border-white/5"></div>
            {/* <span className="mx-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Or sign up with</span> */}
            <div className="flex-grow border-t border-slate-200 dark:border-white/5"></div>
          </div>

          {/* <button 
            type="button"
            onClick={handleGoogleLogin}
            className="flex w-full items-center justify-center gap-3 h-14 bg-white dark:bg-[#eeeeee] rounded-2xl text-slate-700 font-bold transition-all active:scale-[0.98] shadow-md border border-slate-200"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
            </svg>
            Continue with Google
          </button> */}
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500 font-medium">
            Already have an account? 
            <Link to="/login" className="font-bold text-gold-accent hover:underline ml-1">
              Sign In
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}