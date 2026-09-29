import React from 'react';
import { Award, ShieldCheck, Users, Lightbulb, Target, Eye } from 'lucide-react';
import { STATS, VALUES } from '../mock';

const ICONS = { Award, ShieldCheck, Users, Lightbulb };

const SectionLabel = ({ children }) => (
  <div className="inline-flex items-center gap-2 mb-4">
    <div className="w-10 h-[1px] bg-amber-600" />
    <span className="text-xs uppercase tracking-[0.3em] text-amber-700 font-semibold">
      {children}
    </span>
  </div>
);

const About = () => {
  return (
    <section id="about" className="relative py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <SectionLabel>About Us</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 leading-tight">
            Building dreams into reality with 15+ years of excellence.
          </h2>
        </div>

        {/* Story + Stats */}
        <div className="grid lg:grid-cols-2 gap-14 mb-24 items-start">
          <div className="space-y-5 text-zinc-600 leading-relaxed text-lg">
            <h3 className="text-2xl font-semibold text-zinc-900 mb-2">Our Story</h3>
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

            {/* Image collage */}
            <div className="grid grid-cols-5 gap-3 pt-4">
              <div className="col-span-3 relative overflow-hidden rounded-2xl group h-60 shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjB0ZWFtfGVufDB8fHx8MTc5MDY5NjE1Nnww&ixlib=rb-4.1.0&q=85"
                  alt="GTTZ construction team"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 text-xs text-white font-medium tracking-wide">
                  A team you can trust
                </div>
              </div>
              <div className="col-span-2 relative overflow-hidden rounded-2xl group h-60 shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1721244654394-36a7bc2da288?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1ODh8MHwxfHNlYXJjaHw0fHxibHVlcHJpbnR8ZW58MHx8fHwxNzgwNDMwOTM1fDA&ixlib=rb-4.1.0&q=85"
                  alt="Architectural blueprints"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 text-xs text-white font-medium tracking-wide">
                  Precision planning
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="group relative overflow-hidden rounded-2xl bg-stone-50 border border-stone-200 hover:border-amber-600/40 hover:shadow-lg transition-all duration-300 p-7"
              >
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-amber-100/60 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="text-5xl font-bold text-zinc-900">{s.value}</div>
                  <div className="mt-2 text-sm uppercase tracking-wider text-zinc-500">{s.label}</div>
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
              className="relative overflow-hidden rounded-2xl p-8 bg-stone-50 border border-stone-200 hover:border-amber-600/40 hover:shadow-lg transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center mb-4">
                <it.icon className="w-6 h-6 text-amber-700" />
              </div>
              <h4 className="text-2xl font-semibold text-zinc-900 mb-3">{it.title}</h4>
              <p className="text-zinc-600 leading-relaxed">{it.desc}</p>
            </div>
          ))}
        </div>

        {/* Values */}
        <div>
          <h3 className="text-2xl font-semibold text-zinc-900 mb-8">Our Values</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v) => {
              const Icon = ICONS[v.icon] || Award;
              return (
                <div
                  key={v.title}
                  className="group p-6 rounded-2xl border border-stone-200 bg-white hover:border-amber-600/40 hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center mb-4 group-hover:bg-amber-200 transition-colors">
                    <Icon className="w-6 h-6 text-amber-700" />
                  </div>
                  <h4 className="text-lg font-semibold text-zinc-900 mb-2">{v.title}</h4>
                  <p className="text-sm text-zinc-600 leading-relaxed">{v.desc}</p>
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
