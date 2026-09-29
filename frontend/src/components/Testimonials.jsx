import React from 'react';
import { Quote, Star } from 'lucide-react';
import { TESTIMONIALS } from '../mock';

const Testimonials = () => {
  return (
    <section className="relative py-28 bg-white overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-amber-100/50 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 justify-center mb-4">
            <div className="w-10 h-[1px] bg-amber-600" />
            <span className="text-xs uppercase tracking-[0.3em] text-amber-700 font-semibold">
              Testimonials
            </span>
            <div className="w-10 h-[1px] bg-amber-600" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 leading-tight">
            What our clients say.
          </h2>
          <p className="mt-5 text-zinc-600 text-lg">
            Real feedback from real customers across South Africa.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={t.name}
              className={`group relative p-7 rounded-3xl border transition-shadow duration-300 hover:shadow-lg ${
                idx === 1
                  ? 'bg-amber-50 border-amber-200'
                  : 'bg-stone-50 border-stone-200'
              }`}
            >
              <Quote className="w-9 h-9 text-amber-600/70 mb-4" />
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <p className="text-zinc-800 leading-relaxed mb-6 text-[15px]">"{t.quote}"</p>
              <div className="pt-5 border-t border-stone-200">
                <div className="font-semibold text-zinc-900">{t.name}</div>
                <div className="text-xs text-zinc-500 mt-0.5">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
