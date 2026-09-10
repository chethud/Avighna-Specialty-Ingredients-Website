import { useEffect, useState, type ReactNode } from 'react';
import { Link } from 'wouter';
import {
  ArrowRight,
  BarChart3,
  Building2,
  ChevronRight,
  Globe2,
  Handshake,
  Instagram,
  Linkedin,
  Menu,
  Network,
  Settings2,
  Users,
  X,
  Youtube,
} from 'lucide-react';

type Company = {
  id: string;
  number: string;
  name: string;
  shortName: string;
  category: string;
  description: string;
  image: string;
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
    image: '/generated/company-avighna-premium.jpg',
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
    image: '/generated/company-asian-apex-premium.jpg',
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
    image: '/generated/company-ganesh-premium.jpg',
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
    image: '/generated/company-atharva-premium.jpg',
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

function CompanyMark({ company }: { company: Company }) {
  if (company.logo) {
    const isSvg = company.logo.endsWith('.svg');
    const darkChip = isSvg || company.logo.includes('-chip');
    return (
      <span
        className={`inline-flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full transition-transform duration-300 group-hover:scale-110 ${
          darkChip ? 'bg-black' : ''
        } ${isSvg ? 'p-1.5' : ''}`}
      >
        <img
          src={company.logo}
          alt={`${company.shortName} logo`}
          className={`object-contain ${darkChip ? 'h-full w-full' : 'h-11 w-11'}`}
        />
      </span>
    );
  }
  return (
    <div
      className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e6d9c6] bg-white text-[10px] font-extrabold tracking-[0.08em] transition-transform duration-300 group-hover:scale-110"
      style={{ color: company.accent }}
      aria-label={`${company.shortName} mark`}
    >
      {company.logoMark}
    </div>
  );
}

function HeroCollage() {
  return (
    <div className="relative h-full min-h-[380px] w-full overflow-hidden bg-[#063F38] lg:absolute lg:inset-0 lg:min-h-0">
      {/* Full-bleed collage — bleeds under text panel, framed like the original layout */}
      <img
        src="/generated/avigna-hero-organic-v3.jpg"
        alt="Avigna group of four connected business worlds"
        className="absolute inset-0 h-full w-full object-cover object-[68%_center] transition-transform duration-[18s] ease-out will-change-transform hover:scale-[1.02] lg:object-[72%_center]"
        data-testid="img-avigna-hero"
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

  const nav = [
    { label: 'Home', action: () => { window.location.assign(`${import.meta.env.BASE_URL.replace(/\/$/, '')}/`); } },
    { label: 'About Us', action: () => scrollToId('about-avigna'), active: true },
    { label: 'Our Companies', action: () => scrollToId('companies') },
    { label: 'Solutions', action: () => goHomeSection('solutions') },
    { label: 'Catalogue', action: () => goHomeSection('catalogue') },
    { label: 'Applications', action: () => goHomeSection('applications') },
    { label: 'Contact', action: () => goHomeSection('contact') },
  ];

  return (
    <header
      className={`sticky top-0 z-50 border-b border-[#e5d8c4]/50 bg-[#F6F0E4]/96 text-[#17201D] backdrop-blur-md transition-shadow ${
        scrolled ? 'shadow-[0_6px_22px_rgba(23,32,29,0.05)]' : ''
      }`}
    >
      <div className="mx-auto flex h-[72px] page-container max-w-none items-center gap-4">
        <Link href="/" className="flex shrink-0 items-center gap-2.5" data-testid="link-avigna-brand">
          <img src="/brand-logo.png" alt="Avigna" className="h-9 w-9 object-contain" />
          <div>
            <div className="text-[1.25rem] font-extrabold tracking-[-0.04em] text-[#063F38]">Avigna</div>
            <div className="mt-0.5 hidden text-[7px] font-bold uppercase leading-[1.3] tracking-[0.13em] text-[#6d7872] sm:block">
              Building Businesses · Creating Long-Term Value
            </div>
          </div>
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
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            data-testid="button-about-mobile-menu"
          >
            {open ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-[#e5d8c4] bg-[#F6F0E4] px-4 py-2 xl:hidden" aria-label="Mobile about navigation">
          {nav.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                item.action();
                setOpen(false);
              }}
              className="flex w-full items-center justify-between rounded-xl px-3 py-3.5 text-left text-sm font-semibold"
            >
              {item.label}
              <ChevronRight size={14} className="text-[#C6A15B]" />
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}

function GroupFooter() {
  return (
    <footer className="bg-[#063F38] text-[#E8EEEA]">
      <div className="mx-auto grid page-container max-w-none gap-10 py-10 lg:grid-cols-[1.15fr_0.7fr_0.9fr_0.85fr_1fr] lg:gap-8 lg:py-12">
        <div>
          <div className="flex items-center gap-3">
            <img src="/brand-logo.png" alt="Avigna" className="h-11 w-11 object-contain" />
            <div className="text-[1.85rem] font-extrabold tracking-[-0.04em] text-white">Avigna</div>
          </div>
          <p className="mt-4 max-w-[210px] text-[11px] font-bold uppercase leading-5 tracking-[0.14em] text-[#b7c7c1]">
            Building Businesses
            <br />
            Creating Long-Term Value
          </p>
          <div className="mt-5 flex gap-2.5">
            {[Linkedin, Instagram, Youtube].map((Icon, i) => (
              <span
                key={i}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-[#c5d4ce] transition-colors hover:border-[#F26522] hover:text-[#F26522]"
              >
                <Icon size={13} />
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#C6A15B]">Quick Links</p>
          <ul className="mt-4 space-y-2.5 text-[13.5px]">
            {['About Avigna', 'Our Companies', 'Our Story', 'Our Vision', 'Contact'].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#C6A15B]">Our Companies</p>
          <ul className="mt-4 space-y-2.5 text-[13.5px]">
            {companies.map((company) => (
              <li key={company.id}>
                <Link href={company.href} className="transition-colors hover:text-[#F26522]">
                  {company.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#C6A15B]">Our Focus Areas</p>
          <ul className="mt-4 space-y-2.5 text-[13.5px]">
            {['Food & Beverage', 'Dairy', 'Pharma & Nutraceuticals', 'Industrial / Trading', 'Professional Services'].map(
              (item) => (
                <li key={item}>{item}</li>
              ),
            )}
          </ul>
        </div>

        <div>
          <p className="max-w-[230px] text-[1.85rem] font-extrabold leading-[1.08] tracking-[-0.04em] text-white">
            Natural Ingredients.
            <br />
            <span className="text-[#F26522]">Brighter Possibilities.</span>
          </p>
        </div>
      </div>

      <div className="border-t border-[#1a524a]">
        <div className="mx-auto flex page-container max-w-none flex-col gap-3 py-3.5 text-[11px] uppercase tracking-[0.12em] text-[#9eb0a9] sm:flex-row sm:items-center sm:justify-between">
          <span className="normal-case tracking-normal">© 2026 Avigna. All Rights Reserved.</span>
          <span className="hidden md:inline">Food · Dairy · Beverage · Pharma · Nutraceutical</span>
          <span className="inline-flex items-center gap-1.5 text-[#F26522]">
            A Better Tomorrow <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </footer>
  );
}

export default function About() {
  return (
    <main className="bg-[#F6F0E4] font-[Manrope,ui-sans-serif,system-ui,sans-serif] text-[#17201D]">
      <GroupHeader />

      {/* HERO — fills first viewport under sticky header */}
      <section className="relative overflow-hidden bg-[#063F38] text-[#F6F0E4]">
        <div className="relative mx-auto flex min-h-[calc(100svh-72px)] max-w-none flex-col lg:block lg:h-[calc(100svh-72px)] lg:min-h-[560px]">
          <div className="relative z-10 flex w-full flex-col justify-center px-5 py-12 sm:px-8 lg:h-full lg:w-[46%] lg:px-10 lg:pr-8 xl:px-12">
            <div className="w-full max-w-[520px]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#C6A15B]">Avigna Group</p>
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
                Avigna brings together diverse businesses, expertise and capabilities under one group, creating long-term
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
                  onClick={() => scrollToId('about-avigna')}
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

      {/* ABOUT AVIGNA — text | principles | image (reference layout) */}
      <section id="about-avigna" className="bg-[#F6F0E4] py-12 lg:py-14">
        <div className="mx-auto grid page-container max-w-none items-center gap-10 lg:grid-cols-[0.48fr_0.22fr_0.48fr] lg:gap-8 xl:gap-12">
          {/* Left: eyebrow, heading, body, CTA */}
          <div className="order-2 lg:order-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#F26522]">About Avigna</p>
            <h2
              className="mt-4 max-w-[560px] font-['DM_Serif_Display',ui-serif,Georgia,serif] text-[clamp(2.35rem,3.8vw,3.35rem)] font-medium leading-[1.02] tracking-[-0.02em] text-[#123E38]"
              data-testid="heading-about-avigna"
            >
              Building Businesses.
              <br />
              Creating Long-Term Value.
            </h2>
            <p className="mt-5 max-w-[520px] text-[15.5px] leading-[1.65] text-[#3d4a46]">
              Avigna is the parent group that brings together four distinct companies with specialized expertise and a
              shared commitment to quality, reliability and long-term partnerships.
            </p>
            <button
              onClick={() => scrollToId('companies')}
              className="group mt-8 inline-flex items-center gap-2 rounded-full border border-[#F26522] px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.12em] text-[#F26522] transition-colors hover:bg-[#F26522] hover:text-white"
            >
              Learn More About Avigna
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Center: three principles — not cards */}
          <div className="order-3 flex flex-row gap-6 overflow-x-auto border-t border-[#D8CFC0] pt-8 lg:order-2 lg:flex-col lg:gap-9 lg:overflow-visible lg:border-t-0 lg:border-l lg:pt-1 lg:pl-8 xl:pl-10">
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
                <div key={item.title} className="min-w-[140px] flex-1 lg:min-w-0">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#F26522]/40 text-[#F26522]">
                    <Icon size={18} strokeWidth={1.5} />
                  </div>
                  <p className="mt-3.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#F26522]">{item.title}</p>
                  <p className="mt-1.5 max-w-[200px] text-[13px] leading-6 text-[#5a6761]">{item.text}</p>
                </div>
              );
            })}
          </div>

          {/* Right: large rounded image */}
          <div className="relative order-1 lg:order-3">
            <div className="overflow-hidden rounded-[20px]">
              <img
                src="/generated/avigna-about-building.jpg"
                alt="About Avigna"
                className="h-[260px] w-full object-cover sm:h-[340px] lg:h-[430px]"
                data-testid="img-avigna-about"
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

      {/* AVIGNA AT A GLANCE — compact deep-green strip */}
      <section className="relative overflow-hidden bg-[#063F38]">
        <img
          src="/generated/avigna-glance-landscape-v2.jpg"
          alt=""
          className="pointer-events-none absolute inset-y-0 right-0 h-full w-[46%] object-cover opacity-[0.38]"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#063F38] from-40% via-[#063F38]/88 to-[#063F38]/40" />
        <div className="relative mx-auto page-container max-w-none py-8 lg:flex lg:h-[138px] lg:items-center lg:py-0">
          <div className="flex w-full flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
            <div className="min-w-0 flex-1">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#C6A15B] lg:mb-3">
                Avigna at a Glance
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

      {/* COMPANIES — one row of 4 equal cards */}
      <section id="companies" className="py-12 lg:py-14">
        <div className="mx-auto page-container max-w-none">
          <div>
            <Eyebrow>Our Companies</Eyebrow>
            <h2
              className="mt-3 max-w-[720px] text-[clamp(2.4rem,4.5vw,3.5rem)] font-extrabold leading-[0.94] tracking-[-0.05em] text-[#063F38]"
              data-testid="heading-companies"
            >
              Four companies.
              <br />
              Four areas of expertise.
            </h2>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {companies.map((company) => (
              <Link
                key={company.id}
                href={company.href}
                className="group flex h-full flex-col overflow-hidden rounded-[18px] border border-[#e8dccb] bg-[#FBF8F1] shadow-[0_10px_32px_rgba(23,32,29,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(23,32,29,0.08)]"
                data-testid={`card-${company.id}`}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={company.image}
                    alt={company.name}
                    className="h-[180px] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#063F38]/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-2">
                    <CompanyMark company={company} />
                    <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#F26522]">{company.number}</span>
                  </div>
                  <h3 className="mt-3.5 text-[1.05rem] font-extrabold leading-snug tracking-[-0.025em] text-[#063F38]">
                    {company.name}
                  </h3>
                  <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#F26522]">{company.category}</p>
                  <p className="mt-2.5 flex-1 text-[12.5px] leading-5 text-[#5a6761]">{company.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* VISION — compact 50/50 banner */}
      <section id="vision" className="pb-12 lg:pb-14">
        <div className="mx-auto grid page-container max-w-none overflow-hidden rounded-[1.35rem] lg:grid-cols-2">
          <div className="flex flex-col justify-center bg-[#063F38] px-6 py-10 text-white sm:px-10 lg:px-12 lg:py-12">
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
          <div className="relative min-h-[300px] lg:min-h-[360px]">
            <img
              src="/generated/avigna-vision-premium.jpg"
              alt="Avigna vision"
              className="absolute inset-0 h-full w-full object-cover"
              data-testid="img-avigna-vision"
            />
            <p className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 [writing-mode:vertical-rl] text-[10px] font-bold uppercase tracking-[0.28em] text-white/80 xl:block">
              People · Planet · Progress · Together
            </p>
          </div>
        </div>
      </section>

      <GroupFooter />
    </main>
  );
}
