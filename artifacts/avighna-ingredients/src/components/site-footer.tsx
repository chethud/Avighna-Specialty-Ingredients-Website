import { ArrowRight, Instagram, Linkedin, MapPin, Phone, Youtube } from 'lucide-react';
import { BrandWordmark } from '@/components/brand-wordmark';

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  window.location.assign(`${base}/#${id}`);
}

export function SiteFooter() {
  const exploreLinks = [
    { label: 'Solutions', id: 'solutions' },
    { label: 'Catalogue', id: 'catalogue' },
    { label: 'Applications', id: 'applications' },
    { label: 'Contact', id: 'contact' },
  ];
  const industriesServed = [
    'Pharmaceuticals & Nutraceuticals',
    'Dairy (Paneer, Cheese, Curd)',
    'Fried Food Manufacturers',
    'Masala & Snack Producers',
    'Ice Cream & Beverages',
    'Bakeries & Distilleries',
  ];
  const socialLinks = [
    { label: 'LinkedIn', href: '#', icon: Linkedin },
    { label: 'Instagram', href: '#', icon: Instagram },
    { label: 'YouTube', href: '#', icon: Youtube },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#123b36] text-[#f5efe4]">
      <div className="pointer-events-none absolute -left-24 top-[-6rem] h-[22rem] w-[22rem] rounded-full border-[48px] border-[#1a4741]/80" aria-hidden />
      <div className="pointer-events-none absolute -right-20 bottom-[-8rem] h-[24rem] w-[24rem] rounded-full border-[56px] border-[#e4c16e]/10" aria-hidden />
      <div className="pointer-events-none absolute bottom-[-4rem] left-[35%] h-[16rem] w-[16rem] rounded-full bg-[#0e2f2b]/70" aria-hidden />
      <svg
        className="pointer-events-none absolute bottom-0 right-0 h-full w-[42%] text-[#0f322e]"
        viewBox="0 0 420 520"
        fill="none"
        aria-hidden
      >
        <path
          d="M460 40C340 90 280 180 260 280C235 410 340 470 420 560"
          stroke="currentColor"
          strokeWidth="70"
          opacity="0.55"
        />
        <path
          d="M380 120C300 180 270 250 265 330"
          stroke="#e4c16e"
          strokeWidth="1.25"
          opacity="0.28"
        />
      </svg>

      <div className="relative mx-auto max-w-[1260px] px-6 pt-8 sm:px-10 lg:px-20 lg:pt-10">
        <div className="grid items-start gap-8 md:grid-cols-2 lg:grid-cols-[1.2fr_0.55fr_0.95fr_0.55fr] lg:gap-0">
          <div className="lg:pr-10">
            <div className="w-[180px]">
              <BrandWordmark light />
            </div>

            <p className="mt-4 max-w-[280px] text-[15px] leading-6 text-[#f5efe4]">
              Ingredients That Make Better Products.
            </p>

            <div className="mt-4 space-y-3">
              <a
                href="tel:+919483389387"
                className="group flex items-center gap-3 text-[15px] text-[#f5efe4] transition-colors hover:text-[#ea632b]"
                data-testid="link-footer-phone"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ea632b] text-[#f5efe4]">
                  <Phone size={13} strokeWidth={1.85} />
                </span>
                +91 94833 89387
              </a>
              <p className="flex max-w-[290px] items-start gap-3 text-[14px] leading-6 text-[#a9bbb4]">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ea632b] text-[#f5efe4]">
                  <MapPin size={13} strokeWidth={1.85} />
                </span>
                #1963/B, BCCHS Layout, near Vajarahalli Metro, Kanakapura Road, Bengaluru–560109.
              </p>
            </div>

            <div className="mt-5 flex items-center gap-2.5">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#3a5f57] text-[#c8d6cf] transition-all hover:-translate-y-0.5 hover:border-[#ea632b]/60 hover:text-[#ea632b]"
                    data-testid={`link-footer-social-${social.label.toLowerCase()}`}
                  >
                    <Icon size={14} strokeWidth={1.6} />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="lg:px-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#d7a94d]">Explore</p>
            <div className="mt-2 h-px w-8 bg-[#d7a94d]" />
            <ul className="mt-4 space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="group inline-flex items-center gap-2 text-[15px] font-medium text-[#f5efe4] transition-all hover:translate-x-0.5 hover:text-[#ea632b]"
                    data-testid={`button-footer-nav-${link.id}`}
                  >
                    {link.label}
                    <ArrowRight
                      size={13}
                      className="text-[#d7a94d] transition-transform group-hover:translate-x-0.5"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:px-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#d7a94d]">Industries we serve</p>
            <div className="mt-2 h-px w-8 bg-[#d7a94d]" />
            <ul className="mt-4 space-y-2.5">
              {industriesServed.map((industry) => (
                <li key={industry} className="flex items-start gap-2.5 text-[14px] leading-5 text-[#f5efe4]/90">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#ea632b]" />
                  <span>{industry}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2 lg:col-span-1 lg:pl-8">
            <p className="max-w-[190px] font-display text-[1.7rem] leading-[1.08] tracking-[-0.03em] lg:text-[1.85rem]">
              <span className="text-[#f5efe4]">
                Natural
                <br />
                ingredients.
              </span>
              <br />
              <span className="text-[#ea632b]">
                Brighter
                <br />
                possibilities.
              </span>
            </p>
            <div className="mt-3 h-px w-10 bg-[#ea632b]" />
          </div>
        </div>

        <div className="mt-6 border-t border-[#2d524b] pb-4 pt-4 lg:mt-8 lg:pb-4">
          <div className="flex flex-col gap-3 text-[11px] uppercase tracking-[0.12em] text-[#a9bbb4] sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <span className="max-w-[380px] normal-case tracking-normal text-[12px] text-[#a9bbb4]">
              © 2026 Avighna Speciality Ingredients Pvt Ltd. All Rights Reserved.
            </span>
            <span className="hidden md:inline">Food · Dairy · Beverage · Pharma · Nutraceutical</span>
            <span className="inline-flex items-center gap-1.5 text-[#d7a94d]">
              <MapPin size={11} strokeWidth={1.75} />
              Bengaluru, India
            </span>
          </div>
          <p className="mt-3 text-[11px] uppercase tracking-[0.12em] text-[#a9bbb4] md:hidden">
            Food · Dairy · Beverage · Pharma · Nutraceutical
          </p>
        </div>
      </div>
    </footer>
  );
}
