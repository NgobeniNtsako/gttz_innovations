import React, { useState } from 'react';
import axios from 'axios';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  MessageCircle,
  Loader2,
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { toast } from '../hooks/use-toast';
import { COMPANY, SERVICE_OPTIONS, WHATSAPP_URL } from '../mock';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({
        title: 'Missing fields',
        description: 'Please fill in name, email and message.',
      });
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/contact`, {
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        service: form.service || null,
        message: form.message,
      });
      setSent(true);
      toast({
        title: data.ok ? 'Message sent!' : 'Message received',
        description: data.message || "We'll get back to you within 24 hours.",
      });
      setForm({ name: '', email: '', phone: '', service: '', message: '' });
      setTimeout(() => setSent(false), 4000);
    } catch (err) {
      const msg =
        err?.response?.data?.detail?.[0]?.msg ||
        err?.response?.data?.message ||
        'Could not send your message. Please try again or call us directly.';
      toast({ title: 'Something went wrong', description: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-28 bg-stone-100 overflow-hidden">
      <div className="absolute -top-32 right-1/4 w-[500px] h-[500px] rounded-full bg-amber-100/60 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 justify-center mb-4">
            <div className="w-10 h-[1px] bg-amber-600" />
            <span className="text-xs uppercase tracking-[0.3em] text-amber-700 font-semibold">
              Contact Us
            </span>
            <div className="w-10 h-[1px] bg-amber-600" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 leading-tight">
            Let's build something great.
          </h2>
          <p className="mt-5 text-zinc-600 text-lg">
            Get in touch for a free consultation. We'd love to hear about your project.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Info card */}
          <div className="lg:col-span-2 space-y-4">
            <div className="p-7 rounded-3xl bg-white border border-stone-200 shadow-sm">
              <h3 className="text-2xl font-semibold text-zinc-900 mb-2">Get in touch</h3>
              <p className="text-zinc-600 text-sm mb-7">
                Our team is here to help with quotes, questions, or consultations.
              </p>

              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <div className="shrink-0 w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-amber-700" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-zinc-500 mb-1">
                      Phone / WhatsApp
                    </div>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-900 font-medium hover:text-amber-700 transition-colors inline-flex items-center gap-2"
                    >
                      {COMPANY.phone}
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    </a>
                    <div className="text-xs text-zinc-500 mt-0.5">Click to chat on WhatsApp</div>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="shrink-0 w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-amber-700" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs uppercase tracking-wider text-zinc-500 mb-1">Email</div>
                    {COMPANY.emails.map((e) => (
                      <a
                        key={e}
                        href={`mailto:${e}`}
                        className="block text-zinc-900 font-medium hover:text-amber-700 transition-colors break-all"
                      >
                        {e}
                      </a>
                    ))}
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="shrink-0 w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-amber-700" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-zinc-500 mb-1">Address</div>
                    <div className="text-zinc-900 font-medium">{COMPANY.address.line1}</div>
                    <div className="text-zinc-600 text-sm">{COMPANY.address.line2}</div>
                    <div className="text-zinc-600 text-sm">{COMPANY.address.line3}</div>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="shrink-0 w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-amber-700" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-zinc-500 mb-1">Hours</div>
                    <div className="text-zinc-700 text-sm">{COMPANY.hours.weekdays}</div>
                    <div className="text-zinc-700 text-sm">{COMPANY.hours.saturday}</div>
                    <div className="text-zinc-700 text-sm">{COMPANY.hours.sunday}</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-3 p-7 lg:p-9 rounded-3xl bg-white border border-stone-200 shadow-sm"
          >
            <h3 className="text-2xl font-semibold text-zinc-900 mb-6">Send a message</h3>

            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-zinc-700 text-xs uppercase tracking-wider font-semibold">
                  Full name *
                </Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  placeholder="John Doe"
                  className="bg-stone-50 border-stone-300 text-zinc-900 placeholder:text-zinc-400 focus-visible:border-amber-600 focus-visible:ring-amber-600/20 h-12 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-zinc-700 text-xs uppercase tracking-wider font-semibold">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  placeholder="you@example.com"
                  className="bg-stone-50 border-stone-300 text-zinc-900 placeholder:text-zinc-400 focus-visible:border-amber-600 focus-visible:ring-amber-600/20 h-12 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-zinc-700 text-xs uppercase tracking-wider font-semibold">
                  Phone
                </Label>
                <Input
                  id="phone"
                  value={form.phone}
                  onChange={(e) => update('phone', e.target.value)}
                  placeholder="064 000 0000"
                  className="bg-stone-50 border-stone-300 text-zinc-900 placeholder:text-zinc-400 focus-visible:border-amber-600 focus-visible:ring-amber-600/20 h-12 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-zinc-700 text-xs uppercase tracking-wider font-semibold">Service</Label>
                <Select value={form.service} onValueChange={(v) => update('service', v)}>
                  <SelectTrigger className="bg-stone-50 border-stone-300 text-zinc-900 h-12 rounded-xl data-[placeholder]:text-zinc-400">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-stone-200 text-zinc-900">
                    {SERVICE_OPTIONS.map((s) => (
                      <SelectItem key={s} value={s} className="focus:bg-amber-50 focus:text-amber-800">
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2 mt-5">
              <Label htmlFor="message" className="text-zinc-700 text-xs uppercase tracking-wider font-semibold">
                Message *
              </Label>
              <Textarea
                id="message"
                rows={5}
                value={form.message}
                onChange={(e) => update('message', e.target.value)}
                placeholder="Tell us about your project…"
                className="bg-stone-50 border-stone-300 text-zinc-900 placeholder:text-zinc-400 focus-visible:border-amber-600 focus-visible:ring-amber-600/20 rounded-xl resize-none"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="mt-6 w-full sm:w-auto bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-full px-8 h-12 shadow-lg shadow-amber-600/25 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...
                </>
              ) : sent ? (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" /> Message Sent
                </>
              ) : (
                <>
                  Send Message <Send className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
