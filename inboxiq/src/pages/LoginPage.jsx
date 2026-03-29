import React, { useState } from 'react';
import { ArrowRight, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import Logo from '../components/ui/Logo';
import { auth } from '../firebase';

export default function LoginPage({ onNavigate }) {
  const [email, setEmail] = useState('admin@company.com');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  async function handleLogin() {
    try {
      setLoading(true);
      setError('');

      await signInWithEmailAndPassword(auth, email, password);

      setLoading(false);
      onNavigate('dashboard');
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  }

  async function handleRegister() {
    try {
      setLoading(true);
      setError('');

      await createUserWithEmailAndPassword(auth, email, password);

      setLoading(false);
      onNavigate('dashboard');
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  }

  async function handleGoogleLogin() {
    try {
      setGoogleLoading(true);
      setError('');

      window.location.href = 'http://localhost:5000/auth/google';
    } catch (err) {
      setGoogleLoading(false);
      setError(err.message);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-grid relative overflow-hidden"
      style={{ backgroundColor: '#040d1a' }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full opacity-8"
          style={{ background: 'radial-gradient(circle, #22d3ee, transparent 70%)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] rounded-full opacity-6"
          style={{ background: 'radial-gradient(circle, #8b5cf6, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 w-full max-w-md px-6 animate-fade-in">
        <div
          className="rounded-3xl p-8 border border-white/8"
          style={{
            background: 'rgba(7,20,40,0.9)',
            backdropFilter: 'blur(24px)',
            boxShadow: '0 0 60px rgba(34,211,238,0.08)',
          }}
        >
          <div className="flex justify-center mb-8">
            <Logo size="lg" />
          </div>

          <h2 className="text-2xl font-display font-bold text-slate-100 text-center mb-1">
            {isRegister ? 'Create your account' : 'Welcome back'}
          </h2>
          <p className="text-sm text-slate-500 text-center mb-8">
            {isRegister ? 'Register to start using InboxIQ' : 'Sign in to your workspace'}
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-xs text-slate-400 font-medium mb-2">
                Work Email
              </label>
              <div className="relative">
                <Mail
                  size={15}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/8 text-slate-200 text-sm focus:outline-none focus:border-cyan-500/50 focus:bg-cyan-500/5 transition-all placeholder-slate-600"
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-400 font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={15}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-11 pr-12 py-3.5 rounded-xl bg-white/5 border border-white/8 text-slate-200 text-sm focus:outline-none focus:border-cyan-500/50 focus:bg-cyan-500/5 transition-all placeholder-slate-600"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            )}

            {!isRegister && (
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded accent-cyan-500" />
                  Remember me
                </label>
                <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                  Forgot password?
                </a>
              </div>
            )}

            <button
              onClick={isRegister ? handleRegister : handleLogin}
              disabled={loading || googleLoading}
              className="w-full py-4 rounded-xl font-semibold text-sm transition-all active:scale-98 flex items-center justify-center gap-2"
              style={{
                background:
                  loading || googleLoading
                    ? 'rgba(34,211,238,0.3)'
                    : 'linear-gradient(135deg, #22d3ee, #8b5cf6)',
                color: '#040d1a',
                boxShadow:
                  loading || googleLoading
                    ? 'none'
                    : '0 0 30px rgba(34,211,238,0.2)',
              }}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  {isRegister ? 'Creating Account...' : 'Authenticating...'}
                </>
              ) : (
                <>
                  {isRegister ? 'Create Account' : 'Enter Workspace'} <ArrowRight size={15} />
                </>
              )}
            </button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-[#071428] px-3 text-xs text-slate-500">or</span>
              </div>
            </div>

            <button
              onClick={handleGoogleLogin}
              disabled={loading || googleLoading}
              className="w-full py-3.5 rounded-xl border border-white/10 bg-white/5 text-slate-200 text-sm font-semibold hover:bg-white/10 transition-all"
            >
              {googleLoading ? 'Connecting Google...' : 'Continue with Google'}
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-white/5 text-center">
            <p className="text-xs text-slate-500">
              {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                type="button"
                onClick={() => setIsRegister(!isRegister)}
                className="text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                {isRegister ? 'Sign in' : 'Start free trial'}
              </button>
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('landing')}
          className="mt-6 w-full text-center text-xs text-slate-600 hover:text-slate-400 transition-colors"
        >
          ← Back to homepage
        </button>
      </div>
    </div>
  );
}