"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Music, Calendar, DollarSign, TrendingUp, Search, 
  Settings, ExternalLink, PlayCircle, BarChart3, Clock,
  CheckCircle2, Plus, ChevronRight, Layers, CreditCard
} from 'lucide-react';

export default function BeatDaOddsOS() {
  const [tab, setTab] = useState('insights');

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden selection:bg-white selection:text-black">
      {/* SIDEBAR */}
      <aside className="w-64 border-r border-zinc-900 bg-[#050505] flex flex-col p-6 z-20">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
            <div className="w-4 h-4 bg-black rounded-sm" />
          </div>
          <span className="text-lg font-black tracking-tighter uppercase">BDO OS</span>
        </div>
        
        <nav className="flex-1 space-y-1">
          <MenuBtn icon={<TrendingUp size={18}/>} label="Insights" active={tab === 'insights'} onClick={() => setTab('insights')} />
          <MenuBtn icon={<Users size={18}/>} label="Roster" active={tab === 'roster'} onClick={() => setTab('roster')} />
          <MenuBtn icon={<Music size={18}/>} label="Catalog" active={tab === 'catalog'} onClick={() => setTab('catalog')} />
          <MenuBtn icon={<Calendar size={18}/>} label="Studio" active={tab === 'studio'} onClick={() => setTab('studio')} />
          <MenuBtn icon={<CreditCard size={18}/>} label="Finance" active={tab === 'finance'} onClick={() => setTab('finance')} />
          <MenuBtn icon={<ExternalLink size={18}/>} label="Resources" active={tab === 'links'} onClick={() => setTab('links')} />
        </nav>

        <div className="mt-auto flex items-center gap-3 p-3 bg-zinc-950 border border-zinc-900 rounded-2xl">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-400 to-zinc-800" />
          <div className="text-[10px]">
            <p className="font-bold">Super Admin</p>
            <p className="text-zinc-500">Label Management</p>
          </div>
        </div>
      </aside>

      {/* CONTENT AREA */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-[#000]">
        <header className="h-16 border-b border-zinc-900 px-8 flex items-center justify-between sticky top-0 bg-black/50 backdrop-blur-xl z-10">
          <div className="relative w-72 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-white transition-colors" size={14} />
            <input type="text" placeholder="Global Search..." className="w-full pl-9 pr-4 py-1.5 bg-zinc-950 border border-zinc-900 rounded-lg text-xs focus:outline-none focus:border-zinc-700 transition-all" />
          </div>
          <div className="flex items-center gap-4">
            <button className="text-xs font-bold text-zinc-500 hover:text-white transition-colors">Documentation</button>
            <button className="bg-white text-black px-4 py-1.5 rounded-full text-xs font-bold hover:scale-105 active:scale-95 transition-all">
              New Release
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10 max-w-6xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {tab === 'insights' && <InsightsView />}
              {tab === 'roster' && <RosterView />}
              {tab === 'catalog' && <CatalogView />}
              {tab === 'studio' && <StudioView />}
              {tab === 'finance' && <FinanceView />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

/* --- VIEWS --- */

function InsightsView() {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Monthly Streams" value="8.2M" trend="+12.4%" />
        <StatCard label="Net Revenue" value="$34,120" trend="+5.2%" />
        <StatCard label="Active Roster" value="12" trend="+2" />
        <StatCard label="Conversion Rate" value="4.2%" trend="+1.1%" />
      </div>
      <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-8 h-80 flex items-end justify-between gap-2">
        {[40, 70, 45, 90, 65, 80, 100, 55, 75, 40, 60, 85].map((h, i) => (
          <div key={i} className="flex-1 bg-white/10 rounded-t-sm hover:bg-white transition-all cursor-crosshair relative group" style={{ height: `${h}%` }}>
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity font-bold">
              ${h * 100}
            </div>
          </div>
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
    { name: "Midnight Kid", listeners: "45K", status: "New Sign" },
  ];
  return (
    <div className="grid grid-cols-2 gap-6">
      {artists.map(a => (
        <div key={a.name} className="p-6 bg-zinc-950 border border-zinc-900 rounded-3xl flex items-center justify-between hover:border-zinc-700 transition-all cursor-pointer group">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-zinc-900 rounded-2xl group-hover:scale-105 transition-transform" />
            <div>
              <h4 className="text-xl font-bold">{a.name}</h4>
              <p className="text-xs text-zinc-500">{a.listeners} Monthly Listeners</p>
            </div>
          </div>
          <span className="text-[10px] font-bold px-3 py-1 bg-zinc-900 rounded-full border border-zinc-800">{a.status}</span>
        </div>
      ))}
    </div>
  );
}

function CatalogView() {
  return (
    <div className="bg-zinc-950 border border-zinc-900 rounded-3xl overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-zinc-900 text-[10px] text-zinc-500 uppercase tracking-widest">
            <th className="p-6">Release</th>
            <th>ISRC</th>
            <th>Date</th>
            <th>Streams</th>
            <th className="p-6">Status</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {[1,2,3,4,5].map(i => (
            <tr key={i} className="border-b border-zinc-900 hover:bg-white/[0.02] transition-colors cursor-pointer group">
              <td className="p-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-zinc-900 rounded" />
                <div>
                  <p className="font-bold">Neon Skies {i}</p>
                  <p className="text-xs text-zinc-500">Artist Name</p>
                </div>
              </td>
              <td className="text-zinc-500 font-mono text-xs tracking-tighter">US-S1Z-24-0000{i}</td>
              <td className="text-zinc-400">Oct 2{i}, 2024</td>
              <td className="font-bold">128,402</td>
              <td className="p-6"><span className="px-2 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold rounded">Released</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StudioView() {
  return (
    <div className="grid grid-cols-3 gap-10">
      <div className="col-span-2 space-y-6">
        <h3 className="text-2xl font-bold">Studio Calendar</h3>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 28 }).map((_, i) => (
            <div key={i} className={`aspect-square border border-zinc-900 rounded-xl p-2 text-[10px] font-bold ${i === 12 ? 'bg-white text-black' : 'bg-zinc-950 text-zinc-700 hover:border-zinc-700 transition-colors cursor-pointer'}`}>
              {i + 1}
              {i === 12 && <div className="mt-2 text-[8px]">LEGEND - 2PM</div>}
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-6">
        <h3 className="text-2xl font-bold">Recent Bookings</h3>
        <div className="space-y-3">
          <BookingItem time="14:00" artist="Young Legend" studio="Studio A" />
          <BookingItem time="16:30" artist="Sarah Vox" studio="Studio B" />
          <BookingItem time="20:00" artist="The Drifter" studio="Studio A" />
        </div>
      </div>
    </div>
  );
}

function FinanceView() {
  return (
    <div className="space-y-10">
       <div className="grid grid-cols-3 gap-6">
          <div className="bg-zinc-950 p-8 rounded-[2rem] border border-zinc-900">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Total Balance</p>
            <h2 className="text-4xl font-black">$128,902.44</h2>
          </div>
          <div className="bg-emerald-500/5 p-8 rounded-[2rem] border border-emerald-500/20">
            <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-2">Pending Payouts</p>
            <h2 className="text-4xl font-black text-emerald-500">$12,400.00</h2>
          </div>
          <div className="bg-zinc-950 p-8 rounded-[2rem] border border-zinc-900 flex items-center justify-center border-dashed group cursor-pointer">
             <div className="text-center group-hover:scale-110 transition-transform">
               <Plus className="mx-auto mb-2 text-zinc-500" />
               <p className="text-xs font-bold text-zinc-500">Generate Report</p>
             </div>
          </div>
       </div>
       <div className="space-y-4">
         <h4 className="text-lg font-bold">Payout History</h4>
         {[1,2,3].map(i => (
           <div key={i} className="flex items-center justify-between p-6 bg-zinc-950 border border-zinc-900 rounded-2xl">
             <div className="flex items-center gap-4">
               <div className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center"><DollarSign size={16}/></div>
               <div>
                  <p className="font-bold">Artist Payout — Sarah Vox</p>
                  <p className="text-xs text-zinc-500">Sent Oct {i}2, 2024</p>
               </div>
             </div>
             <p className="font-bold">-$4,200.00</p>
           </div>
         ))}
       </div>
    </div>
  );
}

/* --- HELPER COMPONENTS --- */

function MenuBtn({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${active ? 'bg-white text-black' : 'text-zinc-500 hover:text-white hover:bg-zinc-900'}`}>
      {icon} {label}
    </button>
  );
}

function StatCard({ label, value, trend }: any) {
  return (
    <div className="p-6 bg-zinc-950 border border-zinc-900 rounded-3xl">
      <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{label}</p>
      <div className="flex items-end justify-between mt-2">
        <h4 className="text-2xl font-black">{value}</h4>
        <span className="text-[10px] font-bold text-emerald-500">{trend}</span>
      </div>
    </div>
  );
}

function BookingItem({ time, artist, studio }: any) {
  return (
    <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-2xl flex items-center justify-between">
      <div>
        <p className="text-xs font-bold">{time}</p>
        <p className="text-sm font-bold">{artist}</p>
      </div>
      <span className="text-[10px] text-zinc-500">{studio}</span>
    </div>
  );
}