import React, { useState } from 'react';
import { FileText, Layout, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

export default function WhatYouGet() {
  const [openCard, setOpenCard] = useState(null);

  const toggleCard = (num) => {
    setOpenCard(prev => prev === num ? null : num);
  };

  const cards = [
    {
      number: '01',
      category: 'VALIDATE',
      categoryColor: 'text-yellow-400',
      title: 'Problem Solving & Digital Monetization Guide',
      subtitle: 'Identify problems, shape digital opportunities, and think through monetization.',
      icon: FileText,
      iconColor: 'text-yellow-400',
      bullets: [
        'Identify persistent problems',
        'Shape digital opportunities',
        'Practical monetization framework',
      ],
    },
    {
      number: '02',
      category: 'BUILD',
      categoryColor: 'text-cyan-400',
      title: 'Antigravity + Claude Interactive Website Build Guide',
      subtitle: 'A practical guide for turning an idea into an interactive website using AI-assisted development.',
      icon: Layout,
      iconColor: 'text-cyan-400',
      bullets: [
        'From idea to interactive website',
        'AI-assisted development workflow',
        'Practical site architecture',
      ],
    },
    {
      number: '03',
      category: 'CREATE',
      categoryColor: 'text-yellow-400',
      title: '100+ Visual Prompt Shortcuts',
      subtitle: 'Ready-to-use visual prompt shortcuts for product shots, ads, website visuals, mockups, carousels, thumbnails and more.',
      icon: Sparkles,
      iconColor: 'text-yellow-400',
      bullets: [
        'Product shots & ad triggers',
        'Website visuals & mockups',
        'Carousels & thumbnails',
      ],
    },
  ];

  return (
    <section className="relative py-8 sm:py-14 bg-[#080d1a] border-y border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-6 sm:mb-10">
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-yellow-400 block mb-1">
            THREE-RESOURCE BUNDLE
          </span>
          <h2 className="text-2xl min-[390px]:text-3xl sm:text-4xl font-black text-white tracking-tight">
            VALIDATE. BUILD. CREATE.
          </h2>
        </div>

        {/* 3 Compact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            const isOpen = openCard === card.number;

            return (
              <div
                key={card.number}
                className="rounded-2xl bg-[#0d1424] border border-white/10 p-5 sm:p-6 flex flex-col justify-between hover:border-yellow-400/40 transition-colors shadow-lg text-left"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-base sm:text-lg font-black text-white font-mono">
                        {card.number}
                      </span>
                      <span className={`text-[10px] sm:text-xs font-black tracking-wider uppercase ${card.categoryColor}`}>
                        {card.category}
                      </span>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-slate-900 border border-white/10 flex items-center justify-center">
                      <Icon className={`w-4 h-4 ${card.iconColor}`} />
                    </div>
                  </div>

                  <h3 className="text-sm sm:text-base font-black text-white leading-snug mb-1.5">
                    {card.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4 min-h-[32px]">
                    {card.subtitle}
                  </p>

                  {/* Interactive Toggle Button */}
                  <button
                    type="button"
                    onClick={() => toggleCard(card.number)}
                    className="w-full inline-flex items-center justify-between py-2 px-3 rounded-lg bg-slate-900/80 border border-white/10 hover:border-yellow-400/40 text-[11px] font-bold text-yellow-300 transition-colors cursor-pointer"
                  >
                    <span>{isOpen ? 'Hide Preview -' : 'Preview System +'}</span>
                    {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {/* Accordion / Drawer Peek */}
                  {isOpen && (
                    <div className="mt-3 pt-3 border-t border-white/10 space-y-2 animate-fadeIn">
                      <span className="text-[10px] uppercase font-black tracking-wider text-slate-400 block">
                        What's inside:
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {card.bullets.map((b, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 leading-snug">
                            <span className="text-yellow-400 font-bold">•</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
