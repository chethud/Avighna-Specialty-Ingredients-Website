import { useEffect, useState, type ReactNode } from 'react';
import { Link } from 'wouter';
import {
  ArrowRight,
  BarChart3,
  Building2,
  ChevronRight,
  Globe2,
  Handshake,
  Menu,
  Network,
  Settings2,
  Users,
  X,
} from 'lucide-react';
import { BrandWordmark } from '@/components/brand-wordmark';
import { SiteFooter } from '@/components/site-footer';

type Company = {
  id: string;
  number: string;
  name: string;
  shortName: string;
  category: string;
  description: string;
  accent: string;
  href: string;
  logo?: string;
  logoMark: string;
};

const companies: Company[] = [
  {
    id: 'avighna',
    number: '01',
    name: 'Avighna Speciality Ingredients Pvt. Ltd.',
    shortName: 'Avighna',
    category: 'Speciality Ingredients',
    description:
      'Specialty ingredient solutions for food, dairy, beverages, pharmaceuticals and nutraceuticals.',
    accent: '#F26522',
    href: '/',
    logo: '/brand-logo.png',
    logoMark: 'AV',
  },
  {
    id: 'asian-apex',
    number: '02',
    name: 'Asian Apex & Co.',
    shortName: 'Asian Apex',
    category: '[Business category to be verified]',
    description: '[Approved company description to be added.]',
    accent: '#063F38',
    href: '/companies/asian-apex',
    logo: '/logos/asian-apex-mark.png',
    logoMark: 'AA',
  },
  {
    id: 'ganesh-inc',
    number: '03',
    name: 'Ganesh Inc.',
    shortName: 'Ganesh Inc.',
    category: 'Food & Pharma Raw Materials',
    description:
      'Food and pharma raw-material solutions supported by reliable supply, quality assurance and technical expertise.',
    accent: '#8B1E2D',
    href: '/companies/ganesh-inc',
    logo: '/logos/ganesh-inc-mark.png',
    logoMark: 'GI',
  },
  {
    id: 'atharva',
    number: '04',
    name: 'Atharva Associates',
    shortName: 'Atharva',
    category: '[Verified business category to be added]',
    description: '[Approved company description to be added.]',
    accent: '#C41E26',
    href: '/companies/atharva-associates',
    logo: '/logos/atharva-mark.png',
    logoMark: 'AT',
  },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function goHomeSection(id: string) {
  window.location.assign(`${import.meta.env.BASE_URL.replace(/\/$/, '')}/#${id}`);
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={`text-[11px] font-bold uppercase tracking-[0.24em] ${light ? 'text-[#C6A15B]' : 'text-[#F26522]'}`}>
      {children}
    </p>
  );
}

function CompanyLogo({ company }: { company: Company }) {
  if (company.logo) {
    return (
      <span className="inline-flex h-14 w-[7.5rem] shrink-0 items-center justify-start">
        <img
          src={company.logo}
          alt={`${company.shortName} logo`}
          className="max-h-14 max-w-full object-contain object-left"
        />
      </span>
    );
  }
  return (
    <span
      className="inline-flex h-14 items-center text-[13px] font-extrabold tracking-[0.08em]"
      style={{ color: company.accent }}
      aria-label={`${company.shortName} mark`}
    >
      {company.logoMark}
    </span>
  );
}

function CardLeafMark() {
  return (
    <svg
      className="pointer-events-none absolute bottom-3 right-3 h-16 w-16 text-[#C6A15B] opacity-[0.07]"
      viewBox="0 0 64 64"
      fill="currentColor"
      aria-hidden
    >
      <path d="M48 8c-14 4-24 16-28 30-2 8 0 16 6 20 6 4 14 4 20-2 8-8 10-22 6-34-1-4-3-8-4-14z" />
      <path d="M20 28c8 2 14 8 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
    </svg>
  );
}

function HeroCollage() {
  return (
    <div className="relative h-full min-h-[380px] w-full overflow-hidden bg-[#063F38] lg:absolute lg:inset-0 lg:min-h-0">
      {/* Full-bleed collage — bleeds under text panel, framed like the original layout */}
      <img
        src="/generated/avighna-hero-organic-v3.jpg"
        alt="Avighna group of four connected business worlds"
        className="absolute inset-0 h-full w-full object-cover object-[68%_center] transition-transform duration-[18s] ease-out will-change-transform hover:scale-[1.02] lg:object-[72%_center]"
        data-testid="img-avighna-hero"
      />

      {/* Soft blend: image fades into the left copy panel */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#063F38]/85 via-[#063F38]/35 to-transparent lg:hidden"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 hidden lg:block"
        style={{
          background:
            'linear-gradient(90deg, #063F38 0%, #063F38 28%, rgba(6,63,56,0.92) 38%, rgba(6,63,56,0.55) 48%, rgba(6,63,56,0.18) 56%, transparent 64%)',
        }}
        aria-hidden
      />
    </div>
  );
}

function GroupHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const nav = [
    { label: 'Home', action: () => { window.location.assign(`${import.meta.env.BASE_URL.replace(/\/$/, '')}/`); } },
    { label: 'About Us', action: () => scrollToId('about-avighna'), active: true },
    { label: 'Our Companies', action: () => scrollToId('companies') },
    { label: 'Solutions', action: () => goHomeSection('solutions') },
    { label: 'Catalogue', action: () => goHomeSection('catalogue') },
    { label: 'Applications', action: () => goHomeSection('applications') },
    { label: 'Contact', action: () => goHomeSection('contact') },
  ];

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b border-[#e5d8c4]/50 bg-[#F6F0E4]/96 text-[#17201D] backdrop-blur-md transition-shadow ${
          scrolled ? 'shadow-[0_6px_22px_rgba(23,32,29,0.05)]' : ''
        }`}
      >
        <div className="relative z-[60] mx-auto flex page-container max-w-none items-center gap-3 py-3 sm:gap-4 sm:py-4">
          <Link href="/" className="shrink-0 transition-opacity hover:opacity-80" data-testid="link-avighna-brand">
            <BrandWordmark />
          </Link>

          <nav className="mx-auto hidden items-center gap-5 lg:gap-6 xl:gap-7 xl:flex" aria-label="About navigation">
            {nav.map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className={`relative text-[13px] font-semibold tracking-[-0.01em] transition-colors hover:text-[#F26522] ${
                  item.active ? 'text-[#F26522]' : 'text-[#2f3b37]'
                }`}
                data-testid={`button-about-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {item.label}
                {item.active && <span className="absolute -bottom-1.5 left-0 h-[2px] w-full rounded-full bg-[#F26522]" />}
              </button>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2 xl:ml-0">
            <button
              onClick={() => goHomeSection('contact')}
              className="hidden items-center gap-2 rounded-full bg-[#F26522] px-5 py-2.5 text-[12.5px] font-bold text-white transition-colors hover:bg-[#de5518] md:inline-flex"
              data-testid="button-about-lets-connect"
            >
              Let&apos;s Connect <ArrowRight size={13} />
            </button>
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#063F38] text-white xl:hidden"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls="about-mobile-menu"
              aria-label={open ? 'Close navigation' : 'Open navigation'}
              data-testid="button-about-mobile-menu"
            >
              {open ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>

        {open && (
          <div className="fixed inset-0 z-50 xl:hidden" role="dialog" aria-modal="true" aria-label="Mobile navigation">
            <button
              type="button"
              className="absolute inset-0 bg-[#063F38]/45 backdrop-blur-[2px]"
              aria-label="Close navigation overlay"
              onClick={() => setOpen(false)}
            />
            <nav
              id="about-mobile-menu"
              className="absolute inset-x-3 top-[5rem] max-h-[calc(100dvh-5.5rem)] overflow-y-auto rounded-2xl border border-[#e5d8c4] bg-[#F6F0E4] p-2 shadow-[0_24px_60px_rgba(23,32,29,0.22)] sm:top-[6rem] sm:max-h-[calc(100dvh-6.5rem)]"
              aria-label="Mobile about navigation"
            >
              {nav.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    item.action();
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-3.5 text-left text-sm font-semibold transition-colors hover:bg-[#efe6d6] ${
                    item.active ? 'text-[#F26522]' : 'text-[#17201D]'
                  }`}
                >
                  {item.label}
                  <ChevronRight size={14} className="text-[#C6A15B]" />
                </button>
              ))}
              <button
                onClick={() => {
                  goHomeSection('contact');
                  setOpen(false);
                }}
                className="mt-1 flex w-full items-center justify-center gap-2 rounded-full bg-[#F26522] py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#de5518]"
                data-testid="button-about-mobile-connect"
              >
                Let&apos;s Connect <ArrowRight size={14} />
              </button>
            </nav>
          </div>
        )}
      </header>
      {/* Spacer so fixed header does not cover page content */}
      <div className="h-[80px] sm:h-[96px]" aria-hidden />
    </>
  );
}

function CompaniesSection() {
  return (
    <section id="companies" className="relative overflow-hidden bg-[#F6F0E4] py-16 lg:py-[72px]">
      <svg
        className="pointer-events-none absolute -right-8 top-10 hidden h-48 w-48 text-[#C6A15B] opacity-[0.06] lg:block"
        viewBox="0 0 160 160"
        fill="currentColor"
        aria-hidden
      >
        <path d="M120 20c-36 10-62 42-72 78-6 20 0 40 14 50s36 10 50-6c20-20 26-56 16-86-2-10-6-20-8-36z" />
        <path d="M48 72c20 6 36 20 40 40" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.65" />
      </svg>
      <svg
        className="pointer-events-none absolute bottom-6 right-[18%] hidden h-36 w-36 text-[#C6A15B] opacity-[0.05] lg:block"
        viewBox="0 0 160 160"
        fill="currentColor"
        aria-hidden
      >
        <path d="M30 110c24-28 58-44 96-40-10 34-36 60-70 70-14 4-26-4-26-30z" />
      </svg>

      <div className="mx-auto w-[min(1440px,calc(100%-40px))] max-w-none md:w-[min(1440px,calc(100%-64px))] lg:w-[min(1440px,calc(100%-70px))]">
        <div className="max-w-[920px]">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#F26522]">Our Companies</p>
          <h2
            className="mt-3 text-[clamp(1.85rem,3.4vw,3rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-[#063F38]"
            data-testid="heading-companies"
          >
            Group of Companies — Your One-Stop Solution, Dedicated to the Entire FMCG Industry.
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-2 items-stretch gap-3 sm:gap-[22px] lg:grid-cols-4">
          {companies.map((company) => (
            <Link
              key={company.id}
              href={company.href}
              className="group relative flex h-full flex-col rounded-[18px] border border-[#E2D8C8] bg-[#FBF8F1] p-4 shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-[3px] hover:border-[#d4c7b4] hover:shadow-[0_14px_36px_rgba(0,0,0,0.06)] sm:p-6"
              data-testid={`card-${company.id}`}
            >
              <CardLeafMark />
              <div className="relative">
                <CompanyLogo company={company} />
              </div>

              <h3 className="relative mt-4 text-[0.95rem] font-bold leading-snug tracking-[-0.02em] text-[#063F38] sm:mt-5 sm:text-[1.15rem]">
                {company.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <main className="bg-[#F6F0E4] font-[Manrope,ui-sans-serif,system-ui,sans-serif] text-[#17201D]">
      <GroupHeader />

      {/* HERO — fills first viewport under sticky header */}
      <section className="relative overflow-hidden bg-[#063F38] text-[#F6F0E4]">
        <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] max-w-none flex-col lg:block lg:h-[calc(100svh-72px)] lg:min-h-[560px]">
          <div className="relative z-10 flex w-full flex-col justify-center px-5 py-12 sm:px-8 lg:h-full lg:w-[46%] lg:px-10 lg:pr-8 xl:px-12">
            <div className="w-full max-w-[520px]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#C6A15B]">Avighna Group</p>
              <h1
                className="mt-5 font-['DM_Serif_Display',ui-serif,Georgia,serif] text-[clamp(2.75rem,5.2vw,4.5rem)] font-medium leading-[0.94] tracking-[-0.02em] text-[#F6F0E4]"
                data-testid="heading-about-hero"
              >
                One Group.
                <br />
                Four Businesses.
                <br />
                <span className="text-[#F26522]">One Vision.</span>
              </h1>
              <p className="mt-5 max-w-[420px] font-[Manrope,ui-sans-serif,system-ui,sans-serif] text-[15px] leading-[1.65] text-[#F6F0E4]/78 sm:text-[16px]">
                Avighna brings together diverse businesses, expertise and capabilities under one group, creating long-term
                value through focused businesses and strong partnerships.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  onClick={() => scrollToId('companies')}
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-[#F26522] px-5 text-[13px] font-bold text-white transition-colors hover:bg-[#de5518]"
                  data-testid="button-meet-companies"
                >
                  Meet Our Companies <ArrowRight size={14} />
                </button>
                <button
                  onClick={() => scrollToId('about-avighna')}
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-white/35 px-5 text-[13px] font-bold text-[#F6F0E4] transition-colors hover:border-[#F26522]"
                  data-testid="button-our-story"
                >
                  Our Story <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>

          <HeroCollage />
        </div>
      </section>

      {/* ABOUT AVIGHNA — text | principles | image (reference layout) */}
      <section id="about-avighna" className="bg-[#F6F0E4] py-12 lg:py-14">
        <div className="mx-auto grid page-container max-w-none items-center gap-10 lg:grid-cols-[0.48fr_0.22fr_0.48fr] lg:gap-8 xl:gap-12">
          {/* Left: eyebrow, heading, body, CTA */}
          <div className="order-2 lg:order-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#F26522]">About Avighna</p>
            <h2
              className="mt-4 max-w-[560px] font-['DM_Serif_Display',ui-serif,Georgia,serif] text-[clamp(2.35rem,3.8vw,3.35rem)] font-medium leading-[1.02] tracking-[-0.02em] text-[#123E38]"
              data-testid="heading-about-avighna"
            >
              Building Businesses.
              <br />
              Creating Long-Term Value.
            </h2>
            <p className="mt-5 max-w-[520px] text-[15.5px] leading-[1.65] text-[#3d4a46]">
              Avighna is the parent group that brings together four distinct companies with specialized expertise and a
              shared commitment to quality, reliability and long-term partnerships.
            </p>
            <button
              onClick={() => scrollToId('companies')}
              className="group mt-8 inline-flex items-center gap-2 rounded-full border border-[#F26522] px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.12em] text-[#F26522] transition-colors hover:bg-[#F26522] hover:text-white"
            >
              Learn More About Avighna
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Center: three principles — not cards */}
          <div className="order-3 grid grid-cols-3 gap-3 border-t border-[#D8CFC0] pt-8 sm:gap-5 lg:order-2 lg:flex lg:flex-col lg:gap-9 lg:border-t-0 lg:border-l lg:pt-1 lg:pl-8 xl:pl-10">
            {[
              { icon: Users, title: 'Who We Are', text: 'A parent group for specialized businesses.' },
              { icon: Settings2, title: 'What We Build', text: 'Focused companies with clear capabilities.' },
              {
                icon: BarChart3,
                title: 'How We Think',
                text: 'Long-term value through trust, partnerships and performance.',
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="min-w-0">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#F26522]/40 text-[#F26522] sm:h-11 sm:w-11">
                    <Icon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" strokeWidth={1.5} />
                  </div>
                  <p className="mt-2.5 text-[9px] font-bold uppercase tracking-[0.1em] text-[#F26522] sm:mt-3.5 sm:text-[11px] sm:tracking-[0.14em]">
                    {item.title}
                  </p>
                  <p className="mt-1 text-[11px] leading-5 text-[#5a6761] sm:mt-1.5 sm:max-w-[200px] sm:text-[13px] sm:leading-6">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right: large rounded image */}
          <div className="relative order-1 lg:order-3">
            <div className="overflow-hidden rounded-[20px]">
              <img
                src="/generated/avighna-about-building.jpg"
                alt="About Avighna"
                className="h-[260px] w-full object-cover sm:h-[340px] lg:h-[430px]"
                data-testid="img-avighna-about"
              />
            </div>
            <div className="pointer-events-none absolute inset-y-4 right-0 flex w-11 items-center justify-center rounded-l-lg bg-[#F6F0E4]/85 sm:w-12">
              <p className="[writing-mode:vertical-rl] text-[9px] font-semibold uppercase tracking-[0.22em] text-[#123E38]">
                People <span className="mx-0.5 text-[#F26522]">|</span> Ideas{' '}
                <span className="mx-0.5 text-[#F26522]">|</span> Industries{' '}
                <span className="mx-0.5 text-[#F26522]">|</span> A Brighter Tomorrow
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AVIGHNA AT A GLANCE — compact deep-green strip */}
      <section className="relative overflow-hidden bg-[#063F38]">
        <img
          src="/generated/avighna-glance-landscape-v2.jpg"
          alt=""
          className="pointer-events-none absolute inset-y-0 right-0 h-full w-[46%] object-cover opacity-[0.38]"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#063F38] from-40% via-[#063F38]/88 to-[#063F38]/40" />
        <div className="relative mx-auto page-container max-w-none py-8 lg:flex lg:h-[138px] lg:items-center lg:py-0">
          <div className="flex w-full flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
            <div className="min-w-0 flex-1">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#C6A15B] lg:mb-3">
                Avighna at a Glance
              </p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
                {[
                  { icon: Building2, value: '04', label: 'Group Companies' },
                  { icon: Network, value: 'Diverse', label: 'Industries' },
                  { icon: Handshake, value: 'Long-Term', label: 'Partnerships' },
                  { icon: Globe2, value: 'Customer-Focused', label: 'Businesses' },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className={`flex items-center gap-3 lg:px-5 ${index > 0 ? 'lg:border-l lg:border-white/25' : 'lg:pl-0'}`}
                    >
                      <Icon size={16} className="shrink-0 text-[#C6A15B]" strokeWidth={1.5} />
                      <div>
                        <p className="text-[1.55rem] font-semibold leading-none tracking-[-0.03em] text-[#F6F0E4]">
                          {item.value}
                        </p>
                        <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#F6F0E4]/72">
                          {item.label}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <p className="max-w-[120px] text-right text-[10px] font-semibold uppercase leading-[1.55] tracking-[0.28em] text-[#F6F0E4] lg:shrink-0">
              A Stronger
              <br />
              Tomorrow
              <br />
              Together
            </p>
          </div>
        </div>
      </section>

      {/* COMPANIES — editorial four-card portfolio */}
      <CompaniesSection />

      {/* VISION */}
      <section id="vision" className="pb-12 lg:pb-14">
        <div className="mx-auto grid page-container max-w-none overflow-hidden rounded-[1.35rem] bg-[#063F38] lg:grid-cols-2 lg:bg-transparent">
          <div className="flex flex-col justify-center px-6 py-10 text-white sm:px-10 lg:bg-[#063F38] lg:px-12 lg:py-12 xl:px-14">
            <Eyebrow light>Our Vision</Eyebrow>
            <h2
              className="mt-4 max-w-[440px] text-[clamp(2rem,3.6vw,2.85rem)] font-extrabold leading-[0.95] tracking-[-0.045em]"
              data-testid="heading-vision"
            >
              Building enduring businesses
              <br />
              for a stronger future.
            </h2>
            <p className="mt-4 max-w-[360px] text-[15px] leading-7 text-[#c8d6d0]">
              Creating long-term value through innovation, responsible growth and strong partnerships.
            </p>
            <button
              onClick={() => scrollToId('vision')}
              className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-[#F26522] px-6 py-3.5 text-[14px] font-bold"
            >
              Our Vision <ArrowRight size={15} />
            </button>
          </div>
          <div className="relative hidden min-h-[360px] overflow-hidden lg:block">
            <img
              src="/generated/avighna-vision-premium.jpg"
              alt="Avighna vision"
              className="absolute inset-0 h-full w-full object-cover"
              data-testid="img-avighna-vision"
            />
            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-[28%] bg-gradient-to-r from-[#063F38] via-[#063F38]/55 to-transparent"
              aria-hidden
            />
            <p className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 [writing-mode:vertical-rl] text-[10px] font-bold uppercase tracking-[0.28em] text-white/80 xl:block">
              People · Planet · Progress · Together
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
