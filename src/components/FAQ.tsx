import React, { useState } from 'react';
import { FAQS } from '../data/waterData';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First one open by default

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-[#F8FAFC] border-t-2 border-b-2 border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block py-1 px-3.5 bg-blue-100 text-blue-700 font-bold text-xs uppercase tracking-widest mb-4 rounded-full italic border border-blue-200">
            COMMON SERVICE FAQS
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-black text-slate-900 tracking-tighter uppercase">
            COMPLIANCE & LOGISTICS
          </h2>
          <p className="mt-4 text-base font-medium text-slate-500 max-w-xl mx-auto leading-relaxed">
            Everything you need to know about aquifer mineral certification, corporate VAT billing, and specialized offload equipment.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white border-2 border-slate-200 rounded-none overflow-hidden transition shadow-xs hover:border-slate-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center space-x-4 focus:outline-none"
                >
                  <span className="font-display font-black text-slate-950 text-sm sm:text-base leading-snug uppercase tracking-tight">
                    {faq.question}
                  </span>
                  <span className="p-1.5 bg-slate-100 border border-slate-200 rounded text-slate-700 shrink-0">
                    {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t-2 border-slate-100">
                    <p className="whitespace-pre-line font-medium text-slate-500">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-12 text-center bg-white border-2 border-slate-200 rounded-none p-6 shadow-xs max-w-2xl mx-auto border-l-8 border-l-blue-600">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 font-mono">STILL HAVE SPECIALIZED LOGISTIC REQUIREMENTS?</p>
          <p className="text-sm font-black text-slate-800 uppercase tracking-tight">Need laboratory mineral certification reports or custom hose configurations?</p>
          <div className="mt-4 flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <a
              href="mailto:support@hydroflow.et"
              className="text-xs font-black text-blue-600 hover:underline uppercase tracking-widest"
            >
              EMAIL OPERATIONS OFFICE
            </a>
            <span className="text-slate-300 hidden sm:inline">|</span>
            <a
              href="tel:+251911234567"
              className="text-xs font-black text-slate-700 hover:text-blue-600 transition uppercase tracking-widest"
            >
              CALL STANDBY TEAM
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
