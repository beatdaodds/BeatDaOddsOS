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
          <div key={i} className="flex-1 bg-zinc-900 rounded-t-lg hover:bg-white transition-all cursor-crosshair" style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
}

function RosterView({ artists, setArtists, role }: any) {
  const [name, setName] = useState('');
  const addArtist = (e: any) => {
    e.preventDefault();
    if (!name) return;
    setArtists([...artists, { id: Date.now(), name, listeners: "0", status: "Newly Signed" }]);
    setName('');
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <h2 className="text-5xl font-black italic uppercase tracking-tighter">Roster</h2>
        {role === 'admin' && (
          <form onSubmit={addArtist} className="flex gap-2">
            <input 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              placeholder="Artist Stage Name" 
              className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 text-xs outline-none focus:border-zinc-600"
            />
            <button type="submit" className="bg-white text-black px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest">+ Sign Artist</button>
          </form>
        )}
      </div>
      <div className="grid grid-cols-2 gap-6">
        {artists.map((a: any) => (
          <div key={a.id} className="p-8 bg-zinc-950 border border-zinc-900 rounded-[2.5rem] flex items-center justify-between group hover:border-zinc-500 transition-all">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-gradient-to-tr from-zinc-800 to-zinc-950 rounded-2xl group-hover:scale-105 transition-transform" />
              <div>
                <h4 className="text-xl font-bold">{a.name}</h4>
                <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest">{a.listeners} Monthly Listeners</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[9px] font-black px-3 py-1 bg-zinc-900 rounded-full border border-zinc-800 uppercase text-zinc-400">{a.status}</span>
              {role === 'admin' && (
                <button onClick={() => setArtists(artists.filter((art: any) => art.id !== a.id))} className="text-zinc-800 hover:text-red-500 transition-colors">
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StudioView({ sessions, setSessions, artists }: any) {
  const [selectedArtist, setSelectedArtist] = useState('');
  const bookSession = () => {
    if (!selectedArtist) return;
    setSessions([...sessions, { id: Date.now(), artist: selectedArtist, time: 'TBD', room: 'Studio A' }]);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-5xl font-black italic uppercase tracking-tighter">Studio</h2>
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 bg-zinc-950 border border-zinc-900 rounded-[2.5rem] p-10">
          <div className="grid grid-cols-7 gap-3">
            {Array.from({ length: 28 }).map((_, i) => (
              <div key={i} className="aspect-square border border-zinc-900 rounded-2xl p-3 text-[10px] text-zinc-700 hover:border-zinc-500 cursor-pointer">
                {i + 1}
                {sessions.length > 0 && i === 14 && <div className="mt-1 w-1 h-1 rounded-full bg-white mx-auto" />}
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="p-8 bg-white text-black rounded-[2rem] space-y-4 shadow-2xl">
            <h4 className="font-black uppercase text-xs tracking-widest">Book Session</h4>
            <select 
              onChange={(e) => setSelectedArtist(e.target.value)}
              className="w-full bg-zinc-100 border-none rounded-xl p-3 text-xs font-bold"
            >
              <option>Select Artist</option>
              {artists.map((a: any) => <option key={a.id}>{a.name}</option>)}
            </select>
            <button onClick={bookSession} className="w-full bg-black text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em]">Confirm Booking</button>
          </div>
          <div className="space-y-3">
            {sessions.map((s: any) => (
              <div key={s.id} className="p-5 bg-zinc-950 border border-zinc-900 rounded-2xl flex justify-between items-center group">
                <div>
                  <p className="text-xs font-black uppercase text-zinc-500">{s.time}</p>
                  <p className="font-bold">{s.artist}</p>
                </div>
                <button onClick={() => setSessions(sessions.filter((ses: any) => ses.id !== s.id))} className="opacity-0 group-hover:opacity-100 text-zinc-700 hover:text-red-500 transition-all">
                  <X size={14}/>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FinanceView({ finance, setFinance, balance }: any) {
  const [label, setLabel] = useState('');
  const [amount, setAmount] = useState('');

  const addTransaction = (type: 'Income' | 'Expense') => {
    if (!label || !amount) return;
    setFinance([...finance, { id: Date.now(), type, amount: Number(amount), label, date: new Date().toISOString().split('T')[0] }]);
    setLabel(''); setAmount('');
  };

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end">
        <h2 className="text-5xl font-black italic uppercase tracking-tighter">Finance</h2>
        <div className="text-right">
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Total Net Profit</p>
          <p className={`text-4xl font-black ${balance >= 0 ? 'text-white' : 'text-red-500'}`}>${balance.toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-zinc-950 border border-zinc-900 rounded-[2.5rem] overflow-hidden">
          <table className="w-full text-left">
            <thead className="border-b border-zinc-900 text-[10px] text-zinc-500 uppercase font-black tracking-widest">
              <tr><th className="p-8">Description</th><th>Amount</th><th>Date</th><th className="p-8 text-right">Action</th></tr>
            </thead>
            <tbody className="text-xs font-bold">
              {finance.map((f: any) => (
                <tr key={f.id} className="border-b border-zinc-900/50 hover:bg-zinc-900/30 transition-colors">
                  <td className="p-8">{f.label}</td>
                  <td className={f.type === 'Income' ? 'text-emerald-500' : 'text-red-500'}>
                    {f.type === 'Income' ? '+' : '-'}${f.amount.toLocaleString()}
                  </td>
                  <td className="text-zinc-500">{f.date}</td>
                  <td className="p-8 text-right">
                    <button onClick={() => setFinance(finance.filter((tr: any) => tr.id !== f.id))} className="text-zinc-800 hover:text-red-500 transition-colors"><Trash2 size={14}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-zinc-950 p-8 rounded-[2rem] border border-zinc-900 h-fit space-y-4">
          <h4 className="font-black uppercase text-xs tracking-widest mb-6">Log Transaction</h4>
          <input value={label} onChange={e => setLabel(e.target.value)} placeholder="Description" className="w-full bg-black border border-zinc-800 rounded-xl p-3 text-xs outline-none focus:border-white" />
          <input value={amount} onChange={e => setAmount(e.target.value)} type="number" placeholder="Amount ($)" className="w-full bg-black border border-zinc-800 rounded-xl p-3 text-xs outline-none focus:border-white" />
          <div className="flex gap-2 pt-4">
            <button onClick={() => addTransaction('Income')} className="flex-1 bg-emerald-600 text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500 transition-colors">Income</button>
            <button onClick={() => addTransaction('Expense')} className="flex-1 bg-zinc-800 text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-700 transition-colors">Expense</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- CATALOG, LINKS & HELPERS ---

function CatalogView() {
  return (
    <div className="space-y-8">
      <h2 className="text-5xl font-black italic uppercase tracking-tighter">Catalog</h2>
      <div className="bg-zinc-950 border border-zinc-900 rounded-[2rem] overflow-hidden">
        <table className="w-full text-left">
          <thead className="border-b border-zinc-900 text-[10px] text-zinc-500 uppercase font-black tracking-widest">
            <tr><th className="p-8">Release</th><th>ISRC</th><th>Streams</th><th className="p-8">Status</th></tr>
          </thead>
          <tbody className="text-sm font-bold">
            {[1, 2, 3].map(i => (
              <tr key={i} className="border-b border-zinc-900 hover:bg-zinc-900/50 transition-colors cursor-pointer">
                <td className="p-8 flex items-center gap-4">
                   <div className="w-10 h-10 bg-zinc-800 rounded shadow-2xl" />
                   Neon Lights {i}
                </td>
                <td className="text-zinc-600 font-mono text-[10px]">US-BDO-24-00{i}</td>
                <td className="font-black text-white">42,902</td>
                <td className="p-8"><span className="text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter">Released</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function LinksView() {
  const hubs = ["Spotify for Artists", "Apple Music", "TikTok CMS", "Meta Ads", "DistroKid", "Canva"];
  return (
    <div className="space-y-12">
      <h2 className="text-5xl font-black italic uppercase tracking-tighter">Hubs</h2>
      <div className="grid grid-cols-3 gap-6">
        {hubs.map(hub => (
          <div key={hub} className="p-8 bg-zinc-950 border border-zinc-900 rounded-[2.5rem] hover:bg-white hover:text-black transition-all cursor-pointer group">
            <h4 className="text-2xl font-black tracking-tighter italic mb-2 uppercase">{hub}</h4>
            <p className="text-xs opacity-50 uppercase font-black tracking-widest">Launch Portal <ChevronRight size={14} className="inline"/></p>
          </div>
        ))}
      </div>
    </div>
  );
}

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
    <div className="bg-zinc-950 border border-zinc-900 p-8 rounded-[2.5rem] hover:border-zinc-700 transition-all">
      <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-3">{label}</p>
      <div className="flex items-end justify-between">
        <h4 className="text-3xl font-black italic tracking-tighter">{value}</h4>
        <span className="text-[10px] font-bold text-zinc-400 opacity-40">{trend}</span>
      </div>
    </div>
  );
}

// --- EXPORT ---
export default function BeatDaOddsOS() {
  return (
    <Suspense fallback={<div className="h-screen bg-black flex items-center justify-center text-white font-bold tracking-widest italic uppercase">Initializing OS...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
