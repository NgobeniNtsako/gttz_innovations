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
    <section
      id="services"
      className="relative py-28 overflow-hidden"
      style={{ backgroundColor: '#2b2d31' }}
    >
      {/* Subtle background image */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjB0ZWFtfGVufDB8fHx8MTc5MDY5NjE1Nnww&ixlib=rb-4.1.0&q=85')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-amber-500/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-10 h-[1px] bg-amber-500" />
              <span className="text-xs uppercase tracking-[0.3em] text-amber-400 font-semibold">
                What We Do
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Comprehensive solutions for every construction need.
            </h2>
          </div>
          <p className="max-w-md text-zinc-400 text-base leading-relaxed">
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
                className="group relative overflow-hidden rounded-3xl surface-card hover:shadow-2xl hover:shadow-black/40 hover:-translate-y-1 transition-all duration-500"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(43,45,49,0.1) 0%, rgba(43,45,49,0.6) 65%, #35373c 100%)',
                    }}
                  />
                  <div
                    className="absolute top-4 left-4 w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/10"
                    style={{ background: 'rgba(43,45,49,0.7)' }}
                  >
                    <Icon className="w-6 h-6 text-amber-400" />
                  </div>
                  <div className="absolute top-4 right-4 text-xs text-white/70 tracking-wider font-mono">
                    0{idx + 1}
                  </div>
                </div>

                <div className="p-7">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-2xl font-semibold text-white group-hover:text-amber-400 transition-colors">
                      {service.title}
                    </h3>
                    <button
                      onClick={() => scrollTo('#contact')}
                      className="shrink-0 w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:bg-amber-500 hover:text-zinc-900 hover:border-amber-500 transition-colors"
                      aria-label={`Inquire about ${service.title}`}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-5">{service.desc}</p>
                  <ul className="grid grid-cols-2 gap-2">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-zinc-300">
                        <Check className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
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
