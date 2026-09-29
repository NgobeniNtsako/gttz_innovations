import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS, PROJECT_CATEGORIES } from '../mock';

const Projects = () => {
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="projects" className="relative py-28 bg-stone-100 overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-amber-100/50 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-10 h-[1px] bg-amber-600" />
              <span className="text-xs uppercase tracking-[0.3em] text-amber-700 font-semibold">
                Portfolio
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 leading-tight">
              Our recent projects.
            </h2>
            <p className="mt-5 text-zinc-600 text-lg">
              Explore a selection of our latest builds, engineering studies and installations.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {PROJECT_CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors duration-300 border ${
                  filter === c
                    ? 'bg-zinc-900 text-white border-zinc-900'
                    : 'bg-white text-zinc-700 border-stone-300 hover:border-amber-600 hover:text-amber-700'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p, idx) => (
            <article
              key={p.id}
              className={`group relative overflow-hidden rounded-3xl border border-stone-200 hover:shadow-2xl transition-shadow duration-500 bg-white ${
                idx % 5 === 0 ? 'lg:row-span-2' : ''
              }`}
            >
              <div className={`relative ${idx % 5 === 0 ? 'h-full min-h-[480px]' : 'h-72'}`}>
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-zinc-900/20 to-transparent" />
              </div>

              <div className="absolute top-5 left-5">
                <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold bg-white text-zinc-900 shadow-sm">
                  {p.category}
                </span>
              </div>

              <div className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-amber-600 text-zinc-900 group-hover:text-white transition-all duration-500 shadow-md">
                <ArrowUpRight className="w-4 h-4" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl lg:text-2xl font-semibold text-white mb-1">
                  {p.title}
                </h3>
                <p className="text-sm text-white/85 max-w-md">{p.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
