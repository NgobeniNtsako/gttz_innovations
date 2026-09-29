import React from 'react';
import {
  ArrowUpRight,
  Building2,
  Zap,
  Wrench,
  Grid3x3,
  ClipboardList,
  Ruler,
  Mountain,
  Check,
} from 'lucide-react';
import { SERVICES } from '../mock';

const ICONS = { Building2, Zap, Wrench, Grid3x3, ClipboardList, Ruler, Mountain };

const Services = () => {
  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="relative py-28 bg-stone-100 overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-amber-100/60 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-10 h-[1px] bg-amber-600" />
              <span className="text-xs uppercase tracking-[0.3em] text-amber-700 font-semibold">
                What We Do
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 leading-tight">
              Comprehensive solutions for every construction need.
            </h2>
          </div>
          <p className="max-w-md text-zinc-600 text-base leading-relaxed">
            Seven specialized services delivered with precision, professionalism and pride —
            from concept and engineering to hands-on construction.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, idx) => {
            const Icon = ICONS[service.icon] || Building2;
            return (
              <article
                key={service.id}
                className="group relative overflow-hidden rounded-3xl bg-white border border-stone-200 hover:border-amber-600/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/40 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-white/95 backdrop-blur-md border border-stone-200 flex items-center justify-center shadow-md">
                    <Icon className="w-6 h-6 text-amber-700" />
                  </div>
                  <div className="absolute top-4 right-4 text-xs text-white/90 tracking-wider font-mono">
                    0{idx + 1}
                  </div>
                </div>

                {/* Content */}
                <div className="p-7">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-2xl font-semibold text-zinc-900 group-hover:text-amber-700 transition-colors">
                      {service.title}
                    </h3>
                    <button
                      onClick={() => scrollTo('#contact')}
                      className="shrink-0 w-10 h-10 rounded-full border border-stone-300 flex items-center justify-center text-zinc-700 hover:bg-amber-600 hover:text-white hover:border-amber-600 transition-colors"
                      aria-label={`Inquire about ${service.title}`}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-zinc-600 text-sm leading-relaxed mb-5">{service.desc}</p>
                  <ul className="grid grid-cols-2 gap-2">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-zinc-700">
                        <Check className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
