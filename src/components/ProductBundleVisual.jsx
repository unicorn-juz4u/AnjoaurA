import React from 'react';
import { CONFIG } from '../config';
import { FileText, Layout, Sparkles, Check } from 'lucide-react';

export default function ProductBundleVisual({ size = 'default', showBadge = true }) {
  const isMobileHero = size === 'mobile-hero';
  const isCompact = size === 'compact';

  if (isMobileHero) {
    return (
      <div className="relative w-full flex items-center justify-center select-none py-1 max-w-[310px] mx-auto">
        <div className="relative w-full flex items-center justify-center min-h-[145px]">
          
          {/* RESOURCE 2 (LEFT LAYER): Antigravity + Claude Guide */}
          <div
            className="absolute left-1 top-2 w-[145px] h-[120px] rounded-lg bg-[#0d1527] border border-cyan-500/40 p-2 text-left shadow-lg transform -rotate-4 opacity-80"
            style={{ boxShadow: '0 8px 20px rgba(0,0,0,0.8)' }}
          >
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-1 mb-1">
              <span className="text-[8px] font-bold text-cyan-400 flex items-center gap-0.5">
                <Layout className="w-2.5 h-2.5" /> RES 02
              </span>
              <span className="text-[7px] bg-cyan-400/20 text-cyan-300 px-1 rounded font-bold">
                BUILD
              </span>
            </div>
            <h5 className="text-[10px] font-black text-white leading-tight">
              Antigravity + Claude Guide
            </h5>
            <p className="text-[8px] text-slate-300 mt-0.5 line-clamp-2 leading-tight">
              Interactive website build guide.
            </p>
          </div>

          {/* RESOURCE 3 (RIGHT LAYER): 100+ Visual Prompt Shortcuts */}
          <div
            className="absolute right-1 top-2 w-[145px] h-[120px] rounded-lg bg-[#0f172a] border border-yellow-400/40 p-2 text-left shadow-lg transform rotate-4 opacity-80"
            style={{ boxShadow: '0 8px 20px rgba(0,0,0,0.8)' }}
          >
            <div className="flex items-center justify-between border-b border-yellow-400/20 pb-1 mb-1">
              <span className="text-[8px] font-bold text-yellow-400 flex items-center gap-0.5">
                <Sparkles className="w-2.5 h-2.5" /> RES 03
              </span>
              <span className="text-[7px] bg-yellow-400/20 text-yellow-300 px-1 rounded font-bold">
                CREATE
              </span>
            </div>
            <h5 className="text-[10px] font-black text-white leading-tight">
              100+ Prompt Shortcuts
            </h5>
            <p className="text-[8px] text-slate-300 mt-0.5 line-clamp-2 leading-tight">
              Product shots, ads & visual prompts.
            </p>
          </div>

          {/* RESOURCE 1 (PRIMARY FOREGROUND) */}
          <div
            className="relative z-20 w-[195px] min-h-[135px] rounded-xl bg-[#090E1A] border-2 border-yellow-400/75 p-2.5 text-left shadow-2xl"
            style={{ boxShadow: '0 12px 30px rgba(0,0,0,0.95)' }}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-1 mb-1.5">
              <div className="flex items-center gap-1">
                <span className="w-3.5 h-3.5 rounded bg-yellow-400 text-slate-950 flex items-center justify-center font-black text-[8px]">
                  01
                </span>
                <span className="text-[9px] font-black text-yellow-400 uppercase">
                  VALIDATE
                </span>
              </div>
              <span className="text-[8px] font-mono text-slate-400 bg-slate-800 px-1 rounded">
                PDF
              </span>
            </div>

            <h4 className="text-xs font-black text-white leading-tight">
              PROBLEM SOLVING &<br />
              <span className="text-yellow-400">DIGITAL MONETIZATION</span>
            </h4>
            <div className="w-6 h-0.5 bg-yellow-400 rounded-full my-1" />
            <p className="text-[9px] text-slate-300 leading-snug line-clamp-2">
              Identify problems, shape digital opportunities, and think through monetization.
            </p>

            <div className="mt-2 pt-1.5 border-t border-white/10 flex items-center justify-between text-[8px] text-slate-400 font-semibold">
              <span className="text-emerald-400">✓ Digital Access</span>
              <span className="text-yellow-400 font-bold">{CONFIG.PRICE}</span>
            </div>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full flex items-center justify-center select-none ${isCompact ? 'py-2 max-w-sm' : 'py-4 max-w-lg'} mx-auto`}>
      {/* Crisp Value Badge */}
      {showBadge && (
        <div className="absolute -top-2 right-2 sm:right-6 z-30">
          <div className="inline-flex items-center gap-1.5 bg-yellow-400 text-slate-950 font-black px-3 py-1.5 rounded-full text-xs shadow-lg border border-yellow-300">
            <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
            <span>ALL 3 INCLUDED • {CONFIG.PRICE}</span>
          </div>
        </div>
      )}

      {/* Main Composite Product Presentation */}
      <div className="relative w-full flex items-center justify-center">
        
        {/* RESOURCE 2 (LEFT LAYER): Antigravity + Claude Interactive Website Guide */}
        <div
          className={`absolute left-0 sm:left-2 top-4 sm:top-6 rounded-xl bg-[#0d1527] border border-cyan-500/40 p-3 sm:p-4 text-left shadow-2xl transition-transform duration-300 transform -rotate-3 hover:-rotate-1 ${
            isCompact 
              ? 'w-[190px] h-[220px] opacity-75' 
              : 'w-[200px] min-[390px]:w-[230px] sm:w-[280px] h-[250px] sm:h-[320px] opacity-85'
          }`}
          style={{
            boxShadow: '0 15px 35px -5px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(6, 182, 212, 0.2)',
          }}
        >
          <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2 mb-2">
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-cyan-400 flex items-center gap-1">
              <Layout className="w-3 h-3" />
              <span>Resource 02</span>
            </span>
            <span className="text-[8px] sm:text-[9px] font-bold bg-cyan-400/15 text-cyan-300 px-1.5 py-0.5 rounded">
              BUILD
            </span>
          </div>

          <div className="space-y-1.5">
            <h4 className="text-xs sm:text-sm font-black text-white leading-tight">
              Antigravity + Claude Interactive Website Build Guide
            </h4>
            <p className="text-[10px] sm:text-[11px] text-slate-300 leading-relaxed">
              A practical guide for turning an idea into an interactive website using AI-assisted development.
            </p>
          </div>

          <div className="mt-3 sm:mt-6 pt-2 border-t border-white/5 space-y-1">
            <div className="text-[8px] sm:text-[9px] uppercase tracking-wider text-cyan-300/80 font-bold">
              Format:
            </div>
            <div className="text-[9px] sm:text-[10px] text-slate-400 font-mono">
              Digital Download (PDF)
            </div>
          </div>
        </div>

        {/* RESOURCE 3 (RIGHT LAYER): 100+ Visual Prompt Shortcuts */}
        <div
          className={`absolute right-0 sm:right-2 top-4 sm:top-6 rounded-xl bg-[#0f172a] border border-yellow-400/40 p-3 sm:p-4 text-left shadow-2xl transition-transform duration-300 transform rotate-3 hover:rotate-1 ${
            isCompact 
              ? 'w-[190px] h-[220px] opacity-75' 
              : 'w-[200px] min-[390px]:w-[230px] sm:w-[280px] h-[250px] sm:h-[320px] opacity-85'
          }`}
          style={{
            boxShadow: '0 15px 35px -5px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(250, 204, 21, 0.2)',
          }}
        >
          <div className="flex items-center justify-between border-b border-yellow-400/20 pb-2 mb-2">
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-yellow-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>Resource 03</span>
            </span>
            <span className="text-[8px] sm:text-[9px] font-bold bg-yellow-400/15 text-yellow-300 px-1.5 py-0.5 rounded">
              CREATE
            </span>
          </div>

          <div className="space-y-1.5">
            <h4 className="text-xs sm:text-sm font-black text-white leading-tight">
              100+ Visual Prompt Shortcuts
            </h4>
            <p className="text-[10px] sm:text-[11px] text-slate-300 leading-relaxed">
              Ready-to-use visual prompt shortcuts for product shots, ads, website visuals, mockups and more.
            </p>
          </div>

          <div className="mt-3 sm:mt-6 pt-2 border-t border-white/5 space-y-1">
            <div className="text-[8px] sm:text-[9px] uppercase tracking-wider text-yellow-300/80 font-bold">
              Prompt Drivers:
            </div>
            <div className="text-[8px] sm:text-[9px] text-slate-400 flex flex-wrap gap-1 font-mono">
              <span className="bg-slate-800/80 px-1 py-0.5 rounded">/productad</span>
              <span className="bg-slate-800/80 px-1 py-0.5 rounded">/websitehero</span>
              <span className="bg-slate-800/80 px-1 py-0.5 rounded">/cinematic</span>
            </div>
          </div>
        </div>

        {/* RESOURCE 1 (PRIMARY FOREGROUND): Problem Solving & Digital Monetization Guide */}
        <div
          className={`relative z-20 rounded-2xl bg-[#090E1A] border-2 border-yellow-400/70 p-4 sm:p-6 text-left transition-all duration-300 ${
            isCompact 
              ? 'w-[230px] sm:w-[260px] min-h-[280px]' 
              : 'w-[250px] min-[390px]:w-[280px] sm:w-[330px] md:w-[360px] min-h-[330px] sm:min-h-[400px]'
          }`}
          style={{
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.95), 0 0 0 1px rgba(250, 204, 21, 0.3)',
          }}
        >
          {/* Spine indicator on left edge */}
          <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-gradient-to-r from-yellow-400/40 via-yellow-400/10 to-transparent rounded-l-2xl pointer-events-none" />

          {/* Guide Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 pl-1">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-md bg-yellow-400 text-slate-950 flex items-center justify-center font-black text-[10px]">
                01
              </div>
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-yellow-400">
                VALIDATE
              </span>
            </div>
            <span className="text-[9px] font-mono text-slate-400 bg-slate-800/90 px-1.5 py-0.5 rounded border border-white/10">
              36 PAGES
            </span>
          </div>

          {/* Guide Title */}
          <div className="pl-1 mb-4">
            <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
              ANJOAURA LAUNCH SYSTEM
            </span>
            <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight leading-[1.15]">
              PROBLEM SOLVING &<br />
              <span className="text-yellow-400">DIGITAL MONETIZATION</span>
            </h3>
            <div className="w-12 h-1 bg-yellow-400 rounded-full my-2.5" />
            <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed">
              Identify problems, shape digital opportunities, and think through monetization.
            </p>
          </div>

          {/* Included Deliverable Box */}
          <div className="mt-4 p-2.5 sm:p-3 rounded-xl bg-slate-900/90 border border-white/10 pl-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-yellow-400 shrink-0" />
              <div className="text-[10px] sm:text-[11px] font-bold text-white leading-tight">
                Digital PDF Guide
              </div>
            </div>
            <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">
              <Check className="w-3 h-3" /> Ready
            </span>
          </div>

          {/* Bottom Strip */}
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400 pl-1 font-medium">
            <span>Instant PDF Access</span>
            <span className="text-yellow-400 font-bold">{CONFIG.PRICE} Complete System</span>
          </div>
        </div>

      </div>
    </div>
  );
}
