import React, { useState } from 'react';
import { Droplet, Phone, Menu, X, Truck } from 'lucide-react';

interface HeaderProps {
  onScrollToCalculator: () => void;
  onScrollToServices: () => void;
  onScrollToEmergency: () => void;
}

export default function Header({
  onScrollToCalculator,
  onScrollToServices,
  onScrollToEmergency,
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b-2 border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center text-white font-black text-2xl">H</div>
            <div>
              <div className="flex items-baseline space-x-1">
                <span className="font-display text-2xl font-black tracking-tighter text-slate-900 uppercase">HYDROFLOW<span className="text-blue-600 underline">.</span></span>
              </div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">BULK WATER LOGISTICS</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            <button
              onClick={onScrollToServices}
              className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900 transition duration-150"
            >
              Fleet
            </button>
            <button
              onClick={onScrollToCalculator}
              className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900 transition duration-150"
            >
              Pricing
            </button>
            <button
              onClick={onScrollToEmergency}
              className="text-xs font-bold uppercase tracking-widest text-red-600 hover:text-red-700 transition duration-150 flex items-center"
            >
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse mr-2"></span>
              Emergency
            </button>

            {/* Direct Phone CTA */}
            <div className="flex items-center space-x-3 bg-slate-100 border border-slate-200 px-4 py-2 rounded">
              <Phone className="h-4 w-4 text-blue-600 animate-bounce shrink-0" />
              <div className="text-right">
                <p className="text-[9px] uppercase tracking-widest text-slate-500 font-extrabold">24/7 Dispatch</p>
                <a href="tel:+251911234567" className="text-xs font-black text-slate-900 hover:text-blue-600 transition font-mono tracking-tight">
                  +251 911 234567
                </a>
              </div>
            </div>

            <button
              onClick={onScrollToCalculator}
              className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded shadow-md uppercase tracking-widest text-xs transition-all active:scale-95"
            >
              BOOK TANKER
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <a
              href="tel:+251911234567"
              className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl text-blue-600"
              title="Call Dispatch"
            >
              <Phone className="h-5 w-5" />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-slate-900 focus:outline-none p-1.5 rounded-lg border border-slate-100 bg-slate-50"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          <button
            onClick={() => {
              onScrollToServices();
              setIsOpen(false);
            }}
            className="block w-full text-left px-4 py-2.5 text-base font-semibold text-slate-700 hover:bg-slate-50 rounded-xl"
          >
            Our Tanker Fleet
          </button>
          <button
            onClick={() => {
              onScrollToCalculator();
              setIsOpen(false);
            }}
            className="block w-full text-left px-4 py-2.5 text-base font-semibold text-slate-700 hover:bg-slate-50 rounded-xl"
          >
            Price Calculator
          </button>
          <button
            onClick={() => {
              onScrollToEmergency();
              setIsOpen(false);
            }}
            className="block w-full text-left px-4 py-2.5 text-base font-semibold text-red-600 hover:bg-red-50 rounded-xl"
          >
            Emergency Outages (24/7)
          </button>
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-50 rounded-xl">
              <span className="text-sm font-medium text-slate-500">Emergency Dispatch:</span>
              <a href="tel:+251911234567" className="text-base font-bold text-slate-900 font-mono">
                +251 911 234567
              </a>
            </div>
            <button
              onClick={() => {
                onScrollToCalculator();
                setIsOpen(false);
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-xl font-bold block"
            >
              Book Water Tanker
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
