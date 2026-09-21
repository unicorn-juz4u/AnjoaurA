import React, { useState } from 'react';
import { MODULES_DATA } from '../data/modules';
import { ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';

export default function WhatYouGet() {
  const [openModule, setOpenModule] = useState('01'); // First module open by default

  const toggleModule = (num) => {
    setOpenModule((prev) => (prev === num ? null : num));
  };

  return (
    <section id="curriculum-section" className="relative py-8 sm:py-12 bg-[#F6F0E2] border-b border-[#15120F]/15">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-left">
        
        {/* Section Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono-ledger text-xs font-bold text-[#375E42] uppercase tracking-widest bg-[#375E42]/10 px-2 py-0.5 rounded-xs">
              Curriculum Breakdown
            </span>
            <span className="text-[#15120F]/30">•</span>
            <span className="font-mono-ledger text-xs text-[#6B6250]">
              5 Action Modules
            </span>
          </div>
          <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-[#15120F] tracking-tight">
            What's Inside The 5 Modules
          </h2>
          <p className="text-sm sm:text-base text-[#6B6250] mt-1.5 max-w-2xl font-sans">
            A chronological step-by-step roadmap. Each module finishes with a tangible deliverable you use to close your first paid client.
          </p>
        </div>

        {/* Numbered Accordion List */}
        <div className="space-y-2.5">
          {MODULES_DATA.map((mod) => {
            const isOpen = openModule === mod.number;

            return (
              <div
                key={mod.number}
                className={`rounded-xs border transition-colors duration-150 ${
                  isOpen
                    ? 'bg-[#EDE3CE] border-[#15120F]/30 shadow-xs'
                    : 'bg-[#F6F0E2] border-[#15120F]/15 hover:border-[#15120F]/25'
                }`}
              >
                {/* Accordion Header Button */}
                <button
                  type="button"
                  onClick={() => toggleModule(mod.number)}
                  className="w-full flex items-center justify-between p-3.5 sm:p-4 text-left cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    {/* Module Number Stamp */}
                    <span className="font-mono-ledger text-xs sm:text-sm font-bold text-[#A6362A] bg-[#A6362A]/10 border border-[#A6362A]/25 px-2 py-0.5 rounded-xs shrink-0">
                      {mod.number}
                    </span>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2.5">
                      <h3 className="font-headline text-sm sm:text-base font-bold text-[#15120F]">
                        {mod.title}
                      </h3>
                      <span className="hidden sm:inline text-[#15120F]/25">•</span>
                      <span className="text-[13px] sm:text-sm text-[#6B6250] font-sans">
                        {mod.tagline}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    <span className="hidden sm:inline font-mono-ledger text-[11px] text-[#6B6250]">
                      {mod.timeToComplete}
                    </span>
                    <div className="w-6 h-6 rounded-xs border border-[#15120F]/15 flex items-center justify-center text-[#15120F] bg-[#EDE3CE]">
                      {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                </button>

                {/* Expanded Drawer Details */}
                {isOpen && (
                  <div className="px-3.5 pb-4 sm:px-5 sm:pb-5 pt-1 border-t border-[#15120F]/10">
                    
                    {/* Action Item Box */}
                    <div className="p-2.5 sm:p-3 rounded-xs bg-[#F6F0E2] border border-[#B8933E]/40 mb-3 flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-[#B8933E]/20 text-[#B8933E] flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="font-mono-ledger text-[10px] font-bold uppercase text-[#B8933E] block">
                          MODULE DELIVERABLE
                        </span>
                        <p className="text-[13px] sm:text-sm text-[#15120F] font-medium mt-0.5">
                          {mod.actionItem}
                        </p>
                      </div>
                    </div>

                    {/* Breakdown Topics */}
                    <div className="space-y-1.5">
                      <ul className="space-y-1 text-[13px] sm:text-sm text-[#15120F]/85 font-sans">
                        {mod.topics.map((t, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="font-mono-ledger text-[#375E42] font-bold">→</span>
                            <span className="leading-normal">{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
