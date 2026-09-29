import React from 'react';
import { Award, ShieldCheck, Users, Lightbulb, Target, Eye } from 'lucide-react';
import { STATS, VALUES } from '../mock';

const ICONS = { Award, ShieldCheck, Users, Lightbulb };

const About = () => {
  return (
    <section id="about" className="relative py-28 overflow-hidden" style={{ backgroundColor: '#232428' }}>
      {/* Ambient glow */}
      <div className="absolute top-1/3 -left-32 w-[500px] h-[500px] rounded-full bg-amber-500/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] rounded-full bg-amber-600/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-[1px] bg-amber-500" />
            <span className="text-xs uppercase tracking-[0.3em] text-amber-400 font-semibold">
              About Us
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Building dreams into reality with 15+ years of excellence.
          </h2>
        </div>

        {/* Story + Image Collage */}
        <div className="grid lg:grid-cols-2 gap-14 mb-24 items-center">
          {/* Image collage */}
          <div className="relative">
            <div className="grid grid-cols-6 grid-rows-6 gap-3 h-[520px]">
              <div className="col-span-4 row-span-4 rounded-3xl overflow-hidden shadow-2xl shadow-black/40 border border-white/5 group">
                <img
                  src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjB0ZWFtfGVufDB8fHx8MTc5MDY5NjE1Nnww&ixlib=rb-4.1.0&q=85"
                  alt="Construction team"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="col-span-2 row-span-3 rounded-3xl overflow-hidden shadow-xl shadow-black/40 border border-white/5 group">
                <img
                  src="https://images.unsplash.com/photo-1721244654394-36a7bc2da288?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1ODh8MHwxfHNlYXJjaHw0fHxibHVlcHJpbnR8ZW58MHx8fHwxNzgwNDMwOTM1fDA&ixlib=rb-4.1.0&q=85"
                  alt="Blueprints"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="col-span-2 row-span-3 rounded-3xl overflow-hidden shadow-xl shadow-black/40 border border-white/5 group">
                <img
                  src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwzfHxjb25zdHJ1Y3Rpb24lMjB3b3JrZXJzfGVufDB8fHx8MTc4MDQzMDkzNXww&ixlib=rb-4.1.0&q=85"
                  alt="Skilled worker"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="col-span-4 row-span-2 rounded-3xl overflow-hidden shadow-xl shadow-black/40 border border-white/5 group">
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA3MDB8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwYnVpbGRpbmd8ZW58MHx8fHwxNzgwMzkxODg5fDA&ixlib=rb-4.1.0&q=85"
                  alt="Modern commercial building"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 bg-amber-500 text-zinc-900 rounded-2xl px-5 py-4 shadow-xl shadow-amber-500/30 hidden md:block">
              <div className="text-3xl font-bold">15+</div>
              <div className="text-xs uppercase tracking-wider font-semibold">Years of Excellence</div>
            </div>
          </div>

          <div className="space-y-5 text-zinc-300 leading-relaxed text-lg">
            <h3 className="text-2xl font-semibold text-white mb-2">Our Story</h3>
            <p>
              Founded with a vision to revolutionize the construction industry,
              GTTZ Innovations has grown from a small family business into one of
              South Africa's most trusted construction and engineering companies.
            </p>
            <p>
              Our journey began with a simple commitment: to deliver exceptional
              quality and service in every project. Today, we've completed over
              500 successful projects across residential, commercial and industrial sectors.
            </p>
            <p>
              From general building to specialized engineering and geotechnical services, we bring innovation,
              skill, and passion to every job we undertake.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="group relative overflow-hidden rounded-2xl surface-card transition-all duration-300 p-7 hover:-translate-y-1"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-amber-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="text-5xl font-bold text-white">{s.value}</div>
                <div className="mt-2 text-sm uppercase tracking-wider text-zinc-400">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Mission + Vision */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {[
            {
              icon: Target,
              title: 'Our Mission',
              desc:
                'To deliver exceptional construction and engineering services that exceed expectations through innovation, quality craftsmanship, and unwavering commitment to excellence.',
            },
            {
              icon: Eye,
              title: 'Our Vision',
              desc:
                "To be South Africa's most trusted construction company, recognized for setting industry standards in quality, sustainability, and customer satisfaction.",
            },
          ].map((it) => (
            <div
              key={it.title}
              className="relative overflow-hidden rounded-2xl p-8 surface-card transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center mb-4">
                <it.icon className="w-6 h-6 text-amber-400" />
              </div>
              <h4 className="text-2xl font-semibold text-white mb-3">{it.title}</h4>
              <p className="text-zinc-400 leading-relaxed">{it.desc}</p>
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-amber-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        {/* Values */}
        <div>
          <h3 className="text-2xl font-semibold text-white mb-8">Our Values</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v) => {
              const Icon = ICONS[v.icon] || Award;
              return (
                <div
                  key={v.title}
                  className="group p-6 rounded-2xl surface-card transition-all hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center mb-4 group-hover:bg-amber-500/25 transition-colors">
                    <Icon className="w-6 h-6 text-amber-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">{v.title}</h4>
                  <p className="text-sm text-zinc-400 leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
