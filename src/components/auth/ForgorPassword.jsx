/* src/components/auth/ForgotPassword.jsx */
import React from 'react';
import Input from '../ui/Input';

const ForgotPassword = ({ onBack }) => {
  return (
    <div className="w-full fade-in space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold dark:text-white">Reset Password</h2>
        <p className="text-sm text-slate-500 mt-2">Enter your email to receive a recovery link.</p>
      </div>

      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <Input label="Email Address" icon="email" placeholder="your@email.com" />
        
        <button className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-2xl shadow-xl transition-all active:scale-95">
          Send Link
        </button>
      </form>

      <button 
        onClick={onBack}
        className="w-full text-sm font-bold text-slate-500 hover:text-primary transition-colors flex items-center justify-center gap-2"
      >
        <span className="material-icons-round text-sm">arrow_back</span>
        Back to Login
      </button>
    </div>
  );
};

export default ForgotPassword;