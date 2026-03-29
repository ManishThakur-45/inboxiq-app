import React from 'react';
import { ArrowRight, Zap, Shield, BarChart2, Inbox, CheckCircle, ChevronRight } from 'lucide-react';
import Logo from '../components/ui/Logo';

const features = [
  { icon: <Zap size={18} />, title: 'Auto-Triage', desc: 'AI instantly classifies every email into Billing, Technical, Sales, Support, or Spam.' },
  { icon: <Shield size={18} />, title: 'Spam Shield', desc: 'Advanced keyword detection blocks malicious and unwanted email before it reaches your team.' },
  { icon: <BarChart2 size={18} />, title: 'Analytics', desc: 'Real-time dashboards show category mix, routing accuracy, and AI confidence trends.' },
  { icon: <Inbox size={18} />, title: 'Smart Routing', desc: 'Emails are automatically assigned to the right department with suggested actions.' },
];

export default function LandingPage({ onNavigate }) {
  return (
    <div className="min-h-screen bg-grid" style={{ backgroundColor: '#040d1a' }}>
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-200px] left-1/4 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #22d3ee, transparent 70%)' }} />
        <div className="absolute top-[100px] right-1/4 w-[400px] h-[400px] rounded-full opacity-8"
          style={{ background: 'radial-gradient(circle, #8b5cf6, transparent 70%)' }} />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-5 border-b border-white/5"
        style={{ background: 'rgba(4,13,26,0.8)', backdropFilter: 'blur(12px)' }}>
        <Logo />
        <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
          {['Features', 'Pricing', 'Docs', 'Blog'].map(l => (
            <a key={l} href="#" className="hover:text-cyan-400 transition-colors">{l}</a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate('login')} className="text-sm text-slate-400 hover:text-slate-200 transition-colors px-4 py-2">
            Sign In
          </button>
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-navy-900 transition-all hover:opacity-90 active:scale-95"
            style={{ background: 'linear-gradient(135deg, #22d3ee, #8b5cf6)', color: '#040d1a' }}
          >
            Open Workspace <ArrowRight size={14} />
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 pt-24 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/25 bg-cyan-500/8 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs text-cyan-400 font-medium">AI Engine v2.1 — Live</span>
            </div>

            <h1 className="font-display text-5xl lg:text-6xl font-bold leading-[1.1] mb-6"
              style={{ background: 'linear-gradient(135deg, #f1f5f9 0%, #94a3b8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Connect inbox.<br />Fetch emails.<br />
              <span style={{ background: 'linear-gradient(135deg, #22d3ee, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Auto-analyze everything.
              </span>
            </h1>

            <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-lg">
              InboxIQ is an enterprise-grade AI inbox triage system that automatically fetches, classifies, prioritizes, and routes every email to the right team — in milliseconds.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <button
                onClick={() => onNavigate('dashboard')}
                className="flex items-center gap-2 px-7 py-4 rounded-xl font-semibold text-sm transition-all hover:opacity-90 active:scale-95"
                style={{ background: 'linear-gradient(135deg, #22d3ee, #8b5cf6)', color: '#040d1a', boxShadow: '0 0 40px rgba(34,211,238,0.25)' }}
              >
                Open Workspace <ArrowRight size={15} />
              </button>
              <button
                onClick={() => onNavigate('connected')}
                className="flex items-center gap-2 px-7 py-4 rounded-xl font-semibold text-sm border border-white/10 text-slate-200 bg-white/5 hover:bg-white/10 hover:border-cyan-500/30 transition-all"
              >
                View Connected Inbox <ChevronRight size={15} />
              </button>
            </div>

            <div className="flex items-center gap-6">
              {['No backend required', 'Real-time analysis', '94% accuracy'].map(f => (
                <div key={f} className="flex items-center gap-2 text-xs text-slate-500">
                  <CheckCircle size={12} className="text-green-500" />
                  {f}
                </div>
              ))}
            </div>
          </div>

          {/* Right — product preview card */}
          <div className="relative">
            <div className="rounded-3xl p-6 border border-white/8"
              style={{ background: 'rgba(7,20,40,0.85)', backdropFilter: 'blur(20px)', boxShadow: '0 0 80px rgba(34,211,238,0.1)' }}>
              {/* Fake topbar */}
              <div className="flex items-center gap-2 mb-5">
                <div className="flex gap-1.5">
                  {['#ef4444','#f59e0b','#22c55e'].map(c => <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />)}
                </div>
                <div className="flex-1 h-6 rounded-lg bg-white/5 flex items-center px-3">
                  <span className="text-xs text-slate-600 font-mono">inboxiq.app/smart-inbox</span>
                </div>
              </div>

              {/* Mock email rows */}
              {[
                { cat: 'Critical', color: '#ef4444', subj: 'URGENT: Production Server Down', dept: 'Engineering', conf: 96 },
                { cat: 'Billing', color: '#3b82f6', subj: 'Invoice #4821 — Payment Overdue', dept: 'Finance', conf: 92 },
                { cat: 'Technical', color: '#8b5cf6', subj: 'Bug Report: OAuth Fails Safari 17', dept: 'Engineering', conf: 89 },
                { cat: 'Spam', color: '#ef4444', subj: "You've won a $1000 Gift Card!", dept: 'Blocked', conf: 98 },
                { cat: 'Sales', color: '#22c55e', subj: 'Enterprise License Renewal Q3', dept: 'Sales', conf: 85 },
              ].map((row, i) => (
                <div key={i} className={`flex items-center gap-3 p-3 rounded-xl mb-2 border border-white/5 bg-white/3 ${i === 0 ? 'border-red-500/20 bg-red-500/5' : ''}`}>
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ background: row.color }} />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-slate-200 truncate font-medium">{row.subj}</div>
                    <div className="text-[11px] text-slate-600 mt-0.5">{row.dept}</div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-mono text-slate-500">{row.conf}%</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md font-medium" style={{ background: `${row.color}20`, color: row.color }}>
                      {row.cat}
                    </span>
                  </div>
                </div>
              ))}

              {/* AI tag */}
              <div className="mt-4 p-3 rounded-xl border border-cyan-500/20 bg-cyan-500/5">
                <div className="flex items-center gap-2 text-xs text-cyan-400">
                  <Zap size={12} />
                  <span>AI analyzed 5 emails in 0.3s · 2 require immediate action</span>
                </div>
              </div>
            </div>

            {/* Floating decorative badges */}
            <div className="absolute -top-4 -right-4 px-3 py-2 rounded-xl border border-violet-500/30 bg-violet-500/10 text-xs text-violet-400 font-medium backdrop-blur">
              🧠 AI Powered
            </div>
            <div className="absolute -bottom-4 -left-4 px-3 py-2 rounded-xl border border-green-500/30 bg-green-500/10 text-xs text-green-400 font-medium backdrop-blur">
              ⚡ Real-time Triage
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-slate-100 mb-3">Everything your team needs</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Built for enterprise inbox management at scale. Powered by AI, designed for humans.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map(f => (
              <div key={f.title} className="p-6 rounded-2xl border border-white/6 bg-white/2 hover:border-cyan-500/20 hover:bg-cyan-500/3 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="text-sm font-semibold text-slate-200 mb-2">{f.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8 px-8 flex items-center justify-between">
        <Logo size="sm" />
        <p className="text-xs text-slate-600">© 2024 InboxIQ. AI-Powered Email Intelligence.</p>
      </footer>
    </div>
  );
}
