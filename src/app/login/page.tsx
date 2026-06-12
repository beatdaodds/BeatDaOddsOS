"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, User, Lock, ArrowRight, Music, ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [role, setRole] = useState<'admin' | 'artist' | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would verify credentials here.
    // For now, we simulate a successful login:
    if (role === 'admin') {
      router.push('/?role=admin');
    } else {
      router.push('/?role=artist');
    }
  };

  return (
    <div className="h-screen w-full bg-black flex items-center justify-center p-6 selection:bg-white selection:text-black">
      {/* BACKGROUND DECORATION */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-zinc-900/20 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-zinc-900/20 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[400px] z-10"
      >
        {/* LOGO */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            <div className="w-6 h-6 bg-black rounded-sm rotate-45" />
          </div>
          <h1 className="text-2xl font-black tracking-tighter uppercase italic text-white">BDO OS</h1>
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.3em] mt-2">Access Portal</p>
        </div>

        <div className="bg-zinc-950 border border-zinc-900 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
          {!role ? (
            /* ROLE SELECTION */
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-xl font-bold">Select Account Type</h2>
                <p className="text-zinc-500 text-xs mt-1">Choose your workspace to continue</p>
              </div>
              
              <RoleButton 
                icon={<ShieldCheck size={20}/>} 
                title="Label Admin" 
                desc="Management & Analytics" 
                onClick={() => setRole('admin')} 
              />
              
              <RoleButton 
                icon={<Music size={20}/>} 
                title="Artist Portal" 
                desc="My Releases & Studio" 
                onClick={() => setRole('artist')} 
              />
            </div>
          ) : (
            /* LOGIN FORM */
            <motion.form 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onSubmit={handleLogin}
              className="space-y-5"
            >
              <button 
                type="button"
                onClick={() => setRole(null)}
                className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-6 text-[10px] font-black uppercase tracking-widest"
              >
                <ChevronLeft size={14}/> Back
              </button>

              <div className="mb-6">
                <h2 className="text-xl font-bold capitalize">{role} Login</h2>
                <p className="text-zinc-500 text-xs mt-1">Enter your credentials to enter the OS</p>
              </div>

              <div className="space-y-4">
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-white transition-colors" size={16} />
                  <input 
                    required
                    type="email" 
                    placeholder="Email Address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-black border border-zinc-900 rounded-2xl text-xs focus:outline-none focus:border-zinc-500 transition-all"
                  />
                </div>

                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-white transition-colors" size={16} />
                  <input 
                    required
                    type="password" 
                    placeholder="Security Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-black border border-zinc-900 rounded-2xl text-xs focus:outline-none focus:border-zinc-500 transition-all"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-white text-black py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 mt-4"
              >
                Sign In <ArrowRight size={16}/>
              </button>

              <p className="text-center text-[10px] text-zinc-600 font-bold mt-6 cursor-pointer hover:text-zinc-400">
                FORGOT ACCESS KEY?
              </p>
            </motion.form>
          )}
        </div>

        <p className="text-center text-zinc-700 text-[10px] mt-10 font-bold uppercase tracking-widest">
          Authorized Label Personnel Only
        </p>
      </motion.div>
    </div>
  );
}

function RoleButton({ icon, title, desc, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className="w-full p-5 bg-black border border-zinc-900 rounded-2xl flex items-center gap-4 hover:border-zinc-500 hover:bg-zinc-900/50 transition-all group text-left"
    >
      <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center text-zinc-500 group-hover:bg-white group-hover:text-black transition-all">
        {icon}
      </div>
      <div>
        <h4 className="text-sm font-black uppercase tracking-tight">{title}</h4>
        <p className="text-[10px] text-zinc-600 font-bold">{desc}</p>
      </div>
      <ChevronLeft size={16} className="ml-auto rotate-180 text-zinc-800 group-hover:text-white transition-colors" />
    </button>
  );
}
