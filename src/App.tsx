/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { SnakeGame } from './components/SnakeGame';
import { MusicPlayer } from './components/MusicPlayer';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-glitch-cyan flex flex-col items-center justify-center relative overflow-hidden font-mono selection:bg-glitch-magenta selection:text-black">
      {/* Visual Noise Layers */}
      <div className="absolute inset-0 static-bg pointer-events-none z-50" />
      <div className="absolute inset-0 scanlines pointer-events-none z-50" />
      
      {/* Glitching Border */}
      <div className="fixed inset-4 border-2 border-glitch-cyan opacity-20 pointer-events-none z-40 border-dashed" />

      {/* Main Console Interface */}
      <div className="w-full max-w-[1400px] h-screen lg:h-[90vh] flex flex-col border-4 border-glitch-cyan relative z-10 bg-black/80 backdrop-blur-sm self-center">
        
        {/* Header Bar */}
        <header className="h-16 flex items-center justify-between px-6 border-b-4 border-glitch-cyan bg-glitch-cyan text-black font-black italic skew-x-[-2deg]">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl glitch-text scale-y-125 tracking-tighter uppercase leading-none">
              SYNTH_CORE_X8
            </h1>
          </div>
          <div className="flex items-center gap-8 text-sm">
            <div className="flex flex-col items-end">
              <span className="text-[10px] uppercase font-bold tracking-[0.2em]">SYS_INTEGRITY</span>
              <span className="animate-pulse">98.4%</span>
            </div>
            <div className="w-1 h-8 bg-black/20" />
            <div className="flex flex-col items-end">
              <span className="text-[10px] uppercase font-bold tracking-[0.2em]">DATA_LEAK</span>
              <span className="text-glitch-magenta glitch-text">CRITICAL</span>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          
          {/* Left Column: Data Stream (Music) */}
          <aside className="w-full lg:w-[400px] border-b-4 lg:border-b-0 lg:border-r-4 border-glitch-cyan flex flex-col p-6 overflow-y-auto bg-black">
            <div className="mb-6 border-l-4 border-glitch-magenta pl-4 py-2">
              <h2 className="text-lg font-black uppercase tracking-widest text-glitch-magenta mb-1 italic">WAV_STREAM</h2>
              <p className="text-[10px] opacity-60 uppercase tracking-tighter">Initializing neural audio buffers...</p>
            </div>
            <MusicPlayer />
            
            <div className="mt-8 pt-8 border-t border-glitch-cyan/20">
              <div className="bg-glitch-cyan/5 p-4 border border-glitch-cyan/40">
                <h3 className="text-xs uppercase font-bold mb-4 flex justify-between items-center">
                  <span>LOG_DUMP</span>
                  <span className="w-2 h-2 bg-glitch-magenta rounded-full animate-ping" />
                </h3>
                <div className="space-y-1 text-[10px] font-mono leading-tight opacity-80">
                  <p className="text-white">// SYNC_START: 0.02s</p>
                  <p className="text-glitch-magenta">// BUFFER_OFLOW: IGNORED</p>
                  <p className="text-glitch-cyan">// RENDER_PXL: ACTIVE</p>
                  <p className="text-white">// KERNEL_PANIC: SUPPRESSED</p>
                  <p className="text-glitch-cyan animate-pulse">_</p>
                </div>
              </div>
            </div>
          </aside>

          {/* Center Column: Game Array */}
          <main className="flex-1 p-6 flex items-center justify-center relative bg-[#050505]">
            {/* Visual Distortion Elements */}
            <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-glitch-magenta/30" />
            <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-glitch-magenta/30" />
            
            <div className="relative">
              <SnakeGame />
            </div>
          </main>

          {/* Right Column (Desktop Only): Hardware Monitors */}
          <section className="hidden xl:flex w-64 border-l-4 border-glitch-cyan flex-col p-6 gap-8 bg-black">
            <div className="space-y-6">
              <h4 className="text-xs font-black uppercase tracking-[0.4em] text-center border-b border-glitch-cyan pb-2 opacity-40">HW_MONITORS</h4>
              
              {[
                { label: 'CPU_CLOCK', val: '4.2GHz', color: 'text-glitch-cyan' },
                { label: 'MEM_LOAD', val: '86%', color: 'text-glitch-magenta' },
                { label: 'VOLT_DROP', val: '1.2V', color: 'text-white' },
              ].map((m) => (
                <div key={m.label} className="group cursor-pointer">
                  <div className="flex justify-between items-end mb-1">
                    <span className="text-[10px] opacity-40 uppercase tracking-widest">{m.label}</span>
                    <span className={`text-xs font-bold ${m.color}`}>{m.val}</span>
                  </div>
                  <div className="h-1 bg-white/5 relative">
                    <div className={`absolute inset-y-0 left-0 bg-current ${m.color}`} style={{ width: '70%' }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 border-2 border-glitch-cyan/60 p-4 border-dotted">
              <div className="text-[9px] uppercase tracking-widest leading-relaxed text-white/40">
                // AUTHORIZED ACCESS ONLY <br />
                // UNAUTHORIZED ATTEMPTS WILL TRIGGER NEURAL_WIPE_v2.0
              </div>
            </div>
          </section>
        </div>

        {/* Status Footer */}
        <footer className="h-10 border-t-4 border-glitch-cyan bg-glitch-cyan/10 flex items-center justify-between px-6 text-[10px] font-bold uppercase tracking-[0.3em] shrink-0">
          <div className="flex gap-8">
            <span className="text-glitch-cyan">LOC: GRID_884</span>
            <span className="text-glitch-magenta">USER: ANONYMOUS_VOID</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="animate-pulse">STABLE_CONNECTION_CONFIRMED</span>
            <div className="w-2 h-2 bg-glitch-cyan" />
          </div>
        </footer>
      </div>
    </div>
  );
}
