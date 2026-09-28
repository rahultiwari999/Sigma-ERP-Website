import { Mail, Phone, MessageCircle, Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';
import { brand, contact, footerLinks } from '@/config/brand';

const socialIcons = [
  { icon: Facebook, label: 'Facebook' },
  { icon: Twitter, label: 'Twitter' },
  { icon: Linkedin, label: 'LinkedIn' },
  { icon: Youtube, label: 'YouTube' },
];

export function Footer() {
  const waLink = `https://wa.me/${contact.whatsappNumber}`;

  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center">
              <img
                src={brand.logoUrl ?? '/image.png'}
                alt={`${brand.name} Ultimate logo`}
                className="h-14 w-auto max-w-[220px] object-contain"
              />
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
              {brand.description}
            </p>

            {/* Contact */}
            <div className="mt-6 space-y-2.5">
              <a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-sm text-slate-500 hover:text-brand-600 transition-colors">
                <Mail className="h-4 w-4" /> {contact.email}
              </a>
              <a href={`tel:${contact.phone}`} className="flex items-center gap-2 text-sm text-slate-500 hover:text-brand-600 transition-colors">
                <Phone className="h-4 w-4" /> {contact.phone}
              </a>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-slate-500 hover:text-brand-600 transition-colors">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </div>

            {/* Social */}
            <div className="mt-6 flex gap-2">
              {socialIcons.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 transition-all hover:border-brand-300 hover:text-brand-600 hover:shadow-soft"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-sm font-bold text-slate-900">{heading}</h4>
              <ul className="mt-4 space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-slate-500 transition-colors hover:text-brand-600"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 sm:flex-row">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
          <p className="text-xs text-slate-400">
            {brand.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
