import React, { useState } from 'react';
import { Shield, User, Lock, Mail, ArrowRight, Eye, EyeOff } from 'lucide-react';

interface LoginProps {
  onLogin: (role: 'operator' | 'owner') => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [role, setRole] = useState<'operator' | 'owner'>('operator');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = ( Leeds: React.FormEvent) => {
    Leeds.preventDefault();
    setError('');
    setLoading(true);

    // Artificial delay for futuristic feel
    setTimeout(() => {
      if (role === 'operator') {
        if (email === 'ekansh24102@iiitnr.edu.in' && password === 'EKANSH@123') {
          onLogin('operator');
        } else {
          setError('Invalid Fleet Operator credentials');
        }
      } else {
        if (email === 'akshita24101@iiitnr.edu.in' && password === 'AKSHITA@123') {
          onLogin('owner');
        } else {
          setError('Invalid Owner credentials');
        }
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex font-doto relative overflow-hidden z-20">
      {/* Background image */}
      <div className="absolute inset-0 -z-10" style={{ backgroundImage: "url('/AUDI_RS5_Sportback_BG.png')", backgroundSize: 'cover', backgroundPosition: 'center left', backgroundRepeat: 'no-repeat' }}></div>

      {/* Left half — empty, shows car */}
      <div className="hidden lg:flex flex-1" />

      {/* Right half — login panel */}
      <div className="w-full lg:w-[480px] shrink-0 flex items-center justify-center p-8 lg:mr-24">
      <div className="w-full max-w-md card-hover bg-dark-800/40 backdrop-blur-xl border border-dark-700/50 rounded-[2.5rem] p-8 lg:p-12 shadow-2xl relative">
        {/* Glowing accent dots */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-amethyst-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-3xl"></div>

        <div className="text-center mb-10">
          <h1 className="text-4xl font-black tracking-[0.25em] text-white uppercase mb-2 pl-[0.25em]">CyphEV</h1>
          <p className="text-[9px] text-cyphgray tracking-[0.3em] uppercase font-black pl-[0.3em]">REAL-TIME VEHICLE DASHBOARD</p>
        </div>

        {/* Role Selection */}
        <div className="flex gap-2 p-1.5 bg-dark-900/50 rounded-2xl border border-dark-700/50 mb-8">
          <button
            onClick={() => setRole('operator')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all duration-300 ${
              role === 'operator' ? 'bg-amethyst-500 text-white shadow-lg' : 'text-cyphgray hover:text-gray-300'
            }`}
          >
            <Shield size={14} /> Fleet Operator
          </button>
          <button
            onClick={() => setRole('owner')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all duration-300 ${
              role === 'owner' ? 'bg-amethyst-500 text-white shadow-lg' : 'text-cyphgray hover:text-gray-300'
            }`}
          >
            <User size={14} /> Owner
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] text-cyphgray font-black uppercase tracking-widest ml-1">EMAIL ID</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-amethyst-400 transition-colors" size={18} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your registered Email-ID"
                className="w-full bg-dark-900/50 border border-dark-700/50 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-amethyst-500/50 focus:ring-1 focus:ring-amethyst-500/20 transition-all placeholder-cyphgray/50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] text-cyphgray font-black uppercase tracking-widest ml-1">PASSWORD</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-amethyst-400 transition-colors" size={18} />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your Password"
                className="w-full bg-dark-900/50 border border-dark-700/50 rounded-2xl py-4 pl-12 pr-12 text-sm focus:outline-none focus:border-amethyst-500/50 focus:ring-1 focus:ring-amethyst-500/20 transition-all placeholder-cyphgray/50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-amethyst-400 transition-colors focus:outline-none"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-center">
              <p className="text-[10px] text-red-400 font-black uppercase tracking-widest">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amethyst-500 hover:bg-amethyst-600 disabled:bg-amethyst-800 disabled:cursor-not-allowed text-white rounded-2xl py-4 font-black uppercase tracking-[0.3em] text-[10px] shadow-xl shadow-amethyst-500/20 transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
            ) : (
              <span className="pl-[0.3em]">AUTHENTICATE</span>
            )}
            {!loading && <ArrowRight size={14} />}
          </button>
        </form>

        <div className="mt-10 pt-6 border-t border-dark-700/30 text-center">
          <p className="text-[8px] text-cyphgray font-black uppercase tracking-widest leading-relaxed">
            Unified Plug-and-Play Edge-based Cyber-Physical Intrusion Detection and Battery Monitoring System for Electric Vehicles.
          </p>
        </div>
      </div>
      </div>
    </div>
  );
};