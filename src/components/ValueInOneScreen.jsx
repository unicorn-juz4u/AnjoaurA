import React from 'react';
import { ArrowDown, ArrowRight, Brain, Code2, Sparkles } from 'lucide-react';

export default function ValueInOneScreen() {
  const steps = [
    {
      label: 'VALIDATE',
      action: 'Find the problem and shape the opportunity.',
      icon: Brain,
      accent: 'border-yellow-400/40 text-yellow-400',
    },
    {
      label: 'BUILD',
      action: 'Turn the idea into an interactive web experience.',
      icon: Code2,
      accent: 'border-cyan-400/40 text-cyan-400',
    },
    {
      label: 'CREATE',
      action: 'Create the visual assets needed to present it.',
      icon: Sparkles,
      accent: 'border-yellow-400/40 text-yellow-400',
    },
  ];

  return (
    <section className="relative py-8 sm:py-14 bg-[#070A12] border-b border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        
        <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-yellow-400 block mb-1">
          WORKFLOW ARCHITECTURE
        </span>
        <h2 className="text-xl min-[390px]:text-2xl sm:text-3xl font-black text-white tracking-tight mb-6 sm:mb-8">
          THE 3-STEP SYSTEM FLOW
        </h2>

        {/* 3 Step Connected Visual (Horizontal on desktop, vertical on mobile) */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <React.Fragment key={step.label}>
                <div className={`w-full md:w-1/3 p-4 sm:p-5 rounded-2xl bg-[#0b1220] border ${step.accent} text-center shadow-lg`}>
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center mx-auto mb-2.5">
                    <Icon className="w-5 h-5 text-yellow-400" />
                  </div>
                  <span className="text-sm sm:text-base font-black text-white tracking-wider block mb-1">
                    {step.label}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-300 font-medium">
                    {step.action}
                  </p>
                </div>

                {/* Arrow connector */}
                {idx < steps.length - 1 && (
                  <>
                    <div className="md:hidden text-yellow-400/60 py-0.5">
                      <ArrowDown className="w-5 h-5" />
                    </div>
                    <div className="hidden md:block text-yellow-400/60 shrink-0">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Summary Statement */}
        <div className="p-3 rounded-xl bg-slate-900/70 border border-white/10 max-w-sm mx-auto">
          <p className="text-xs sm:text-sm font-bold text-slate-200">
            One purchase. Three resources. One complete workflow.
          </p>
        </div>

      </div>
    </section>
  );
}
