import React from 'react';
import { ShieldCheck, Flame, Clock, Award, ArrowRight } from 'lucide-react';

interface HeroProps {
  onScrollToCalculator: () => void;
}

export default function Hero({ onScrollToCalculator }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 sm:py-32 border-b-4 border-blue-600">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0 opacity-20">
        <img
          src="https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&q=80&w=1600"
          alt="Clean Commercial Bulk Water Splash"
          className="h-full w-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-linear-to-b from-slate-950/40 via-slate-950/80 to-slate-950"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Tagline Badge */}
          <div className="inline-block py-1.5 px-4 bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold text-xs uppercase tracking-widest mb-8 rounded-full italic">
            24/7 PRIORITY BULK LOGISTICS
          </div>

          <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl font-black leading-[0.85] tracking-tighter uppercase mb-6 text-white">
            WATER <br />
            <span className="text-blue-500">FOR</span> <br />
            ALL.
          </h1>

          <p className="mt-8 text-lg sm:text-xl text-slate-300 font-medium max-w-2xl leading-relaxed">
            Certified potable water delivery for Addis Ababa's commercial sector. Sourced from high-purity deep aquifers. Dedicated to construction batching, hotels, food processors, and emergency industrial reserves.
          </p>

          {/* Core Trust Selling Points */}
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="p-4 border-l-4 border-blue-500 bg-white/5 backdrop-blur-xs shadow-sm">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Purity Grade</span>
              <span className="text-sm font-black text-white">100% Certified Potable</span>
            </div>
            <div className="p-4 border-l-4 border-slate-700 bg-white/5 backdrop-blur-xs shadow-sm">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Response</span>
              <span className="text-sm font-black text-white">Under 2-Hour Dispatch</span>
            </div>
            <div className="p-4 border-l-4 border-blue-500 bg-white/5 backdrop-blur-xs shadow-sm">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Invoicing</span>
              <span className="text-sm font-black text-white">VAT Registered (TIN)</span>
            </div>
            <div className="p-4 border-l-4 border-red-500 bg-white/5 backdrop-blur-xs shadow-sm animate-pulse">
              <span className="block text-[10px] font-bold text-red-400 uppercase tracking-widest">Emergency</span>
              <span className="text-sm font-black text-white">Standby Fleet Outages</span>
            </div>
          </div>

          {/* Action CTA Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={onScrollToCalculator}
              className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-8 py-4 rounded font-black uppercase tracking-widest text-sm shadow-xl transition duration-150 cursor-pointer hover:scale-[1.02] flex items-center justify-center space-x-3"
            >
              <span>REQUEST TANKER</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            <a
              href="tel:+251911234567"
              className="border-2 border-slate-700 hover:border-slate-500 bg-transparent text-slate-200 hover:text-white px-8 py-4 rounded font-black uppercase tracking-widest text-sm flex items-center justify-center space-x-3 transition duration-150"
            >
              <span>EMERGENCY CALL</span>
            </a>
          </div>
        </div>

        {/* Floating Stat Counters */}
        <div className="mt-16 pt-12 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <p className="text-4xl sm:text-5xl font-black text-white tracking-tighter">15M+</p>
            <p className="mt-1 text-xs font-bold text-slate-400 uppercase tracking-widest">LITERS DISTRIBUTED</p>
          </div>
          <div>
            <p className="text-4xl sm:text-5xl font-black text-white tracking-tighter">2.4K+</p>
            <p className="mt-1 text-xs font-bold text-slate-400 uppercase tracking-widest">COMMERCIAL TRIPS</p>
          </div>
          <div>
            <p className="text-4xl sm:text-5xl font-black text-blue-500 tracking-tighter">100%</p>
            <p className="mt-1 text-xs font-bold text-slate-400 uppercase tracking-widest">LAB CERTIFIED PURITY</p>
          </div>
          <div>
            <p className="text-4xl sm:text-5xl font-black text-white tracking-tighter">45 MIN</p>
            <p className="mt-1 text-xs font-bold text-slate-400 uppercase tracking-widest">AVERAGE DISPATCH</p>
          </div>
        </div>
      </div>
    </section>
  );
}
