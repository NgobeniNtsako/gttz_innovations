import React from 'react';
import { MessageCircle } from 'lucide-react';
import { WHATSAPP_URL } from '../mock';

const WhatsAppFloat = () => {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="group fixed bottom-6 right-6 z-50 flex items-center gap-3"
    >
      <span className="hidden sm:inline-block bg-black/80 backdrop-blur-md border border-white/10 text-white text-xs px-3 py-2 rounded-full opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
        Chat with us
      </span>
      <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-500/30 transition-colors">
        <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-30" />
        <MessageCircle className="relative w-6 h-6 fill-white" />
      </span>
    </a>
  );
};

export default WhatsAppFloat;
