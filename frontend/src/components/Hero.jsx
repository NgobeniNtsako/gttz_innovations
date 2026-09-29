import React from 'react';
import { ArrowRight, Play, ShieldCheck, Star, Hammer } from 'lucide-react';
import { Button } from './ui/button';
import { COMPANY, WHATSAPP_URL } from '../mock';
import { Logo } from './Navbar';

const Hero = () => {
  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-stone-100 via-stone-50 to-white pt-28 pb-16"
    >
      {/* Soft decorative shapes */}
      <div className="absolute top-40 -right-40 w-[600px] h-[600px] rounded-full bg-amber-200/40 blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-stone-300/40 blur-[140px] pointer-events-none" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full">
        <div className="grid lg:grid-cols-12 gap-14 items-center">
          {/* Left content */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-600/30 bg-amber-50 mb-6 animate-fade-in">
              <Star className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
              <span className="text-xs text-amber-800 tracking-wider uppercase font-semibold">
                Trusted Construction Partner — South Africa
              </span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold leading-[1.02] tracking-tight text-zinc-900">
              Building Your Vision With Excellence.
            </h1>

            <p className="mt-8 text-lg lg:text-xl text-zinc-600 max-w-2xl leading-relaxed">
              {COMPANY.description} From foundation to finish — we craft spaces that stand the test of time.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button
                onClick={() => scrollTo('#contact')}
                className="group bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-full px-7 py-6 text-base shadow-lg shadow-amber-600/25"
              >
                Get a Free Quote
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                onClick={() => scrollTo('#services')}
                variant="outline"
                className="group bg-white border-stone-300 hover:bg-stone-50 hover:border-zinc-400 text-zinc-900 rounded-full px-7 py-6 text-base"
              >
                <Play className="mr-2 w-4 h-4" />
                Our Services
              </Button>
            </div>

            <div className="mt-14 grid grid-cols-3 gap-6 max-w-xl">
              {[
                { num: '15+', label: 'Years' },
                { num: '500+', label: 'Projects' },
                { num: '98%', label: 'Satisfaction' },
              ].map((s) => (
                <div key={s.label} className="border-l-2 border-amber-600 pl-4">
                  <div className="text-3xl lg:text-4xl font-bold text-zinc-900">{s.num}</div>
                  <div className="text-xs uppercase tracking-wider text-zinc-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right visual */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="relative">
              {/* Big brand logo showcase */}
              <div className="absolute -top-10 -right-6 z-20 animate-float">
                <Logo size={120} />
              </div>

              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-stone-400/30 border border-stone-200">
                <img
                  src="https://images.unsplash.com/photo-1614595737476-42487331b8a1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzB8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBkYXlsaWdodHxlbnwwfHx8fDE3OTA2OTYxNTZ8MA&ixlib=rb-4.1.0&q=85"
                  alt="Modern architecture"
                  className="w-full h-[520px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/40 via-transparent to-transparent" />

                {/* Overlay card */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-stone-100 shadow-lg">
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center">
                      <Hammer className="w-5 h-5 text-amber-700" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-zinc-900">Premium Craftsmanship</div>
                      <div className="text-xs text-zinc-500 mt-0.5">
                        Licensed & insured experts — free on-site quotes
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-stone-200 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-zinc-500">Call / WhatsApp</div>
                      <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-bold text-zinc-900 hover:text-amber-700 transition-colors"
                      >
                        {COMPANY.phone}
                      </a>
                    </div>
                    <ShieldCheck className="w-9 h-9 text-emerald-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
