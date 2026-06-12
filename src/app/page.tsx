"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Music, Calendar, DollarSign, TrendingUp, Search, 
  Settings, ExternalLink, PlayCircle, BarChart3, Clock,
  Plus, ChevronRight, CreditCard, Mic2
} from 'lucide-react';

export default function BeatDaOddsOS() {
  const searchParams = useSearchParams();
  const userRole = searchParams.get('role') || 'admin'; // Defaults to admin for local testing
  
  // Set the default tab based on role
  // If Artist, start them on 'roster'. If Admin, start on 'insights'.
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
          {/* ONLY ADMIN SEES INSIGHTS */}
          {userRole === 'admin' && (
            <MenuBtn icon={<TrendingUp size={18}/>} label="Label Insights" active={tab === 'insights'} onClick={() => setTab('insights')} />
          )}

          {/* BOTH ROLES SEE ROSTER, CATALOG, AND STUDIO */}
          <MenuBtn icon={<Users size={18}/>} label={userRole === 'admin' ? "Artist Roster" : "Label Roster"} active={tab === 'roster'} onClick={() => setTab('roster')} />
          <MenuBtn icon={<Music size={18}/>} label="Global Catalog" active={tab === 'catalog'} onClick={() => setTab('catalog')} />
          <MenuBtn icon={<Calendar size={18}/>} label="Studio Sessions" active={tab === 'studio'} onClick={() => setTab('s
