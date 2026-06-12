// Inside src/app/page.tsx

import { useSearchParams } from 'next/navigation'; // Add this import at the top

export default function BeatDaOddsOS() {
  const searchParams = useSearchParams();
  const userRole = searchParams.get('role') || 'admin'; // Defaults to admin for testing
  const [tab, setTab] = useState(userRole === 'artist' ? 'roster' : 'insights');

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden font-sans selection:bg-white selection:text-black">
      
      {/* SIDEBAR */}
      <aside className="w-64 border-r border-zinc-900 bg-[#050505] flex flex-col p-6 z-20">
        {/* ... Logo Section ... */}
        
        <nav className="flex-1 space-y-1">
          {/* HIDE INSIGHTS FROM ARTISTS (OPTIONAL) */}
          {userRole === 'admin' && (
            <MenuBtn icon={<TrendingUp size={18}/>} label="Label Insights" active={tab === 'insights'} onClick={() => setTab('insights')} />
          )}

          <MenuBtn icon={<Users size={18}/>} label={userRole === 'admin' ? "Artist Roster" : "My Profile"} active={tab === 'roster'} onClick={() => setTab('roster')} />
          
          {userRole === 'admin' && (
            <MenuBtn icon={<Music size={18}/>} label="Global Catalog" active={tab === 'catalog'} onClick={() => setTab('catalog')} />
          )}

          <MenuBtn icon={<Calendar size={18}/>} label="Studio Sessions" active={tab === 'studio'} onClick={() => setTab('studio')} />
          
          {/* ARTISTS SEE "MY PAYOUTS" INSTEAD OF "FINANCE HUB" */}
          <MenuBtn icon={<CreditCard size={18}/>} label={userRole === 'admin' ? "Finance Hub" : "My Payouts"} active={tab === 'finance'} onClick={() => setTab('finance')} />
          
          <MenuBtn icon={<ExternalLink size={18}/>} label="Quick Links" active={tab === 'links'} onClick={() => setTab('links')} />
        </nav>

        {/* ... Profile Section ... */}
      </aside>

      {/* ... Rest of your Main UI code ... */}
    </div>
  );
}

"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Music, Calendar, DollarSign, TrendingUp, Search, 
  Settings, ExternalLink, PlayCircle, BarChart3, Clock,
  CheckCircle2, Plus, ChevronRight, Layers, CreditCard,
  Mic2, Headphones, Download, Share2, MoreHorizontal
} from 'lucide-react';

export default function BeatDaOddsOS() {
  const [tab, setTab] = useState('insights');

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
          <MenuBtn icon={<TrendingUp size={18}/>} label="Label Insights" active={tab === 'insights'} onClick={() => setTab('insights')} />
          <MenuBtn icon={<Users size={18}/>} label="Artist Roster" active={tab === 'roster'} onClick={() => setTab('roster')} />
          <MenuBtn icon={<Music size={18}/>} label="Global Catalog" active={tab === 'catalog'} onClick={() => setTab('catalog')} />
          <MenuBtn icon={<Calendar size={18}/>} label="Studio Sessions" active={tab === 'studio'} onClick={() => setTab('studio')} />
          <MenuBtn icon={<CreditCard size={18}/>} label="Finance & Payouts" active={tab === 'finance'} onClick={() => setTab('finance')} />
          <MenuBtn icon={<ExternalLink size={18}/>} label="Quick Links" active={tab === 'links'} onClick={() => setTab('links')} />
        </nav>

        <div className="mt-auto pt-6 border-t border-zinc-900">
          <div className="flex items-center gap-3 p-3 bg-zinc-950 border border-zinc-900 rounded-2xl hover:bg-zinc-900 transition-colors cursor-pointer group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-zinc-600 to-zinc-900 border border-zinc-800" />
            <div className="text-[10px]">
              <p className="font-bold">Admin Account</p>
              <p className="text-zinc-500 uppercase tracking-tighter">Super Admin</p>
            </div>
            <Settings size={14} className="ml-auto text-zinc-600 group-hover:rotate-90 transition-transform duration-500" />
          </div>
        </div>
      </aside>

      {/* --- MAIN INTERFACE --- */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-black">
        
        {/* TOP BAR */}
        <header className="h-20 border-b border-zinc-900 px-10 flex items-center justify-between sticky top-0 bg-black/60 backdrop-blur-2xl z-50">
          <div className="relative w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-white transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Search ISRC, Contracts, Artists..." 
              className="w-full pl-12 pr-4 py-2.5 bg-zinc-900/40 border border-zinc-800/50 rounded-full text-xs focus:outline-none focus:border-zinc-600 focus:ring-4 ring-white/5 transition-all" 
            />
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex flex-col text-right">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Next Release</span>
              <span className="text-xs font-bold text-white">Legend - Oct 24</span>
            </div>
            <button className="bg-white text-black px-6 py-2.5 rounded-full text-xs font-black hover:bg-zinc-200 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)]">
              + NEW PROJECT
            </button>
          </div>
        </header>

        {/* CONTENT VIEW */}
        <div className="flex-1 overflow-y-auto p-12 max-w-7xl mx-auto w-full scroll-smooth">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {tab === 'insights' && <InsightsView />}
              {tab === 'roster' && <RosterView />}
              {tab === 'catalog' && <CatalogView />}
              {tab === 'studio' && <StudioView />}
              {tab === 'finance' && <FinanceView />}
              {tab === 'links' && <LinksView />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                SUB-VIEWS                                   */
/* -------------------------------------------------------------------------- */

function InsightsView() {
  return (
    <div className="space-y-12">
      <header>
        <h2 className="text-4xl font-black tracking-tight mb-2 uppercase italic">Dashboard</h2>
        <p className="text-zinc-500 text-sm">Real-time performance across all DSPs.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard label="Monthly Streams" value="12.4M" trend="+18.2%" />
        <StatCard label="Net Revenue" value="$52,890" trend="+4.1%" />
        <StatCard label="TikTok UGC" value="14.2K" trend="+22.5%" />
        <StatCard label="Active Artists" value="14" trend="+1" />
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 bg-zinc-950 border border-zinc-900 rounded-[2.5rem] p-10 relative overflow-hidden group">
          <div className="flex justify-between items-start mb-10">
            <div>
              <h3 className="text-xl font-bold mb-1">Streaming Revenue</h3>
              <p className="text-xs text-zinc-500 font-medium uppercase tracking-widest">Last 30 Days</p>
            </div>
            <select className="bg-black border border-zinc-800 text-[10px] rounded-lg px-3 py-1 uppercase font-bold outline-none">
              <option>Spotify</option>
              <option>Apple Music</option>
            </select>
          </div>
          <div className="h-64 flex items-end justify-between gap-3">
            {[30, 50, 45, 80, 60, 95, 70, 100, 85, 40, 65, 80, 55, 90].map((h, i) => (
              <div key={i} className="flex-1 bg-zinc-900 rounded-t-lg relative group/bar cursor-crosshair hover:bg-white transition-all" style={{ height: `${h}%` }}>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity font-bold">
                  ${h}k
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
           <h3 className="text-xl font-bold flex items-center gap-2 px-2"><Clock size={18} className="text-zinc-500"/> Release Timeline</h3>
           <div className="space-y-4">
              <TimelineItem artist="Legend" track="Midnight Melodies" date="Oct 24" status="Mixing" />
              <TimelineItem artist="Sarah Vox" track="Velvet Sky" date="Nov 02" status="Mastering" />
              <TimelineItem artist="The Drifter" track="Neon Ghost" date="Nov 15" status="Artwork" />
           </div>
        </div>
      </div>
    </div>
  );
}

function RosterView() {
  const artists = [
    { name: "Young Legend", listeners: "1.2M", status: "Active", color: "bg-orange-500" },
    { name: "Sarah Vox", listeners: "850K", status: "Recording", color: "bg-blue-500" },
    { name: "The Drifter", listeners: "210K", status: "On Tour", color: "bg-emerald-500" },
    { name: "Midnight Kid", listeners: "45K", status: "New Sign", color: "bg-purple-500" },
  ];
  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <h2 className="text-4xl font-black tracking-tighter italic">Label Roster</h2>
        <button className="text-sm font-bold border border-zinc-800 px-6 py-2 rounded-full hover:bg-zinc-900 transition-colors">Manage Contracts</button>
      </div>
      <div className="grid grid-cols-2 gap-8">
        {artists.map(a => (
          <div key={a.name} className="p-8 bg-zinc-950 border border-zinc-900 rounded-[2.5rem] flex items-center justify-between hover:border-zinc-600 transition-all cursor-pointer group">
            <div className="flex items-center gap-6">
              <div className={`w-20 h-20 ${a.color} rounded-3xl group-hover:scale-105 transition-transform shadow-2xl`} />
              <div>
                <h4 className="text-2xl font-black">{a.name}</h4>
                <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">{a.listeners} Monthly Listeners</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-black px-4 py-1.5 bg-zinc-900 rounded-full border border-zinc-800 uppercase tracking-tighter">{a.status}</span>
              <p className="mt-4 text-zinc-600 group-hover:text-white transition-colors"><ChevronRight size={20}/></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StudioView() {
  return (
    <div className="space-y-10">
      <h2 className="text-4xl font-black tracking-tighter italic">Studio Bookings</h2>
      <div className="grid grid-cols-3 gap-10">
        <div className="col-span-2 bg-zinc-950 border border-zinc-900 rounded-[2.5rem] p-10">
           <div className="grid grid-cols-7 gap-4">
              {Array.from({ length: 31 }).map((_, i) => (
                <div key={i} className={`aspect-square border border-zinc-900 rounded-2xl p-3 text-[10px] font-bold relative group cursor-pointer transition-all ${i === 11 ? 'bg-white text-black ring-8 ring-white/10' : 'bg-black text-zinc-500 hover:border-zinc-600'}`}>
                   {i + 1}
                   {i === 11 && <div className="mt-2 text-[8px] uppercase font-black">Studio A<br/>Legend</div>}
                </div>
              ))}
           </div>
        </div>
        <div className="space-y-6">
           <div className="p-8 bg-gradient-to-br from-zinc-800 to-black rounded-[2rem] border border-zinc-800">
              <h4 className="font-bold mb-4 flex items-center gap-2"><Mic2 size={16}/> Instant Booking</h4>
              <p className="text-xs text-zinc-400 mb-6 leading-relaxed">Reserve time for artists in Studio A or Studio B. Managers will be notified instantly.</p>
              <button className="w-full bg-white text-black py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform">Book Room</button>
           </div>
           <div className="space-y-3">
              <SessionCard time="2:00 PM" artist="Sarah Vox" room="Studio B" active />
              <SessionCard time="6:30 PM" artist="Young King" room="Studio A" active={false} />
           </div>
        </div>
      </div>
    </div>
  );
}

function FinanceView() {
  return (
    <div className="space-y-10">
       <div className="flex justify-between items-end">
         <h2 className="text-4xl font-black tracking-tighter italic">Finance Hub</h2>
         <div className="flex gap-2">
            <button className="bg-zinc-900 text-white p-2 px-4 rounded-xl text-xs font-bold border border-zinc-800 flex items-center gap-2"><Download size={14}/> CSV</button>
            <button className="bg-white text-black p-2 px-4 rounded-xl text-xs font-bold flex items-center gap-2"><Share2 size={14}/> Share</button>
         </div>
       </div>

       <div className="grid grid-cols-3 gap-8">
          <div className="bg-zinc-950 p-10 rounded-[2.5rem] border border-zinc-900 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity"><BarChart3 size={80}/></div>
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">Total Net Balance</p>
            <h2 className="text-5xl font-black tracking-tighter">$142,900.55</h2>
            <div className="mt-8 flex items-center gap-2 text-emerald-500 text-[10px] font-bold">
              <TrendingUp size={12}/> +12.4% THIS QUARTER
            </div>
          </div>

          <div className="bg-zinc-950 p-10 rounded-[2.5rem] border border-zinc-900">
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">Pending Payouts</p>
            <h2 className="text-5xl font-black tracking-tighter text-zinc-400">$8,410.00</h2>
            <button className="mt-8 text-[10px] font-black uppercase tracking-widest bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-full hover:bg-white hover:text-black transition-all">Review Payouts</button>
          </div>

          <div className="bg-zinc-950 p-10 rounded-[2.5rem] border border-zinc-900 flex flex-col justify-center border-dashed border-zinc-700 group cursor-pointer hover:bg-zinc-900/50 transition-all">
             <div className="text-center">
               <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"><Plus/></div>
               <p className="text-xs font-black uppercase tracking-widest text-zinc-400">Generate Report</p>
             </div>
          </div>
       </div>

       <div className="bg-zinc-950 border border-zinc-900 rounded-[2.5rem] overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-zinc-900 text-[10px] text-zinc-600 uppercase font-black tracking-widest">
                <th className="p-8">Transaction</th>
                <th>Artist</th>
                <th>Date</th>
                <th>Amount</th>
                <th className="p-8">Status</th>
              </tr>
            </thead>
            <tbody className="text-xs font-bold">
               {[1,2,3].map(i => (
                 <tr key={i} className="border-b border-zinc-900/50 hover:bg-zinc-900/30 transition-colors">
                   <td className="p-8 flex items-center gap-4">
                     <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center"><CreditCard size={14}/></div>
                     Streaming Royalty - Q3
                   </td>
                   <td className="text-zinc-500 uppercase">Sarah Vox</td>
                   <td className="text-zinc-500">Oct {i}2, 2024</td>
                   <td className="text-lg font-black tracking-tighter text-emerald-500">+$2,410.00</td>
                   <td className="p-8"><span className="bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full text-[9px] uppercase font-black">Completed</span></td>
                 </tr>
               ))}
            </tbody>
          </table>
       </div>
    </div>
  );
}

function CatalogView() {
  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-black tracking-tighter italic">Catalog</h2>
        <div className="flex gap-4">
          <input type="text" placeholder="Filter by Artist..." className="bg-zinc-900 border border-zinc-800 text-[10px] px-4 py-2 rounded-full font-bold outline-none focus:border-white transition-all w-64" />
        </div>
      </div>
      <div className="bg-zinc-950 border border-zinc-900 rounded-[2.5rem] overflow-hidden">
        <table className="w-full text-left">
          <thead className="border-b border-zinc-900 text-[10px] text-zinc-500 font-black uppercase tracking-widest">
            <tr>
              <th className="p-8">Track</th>
              <th>Artist</th>
              <th>ISRC</th>
              <th>Streams</th>
              <th className="p-8">Release Date</th>
            </tr>
          </thead>
          <tbody className="text-sm font-bold">
            {[1,2,3,4,5,6].map(i => (
              <tr key={i} className="border-b border-zinc-900 hover:bg-zinc-900/50 transition-colors cursor-pointer group">
                <td className="p-8 flex items-center gap-4">
                  <div className="w-12 h-12 bg-zinc-800 rounded-xl group-hover:scale-105 transition-transform" />
                  <div>
                    <p>Neon Lights {i}</p>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-tighter">Single</p>
                  </div>
                </td>
                <td className="text-zinc-400">Young Legend</td>
                <td className="font-mono text-[10px] text-zinc-600 tracking-tighter">US-BDO-24-0000{i}</td>
                <td className="font-black text-white">42,902</td>
                <td className="p-8 text-zinc-500 font-mono text-xs">OCT 12, 2024</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function LinksView() {
  const platforms = [
    { name: "Spotify for Artists", color: "bg-[#1DB954]" },
    { name: "Apple Music for Artists", color: "bg-[#FA2D48]" },
    { name: "TikTok Business", color: "bg-black" },
    { name: "Meta Ads Manager", color: "bg-[#0668E1]" },
    { name: "DistroKid Dashboard", color: "bg-yellow-500" },
    { name: "Canva Pro", color: "bg-blue-400" },
  ];
  return (
    <div className="space-y-12">
      <h2 className="text-4xl font-black tracking-tighter italic">Helpful Hub</h2>
      <div className="grid grid-cols-3 gap-6">
        {platforms.map(p => (
          <div key={p.name} className="p-8 bg-zinc-950 border border-zinc-900 rounded-[2rem] hover:scale-[1.02] transition-all cursor-pointer group">
            <div className={`w-12 h-12 ${p.color} rounded-2xl mb-6 shadow-xl shadow-black border border-white/10`} />
            <h4 className="text-xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">{p.name}</h4>
            <p className="text-xs text-zinc-500 mb-6">Manage distribution and analytics for this platform.</p>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase text-zinc-600 group-hover:text-white transition-colors tracking-widest">
              Launch Platform <ChevronRight size={14}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                COMPONENTS                                  */
/* -------------------------------------------------------------------------- */

function MenuBtn({ icon, label, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-[13px] font-black tracking-tighter transition-all duration-300 ${
        active ? 'bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.1)]' : 'text-zinc-500 hover:text-white hover:bg-zinc-900/50'
      }`}
    >
      {icon} {label}
    </button>
  );
}

function StatCard({ label, value, trend }: any) {
  return (
    <div className="bg-zinc-950 border border-zinc-900 p-8 rounded-[2.5rem] hover:border-zinc-700 transition-all group">
      <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-3">{label}</p>
      <div className="flex items-end justify-between">
        <h4 className="text-3xl font-black tracking-tighter italic">{value}</h4>
        <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/5 px-2 py-1 rounded-lg border border-emerald-500/10">{trend}</span>
      </div>
    </div>
  );
}

function TimelineItem({ artist, track, date, status }: any) {
  return (
    <div className="p-5 bg-zinc-950 border border-zinc-900 rounded-2xl flex items-center justify-between hover:bg-zinc-900 transition-colors cursor-pointer group">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-zinc-900 rounded-lg group-hover:scale-105 transition-transform" />
        <div>
          <p className="text-sm font-bold">{track}</p>
          <p className="text-[10px] text-zinc-500 font-bold uppercase">{artist}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-xs font-black">{date}</p>
        <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">{status}</p>
      </div>
    </div>
  );
}

function SessionCard({ time, artist, room, active }: any) {
  return (
    <div className={`p-6 border rounded-2xl flex items-center justify-between ${active ? 'bg-white text-black border-white shadow-xl' : 'bg-zinc-950 text-zinc-500 border-zinc-900'}`}>
      <div>
        <p className={`text-[10px] font-black uppercase ${active ? 'text-black/40' : 'text-zinc-600'}`}>{time}</p>
        <p className="text-sm font-black">{artist}</p>
      </div>
      <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-lg ${active ? 'bg-black/5' : 'bg-zinc-900'}`}>{room}</span>
    </div>
  );
}
