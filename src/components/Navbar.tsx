import { useEffect, useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { brand, navLinks } from '@/config/brand';
import { Button } from '@/components/ui/Button';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass border-b border-slate-200/60 shadow-soft'
            : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6">
        {/* Logo */}
        <a href="#" className="group flex items-center">
          <img
            src={brand.logoUrl ?? '/image.png'}
            alt={`${brand.name} Ultimate logo`}
            className="h-11 w-auto max-w-[172px] object-contain transition-transform duration-200 group-hover:scale-[1.02]"
          />
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 lg:flex">
          <Button variant="ghost" size="sm">Login</Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Book a Demo
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          open ? 'max-h-[480px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="glass border-t border-slate-200/60 px-5 py-4 sm:px-6">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="mt-3 flex flex-col gap-2 border-t border-slate-200/60 pt-3">
            <Button variant="secondary" size="md" className="w-full">Login</Button>
            <Button
              variant="secondary"
              size="md"
              className="w-full"
              onClick={() => {
                setOpen(false);
                document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Book a Demo
            </Button>
            <Button
              variant="primary"
              size="md"
              className="w-full"
              onClick={() => {
                setOpen(false);
                document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
