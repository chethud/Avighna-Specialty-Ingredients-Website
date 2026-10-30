import { useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { ArrowRight, ChevronDown, ChevronRight, Menu, X } from 'lucide-react';
import { BrandWordmark } from '@/components/brand-wordmark';

const companyLinks = [
  { label: 'Avighna Speciality Ingredients', href: '/' },
  { label: 'Asian Apex & Co.', href: '/companies/asian-apex' },
  { label: 'Ganesh Inc.', href: '/companies/ganesh-inc' },
  { label: 'Atharva Associates', href: '/companies/atharva-associates' },
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

const navLink =
  'relative text-[14px] font-medium tracking-[-0.01em] text-[#073D36] transition-colors hover:text-[#F4511E] focus-visible:outline-none focus-visible:text-[#F4511E] xl:text-[15px]';

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [companiesOpen, setCompaniesOpen] = useState(false);
  const [mobileCompaniesOpen, setMobileCompaniesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const isHome = location === '/' || location === '';
  const companiesActive = location.startsWith('/companies');
  const aboutActive = location === '/about';
  const solutionsActive = location === '/solutions';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
    setCompaniesOpen(false);
  }, [location]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-shadow ${
        scrolled
          ? 'border-[#073D36]/10 bg-[#FAF8F2]/95 shadow-[0_8px_24px_rgba(7,61,54,0.06)] backdrop-blur-md'
          : 'border-[#073D36]/8 bg-[#FAF8F2]/90 backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto flex h-[78px] page-container max-w-none items-center gap-4">
        {isHome ? (
          <button
            onClick={() => scrollToId('top')}
            aria-label="Back to top"
            className="shrink-0 rounded-sm transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4511E]"
            data-testid="button-brand-home"
          >
            <BrandWordmark compact />
          </button>
        ) : (
          <Link
            href="/"
            className="shrink-0 rounded-sm transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4511E]"
            data-testid="link-brand-home"
          >
            <BrandWordmark compact />
          </Link>
        )}

        <nav className="mx-auto hidden items-center gap-5 lg:flex xl:gap-7" aria-label="Main navigation">
          <button
            onClick={() => (isHome ? scrollToId('top') : window.location.assign(`${import.meta.env.BASE_URL.replace(/\/$/, '')}/`))}
            className={navLink}
            data-testid="button-nav-home"
          >
            Home
            {isHome && <span className="absolute -bottom-2 left-0 h-[2px] w-full rounded-full bg-[#F4511E]" />}
          </button>
          <Link href="/about" className={navLink} data-testid="link-nav-about">
            About Us
            {aboutActive && <span className="absolute -bottom-2 left-0 h-[2px] w-full rounded-full bg-[#F4511E]" />}
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setCompaniesOpen(true)}
            onMouseLeave={() => setCompaniesOpen(false)}
          >
            <button
              type="button"
              className={`${navLink} inline-flex items-center gap-1`}
              aria-expanded={companiesOpen}
              aria-haspopup="true"
              onClick={() => setCompaniesOpen(true)}
              data-testid="button-nav-companies"
            >
              Our Companies
              <ChevronDown size={14} className={`transition-transform ${companiesOpen ? 'rotate-180' : ''}`} />
              {companiesActive && <span className="absolute -bottom-2 left-0 h-[2px] w-full rounded-full bg-[#F4511E]" />}
            </button>
            {companiesOpen && (
              <div className="absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-3">
                <div className="rounded-2xl border border-[#073D36]/10 bg-white p-2 shadow-[0_18px_40px_rgba(7,61,54,0.1)]">
                  {companyLinks.map((company) => (
                    <Link
                      key={company.href}
                      href={company.href}
                      className="block rounded-xl px-3 py-2.5 text-sm font-medium text-[#073D36] transition-colors hover:bg-[#F0EBDD] hover:text-[#F4511E] focus-visible:outline-none focus-visible:bg-[#F0EBDD]"
                      data-testid={`link-nav-company-${company.href.split('/').pop() || 'home'}`}
                    >
                      {company.label}
                    </Link>
                  ))}
                  <Link
                    href="/about#companies"
                    className="mt-1 flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-[#F4511E] hover:bg-[#F0EBDD]"
                  >
                    View all companies <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link href="/solutions" className={navLink} data-testid="button-nav-solutions">
            Solutions
            {solutionsActive && <span className="absolute -bottom-2 left-0 h-[2px] w-full rounded-full bg-[#F4511E]" />}
          </Link>
          <button onClick={() => goHomeSection('contact', isHome)} className={navLink} data-testid="button-nav-contact">
            Contact
          </button>
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <button
            onClick={() => goHomeSection('contact', isHome)}
            className="group hidden items-center gap-2 rounded-full bg-[#082F2B] px-5 py-2.5 text-[13px] font-semibold text-[#FAF8F2] transition-colors hover:bg-[#073D36] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4511E] focus-visible:ring-offset-2 lg:inline-flex"
            data-testid="button-header-contact"
          >
            Get in Touch
            <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#082F2B] text-[#FAF8F2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4511E] lg:hidden"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            data-testid="button-mobile-menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <button className="absolute inset-0 bg-[#082F2B]/40" aria-label="Close navigation overlay" onClick={() => setOpen(false)} />
          <nav
            id="mobile-navigation"
            className="absolute inset-y-0 right-0 flex w-[min(100%,420px)] flex-col bg-[#FAF8F2] px-6 pb-8 pt-6 shadow-2xl"
            aria-label="Mobile navigation"
          >
            <div className="mb-6 flex items-center justify-between">
              <BrandWordmark compact />
              <button
                onClick={() => setOpen(false)}
                aria-label="Close navigation"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#073D36]/15 text-[#073D36]"
              >
                <X size={18} />
              </button>
            </div>
            <button
              onClick={() => {
                if (isHome) scrollToId('top');
                else window.location.assign(`${import.meta.env.BASE_URL.replace(/\/$/, '')}/`);
                setOpen(false);
              }}
              className="flex items-center justify-between border-b border-[#073D36]/10 py-4 text-left text-lg font-medium text-[#073D36]"
            >
              Home <ChevronRight size={16} />
            </button>
            <Link href="/about" className="flex items-center justify-between border-b border-[#073D36]/10 py-4 text-lg font-medium text-[#073D36]" onClick={() => setOpen(false)} data-testid="link-mobile-nav-about">
              About Us <ChevronRight size={16} />
            </Link>
            <button
              type="button"
              className="flex items-center justify-between border-b border-[#073D36]/10 py-4 text-left text-lg font-medium text-[#073D36]"
              aria-expanded={mobileCompaniesOpen}
              onClick={() => setMobileCompaniesOpen((value) => !value)}
            >
              Our Companies
              <ChevronDown size={16} className={`transition-transform ${mobileCompaniesOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileCompaniesOpen && (
              <div className="border-b border-[#073D36]/10 py-2">
                {companyLinks.map((company) => (
                  <Link
                    key={company.href}
                    href={company.href}
                    className="block rounded-lg px-2 py-2.5 text-sm text-[#263B38]"
                    onClick={() => setOpen(false)}
                  >
                    {company.label}
                  </Link>
                ))}
              </div>
            )}
            <Link href="/solutions" className="flex items-center justify-between border-b border-[#073D36]/10 py-4 text-lg font-medium text-[#073D36]" onClick={() => setOpen(false)} data-testid="button-nav-solutions-mobile">
              Solutions <ChevronRight size={16} />
            </Link>
            <button
              onClick={() => {
                goHomeSection('contact', isHome);
                setOpen(false);
              }}
              className="flex items-center justify-between border-b border-[#073D36]/10 py-4 text-left text-lg font-medium text-[#073D36]"
              data-testid="button-mobile-nav-contact"
            >
              Contact <ChevronRight size={16} />
            </button>
            <button
              onClick={() => {
                goHomeSection('contact', isHome);
                setOpen(false);
              }}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[#082F2B] py-3.5 text-sm font-semibold text-[#FAF8F2]"
              data-testid="button-mobile-contact"
            >
              Get in Touch <ArrowRight size={15} />
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
