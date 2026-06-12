"use client";
import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Music, Calendar, DollarSign, TrendingUp, Search, 
  Settings, ExternalLink, PlayCircle, BarChart3, Clock,
  Plus, ChevronRight, CreditCard, Mic2, Download, Share2
} from 'lucide-react';

// This wrapper is required by Next.js when using searchParams
function DashboardContent() {
  const searchParams = useSearchParams();
  const userRole = searchParams.get('role') || 'admin';
  const [tab, setTab] = useState(userRole === 'artist' ? 'roster' : 'insights');

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden font-sans selection:bg-white selection:text-black">
      
      {/* --- SIDEBAR NAVIGATION --- */}
      <aside className="w-64 border-r border-zinc-900 bg-[#050505] flex flex-col p-6 z-20">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            <div className="w-4 h-4 bg-black rounded-sm rotate-45" />
          </div>
          <span className="text-lg font-black tracking-tighter uppercase italic">BDO OS</span>
        </div>
        
        <nav className="flex-1 space-y-1">
          {userRole === 'admin' && (
            <MenuBtn icon={<TrendingUp size={18}/>} label="Label Insights" active={tab === 'insights'} onClick={() => setTab('insights')} />
          )}

          <MenuBtn icon={<Users size={18}/>} label={userRole === 'admin' ? "Artist Roster" : "Label Roster"} active={tab === 'roster'} onClick={() => setTab('roster')} />
          <MenuBtn icon={<Music size={18}/>} label="Global Catalog" active={tab === 'catalog'} onClick={() => setTab('catalog')} />
          <MenuBtn icon={<Calendar size={18}/>} label="Studio Sessions" active={tab === 'studio'} onClick={() => setTab('studio')} />
          
          {userRole === 'admin' && (
            <>
              <MenuBtn icon={<CreditCard size={18}/>} label="Finance Hub" active={tab === 'finance'} onClick={() => setTab('finance')} />
              <MenuBtn icon={<ExternalLink size={18}/>} label="Quick Links" active={tab === 'links'} onClick={() => setTab('links')} />
            </>
          )}
        </nav>

        <div className="mt-auto pt-6 border-t border-zinc-900">
          <div className="flex items-center gap-3 p-3 bg-zinc-950 border border-zinc-900 rounded-2xl">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-zinc-600 to-zinc-900 border border-zinc-800" />
            <div className="text-[10px]">
              <p className="font-bold">{userRole === 'admin' ? 'Label Admin' : 'Label Artist'}</p>
              <p className="text-zinc-500 uppercase tracking-tighter">{userRole} Portal</p>
            </div>
          </div>
        </div>
      </aside>

      {/* --- MAIN INTERFACE --- */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-black">
        <header className="h-20 border-b border-zinc-900 px-10 flex items-center justify-between sticky top-0 bg-black/60 backdrop-blur-2xl z-50">
          <div className="relative w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
            <input 
              type="text" 
              placeholder="Search ISRC, Artists..." 
              className="w-full pl-12 pr-4 py-2.5 bg-zinc-900/40 border border-zinc-800/50 rounded-full text-xs focus:outline-none focus:border-zinc-600 transition-all text-white" 
            />
          </div>
          
          <div className="flex items-center gap-6">
            {userRole === 'admin' && (
              <button className="bg-white text-black px-6 py-2.5 rounded-full text-xs font-black hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                + NEW PROJECT
              </button>
            )}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-12 max-w-7xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {tab === 'insights' && userRole === 'admin' && <InsightsView />}
              {tab === 'roster' && <RosterView />}
              {tab === 'catalog' && <CatalogView />}
              {tab === 'studio' && <StudioView />}
              {tab === 'finance' && userRole === 'admin' && <FinanceView />}
              {tab === 'links' && userRole === 'admin' && <LinksView />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

// Main Page Export with Suspense wrapper (Fixes Next.js requirement)
export default function BeatDaOddsOS() {
  return (
    <Suspense fallback={<div className="h-screen bg-black flex items-center justify-center text-white font-bold">LOADING OS...</div>}>
      <DashboardContent />
    </Suspense>
  );
}

/* --- SUB-VIEWS --- */

function InsightsView() {
  return (
    <div className="space-y-12">
      <h2 className="text-4xl font-black italic uppercase tracking-tighter">Insights</h2>
      <div className="grid grid-cols-4 gap-6">
        <StatCard label="Monthly Streams" value="12.4M" trend="+18.2%" />
        <StatCard label="Net Revenue" value="$52,890" trend="+4.1%" />
        <StatCard label="TikTok UGC" value="14.2K" trend="+22.5%" />
        <StatCard label="Active Artists" value="14" trend="+1" />
      </div>
      <div className="bg-zinc-950 border border-zinc-900 rounded-[2rem] p-10 h-64 flex items-end gap-2">
        {[40, 70, 45, 90, 65, 80, 100, 55, 75, 40].map((h, i) => (
          <div key={i} className="flex-1 bg-zinc-900 rounded-t-lg hover:bg-white transition-all" style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
}

function RosterView() {
  const artists = [
    { name: "Young Legend", listeners: "1.2M", status: "Active" },
    { name: "Sarah Vox", listeners: "850K", status: "Recording" },
    { name: "The Drifter", listeners: "210K", status: "On Tour" },
  ];
  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-black italic uppercase tracking-tighter">Roster</h2>
      <div className="grid grid-cols-2 gap-6">
        {artists.map(a => (
          <div key={a.name} className="p-8 bg-zinc-950 border border-zinc-900 rounded-[2rem] flex items-center justify-between group hover:border-zinc-500 transition-all">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-zinc-800 rounded-2xl group-hover:scale-105 transition-transform" />
              <div>
                <h4 className="text-xl font-bold">{a.name}</h4>
                <p className="text-xs text-zinc-500 uppercase font-black">{a.listeners} Listeners</p>
              </div>
            </div>
            <ChevronRight className="text-zinc-800 group-hover:text-white" />
          </div>
        ))}
      </div>
    </div>
  );
}

function CatalogView() {
  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-black italic uppercase tracking-tighter">Global Catalog</h2>
      <div className="bg-zinc-950 border border-zinc-900 rounded-[2rem] overflow-hidden">
        <table className="w-full text-left">
          <thead className="border-b border-zinc-900 text-[10px] text-zinc-500 uppercase font-black tracking-widest">
            <tr>
              <th className="p-8">Track</th>
              <th>Artist</th>
              <th>Streams</th>
              <th className="p-8">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm font-bold">
            {[1, 2, 3].map(i => (
              <tr key={i} className="border-b border-zinc-900 hover:bg-zinc-900/50 transition-colors cursor-pointer">
                <td className="p-8">Neon Lights {i}</td>
                <td className="text-zinc-500">Young Legend</td>
                <td>42,902</td>
                <td className="p-8"><span className="text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full text-[10px]">Released</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StudioView() {
  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-black italic uppercase tracking-tighter">Studio Sessions</h2>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-zinc-950 border border-zinc-900 rounded-[2rem] p-10 grid grid-cols-7 gap-2">
          {Array.from({ length: 28 }).map((_, i) => (
            <div key={i} className="aspect-square border border-zinc-900 rounded-xl p-2 text-[10px] text-zinc-700">{i + 1}</div>
          ))}
        </div>
        <div className="space-y-4">
          <div className="p-6 bg-white text-black rounded-[2rem] font-black text-center text-xs uppercase tracking-widest">Book New Session</div>
          <div className="p-6 bg-zinc-950 border border-zinc-900 rounded-[2rem]">
            <p className="text-[10px] text-zinc-500 uppercase font-black mb-4">Upcoming</p>
            <p className="text-sm font-bold">Legend - Studio A</p>
            <p className="text-xs text-zinc-500">Today, 2:00 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FinanceView() {
  return (
    <div className="space-y-12">
      <h2 className="text-4xl font-black italic uppercase tracking-tighter">Finance Hub</h2>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-zinc-950 p-10 rounded-[2rem] border border-zinc-900">
          <p className="text-[10px] text-zinc-500 uppercase font-black mb-2">Net Balance</p>
          <h2 className="text-4xl font-black">$142,900</h2>
        </div>
        <div className="bg-zinc-950 p-10 rounded-[2rem] border border-zinc-900">
          <p className="text-[10px] text-zinc-500 uppercase font-black mb-2">Pending Payouts</p>
          <h2 className="text-4xl font-black text-zinc-500">$8,410</h2>
        </div>
      </div>
    </div>
  );
}

function LinksView() {
  return (
    <div className="space-y-12">
      <h2 className="text-4xl font-black italic uppercase tracking-tighter">Quick Links</h2>
      <div className="grid grid-cols-3 gap-6">
        {["Spotify for Artists", "Apple Music", "TikTok CMS"].map(link => (
          <div key={link} className="p-8 bg-zinc-950 border border-zinc-900 rounded-[2rem] hover:bg-zinc-900 transition-all cursor-pointer group">
            <h4 className="font-bold group-hover:text-emerald-400 transition-colors">{link}</h4>
            <p className="text-xs text-zinc-500 mt-2">Launch external portal</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* --- HELPER COMPONENTS --- */

function MenuBtn({ icon, label, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-[13px] font-black tracking-tighter transition-all duration-300 ${
        active ? 'bg-white text-black shadow-lg shadow-white/10' : 'text-zinc-500 hover:text-white hover:bg-zinc-900/50'
      }`}
    >
      {icon} {label}
    </button>
  );
}

function StatCard({ label, value, trend }: any) {
  return (
    <div className="bg-zinc-950 border border-zinc-900 p-8 rounded-[2rem] hover:border-zinc-700 transition-all">
      <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-3">{label}</p>
      <div className="flex items-end justify-between">
        <h4 className="text-2xl font-black italic tracking-tighter">{value}</h4>
        <span className="text-[10px] font-bold text-emerald-500">{trend}</span>
      </div>
    </div>
  );
}
