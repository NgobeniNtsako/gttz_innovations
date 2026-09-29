import React from 'react';
import { ArrowRight } from 'lucide-react';
import { WHATSAPP_URL } from '../mock';

const BAND_IMAGE =
  'https://images.pexels.com/photos/33531832/pexels-photo-33531832.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';

const CtaBand = () => {
  return (
    <section className="relative overflow-hidden" aria-label="Ready to build">
      <div className="relative h-[420px] md:h-[380px] flex items-center">
        <img
          src={BAND_IMAGE}
          alt="Construction site at work"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(30,31,34,0.95) 0%, rgba(43,45,49,0.75) 55%, rgba(43,45,49,0.35) 100%)',
          }}
        />
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-amber-500/15 blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-10 h-[1px] bg-amber-500" />
              <span className="text-xs uppercase tracking-[0.3em] text-amber-400 font-semibold">
                Ready to build?
              </span>
            </div>
            <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              Let's turn your next project into a landmark.
            </h3>
            <p className="mt-4 text-zinc-300 text-base md:text-lg max-w-xl">
              From a small renovation to a commercial development, our team is ready to
              deliver quality on time and on budget.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-zinc-900 font-semibold rounded-full px-6 py-3 text-sm shadow-lg shadow-amber-500/25 transition-colors"
              >
                Get a Free Quote
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/5 border border-white/20 hover:bg-white/10 text-white rounded-full px-6 py-3 text-sm backdrop-blur-sm transition-colors"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaBand;
