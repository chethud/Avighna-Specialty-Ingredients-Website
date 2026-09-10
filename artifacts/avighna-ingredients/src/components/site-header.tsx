import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { ArrowUpRight, ChevronRight, Menu, X } from 'lucide-react';
import { BrandWordmark } from '@/components/brand-wordmark';

const links = [
  { label: 'Solutions', id: 'solutions' },
  { label: 'Catalogue', id: 'catalogue' },
  { label: 'Applications', id: 'applications' },
  { label: 'Contact', id: 'contact' },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function goHomeSection(id: string, isHome: boolean) {
  if (isHome) {
    scrollToId(id);
    return;
  }
  window.location.assign(`${import.meta.env.BASE_URL.replace(/\/$/, '')}/#${id}`);
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const isHome = location === '/' || location === '';

  return (
    <header className="sticky top-0 z-40 border-b border-[#e0d1bd]/60 bg-[#fff9ee]/95 backdrop-blur-md">
      <div className="mx-auto flex page-container max-w-none items-center gap-4 py-4">
        {isHome ? (
          <button
            onClick={() => scrollToId('top')}
            aria-label="Back to top"
            className="shrink-0 transition-opacity hover:opacity-80"
            data-testid="button-brand-home"
          >
            <BrandWordmark />
          </button>
        ) : (
          <Link href="/" className="shrink-0 transition-opacity hover:opacity-80" data-testid="link-brand-home">
            <BrandWordmark />
          </Link>
        )}

        <nav className="mx-auto hidden items-center gap-6 md:flex lg:gap-8 xl:gap-9" aria-label="Main navigation">
          <Link
            href="/about"
            className="text-[16px] font-semibold tracking-[-0.01em] text-[#3a4841] transition-colors hover:text-[#e2602c] lg:text-[17px]"
            data-testid="link-nav-about"
          >
            About Us
          </Link>
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => goHomeSection(link.id, isHome)}
              className="text-[16px] font-semibold tracking-[-0.01em] text-[#3a4841] transition-colors hover:text-[#e2602c] lg:text-[17px]"
              data-testid={`button-nav-${link.id}`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <button
            onClick={() => goHomeSection('contact', isHome)}
            className="hidden items-center gap-2 rounded-full bg-[#1e3d38] px-5 py-3 text-xs font-bold text-[#fff9ee] transition-colors hover:bg-[#274a44] md:flex"
            data-testid="button-header-contact"
          >
            Start a conversation <ArrowUpRight size={14} />
          </button>
          <button
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1e3d38] text-[#fff9ee] md:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            data-testid="button-mobile-menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="mx-4 mb-3 rounded-2xl border border-[#e0d1bd] bg-[#fff9ee] p-2 shadow-xl md:hidden"
          aria-label="Mobile navigation"
        >
          <Link
            href="/about"
            className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-sm font-semibold text-[#1e3d38] transition-colors hover:bg-[#f4eadb]"
            data-testid="link-mobile-nav-about"
            onClick={() => setOpen(false)}
          >
            About Us
            <ChevronRight size={16} className="text-[#a89072]" />
          </Link>
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                goHomeSection(link.id, isHome);
                setOpen(false);
              }}
              className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-sm font-semibold text-[#1e3d38] transition-colors hover:bg-[#f4eadb]"
              data-testid={`button-mobile-nav-${link.id}`}
            >
              {link.label}
              <ChevronRight size={16} className="text-[#a89072]" />
            </button>
          ))}
          <button
            onClick={() => {
              goHomeSection('contact', isHome);
              setOpen(false);
            }}
            className="mt-1 flex w-full items-center justify-center gap-2 rounded-full bg-[#e2602c] py-3 text-sm font-bold text-[#fff9ee]"
            data-testid="button-mobile-contact"
          >
            Start a conversation <ArrowUpRight size={15} />
          </button>
        </nav>
      )}
    </header>
  );
}
