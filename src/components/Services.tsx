import React from 'react';
import { TANKER_CAPACITIES } from '../data/waterData';
import { Truck, Check, Sparkles } from 'lucide-react';

interface ServicesProps {
  onSelectTanker: (tankerId: string) => void;
}

export default function Services({ onSelectTanker }: ServicesProps) {
  return (
    <section id="services-section" className="py-20 bg-[#F8FAFC] border-b-2 border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block py-1 px-3.5 bg-blue-100 text-blue-700 font-bold text-xs uppercase tracking-widest mb-4 rounded-full italic border border-blue-200">
            24/7 PRIORITY LOGISTICS
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-black text-slate-900 tracking-tighter uppercase">
            OUR TANKER FLEET
          </h2>
          <p className="mt-4 text-base font-medium text-slate-500 max-w-xl mx-auto leading-relaxed">
            Configure your required logistical footprint. Alternating heavy-volume configurations built for direct discharge.
          </p>
        </div>

        {/* Fleet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TANKER_CAPACITIES.map((tanker, index) => {
            // Alternate left border color based on index, just like the design spec did
            const borderLeftClass = index % 2 === 0 ? 'border-l-8 border-l-blue-600' : 'border-l-8 border-l-slate-900';
            
            return (
              <div
                key={tanker.id}
                className={`bg-white border-2 border-slate-200 ${borderLeftClass} overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group`}
              >
                {/* Image with overlay badge */}
                <div className="relative h-56 w-full overflow-hidden bg-slate-100 border-b border-slate-200">
                  <img
                    src={tanker.image}
                    alt={tanker.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-slate-900 text-white font-mono font-bold text-xs px-3 py-1.5 uppercase tracking-wider border border-slate-700">
                    {tanker.capacityLiters.toLocaleString()} LITERS
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Heavy Carrier</span>
                    <h3 className="font-display text-xl sm:text-2xl font-black text-slate-900 tracking-tight uppercase group-hover:text-blue-600 transition-colors">
                      {tanker.name}
                    </h3>
                    
                    <p className="mt-2 text-xs text-slate-500 min-h-[40px] leading-relaxed font-medium">
                      {tanker.description}
                    </p>

                    <div className="mt-6 pt-5 border-t border-slate-150">
                      <span className="text-[9px] font-bold tracking-widest text-slate-400 uppercase block mb-1.5">IDEAL SERVICE PROFILE</span>
                      <p className="text-xs text-slate-700 font-semibold bg-slate-50 border border-slate-200 p-3 rounded leading-relaxed italic">
                        "{tanker.idealFor}"
                      </p>
                    </div>

                    <ul className="mt-5 space-y-2.5">
                      <li className="flex items-start text-xs text-slate-600 font-medium">
                        <Check className="h-4 w-4 text-emerald-500 mr-2 shrink-0 mt-0.5" />
                        <span>Certified food-grade sanitization</span>
                      </li>
                      <li className="flex items-start text-xs text-slate-600 font-medium">
                        <Check className="h-4 w-4 text-emerald-500 mr-2 shrink-0 mt-0.5" />
                        <span>Self-powered high-flow pressure pump</span>
                      </li>
                      <li className="flex items-start text-xs text-slate-600 font-medium">
                        <Check className="h-4 w-4 text-emerald-500 mr-2 shrink-0 mt-0.5" />
                        <span>Includes 50m discharge hoses</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-8 pt-5 border-t border-slate-150">
                    <div className="flex items-baseline justify-between mb-4">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Base Purity Price:</span>
                      <div className="text-right">
                        <span className="text-2xl font-black text-slate-900 font-mono">
                          {(tanker.basePrice).toLocaleString()}
                        </span>
                        <span className="text-xs font-bold text-slate-500 ml-1">ETB</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectTanker(tanker.id)}
                      className="w-full py-4 bg-slate-900 text-slate-200 hover:bg-blue-600 hover:text-white font-black uppercase tracking-widest text-xs rounded transition-all duration-150 flex items-center justify-center space-x-2.5 active:scale-98 cursor-pointer"
                    >
                      <Truck className="h-4 w-4" />
                      <span>SELECT FOR DISPATCH</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Quality Note */}
        <div className="mt-12 bg-white border-2 border-slate-200 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-none border-l-8 border-l-blue-600">
          <div className="mb-4 sm:mb-0">
            <h4 className="font-black text-slate-900 uppercase tracking-tight text-sm">Need a custom long-term scheduling SLA?</h4>
            <p className="text-xs text-slate-500 font-semibold mt-0.5">We provide dedicated weekly or monthly delivery programs for construction phases & industrial factories.</p>
          </div>
          <button
            onClick={() => {
              const element = document.getElementById('calculator-section');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded uppercase tracking-widest text-xs transition duration-150 shrink-0 text-center"
          >
            REQUEST QUOTATION
          </button>
        </div>

      </div>
    </section>
  );
}
