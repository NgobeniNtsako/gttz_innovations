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

const BG_IMAGE =
  'https://images.unsplash.com/photo-1721244654394-36a7bc2da288?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1ODh8MHwxfHNlYXJjaHw0fHxibHVlcHJpbnR8ZW58MHx8fHwxNzgwNDMwOTM1fDA&ixlib=rb-4.1.0&q=85';

const WhyChooseUs = () => {
  return (
    <section className="relative py-28 overflow-hidden" style={{ backgroundColor: '#232428' }}>
      {/* Background image with dark overlay */}
      <div className="absolute inset-0">
        <img src={BG_IMAGE} alt="" className="w-full h-full object-cover opacity-[0.08]" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, #232428 0%, rgba(35,36,40,0.7) 40%, #232428 100%)',
          }}
        />
      </div>

      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-amber-500/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 justify-center mb-4">
            <div className="w-10 h-[1px] bg-amber-500" />
            <span className="text-xs uppercase tracking-[0.3em] text-amber-400 font-semibold">
              Why Choose Us
            </span>
            <div className="w-10 h-[1px] bg-amber-500" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            What sets us apart.
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
                className="group relative p-6 rounded-2xl surface-card transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center group-hover:bg-amber-500/25 group-hover:scale-105 transition-all duration-300">
                    <Icon className="w-7 h-7 text-amber-400" />
                  </div>
                  <span className="text-xs text-zinc-500 font-mono">0{idx + 1}</span>
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
