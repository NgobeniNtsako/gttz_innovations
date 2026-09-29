import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter, Phone, Mail, MapPin, ArrowUp } from 'lucide-react';
import { COMPANY, NAV_LINKS, SERVICES, WHATSAPP_URL } from '../mock';
import { Logo } from './Navbar';

const Footer = () => {
  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer
      className="relative border-t border-white/5 text-zinc-300 overflow-hidden"
      style={{ backgroundColor: '#1e1f22' }}
    >
      <div className="absolute -top-40 right-1/4 w-[400px] h-[400px] rounded-full bg-amber-500/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-10 relative">
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-4 mb-5">
              <Logo size={64} />
              <div>
                <div className="text-white font-bold text-2xl tracking-wide">GTTZ</div>
                <div className="text-amber-400 text-[10px] uppercase tracking-[0.3em] font-semibold">
                  Innovations
                </div>
              </div>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
              Building dreams into reality. South Africa's trusted construction and
              engineering partner with 15+ years of excellence and 500+ completed projects.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="social"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-amber-400 hover:border-amber-400/40 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Navigate</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <button
                    onClick={() => scrollTo(l.href)}
                    className="text-zinc-400 hover:text-amber-400 text-sm transition-colors"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-3">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => scrollTo('#services')}
                    className="text-zinc-400 hover:text-amber-400 text-sm transition-colors text-left"
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 text-zinc-400">
                <Phone className="w-4 h-4 mt-0.5 text-amber-400 flex-shrink-0" />
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition-colors"
                >
                  {COMPANY.phone}
                </a>
              </li>
              <li className="flex items-start gap-3 text-zinc-400">
                <Mail className="w-4 h-4 mt-0.5 text-amber-400 flex-shrink-0" />
                <div className="min-w-0">
                  {COMPANY.emails.map((e) => (
                    <a
                      key={e}
                      href={`mailto:${e}`}
                      className="block hover:text-amber-400 transition-colors break-all"
                    >
                      {e}
                    </a>
                  ))}
                </div>
              </li>
              <li className="flex items-start gap-3 text-zinc-400">
                <MapPin className="w-4 h-4 mt-0.5 text-amber-400 flex-shrink-0" />
                <div>
                  <div>{COMPANY.address.line1}</div>
                  <div>{COMPANY.address.line2}</div>
                  <div>{COMPANY.address.line3}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-500">
            © {new Date().getFullYear()} GTTZ Innovations. All rights reserved.{" "}
            <a
              href="https://www.frontrowtech.co.za"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors"
            >
              Built by Front Row Tech
            </a>
          </p>
          <div className="flex items-center gap-6 text-xs text-zinc-500">
            <a href="#" className="hover:text-amber-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-amber-400 transition-colors">
              Terms of Service
            </a>
            <button
              onClick={scrollTop}
              className="flex items-center gap-2 hover:text-amber-400 transition-colors"
            >
              Back to top <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
