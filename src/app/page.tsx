"use client";
import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Music, Calendar, DollarSign, TrendingUp, Search, 
  Settings, ExternalLink, PlayCircle, BarChart3, Clock,
  Plus, ChevronRight, CreditCard, Mic2, Download, Trash2, X,
  Layers, ShieldCheck, Share2, Eye, FileText, Zap
} from 'lucide-react';

function DashboardContent() {
  const searchParams = useSearchParams();
  const userRole = searchParams.get('role') || 'admin';
  const [tab, setTab] = useState(userRole === 'artist' ? 'roster' : 'insights');

  return (
    <div className="flex h-screen bg-[#000] text-white overflow-hidden font-sans antialiased selection:bg-white selection:text-black">
      
      {/* --- ELITE NOISE OVERLAY --- */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* --- MINIMALIST SIDEBAR --- */}
      <aside className="w-20 lg:w-64 border-r border-white/5 bg-black flex flex-col items-center lg:items-start p-4 lg:p-8 z-20 transition-all">
        <div className="mb-16 px-2">
          <span className="text-2xl font-black tracking-tighter uppercase italic leading-none block lg:hidden">B.</span>
          <span className="text-xl font-black tracking-[0.3em] uppercase italic leading-none hidden lg:block">
            BEAT<span className="text-zinc-600">DA</span>ODDS
          </span>
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

        <div className="mt-auto w-full">
          <div className="p-4 bg-zinc-900/40 border border-white/5 rounded-3xl hidden lg:block">
            <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-3">System Status</p>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
              <span className="text-[10px] font-bold uppercase tracking-tighter">Encrypted</span>
            </div>
          </div>
        </div>
      </aside>

      {/* --- MAIN STAGE --- */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        
        {/* HEADER */}
        <header className="h-24 border-b border-white/5 px-10 flex items-center justify-between sticky top-0 bg-black/50 backdrop-blur-3xl z-50">
          <div className="flex items-center gap-4">
            <h1 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-500">{tab}</h1>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative group hidden md:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={14} />
              <input type="text" placeholder="COMMAND + K" className="w-64 pl-12 pr-4 py-2 bg-zinc-900/50 border border-white/5 rounded-full text-[10px] font-bold tracking-widest outline-none focus:border-white/20 transition-all" />
            </div>
            <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
              <Plus size={18} />
            </button>
          </div>
        </header>

        {/* CONTENT AREA */}
        <div className="flex-1 overflow-y-auto p-10 lg:p-16 scrollbar-hide">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
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
/*                                ELITE VIEWS                                 */
/* -------------------------------------------------------------------------- */

function IntelligenceView() {
  return (
    <div className="space-y-16">
      <div className="flex justify-between items-end">
        <h2 className="text-7xl font-black italic tracking-tighter uppercase leading-[0.8]">Label<br/><span className="text-zinc-800">Intel.</span></h2>
        <div className="text-right pb-2">
           <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1">Market Cap</p>
           <p className="text-3xl font-black tracking-tighter">$2.4M</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
        <BentoCard label="Total Consumption" value="48.2M" sub="Streams" />
        <BentoCard label="Gross Revenue" value="$192K" sub="Monthly" />
        <BentoCard label="Audience Growth" value="+24%" sub="Global" />
      </div>

      <div className="h-[400px] bg-zinc-950 rounded-[3rem] border border-white/5 p-12 flex items-end gap-3 group">
        {[20, 40, 30, 60, 50, 80, 70, 100, 90, 60, 80, 110, 100, 120].map((h, i) => (
          <div key={i} className="flex-1 bg-zinc-900/50 rounded-full hover:bg-white transition-all duration-500" style={{ height: `${(h/120)*100}%` }} />
        ))}
      </div>
    </div>
  );
}

function RosterView() {
  return (
    <div className="space-y-12">
      <h2 className="text-7xl font-black italic tracking-tighter uppercase leading-[0.8]">The<br/><span className="text-zinc-800">Roster</span></h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <ArtistCard name="Young Legend" streams="12.4M" color="bg-zinc-800" />
        <ArtistCard name="Sarah Vox" streams="8.1M" color="bg-zinc-700" />
        <ArtistCard name="The Drifter" streams="2.4M" color="bg-zinc-900" />
      </div>
    </div>
  );
}

function VaultView() {
  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center">
        <h2 className="text-7xl font-black italic tracking-tighter uppercase leading-[0.8]">The<br/><span className="text-zinc-800">Vault</span></h2>
        <div className="flex gap-2">
           <button className="px-6 py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-full">Upload Masters</button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {["Original Wavs", "Stems", "Artwork", "Legal", "Demos", "Instrumentals", "Contracts", "Social Assets"].map(f => (
          <div key={f} className="p-10 bg-zinc-950 border border-white/5 rounded-[2.5rem] hover:bg-white hover:text-black transition-all group cursor-pointer">
             <div className="w-10 h-10 border border-white/10 rounded-xl mb-6 flex items-center justify-center group-hover:border-black/10">
               <Layers size={18} />
             </div>
             <p className="text-lg font-black tracking-tighter uppercase">{f}</p>
             <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest mt-2">142 Files</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SplitsView() {
  return (
    <div className="space-y-12">
      <h2 className="text-7xl font-black italic tracking-tighter uppercase leading-[0.8]">Legals<br/><span className="text-zinc-800">& Splits</span></h2>
      <div className="bg-zinc-950 border border-white/5 rounded-[3rem] overflow-hidden p-10">
        <div className="space-y-6">
           <div className="flex justify-between items-center pb-6 border-b border-white/5">
              <h3 className="text-xl font-bold uppercase italic tracking-tighter">Neon Skies (Official Remix)</h3>
              <button className="bg-zinc-900 p-2 px-4 rounded-full text-[10px] font-black uppercase tracking-widest">Generate PDF</button>
           </div>
           <div className="grid grid-cols-4 gap-10">
              <SplitCircle label="Label" value="50%" color="border-white" />
              <SplitCircle label="Artist" value="25%" color="border-zinc-700" />
              <SplitCircle label="Producer" value="15%" color="border-zinc-800" />
              <SplitCircle label="Writer" value="10%" color="border-zinc-900" />
           </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                UI COMPONENTS                               */
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

function BentoCard({ label, value, sub }: any) {
  return (
    <div className="bg-zinc-950 border border-white/5 p-10 rounded-[3rem] hover:bg-zinc-900/50 transition-all">
      <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] mb-2">{label}</p>
      <h4 className="text-5xl font-black tracking-tighter italic">{value}</h4>
      <p className="text-[10px] font-bold text-zinc-500 mt-2 uppercase tracking-widest">{sub}</p>
    </div>
  );
}

function ArtistCard({ name, streams, color }: any) {
  return (
    <div className="bg-zinc-950 border border-white/5 p-2 rounded-[3.5rem] hover:scale-[1.02] transition-all cursor-pointer group">
      <div className={`aspect-square w-full ${color} rounded-[3rem] mb-6 overflow-hidden relative`}>
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all" />
      </div>
      <div className="p-6 pt-0 text-center">
        <h4 className="text-3xl font-black tracking-tighter uppercase italic">{name}</h4>
        <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mt-2">{streams} Total Streams</p>
      </div>
    </div>
  );
}

function SplitCircle({ label, value, color }: any) {
  return (
    <div className="text-center">
      <div className={`w-24 h-24 rounded-full border-4 ${color} mx-auto mb-4 flex items-center justify-center`}>
        <span className="text-xl font-black tracking-tighter italic">{value}</span>
      </div>
      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{label}</p>
    </div>
  );
}

function StudioView() { return <IntelligenceView /> } // Placeholder
function FinanceView() { return <IntelligenceView /> } // Placeholder

export default function BeatDaOddsOS() {
  return (
    <Suspense fallback={<div className="h-screen bg-black" />}>
      <DashboardContent />
    </Suspense>
  );
}
