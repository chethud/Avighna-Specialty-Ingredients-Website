import { Link } from 'wouter';
import {
  ArrowRight,
  BarChart3,
  Droplets,
  Leaf,
  Shield,
  Sparkles,
  Truck,
} from 'lucide-react';
import { IndustryCarousel } from '@/components/home/industry-carousel';

const benefits = [
  { label: 'Quality Ingredients', icon: Leaf },
  { label: 'Consistent Performance', icon: BarChart3 },
  { label: 'Improved Shelf Life', icon: Shield },
  { label: 'Great Taste & Flavour', icon: Droplets },
  { label: 'Functional Solutions', icon: Sparkles },
  { label: 'Reliable Supply', icon: Truck },
];

const companies: {
  name: string;
  description?: string;
  href: string;
  logo: string;
}[] = [
  {
    name: 'Avighna Speciality Ingredients Pvt. Ltd.',
    description: 'Specialty ingredient solutions for food, dairy, beverages, pharmaceuticals and nutraceuticals.',
    href: '/',
    logo: '/brand-logo.png',
  },
  {
    name: 'Asian Apex & Co.',
    href: '/companies/asian-apex',
    logo: '/logos/asian-apex-mark.png',
  },
  {
    name: 'Ganesh Inc.',
    description:
      'Food and pharma raw-material solutions supported by reliable supply, quality assurance and technical expertise.',
    href: '/companies/ganesh-inc',
    logo: '/logos/ganesh-inc-mark.png',
  },
  {
    name: 'Atharva Associates',
    href: '/companies/atharva-associates',
    logo: '/logos/atharva-mark.png',
  },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function LeafMark({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 120 160" fill="currentColor" aria-hidden>
      <path d="M96 8C52 22 24 62 16 108c-4 22 6 42 24 48 18 6 36-2 46-22 14-28 18-70 10-108-2-8-6-14-10-18z" />
    </svg>
  );
}

export function HomeHero() {
  return (
    <section id="top" className="relative overflow-hidden bg-[#FAF8F2] xl:min-h-[664px]">
      <LeafMark className="pointer-events-none absolute -left-10 top-6 hidden h-48 w-32 text-[#A7B69A]/25 blur-[1px] lg:block" />
      <LeafMark className="pointer-events-none absolute -right-8 top-16 hidden h-40 w-28 rotate-[18deg] text-[#A7B69A]/20 blur-[0.5px] lg:block" />
      <LeafMark className="pointer-events-none absolute bottom-10 left-[18%] hidden h-24 w-16 -rotate-12 text-[#A7B69A]/15 xl:block" />

      <div className="relative mx-auto grid max-w-[1600px] items-start gap-6 px-4 pb-6 pt-5 sm:px-6 md:px-8 xl:grid-cols-[340px_minmax(0,1fr)] xl:gap-6 xl:px-[72px] xl:pb-2 xl:pt-2 2xl:px-20">
        <div className="min-w-0 max-w-[36rem] xl:max-w-[360px]">
          <p className="reveal text-[11px] font-semibold uppercase leading-5 tracking-[0.18em] text-[#073D36]">
            Natural ingredients
            <br />
            Brighter tomorrows
          </p>
          <h1
            className="reveal reveal-delay-1 mt-3 max-w-[20rem] font-display text-[2.15rem] leading-[0.96] tracking-[-0.03em] text-[#073D36] sm:max-w-[24rem] sm:text-[2.7rem] xl:mt-4 xl:max-w-[340px] xl:text-[clamp(2.35rem,3.85vw,3.7rem)] xl:leading-[0.94]"
            data-testid="heading-hero"
          >
            Ingredient
            <br />
            Solutions
            <br />
            for a Better
            <br />
            Tomorrow<span className="text-[#F4511E]">.</span>
          </h1>
          <p className="reveal reveal-delay-2 mt-4 max-w-[34rem] text-[15px] leading-[1.55] text-[#263B38] xl:mt-5 xl:max-w-[320px] xl:text-[15.5px]">
            We provide high-quality ingredients and formulation solutions for food, beverage, dairy and pharmaceutical
            applications.
          </p>
          <div className="reveal reveal-delay-3 mt-4 xl:mt-5">
            <Link
              href="/solutions"
              className="group inline-flex items-center gap-2 rounded-full bg-[#F4511E] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#de4618] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#073D36] focus-visible:ring-offset-2"
              data-testid="button-hero-solutions"
            >
              Explore Our Solutions
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        <div className="min-w-0">
          <IndustryCarousel />
        </div>
      </div>

      <button
        type="button"
        onClick={() => scrollToId('benefits')}
        className="absolute bottom-2 left-5 hidden items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#5d6e69] xl:inline-flex xl:left-[72px] 2xl:left-20"
      >
        <span className="flex h-8 w-5 items-start justify-center rounded-full border border-[#073D36]/30 p-1">
          <span className="h-2 w-1 rounded-full bg-[#073D36] motion-safe:animate-bounce" />
        </span>
        Scroll to discover
      </button>
    </section>
  );
}

export function BenefitsStrip() {
  return (
    <section id="benefits" className="border-y border-[#073D36]/10 bg-[#FAF8F2]">
      <div className="mx-auto page-container max-w-none">
        <ul className="grid grid-cols-2 gap-x-4 gap-y-4 py-4 sm:grid-cols-3 lg:flex lg:items-center lg:justify-between lg:gap-0 lg:overflow-x-auto lg:py-5">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <li
                key={benefit.label}
                className={`flex min-w-0 items-center gap-2.5 lg:flex-1 lg:justify-center lg:px-3 ${
                  index > 0 ? 'lg:border-l lg:border-[#073D36]/12' : ''
                }`}
              >
                <Icon size={18} strokeWidth={1.5} className="shrink-0 text-[#073D36]" />
                <span className="text-[12px] font-semibold leading-4 text-[#073D36] sm:text-[13px]">{benefit.label}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function IngredientsIntro() {
  return (
    <section id="ingredients" className="bg-[#FAF8F2] pb-14 pt-8 lg:pb-20 lg:pt-12">
      <div className="mx-auto page-container max-w-none">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F4511E]">Our ingredients</p>
            <span className="mt-2 block h-[2px] w-16 bg-[#F4511E]" />
          </div>
          <button
            type="button"
            onClick={() => scrollToId('catalogue')}
            className="group hidden items-center gap-2 text-sm font-semibold text-[#073D36] hover:text-[#F4511E] lg:inline-flex"
          >
            View All Ingredients
            <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        </div>
        <div className="mt-3 grid items-start gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
        <div>
          <h2
            className="max-w-[640px] font-display text-[clamp(2.2rem,3.6vw,3.4rem)] leading-[0.98] tracking-[-0.03em] text-[#073D36]"
            data-testid="heading-ingredients"
          >
            Building Better Products
          </h2>
          <p className="mt-5 max-w-[520px] text-[16px] leading-7 text-[#263B38]">
            Core ingredients, flavour systems, and fruit solutions for manufacturers who need consistent taste, texture,
            and processing performance.
          </p>
          <button
            type="button"
            onClick={() => scrollToId('catalogue')}
            className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#073D36] hover:text-[#F4511E] lg:hidden"
          >
            View All Ingredients
            <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        </div>
        <div className="overflow-hidden rounded-[28px] shadow-[0_20px_50px_rgba(7,61,54,0.08)]">
          <img
            src="/generated/ingredients-still-life.jpg"
            alt="Powder, grains, seeds, and leaves arranged in a wooden bowl"
            width={1280}
            height={720}
            loading="lazy"
            className="aspect-[16/10] w-full object-cover"
          />
        </div>
        </div>
      </div>
    </section>
  );
}

export function AboutBand() {
  return (
    <section id="about" className="bg-[#F0EBDD] py-14 lg:py-20">
      <div className="mx-auto grid page-container max-w-none items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="overflow-hidden rounded-[28px]">
          <img
            src="/generated/avighna-about-editorial.jpg"
            alt="Avighna ingredient and formulation work"
            width={1200}
            height={900}
            loading="lazy"
            className="aspect-[4/3] w-full object-cover"
          />
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F4511E]">About Avighna Group</p>
          <h2 className="mt-4 font-display text-[clamp(2.1rem,3.6vw,3.4rem)] leading-[1.02] tracking-[-0.03em] text-[#073D36]">
            Building businesses. Creating long-term value.
          </h2>
          <div className="mt-5 space-y-4 text-[15.5px] leading-7 text-[#263B38]">
            <p>
              Built on 40+ years of industrial experience, our journey began in 2014 with a vision to create innovative,
              solution-driven specialty ingredients for the Food &amp; Beverage industry.
            </p>
            <p>
              From humble beginnings, we have evolved into a trusted partner for the FMCG industry, delivering
              clean-label, cost-effective and value-added solutions.
            </p>
          </div>
          <Link
            href="/about"
            className="group mt-7 inline-flex items-center gap-2 rounded-full border border-[#F4511E] px-5 py-2.5 text-sm font-semibold text-[#F4511E] transition-colors hover:bg-[#F4511E] hover:text-white"
          >
            About Us
            <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function CompaniesBand() {
  return (
    <section id="companies" className="bg-[#FAF8F2] py-14 lg:py-20">
      <div className="mx-auto page-container max-w-none">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F4511E]">Our companies</p>
        <h2 className="mt-3 max-w-[760px] font-display text-[clamp(2rem,3.5vw,3.2rem)] leading-[1.05] tracking-[-0.03em] text-[#073D36]">
          A group of companies for the FMCG industry.
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {companies.map((company) => (
            <Link
              key={company.name}
              href={company.href}
              className="group flex h-full flex-col rounded-[22px] border border-[#073D36]/10 bg-white p-5 shadow-[0_10px_30px_rgba(7,61,54,0.04)] transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4511E]"
            >
              <img src={company.logo} alt="" className="h-12 w-auto max-w-[140px] object-contain object-left" />
              <h3 className="mt-5 font-display text-[1.35rem] leading-tight text-[#073D36]">{company.name}</h3>
              {company.description && <p className="mt-3 text-sm leading-6 text-[#263B38]">{company.description}</p>}
              <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-[#F4511E]">
                View company
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
