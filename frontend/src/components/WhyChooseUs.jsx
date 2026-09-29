import React from 'react';
import {
  Trophy,
  BadgeCheck,
  Clock,
  Tag,
  HardHat,
  Layers,
  ShieldCheck,
  Smile,
} from 'lucide-react';
import { WHY_CHOOSE_US } from '../mock';

const ICONS = { Trophy, BadgeCheck, Clock, Tag, HardHat, Layers, ShieldCheck, Smile };

const WhyChooseUs = () => {
  return (
    <section className="relative py-28 bg-black overflow-hidden">
      {/* Decorative */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 justify-center mb-4">
            <div className="w-10 h-[1px] bg-amber-400" />
            <span className="text-xs uppercase tracking-[0.3em] text-amber-400 font-semibold">
              Why Choose Us
            </span>
            <div className="w-10 h-[1px] bg-amber-400" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            What sets us <span className="text-amber-400">apart</span>
          </h2>
          <p className="mt-5 text-zinc-400 text-lg">
            Eight reasons clients across Pretoria and South Africa trust GTTZ Innovations
            with their most important projects.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {WHY_CHOOSE_US.map((item, idx) => {
            const Icon = ICONS[item.icon] || Trophy;
            return (
              <div
                key={item.title}
                className="group relative p-6 rounded-2xl bg-gradient-to-b from-zinc-900/80 to-zinc-900/20 border border-white/5 hover:border-amber-400/40 transition-colors duration-300"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center group-hover:bg-amber-400/20 group-hover:scale-105 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-amber-400" />
                  </div>
                  <span className="text-xs text-zinc-600 font-mono">0{idx + 1}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
