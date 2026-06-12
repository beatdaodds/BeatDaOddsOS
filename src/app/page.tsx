"use client";
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Music, Calendar, DollarSign, TrendingUp, Search, 
  Settings, ExternalLink, PlayCircle, BarChart3, Clock,
  Plus, ChevronRight, CreditCard, Mic2, Download, Trash2, X
} from 'lucide-react';

// --- DATA PERSISTENCE ENGINE ---
const useLocalStorage = (key: string, initialValue: any) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const saved = localStorage.getItem(key);
    if (saved) setValue(JSON.parse(saved));
  }, [key]);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

function DashboardContent() {
  const searchParams = useSearchParams();
  const userRole = searchParams.get('role') || 'admin';
  const [tab, setTab] = useState(userRole === 'artist' ? 'roster' : 'insights');

  // --- STATEFUL DATA ---
  const [artists, setArtists] = useLocalStorage('bdo_artists', [
    { id: 1, name: "Young Legend", listeners: "1.2M", status: "Active" },
    { id: 2, name: "Sarah Vox", listeners: "850K", status: "Recording" }
  ]);

  const [finance, setFinance] = useLocalStorage('bdo_finance', [
    { id: 1, type: 'Income', amount: 4500, label: 'Spotify Royalty Q3', date: '2024-10-01' },
    { id: 2, type: 'Expense', amount: 1200, label: 'Studio Rental', date: '2024-10-05' }
  ]);

  const [sessions, setSessions] = useLocalStorage('bdo_sessions', [
    { id: 1, artist: 'Young Legend', time: '14:00', room: 'Studio A' }
  ]);

  // --- CALCULATIONS ---
  const totalBalance = finance.reduce((acc: number, curr: any) => 
    curr.type === 'Income' ? acc + curr.amount : acc - curr.amount, 0);

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden font-sans antialiased selection:bg-white selection:text-black">
      
      {/* --- SIDEBAR --- */}
      <aside className="w-64 border-r border-zinc-900 bg-black flex flex-col p-6 z-20">
        <div className="mb-12 px-2">
          <span className="text-2xl font-black tracking-tighter uppercase italic leading-none">
            BEAT<span className="text-zinc-500">DA</span>ODDS
          </span>
          <div className="h-1 w-6 bg-white mt-1" />
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
            <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700" />
            <div className="text-[10px]">
              <p className="font-bold">{userRole === 'admin' ? 'Admin User' : 'Artist User'}</p>
              <p className="text-zinc-500 uppercase tracking-tighter">{userRole} Access</p>
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
              placeholder="Search OS..." 
              className="w-full pl-12 pr-4 py-2.5 bg-zinc-900/40 border border-zinc-800/50 rounded-full text-xs focus:outline-none focus:border-zinc-600 transition-all text-white placeholder-zinc-700" 
            />
          </div>
          <div className="flex items-center gap-4">
             <span className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.2em]">Ready for release</span>
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
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
              {tab === 'insights' && <InsightsView balance={totalBalance} artists={artists.length} />}
              {tab === 'roster' && <RosterView artists={artists} setArtists={setArtists} role={userRole} />}
              {tab === 'catalog' && <CatalogView />}
              {tab === 'studio' && <StudioView sessions={sessions} setSessions={setSessions} artists={artists} />}
              {tab === 'finance' && <FinanceView finance={finance} setFinance={setFinance} balance={totalBalance} />}
              {tab === 'links' && <LinksView />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

// --- SUB-VIEWS ---

function InsightsView({ balance, artists }: any) {
  return (
    <div className="space-y-12">
      <h2 className="text-5xl font-black italic uppercase tracking-tighter">Insights</h2>
      <div className="grid grid-cols-4 gap-6">
        <StatCard label="Total Net Balance" value={`$${balance.toLocaleString()}`} trend="Real-time" />
        <StatCard label="Label Roster" value={artists} trend="Artists" />
        <StatCard label="Global Streams" value="12.4M" trend="+18.2%" />
        <StatCard label="Active Projects" value="8" trend="Pending" />
      </div>
      <div className="bg-zinc-950 border border-zinc-900 rounded-[2rem] p-10 h-64 flex items-end gap-2">
        {[40, 70, 45, 90, 65, 80, 100, 55, 75, 40].map((h, i) => (
          <div key={i} className="flex-1 bg-zinc-900 rounded-t-lg hover:bg-white transition-all cursor-crosshair" style={{ heigh
