import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import BookingForm from './components/BookingForm';
import EmergencyContact from './components/EmergencyContact';
import FAQ from './components/FAQ';
import { Droplet, Phone, Mail, MapPin, ShieldCheck, Clock, FileText } from 'lucide-react';

export default function App() {
  const [selectedTankerId, setSelectedTankerId] = useState<string>('');

  const handleSelectTanker = (tankerId: string) => {
    setSelectedTankerId(tankerId);
    // Smooth scroll to the calculator section
    const calculatorSection = document.getElementById('calculator-section');
    if (calculatorSection) {
      calculatorSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col antialiased">
      {/* Dynamic Header */}
      <Header
        onScrollToCalculator={() => scrollToSection('calculator-section')}
        onScrollToServices={() => scrollToSection('services-section')}
        onScrollToEmergency={() => scrollToSection('emergency-section')}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero onScrollToCalculator={() => scrollToSection('calculator-section')} />

        {/* Informational Stats / Trust Bar (Secondary trust proof) */}
        <section className="bg-white border-b-2 border-slate-200 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-around gap-y-4 gap-x-8 text-[11px] text-slate-500 font-bold uppercase tracking-widest font-mono">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="h-4 w-4 text-blue-600 shrink-0" />
                <span>FMOH Food-Grade Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-blue-600 shrink-0" />
                <span>24/7 PRIORITY DISPATCH READY</span>
              </div>
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4 text-blue-600 shrink-0" />
                <span>VAT REGISTERED TIN: 0048123749</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-blue-600 shrink-0" />
                <span>HIGH-PRESSURE PUMPING EQUIPPED</span>
              </div>
            </div>
          </div>
        </section>

        {/* Services & Fleet Selection */}
        <Services onSelectTanker={handleSelectTanker} />

        {/* Emergency Outage Callout Panel */}
        <EmergencyContact />

        {/* Main Booking Calculator & Interactive Form */}
        <BookingForm selectedTankerId={selectedTankerId} onSelectTanker={setSelectedTankerId} />

        {/* Frequently Asked Questions */}
        <FAQ />
      </main>

      {/* Corporate high-contrast footer */}
      <footer className="bg-slate-950 text-white border-t-4 border-slate-900 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-b-2 border-slate-900 pb-12">
            
            {/* Branding Column */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-blue-600 rounded-none border-2 border-slate-700 text-white">
                  <Droplet className="h-5 w-5" />
                </div>
                <div>
                  <span className="font-display text-lg font-black tracking-tight text-white uppercase">HYDROFLOW BULK</span>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Water Logistics PLC</p>
                </div>
              </div>
              
              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                Ethiopia's certified premier bulk water tanker transport and emergency outage logistics partner. Serving construction, hospitality, and manufacturing sectors.
              </p>

              <div className="space-y-1.5 pt-2">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono">BUSINESS CREDENTIALS</p>
                <div className="text-[11px] text-slate-400 font-mono space-y-0.5">
                  <p>TIN / VAT NO: 0048123749</p>
                  <p>TRADE LICENSE: KK/14/839/2018</p>
                  <p>POTABLE PERMIT: FMOH-92-BWD</p>
                </div>
              </div>
            </div>

            {/* Quick Navigation Links */}
            <div>
              <h4 className="font-display font-black text-xs tracking-widest uppercase text-slate-200 mb-4">OPERATIONS</h4>
              <ul className="space-y-2.5 text-xs text-slate-400 font-medium uppercase tracking-wider">
                <li>
                  <button onClick={() => scrollToSection('services-section')} className="hover:text-blue-500 transition text-left cursor-pointer">
                    OUR TANKER FLEET
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('calculator-section')} className="hover:text-blue-500 transition text-left cursor-pointer">
                    WATER PRICE CALCULATOR
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('emergency-section')} className="hover:text-blue-500 transition text-left cursor-pointer text-red-400">
                    EMERGENCY DISPATCH
                  </button>
                </li>
                <li>
                  <a href="#services-section" className="hover:text-blue-500 transition">
                    POTABLE DRINKING WATER
                  </a>
                </li>
                <li>
                  <a href="#services-section" className="hover:text-blue-500 transition">
                    INDUSTRIAL OFFLOAD GRADE
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Details */}
            <div>
              <h4 className="font-display font-black text-xs tracking-widest uppercase text-slate-200 mb-4">CENTRAL DISPATCH OFFICE</h4>
              <ul className="space-y-3.5 text-xs text-slate-400 font-medium uppercase tracking-wide">
                <li className="flex items-start space-x-3">
                  <MapPin className="h-4.5 w-4.5 text-blue-500 shrink-0 mt-0.5" />
                  <span>
                    Bole Subcity, Woreda 03, Road 17, <br />
                    Near Bole Medhanialem Cathedral, <br />
                    Addis Ababa, Ethiopia
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <Mail className="h-4.5 w-4.5 text-blue-500 shrink-0" />
                  <a href="mailto:dispatch@hydroflow.et" className="hover:text-blue-500 transition font-mono">
                    dispatch@hydroflow.et
                  </a>
                </li>
                <li className="flex items-center space-x-3">
                  <Phone className="h-4.5 w-4.5 text-blue-500 shrink-0" />
                  <a href="tel:+251911234567" className="font-mono hover:text-blue-500 transition text-sm">
                    +251 911 234567
                  </a>
                </li>
              </ul>
            </div>

            {/* Quality & Treatment Assurances */}
            <div className="space-y-4">
              <h4 className="font-display font-black text-xs tracking-widest uppercase text-slate-200 mb-4">QUALITY ASSURANCE</h4>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                Our tankers undergo continuous sanitation audits. We source potable water exclusively from government-certified deep well reservoirs with complete microbiological screening logs.
              </p>
              <div className="bg-slate-900 border-2 border-slate-800 rounded-none p-3 text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-relaxed">
                <span>Certified Food-Grade sanitization done after every 3 deliveries or 48-hour standing period.</span>
              </div>
            </div>

          </div>

          {/* Sub Footer Copyright */}
          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] text-slate-500 font-bold uppercase tracking-widest space-y-4 sm:space-y-0">
            <p>© 2026 HydroFlow Bulk Water Logistics PLC. All Rights Reserved.</p>
            <div className="flex space-x-4">
              <a href="#calculator-section" className="hover:text-slate-300 transition">SLA Terms</a>
              <span>•</span>
              <a href="#calculator-section" className="hover:text-slate-300 transition">Invoicing Policy</a>
              <span>•</span>
              <a href="#calculator-section" className="hover:text-slate-300 transition">Water Quality Logs</a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
