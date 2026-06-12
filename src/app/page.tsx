"use client";
import React, { useState } from 'react';
import { Users, Music, Calendar, DollarSign, TrendingUp, CheckCircle2, Search, Settings, ExternalLink, PlayCircle, BarChart3, Clock } from 'lucide-react';

export default function BeatDaOddsOS() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden font-sans">
      {/* SIDEBAR - PREMIUM DARK DESIGN */}
      <aside className="w-72 border-r border-zinc-800/50 bg-[#0A0A0A] flex flex-col p-6">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-black rotate-45"></div>
          </div>
          <span className="text-xl font-bold tracking-tighter uppercase">BDO OS</span>
        </div>
        
        <nav className="flex-1 space-y-2">
          <NavItem icon={<TrendingUp size={18}/>} label="Insights" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
          <NavItem icon={<Users size={18}/>} label="Roster" active={activeTab === 'artists'} onClick={() => setActiveTab('artists')} />
          <NavItem icon={<Music size={18}/>} label="Global Catalog" active={activeTab === 'catalog'} onClick={() => setActiveTab('catalog')} />
          <NavItem icon={<Calendar size={18}/>} label="Studio Sessions" active={activeTab === 'studio'} onClick={() => setActiveTab('studio')} />
          <NavItem icon={<DollarSign size={18}/>} label="Finance Hub" active={activeTab === 'finance'} onClick={() => setActiveTab('finance')} />
          <NavItem icon={<ExternalLink size={18}/>} label="Helpful Links" active={activeTab === 'links'} onClick={() => setActiveTab('links')} />
        </nav>

        <div className="mt-auto pt-6 border-t border-zinc-800/50">
          <div className="flex items-center gap-3 p-2 hover:bg-zinc-900 rounded-xl transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-zinc-700 to-zinc-400"></div>
            <div>
              <p className="text-sm font-bold">Super Admin</p>
              <p className="text-[10px] text-zinc-500">Label Owner</p>
            </div>
            <Settings size={16} className="ml-auto text-zinc-500" />
          </div>
        </div>
      </aside>

      {/* MAIN ENGINE */}
      <main className="flex-1 flex flex-col bg-black overflow-y-auto">
        <header className="h-20 border-b border-zinc-800/50 px-10 flex items-center justify-between sticky top-0 bg-black/80 backdrop-blur-xl z-50">
          <div className="relative w-1/3">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
            <input 
              type="text" 
              placeholder="Search catalog, ISRCs, artists..." 
              className="w-full pl-12 pr-4 py-2.5 bg-zinc-900/50 border border-zinc-800 rounded-full text-sm focus:outline-none focus:ring-2 ring-white/10 transition-all"
            />
          </div>
          <div className="flex items-center gap-6">
             <div className="flex -space-x-2">
                {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-zinc-800"></div>)}
                <div className="w-8 h-8 rounded-full border-2 border-black bg-zinc-900 flex items-center justify-center text-[10px]">+5</div>
             </div>
             <button className="bg-white text-black px-6 py-2 rounded-full text-sm font-bold hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]">
               Create Release
             </button>
          </div>
        </header>

        <div className="p-10 max-w-7xl mx-auto w-full space-y-12">
          {activeTab === 'overview' && (
            <>
              {/* METRICS SECTION */}
              <div className="grid grid-cols-4 gap-6">
                <MetricCard label="Total Streams" value="12,402,192" growth="+14.2%" icon={<PlayCircle size={20}/>} />
                <MetricCard label="Net Revenue" value="$42,890.10" growth="+5.8%" icon={<DollarSign size={20}/>} />
                <MetricCard label="Active Campaigns" value="8" growth="0%" icon={<BarChart3 size={20}/>} />
                <MetricCard label="Catalog Size" value="142 Tracks" growth="+12" icon={<Music size={20}/>} />
              </div>

              {/* RELEASE PLANNER (KANBAN STYLE) */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold tracking-tight">Active Release Pipeline</h3>
                  <span className="text-zinc-500 text-sm italic">Next drop: Friday, Oct 24</span>
                </div>
                <div className="grid grid-cols-3 gap-8">
                  <PipelineColumn title="In Production" count={3}>
                    <ReleaseCard artist="Legend" title="Midnight Melodies" stage="Mixing" progress={65} />
                    <ReleaseCard artist="Sarah Vox" title="Velvet Skies" stage="Recording" progress={30} />
                  </PipelineColumn>
                  <PipelineColumn title="Assets & Marketing" count={1}>
                    <ReleaseCard artist="The Drifter" title="Neon Ghost" stage="Artwork" progress={85} />
                  </PipelineColumn>
                  <PipelineColumn title="Scheduled" count={2}>
                    <ReleaseCard artist="Young King" title="Crown" stage="Delivered" progress={100} />
                  </PipelineColumn>
                </div>
              </div>
            </>
          )}

          {activeTab === 'artists' && (
            <div className="grid grid-cols-3 gap-8">
              <ArtistProfile name="Young Legend" status="Recording" monthly="1.2M" />
              <ArtistProfile name="Sarah Vox" status="On Tour" monthly="850K" />
              <ArtistProfile name="The Drifter" status="Active" monthly="210K" />
              <ArtistProfile name="Young King" status="Scheduled" monthly="45K" />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// UI COMPONENTS
function NavItem({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${active ? 'bg-white text-black shadow-lg shadow-white/10' : 'text-zinc-500 hover:text-white hover:bg-zinc-900'}`}>
      {icon} {label}
    </button>
  );
}

function MetricCard({ label, value, growth, icon }: any) {
  return (
    <div className="bg-[#0A0A0A] border border-zinc-800/50 p-6 rounded-3xl hover:border-zinc-700 transition-all group">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-zinc-900 rounded-lg group-hover:bg-white group-hover:text-black transition-colors">{icon}</div>
        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md">{growth}</span>
      </div>
      <p className="text-zinc-500 text-xs font-medium uppercase tracking-widest">{label}</p>
      <h4 className="text-2xl font-black mt-1 tracking-tighter">{value}</h4>
    </div>
  );
}

function PipelineColumn({ title, count, children }: any) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-2">
        <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">{title}</span>
        <span className="text-xs font-bold text-zinc-600 bg-zinc-900 px-2 py-0.5 rounded">{count}</span>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function ReleaseCard({ artist, title, stage, progress }: any) {
  return (
    <div className="bg-[#0A0A0A] border border-zinc-800/50 p-5 rounded-2xl hover:bg-zinc-900/50 transition-all cursor-pointer group">
      <div className="flex gap-4 mb-4">
        <div className="w-12 h-12 bg-zinc-800 rounded-lg shrink-0 group-hover:scale-105 transition-transform shadow-lg shadow-black"></div>
        <div>
          <h5 className="font-bold text-sm leading-tight">{title}</h5>
          <p className="text-xs text-zinc-500">{artist}</p>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-[10px] font-bold uppercase">
          <span className="text-zinc-400">{stage}</span>
          <span>{progress}%</span>
        </div>
        <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
          <div className="h-full bg-white transition-all duration-1000" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
}

function ArtistProfile({ name, status, monthly }: any) {
  return (
    <div className="bg-[#0A0A0A] border border-zinc-800/50 rounded-[2.5rem] p-8 text-center hover:border-zinc-500 transition-all group">
      <div className="w-24 h-24 bg-gradient-to-b from-zinc-700 to-zinc-900 rounded-full mx-auto mb-6 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
      </div>
      <h3 className="text-xl font-black mb-1">{name}</h3>
      <p className="text-zinc-500 text-sm mb-6">{monthly} Monthly Listeners</p>
      <div className="flex flex-wrap justify-center gap-2">
        <span className="bg-zinc-900 border border-zinc-800 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter">{status}</span>
        <button className="bg-white text-black p-1.5 rounded-full"><Clock size={14}/></button>
      </div>
    </div>
  );
}