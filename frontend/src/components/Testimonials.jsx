import React from 'react';
import { Quote, Star } from 'lucide-react';
import { TESTIMONIALS } from '../mock';

const Testimonials = () => {
  return (
    <section className="relative py-28 overflow-hidden" style={{ backgroundColor: '#232428' }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-amber-500/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 justify-center mb-4">
            <div className="w-10 h-[1px] bg-amber-500" />
            <span className="text-xs uppercase tracking-[0.3em] text-amber-400 font-semibold">
              Testimonials
            </span>
            <div className="w-10 h-[1px] bg-amber-500" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            What our clients say.
          </h2>
          <p className="mt-5 text-zinc-400 text-lg">
            Real feedback from real customers across South Africa.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={t.name}
              className={`group relative p-7 rounded-3xl border transition-all duration-300 hover:-translate-y-1 ${
                idx === 1
                  ? 'bg-gradient-to-br from-amber-500/20 to-amber-500/5 border-amber-500/40'
                  : 'surface-card'
              }`}
            >
              <Quote className="w-9 h-9 text-amber-400/70 mb-4" />
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-zinc-200 leading-relaxed mb-6 text-[15px]">"{t.quote}"</p>
              <div className="pt-5 border-t border-white/10">
                <div className="font-semibold text-white">{t.name}</div>
                <div className="text-xs text-zinc-400 mt-0.5">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
