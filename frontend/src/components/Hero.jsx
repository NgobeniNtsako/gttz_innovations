import React from 'react';
import { ArrowRight, Play, Hammer, ShieldCheck, Star } from 'lucide-react';
import { Button } from './ui/button';
import { COMPANY, WHATSAPP_URL } from '../mock';

const Hero = () => {
  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-black"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1579847188804-ecba0e2ea330?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHw0fHxjb25zdHJ1Y3Rpb24lMjB3b3JrZXJzfGVufDB8fHx8MTc4MDQzMDkzNXww&ixlib=rb-4.1.0&q=85"
          alt="Construction site at twilight"
          className="w-full h-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black" />
      </div>

      {/* Decorative grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glow */}
      <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-amber-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-amber-400/5 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-32 pb-20 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-400/30 bg-amber-400/5 backdrop-blur-sm mb-6 animate-fade-in">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="text-xs text-amber-100 tracking-wider uppercase font-medium">
                Trusted Construction Partner — South Africa
              </span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.02] tracking-tight text-white">
              Building Your
              <span className="block">
                Vision With{' '}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                    Excellence
                  </span>
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-3"
                    viewBox="0 0 300 12"
                    fill="none"
                  >
                    <path
                      d="M2 9 Q 150 -2 298 6"
                      stroke="url(#g1)"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="g1" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#fbbf24" />
                        <stop offset="100%" stopColor="#f59e0b" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </span>
            </h1>

            <p className="mt-8 text-lg lg:text-xl text-zinc-300 max-w-2xl leading-relaxed">
              {COMPANY.description} From foundation to finish — we craft spaces that stand the test of time.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button
                onClick={() => scrollTo('#contact')}
                className="group bg-amber-400 hover:bg-amber-300 text-black font-semibold rounded-full px-7 py-6 text-base shadow-lg shadow-amber-500/20"
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
                <div key={s.label} className="border-l-2 border-amber-400/40 pl-4">
                  <div className="text-3xl lg:text-4xl font-bold text-white">{s.num}</div>
                  <div className="text-xs uppercase tracking-wider text-zinc-400 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side card */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-br from-amber-400/30 to-transparent rounded-3xl blur-xl" />
              <div className="relative bg-zinc-900/70 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center">
                    <Hammer className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Premium Craftsmanship</div>
                    <div className="text-xs text-zinc-400">Licensed & insured experts</div>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { t: 'Free On-site Consultation', d: 'No-obligation site visits & quotes' },
                    { t: 'Transparent Pricing', d: 'No hidden costs, ever' },
                    { t: 'On-Time Completion', d: 'Projects delivered on schedule' },
                  ].map((it) => (
                    <div key={it.t} className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                      <ShieldCheck className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-medium text-white">{it.t}</div>
                        <div className="text-xs text-zinc-400 mt-0.5">{it.d}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="text-xs uppercase tracking-wider text-zinc-500">Call or WhatsApp us</div>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl font-bold text-white hover:text-amber-400 transition-colors"
                  >
                    {COMPANY.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-zinc-500">
        <div className="text-[10px] uppercase tracking-[0.3em]">Scroll</div>
        <div className="w-[1px] h-12 bg-gradient-to-b from-amber-400 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
