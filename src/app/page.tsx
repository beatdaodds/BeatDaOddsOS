"use client";
import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Music, Calendar, DollarSign, TrendingUp, Search, 
  Settings, ExternalLink, PlayCircle, BarChart3, Clock,
  Plus, ChevronRight, CreditCard, Mic2, Download, Trash2, X,
  Layers, ShieldCheck, Share2, Eye, FileText, Zap, Activity
} from 'lucide-react';

function DashboardContent() {
  const searchParams = useSearchParams();
  const userRole = searchParams.get('role') || 'admin';
  const [tab, setTab] = useState(userRole === 'artist' ? 'roster' : 'insights');

  return (
    <div className="flex h-screen bg-[#000] text-white overflow-hidden font-sans antialiased selection:bg-white selection:text-black">
      
      {/* --- ELITE NOISE OVERLAY --- */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* --- SIDEBAR --- */}
      <aside className="w-20 lg:w-64 border-r border-white/5 bg-black flex flex-col p-4 lg:p-8 z-20">
        <div className="mb-16 px-2">
          <span className="text-xl font-black tracking-[0.3em] uppercase italic leading-none hidden lg:block">
            BEAT<span className="text-zinc-600">DA</span>ODDS
          </span>
          <span className="text-2xl font-black italic block lg:hidden">B.</span>
        </div>
        
        <nav className="flex-1 space-y-2 w-full">
          {userRole === 'admin' && (
            <MenuBtn icon={<Zap size={18}/>} label="Intelligence" active={tab === 'insights'} onClick={() => setTab('insights')} />
          )}
          <MenuBtn icon={<Users size={18}/>} label="The Roster" active={tab === 'roster'} onClick={() => setTab('roster')} />
          <MenuBtn icon={<Layers size={18}/>} label="The Vault" active={tab === 'catalog'} onClick={() => setTab('catalog')} />
          <MenuBtn icon={<Mic2 size={18}/>} label="Studio" active={tab === 'studio'} onClick={() => setTab('studio')} />
          
          {userRole === 'admin' && (
            <>
              <MenuBtn icon={<CreditCard size={18}/>} label="Finance" active={tab === 'finance'} onClick={() => setTab('finance')} />
              <MenuBtn icon={<FileText size={18}/>} label="Legal/Splits" active={tab === 'splits'} onClick={() => setTab('splits')} />
            </>
          )}
        </nav>

        <div className="mt-auto">
          <div className="p-4 bg-zinc-900/40 border border-white/5 rounded-2xl hidden lg:block">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
              <span className="text-[10px] font-black uppercase tracking-widest">System Live</span>
            </div>
            <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-tighter italic">{userRole} AUTHENTICATED</p>
          </div>
        </div>
      </aside>

      {/* --- MAIN STAGE --- */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-black">
        
        {/* HEADER */}
        <header className="h-24 border-b border-white/5 px-10 flex items-center justify-between sticky top-0 bg-black/50 backdrop-blur-3xl z-50">
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse mr-2" />
            <h1 className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500">{tab}</h1>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative group hidden md:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={14} />
              <input type="text" placeholder="GLOBAL COMMAND..." className="w-64 pl-12 pr-4 py-2 bg-zinc-900/50 border border-white/5 rounded-full text-[10px] font-bold tracking-widest outline-none focus:border-white/20 transition-all" />
            </div>
            <button className="bg-white text-black px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:invert transition-all">
              Action
            </button>
          </div>
        </header>

        {/* CONTENT AREA */}
        <div className="flex-1 overflow-y-auto p-10 lg:p-16 scrollbar-hide">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
            >
              {tab === 'insights' && <IntelligenceView />}
              {tab === 'roster' && <RosterView />}
              {tab === 'catalog' && <VaultView />}
              {tab === 'studio' && <StudioView />}
              {tab === 'finance' && <FinanceView />}
              {tab === 'splits' && <SplitsView />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                UNIQUE VIEWS                                */
/* -------------------------------------------------------------------------- */

function IntelligenceView() {
  return (
    <div className="space-y-16">
      <h2 className="text-7xl font-black italic tracking-tighter uppercase leading-[0.8]">Label<br/><span className="text-zinc-800 text-6xl">Intelligence</span></h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
        <MetricBox label="Global Consumption" value="124.8M" sub="Streams" />
        <MetricBox label="Market Share" value="4.2%" sub="Global" />
        <MetricBox label="Projected Rev" value="$842K" sub="Yearly" />
      </div>
      <div className="h-[300px] flex items-end gap-2 px-4 border-b border-white/5 pb-8">
        {[40, 70, 45, 90, 65, 80, 100, 55, 75, 40, 60, 85, 30, 95].map((h, i) => (
          <div key={i} className="flex-1 bg-zinc-900 rounded-t-sm hover:bg-white transition-all cursor-crosshair" style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
}

function RosterView() {
  return (
    <div className="space-y-12">
      <h2 className="text-7xl font-black italic tracking-tighter uppercase leading-[0.8]">Label<br/><span className="text-zinc-800 text-6xl">Roster</span></h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {["Young Legend", "Sarah Vox", "The Drifter", "Ghost Kid"].map(name => (
          <div key={name} className="p-8 bg-zinc-950 border border-white/5 rounded-[2.5rem] flex items-center justify-between group hover:border-white/20 transition-all">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-zinc-900 rounded-2xl group-hover:scale-110 transition-transform" />
              <div>
                <h4 className="text-2xl font-black uppercase italic tracking-tighter">{name}</h4>
                <p className="text-[10px] font-bold text-zinc-600 tracking-[0.2em] uppercase">Active Status</p>
              </div>
            </div>
            <ChevronRight className="text-zinc-800 group-hover:text-white" />
          </div>
        ))}
      </div>
    </div>
  );
}

function VaultView() {
  return (
    <div className="space-y-12">
      <h2 className="text-7xl font-black italic tracking-tighter uppercase leading-[0.8]">The<br/><span className="text-zinc-800 text-6xl">Vault</span></h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {["Master Wavs", "Stems", "Artwork", "Legal Docs", "Demos", "Videos", "Instrumentals", "Contracts"].map(f => (
          <div key={f} className="aspect-square bg-zinc-950 border border-white/5 rounded-[3rem] p-8 flex flex-col justify-between hover:bg-white hover:text-black transition-all group cursor-pointer">
            <Layers size={24} className="text-zinc-700 group-hover:text-black" />
            <div>
              <p className="text-lg font-black uppercase tracking-tighter">{f}</p>
              <p className="text-[10px] font-bold uppercase opacity-40">View Folder</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StudioView() {
  return (
    <div className="space-y-12">
      <h2 className="text-7xl font-black italic tracking-tighter uppercase leading-[0.8]">Studio<br/><span className="text-zinc-800 text-6xl">Control</span></h2>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-zinc-950 border border-white/5 rounded-[3rem] p-10">
          <div className="grid grid-cols-7 gap-4">
            {Array.from({ length: 28 }).map((_, i) => (
              <div key={i} className={`aspect-square border border-white/5 rounded-2xl p-3 text-[10px] font-bold ${i === 12 ? 'bg-white text-black' : 'text-zinc-700'}`}>
                {i + 1}
                {i === 12 && <div className="mt-2 uppercase font-black text-[8px]">Studio A</div>}
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
           <div className="p-8 bg-zinc-900/50 border border-white/5 rounded-[2.5rem]">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 mb-4">Now Recording</p>
              <h4 className="text-2xl font-black italic tracking-tighter mb-1">Young Legend</h4>
              <p className="text-xs text-emerald-500 font-bold uppercase tracking-widest">Studio A — Live</p>
           </div>
           <div className="p-8 border border-white/5 rounded-[2.5rem] flex items-center justify-center border-dashed group cursor-pointer">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 group-hover:text-white transition-colors">Book Session +</p>
           </div>
        </div>
      </div>
    </div>
  );
}

function FinanceView() {
  return (
    <div className="space-y-12">
      <h2 className="text-7xl font-black italic tracking-tighter uppercase leading-[0.8]">Global<br/><span className="text-zinc-800 text-6xl">Ledger</span></h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-10 bg-zinc-950 border border-white/5 rounded-[3rem]">
          <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-2">Total Balance</p>
          <h4 className="text-5xl font-black italic tracking-tighter">$142,900</h4>
        </div>
        <div className="p-10 bg-zinc-950 border border-white/5 rounded-[3rem]">
          <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-2">Pending Payouts</p>
          <h4 className="text-5xl font-black italic tracking-tighter text-zinc-800">$12,410</h4>
        </div>
      </div>
      <div className="bg-zinc-950 border border-white/5 rounded-[3rem] overflow-hidden">
        <table className="w-full text-left">
          <thead className="border-b border-white/5 text-[10px] text-zinc-600 uppercase font-black tracking-widest">
            <tr><th className="p-8">Description</th><th>Amount</th><th className="p-8 text-right">Date</th></tr>
          </thead>
          <tbody className="text-[11px] font-bold uppercase tracking-tighter">
            {[1, 2, 3].map(i => (
              <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-8 text-white">Spotify Royalty Distribution Q{i}</td>
                <td className="text-emerald-500">+$2,400.00</td>
                <td className="p-8 text-right text-zinc-600">OCT 12, 2024</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SplitsView() {
  return (
    <div className="space-y-12">
      <h2 className="text-7xl font-black italic tracking-tighter uppercase leading-[0.8]">Split<br/><span className="text-zinc-800 text-6xl">Contracts</span></h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[1, 2].map(i => (
          <div key={i} className="p-10 bg-zinc-950 border border-white/5 rounded-[3rem]">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-xl font-black italic uppercase tracking-tighter">Project Name {i}</h3>
              <FileText size={18} className="text-zinc-800" />
            </div>
            <div className="flex gap-4">
              <div className="flex-1 h-2 bg-white rounded-full" style={{ width: '50%' }} />
              <div className="flex-1 h-2 bg-zinc-700 rounded-full" style={{ width: '25%' }} />
              <div className="flex-1 h-2 bg-zinc-800 rounded-full" style={{ width: '25%' }} />
            </div>
            <div className="mt-6 flex justify-between text-[9px] font-black uppercase tracking-widest text-zinc-500">
              <span>Label 50%</span>
              <span>Artist 25%</span>
              <span>Producer 25%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                CORE UI PARTS                               */
/* -------------------------------------------------------------------------- */

function MenuBtn({ icon, label, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-4 py-4 rounded-full text-[10px] font-black tracking-[0.2em] uppercase transition-all duration-500 ${
        active ? 'bg-white text-black' : 'text-zinc-600 hover:text-white'
      }`}
    >
      {icon} <span className="hidden lg:block">{label}</span>
    </button>
  );
}

function MetricBox({ label, value, sub }: any) {
  return (
    <div className="bg-zinc-950 border border-white/5 p-10 rounded-[3rem] hover:bg-zinc-900/50 transition-all">
      <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] mb-2">{label}</p>
      <h4 className="text-5xl font-black tracking-tighter italic">{value}</h4>
      <p className="text-[10px] font-bold text-zinc-500 mt-2 uppercase tracking-widest">{sub}</p>
    </div>
  );
}

export default function BeatDaOddsOS() {
  return (
    <Suspense fallback={<div className="h-screen bg-black" />}>
      <DashboardContent />
    </Suspense>
  );
}
