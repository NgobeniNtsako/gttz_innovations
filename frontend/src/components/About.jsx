import React from 'react';
import { Award, ShieldCheck, Users, Lightbulb, Target, Eye } from 'lucide-react';
import { STATS, VALUES } from '../mock';

const ICONS = { Award, ShieldCheck, Users, Lightbulb };

const About = () => {
  return (
    <section id="about" className="relative py-28 bg-black overflow-hidden">
      <div className="absolute top-1/3 -left-32 w-96 h-96 rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-[1px] bg-amber-400" />
            <span className="text-xs uppercase tracking-[0.3em] text-amber-400 font-semibold">
              About Us
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Building dreams into reality with
            <span className="text-amber-400"> 15+ years</span> of excellence
          </h2>
        </div>

        {/* Story + Stats */}
        <div className="grid lg:grid-cols-2 gap-14 mb-20 items-start">
          <div className="space-y-5 text-zinc-300 leading-relaxed text-lg">
            <h3 className="text-2xl font-semibold text-white mb-2">Our Story</h3>
            <p>
              Founded with a vision to revolutionize the construction industry,
              GTTZ Innovations has grown from a small family business into one of
              South Africa's most trusted construction companies.
            </p>
            <p>
              Our journey began with a simple commitment: to deliver exceptional
              quality and service in every project. Today, we've completed over
              500 successful projects.
            </p>
            <p>
              From general building to specialized services, we bring innovation,
              skill, and passion to every job we undertake.
            </p>

            {/* Image collage */}
            <div className="grid grid-cols-5 gap-3 pt-4">
              <div className="col-span-3 relative overflow-hidden rounded-2xl group h-56">
                <img
                  src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwzfHxjb25zdHJ1Y3Rpb24lMjB3b3JrZXJzfGVufDB8fHx8MTc4MDQzMDkzNXww&ixlib=rb-4.1.0&q=85"
                  alt="GTTZ skilled construction professional"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 text-xs text-white/90 font-medium tracking-wide">
                  Certified field experts
                </div>
              </div>
              <div className="col-span-2 relative overflow-hidden rounded-2xl group h-56">
                <img
                  src="https://images.unsplash.com/photo-1721244654394-36a7bc2da288?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1ODh8MHwxfHNlYXJjaHw0fHxibHVlcHJpbnR8ZW58MHx8fHwxNzgwNDMwOTM1fDA&ixlib=rb-4.1.0&q=85"
                  alt="Architectural blueprints"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-3 left-4 text-xs text-white/90 font-medium tracking-wide">
                  Precision planning
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-900/40 border border-white/5 hover:border-amber-400/30 transition-colors duration-500 p-7"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-amber-400/5 blur-2xl group-hover:bg-amber-400/10 transition-colors" />
                <div className="relative">
                  <div className="text-5xl font-bold bg-gradient-to-br from-white to-zinc-400 bg-clip-text text-transparent">
                    {s.value}
                  </div>
                  <div className="mt-2 text-sm uppercase tracking-wider text-zinc-400">
                    {s.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission + Vision */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {[
            {
              icon: Target,
              title: 'Our Mission',
              desc: 'To deliver exceptional construction services that exceed expectations through innovation, quality craftsmanship, and unwavering commitment to excellence.',
            },
            {
              icon: Eye,
              title: 'Our Vision',
              desc: "To be South Africa's most trusted construction company, recognized for setting industry standards in quality, sustainability, and customer satisfaction.",
            },
          ].map((it) => (
            <div
              key={it.title}
              className="relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br from-zinc-900/80 to-black border border-white/5 hover:border-amber-400/30 transition-colors group"
            >
              <it.icon className="w-10 h-10 text-amber-400 mb-4" />
              <h4 className="text-2xl font-semibold text-white mb-3">{it.title}</h4>
              <p className="text-zinc-400 leading-relaxed">{it.desc}</p>
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-amber-400/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
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
                  className="group p-6 rounded-2xl border border-white/5 hover:border-amber-400/30 bg-zinc-900/30 hover:bg-zinc-900/60 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center mb-4 group-hover:bg-amber-400/20 transition-colors">
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
