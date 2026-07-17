import React from 'react';
import { Phone, AlertTriangle, ShieldCheck, Flame, ShieldAlert } from 'lucide-react';

export default function EmergencyContact() {
  return (
    <section id="emergency-section" className="py-20 bg-slate-950 text-white border-b-4 border-red-600 relative overflow-hidden">
      {/* Background Subtle Water/Grid Overlay */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(#ef4444_1px,transparent_1px)] [background-size:16px_16px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 border-2 border-red-600 rounded-none p-8 sm:p-12 lg:grid lg:grid-cols-12 lg:gap-12 lg:items-center">
          
          {/* Visual Indicators */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-block py-1 px-3.5 bg-red-500/10 text-red-400 font-bold text-xs uppercase tracking-widest rounded-full italic border border-red-500/30">
              CRITICAL DISPATCH HOTLINE
            </div>

            <h3 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tighter text-white">
              COMMERCIAL WATER OUTAGE?
            </h3>
            
            <p className="text-slate-300 font-medium text-sm leading-relaxed max-w-2xl">
              Water suspension stops production lines, concrete mixing, and hotel bookings. Our rapid bypass channel routes emergency potable tankers directly to your coordinates in real-time.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="p-4 border-l-4 border-red-500 bg-white/5 shadow-xs">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Rapid Response</span>
                <span className="text-sm font-black text-white">15-Min Mobilization</span>
              </div>

              <div className="p-4 border-l-4 border-blue-500 bg-white/5 shadow-xs">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Purity Guard</span>
                <span className="text-sm font-black text-white">Guaranteed Potable</span>
              </div>
            </div>
          </div>

          {/* Direct Callback Card */}
          <div className="lg:col-span-5 mt-10 lg:mt-0">
            <div className="bg-slate-950 border-2 border-slate-800 p-8 rounded-none text-center relative shadow-xl">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[9px] font-black px-4 py-1 uppercase tracking-widest flex items-center space-x-1.5">
                <AlertTriangle className="h-3 w-3 animate-pulse" />
                <span>HOTLINE ONLINE</span>
              </div>

              <h4 className="font-display font-bold text-slate-400 text-[10px] uppercase tracking-widest mb-2">TAP TO CALL OPERATIONS</h4>
              
              <a 
                href="tel:+251911234567" 
                className="font-mono text-3xl sm:text-4xl font-black text-white hover:text-red-500 transition block py-2"
              >
                +251 911 234567
              </a>
              
              <p className="text-[11px] text-slate-400 font-medium leading-relaxed mt-2 uppercase tracking-wide">
                Direct bypass line to standby logistic officers. Zero hold times.
              </p>

              <div className="mt-6 pt-5 border-t border-slate-900 flex items-center justify-center space-x-2 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Standby Fleet: 6 Tankers Active</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
