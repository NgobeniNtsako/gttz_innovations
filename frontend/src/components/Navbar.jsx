import React, { useEffect, useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { COMPANY, NAV_LINKS, WHATSAPP_URL } from '../mock';
import { Button } from './ui/button';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (href) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => handleClick('#home')}
            className="flex items-center gap-3 group"
          >
            <img
              src={COMPANY.logo}
              alt="GTTZ Innovations"
              className="h-12 w-12 object-contain transition-transform duration-500 group-hover:rotate-12"
            />
            <div className="text-left leading-tight">
              <div className="text-white font-semibold tracking-wide text-lg">GTTZ</div>
              <div className="text-amber-400 text-[10px] uppercase tracking-[0.25em]">Innovations</div>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => handleClick(l.href)}
                className="relative text-sm font-medium text-zinc-300 hover:text-white transition-colors duration-300 group"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-amber-400 transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-zinc-300 hover:text-amber-400 transition-colors"
            >
              <Phone className="w-4 h-4" /> {COMPANY.phone}
            </a>
            <Button
              onClick={() => handleClick('#contact')}
              className="bg-amber-400 hover:bg-amber-300 text-black font-semibold rounded-full px-6"
            >
              Get a Quote
            </Button>
          </div>

          {/* Mobile */}
          <button
            className="lg:hidden text-white"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-white/10">
          <div className="px-6 py-6 flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => handleClick(l.href)}
                className="text-left text-zinc-200 hover:text-amber-400 py-2 transition-colors"
              >
                {l.label}
              </button>
            ))}
            <Button
              onClick={() => handleClick('#contact')}
              className="bg-amber-400 hover:bg-amber-300 text-black font-semibold rounded-full mt-2"
            >
              Get a Quote
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
