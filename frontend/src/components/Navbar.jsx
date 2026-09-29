import React, { useEffect, useState } from 'react';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';
import { COMPANY, NAV_LINKS, WHATSAPP_URL } from '../mock';
import { Button } from './ui/button';

const Logo = ({ size = 56 }) => (
  <div
    className="logo-halo rounded-full flex items-center justify-center"
    style={{ width: size, height: size }}
  >
    <img
      src={COMPANY.logo}
      alt="GTTZ Innovations"
      className="object-contain drop-shadow-lg"
      style={{ width: size * 0.95, height: size * 0.95 }}
    />
  </div>
);

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
          ? 'bg-[#2b2d31]/85 backdrop-blur-xl border-b border-white/10 shadow-xl shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-24">
          <button
            onClick={() => handleClick('#home')}
            className="flex items-center gap-4 group"
          >
            <div className="transition-transform duration-500 group-hover:rotate-[10deg]">
              <Logo size={64} />
            </div>
            <div className="text-left leading-tight">
              <div className="text-white font-bold tracking-wide text-2xl">GTTZ</div>
              <div className="text-amber-400 text-[10px] uppercase tracking-[0.3em] font-semibold">
                Innovations
              </div>
            </div>
          </button>

          <nav className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => handleClick(l.href)}
                className="relative text-sm font-medium text-zinc-300 hover:text-white transition-colors duration-300 group"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-amber-500 transition-all duration-300 group-hover:w-full" />
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
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            </a>
            <Button
              onClick={() => handleClick('#contact')}
              className="bg-amber-500 hover:bg-amber-400 text-zinc-900 font-semibold rounded-full px-6"
            >
              Get a Quote
            </Button>
          </div>

          <button
            className="lg:hidden text-white"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-[#232428]/95 backdrop-blur-xl border-t border-white/10">
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
              className="bg-amber-500 hover:bg-amber-400 text-zinc-900 font-semibold rounded-full mt-2"
            >
              Get a Quote
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export { Logo };
export default Navbar;
