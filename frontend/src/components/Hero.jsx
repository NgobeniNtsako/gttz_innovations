import React from 'react';
import { ArrowRight, Play, ShieldCheck, Star, Hammer } from 'lucide-react';
import { Button } from './ui/button';
import { COMPANY, WHATSAPP_URL } from '../mock';
import { Logo } from './Navbar';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1575230167650-dce335edc7f4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzN8MHwxfHNlYXJjaHwzfHxjb25zdHJ1Y3Rpb24lMjBzaXRlJTIwY3JhbmV8ZW58MHx8fHwxNzkwNjk5MzA4fDA&ixlib=rb-4.1.0&q=85';
const HERO_IMAGE_SIDE =
  'https://images.unsplash.com/photo-1527335988388-b40ee248d80c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzN8MHwxfHNlYXJjaHwyfHxjb25zdHJ1Y3Rpb24lMjBzaXRlJTIwY3JhbmV8ZW58MHx8fHwxNzkwNjk5MzA4fDA&ixlib=rb-4.1.0&q=85';

const Hero = () => {
  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-16"
      style={{ backgroundColor: '#2b2d31' }}
    >
      {/* Full bg image with heavy dark overlay */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="Modern architecture"
          className="w-full h-full object-cover opacity-30"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, #2b2d31 0%, rgba(43,45,49,0.9) 45%, rgba(43,45,49,0.55) 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(43,45,49,0.6) 0%, transparent 30%, rgba(43,45,49,0.9) 100%)',
          }}
        />
      </div>

      {/* Amber glow */}
      <div className="absolute top-40 -right-40 w-[600px] h-[600px] rounded-full bg-amber-500/10 blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-amber-600/5 blur-[140px] pointer-events-none" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full">
        <div className="grid lg:grid-cols-12 gap-14 items-center">
          {/* Left content */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 backdrop-blur-sm mb-6 animate-fade-in">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="text-xs text-amber-200 tracking-wider uppercase font-semibold">
                Trusted Construction Partner — South Africa
              </span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold leading-[1.02] tracking-tight text-white">
              Building Your Vision With Excellence.
            </h1>

            <p className="mt-8 text-lg lg:text-xl text-zinc-300 max-w-2xl leading-relaxed">
              {COMPANY.description} From foundation to finish — we craft spaces that stand the test of time.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button
                onClick={() => scrollTo('#contact')}
                className="group bg-amber-500 hover:bg-amber-400 text-zinc-900 font-semibold rounded-full px-7 py-6 text-base shadow-lg shadow-amber-500/25"
              >
                Get a Free Quote
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                onClick={() => scrollTo('#services')}
                variant="outline"
                className="group bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/40 text-white rounded-full px-7 py-6 text-base backdrop-blur-sm"
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
                <div key={s.label} className="border-l-2 border-amber-500 pl-4">
                  <div className="text-3xl lg:text-4xl font-bold text-white">{s.num}</div>
                  <div className="text-xs uppercase tracking-wider text-zinc-400 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right visual - hero image with floating logo */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="relative">
              {/* Big floating logo */}
              <div className="absolute -top-8 -left-10 z-20 animate-float">
                <Logo size={130} />
              </div>

              {/* Amber ring behind card */}
              <div className="absolute -inset-3 rounded-[2.2rem] bg-gradient-to-br from-amber-500/20 via-transparent to-transparent blur-lg" />

              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-black/50 border border-white/10">
                <img
                  src={HERO_IMAGE_SIDE}
                  alt="Modern architecture at daylight"
                  className="w-full h-[540px] object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(43,45,49,0.1) 0%, rgba(43,45,49,0.7) 70%, rgba(43,45,49,0.95) 100%)',
                  }}
                />

                {/* Overlay glass card */}
                <div className="absolute bottom-6 left-6 right-6 rounded-2xl p-5 border border-white/10 backdrop-blur-md"
                  style={{ background: 'rgba(35,36,40,0.85)' }}
                >
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 w-11 h-11 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
                      <Hammer className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Premium Craftsmanship</div>
                      <div className="text-xs text-zinc-400 mt-0.5">
                        Licensed & insured experts — free on-site quotes
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-zinc-400">Call / WhatsApp</div>
                      <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-bold text-white hover:text-amber-400 transition-colors"
                      >
                        {COMPANY.phone}
                      </a>
                    </div>
                    <ShieldCheck className="w-9 h-9 text-emerald-400" />
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
