import { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArrowDownRight, ArrowUpRight, Check, ChevronRight, Factory, FlaskConical, Menu, Milk, Phone, Plus, Sparkles, X } from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

type Industry = {
  id: string;
  label: string;
  title: string;
  description: string;
  image: string;
  accent: string;
  icon: typeof Factory;
};

const industries: Industry[] = [
  {
    id: 'food',
    label: 'Food & beverage',
    title: 'Taste, texture, consistency.',
    description: 'Flavour and ingredient solutions for instant soups/snacks, chips/masalas, beverages, bakeries and more.',
    image: '/brand/flavours.jpg',
    accent: 'from-[#fbefe0] to-[#edc27f]',
    icon: Sparkles,
  },
  {
    id: 'dairy',
    label: 'Dairy',
    title: 'Higher yield. Better texture.',
    description: 'Ingredients and solutions for paneer, cheese, curd and ghee production.',
    image: '/brand/dairy.jpg',
    accent: 'from-[#f4efdd] to-[#d8e3dd]',
    icon: Milk,
  },
  {
    id: 'pharma',
    label: 'Pharma & nutraceuticals',
    title: 'Reliable formulation inputs.',
    description: 'Premium ingredients and flavour systems for pharma & nutraceutical industry applications.',
    image: '/brand/pharma.jpg',
    accent: 'from-[#e8f4f3] to-[#b8d9dc]',
    icon: FlaskConical,
  },
];

const ingredientGroups = [
  { eyebrow: 'Core ingredients', items: ['Citric Acid', 'Maltodextrin', 'Sorbitol 70% IP Solution', 'Dextrose Anhydrous', 'Dextrose Monohydrate', 'Liquid Glucose', 'Maize Starch'] },
  { eyebrow: 'Dairy solutions', items: ['Paneer Coagulants'] },
  { eyebrow: 'Flavour systems', items: ['Natural Antioxidant Blends', 'Liquid Flavours', 'Encapsulated Flavours', 'Powder Flavours', 'Natural Extracts'] },
  { eyebrow: 'Fruit solutions', items: ['Fruit Preparations', 'Fruit Powders', 'Fruit & Vegetable Syrups'] },
];

const flavourApplications = [
  'Instant soups/snacks',
  'Tea and drink mixes',
  'Protein drinks/premixes',
  'Chips/masalas',
  'Ice cream',
  'Beverages',
  'Bakeries',
  'Distilleries',
  'Cereals/masalas',
  'Pharma/nutraceuticals',
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function BrandWordmark({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-3" data-testid="brand-wordmark">
      <div className={`h-9 w-1.5 rounded-full ${light ? 'bg-[#e4c16e]' : 'bg-[#e2602c]'}`} />
      <div className="leading-none">
        <div className={`font-display text-[1.35rem] tracking-[-0.04em] ${light ? 'text-[#fff9ee]' : 'text-[#1d2522]'}`}>Avighna</div>
        <div className={`mt-1 text-[8px] font-semibold uppercase tracking-[0.13em] ${light ? 'text-[#d7ddd2]' : 'text-[#68706a]'}`}>Speciality Ingredients Pvt Ltd</div>
      </div>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: 'Solutions', id: 'solutions' },
    { label: 'Catalogue', id: 'catalogue' },
    { label: 'Applications', id: 'applications' },
    { label: 'Contact', id: 'contact' },
  ];
  return (
    <header className="absolute left-0 right-0 top-0 z-30">
      <div className="mx-auto flex max-w-[1320px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
        <button onClick={() => scrollToId('top')} aria-label="Back to top" data-testid="button-brand-home">
          <BrandWordmark />
        </button>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {links.map((link) => (
            <button key={link.id} onClick={() => scrollToId(link.id)} className="group relative text-[13px] font-semibold text-[#32413b] transition-colors hover:text-[#e2602c]" data-testid={`button-nav-${link.id}`}>
              {link.label}
              <span className="absolute -bottom-2 left-0 h-px w-0 bg-[#e2602c] transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>
        <button onClick={() => scrollToId('contact')} className="hidden items-center gap-2 rounded-full bg-[#1e3d38] px-5 py-3 text-xs font-bold text-[#fff9ee] transition-transform hover:-translate-y-0.5 md:flex" data-testid="button-header-contact">
          Start a conversation <ArrowUpRight size={14} />
        </button>
        <button className="rounded-full bg-[#1e3d38] p-2.5 text-[#fff9ee] md:hidden" onClick={() => setOpen(!open)} aria-label={open ? 'Close navigation' : 'Open navigation'} data-testid="button-mobile-menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <nav className="mx-4 rounded-2xl border border-[#ddcdb8] bg-[#fff9ee] p-4 shadow-xl md:hidden" aria-label="Mobile navigation">
          {links.map((link) => (
            <button key={link.id} onClick={() => { scrollToId(link.id); setOpen(false); }} className="flex w-full items-center justify-between border-b border-[#eadfcf] py-4 text-left text-sm font-semibold text-[#1e3d38]" data-testid={`button-mobile-nav-${link.id}`}>
              {link.label} <ChevronRight size={16} />
            </button>
          ))}
          <button onClick={() => { scrollToId('contact'); setOpen(false); }} className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#e2602c] py-3 text-sm font-bold text-[#fff9ee]" data-testid="button-mobile-contact">
            Start a conversation <ArrowUpRight size={15} />
          </button>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="noise relative min-h-[760px] overflow-hidden bg-[#f4eadb] pt-32 lg:min-h-[820px] lg:pt-40">
      <div className="absolute -right-36 -top-40 h-[540px] w-[540px] rounded-full bg-[#e8bb68]/25 blur-3xl" />
      <div className="mx-auto grid max-w-[1320px] items-center gap-12 px-5 pb-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-12 lg:pb-28">
        <div className="relative z-10 max-w-[620px]">
          <div className="reveal mb-7 flex items-center gap-3">
            <span className="eyebrow text-[#e2602c]">Ingredient solutions / Bengaluru</span>
            <span className="line-grow h-px w-16 bg-[#e2602c]" />
          </div>
          <h1 className="reveal reveal-delay-1 font-display text-[clamp(4rem,8vw,7.7rem)] leading-[0.88] tracking-[-0.065em] text-[#1d2522]" data-testid="heading-hero">
            Ingredients<br />
            <span className="text-[#e2602c]">That Make</span><br />
            Better Products.
          </h1>
          <p className="reveal reveal-delay-2 mt-8 max-w-[450px] text-[17px] leading-7 text-[#53605a]">
            A product-led partner for food, dairy, beverage, pharmaceutical, and nutraceutical manufacturers.
          </p>
          <div className="reveal reveal-delay-3 mt-9 flex flex-wrap gap-3">
            <button onClick={() => scrollToId('solutions')} className="group flex items-center gap-3 rounded-full bg-[#e2602c] px-6 py-4 text-sm font-bold text-[#fff9ee] transition-all hover:-translate-y-1 hover:bg-[#cb4c20]" data-testid="button-hero-solutions">
              Explore solutions <ArrowDownRight size={17} className="transition-transform group-hover:translate-y-0.5 group-hover:rotate-[-15deg]" />
            </button>
            <button onClick={() => scrollToId('contact')} className="flex items-center gap-2 rounded-full border border-[#bfab92] px-6 py-4 text-sm font-bold text-[#1e3d38] transition-colors hover:border-[#e2602c] hover:text-[#e2602c]" data-testid="button-hero-contact">
              Talk to Ashita <Phone size={15} />
            </button>
          </div>
          <div className="mt-12 flex items-center gap-6 border-t border-[#d9c7af] pt-5 text-xs font-semibold text-[#697069]">
            <span>Food</span><span className="h-1 w-1 rounded-full bg-[#e2602c]" /><span>Dairy</span><span className="h-1 w-1 rounded-full bg-[#e2602c]" /><span>Pharma</span><span className="h-1 w-1 rounded-full bg-[#e2602c]" />
          </div>
        </div>

        <div className="relative mx-auto h-[570px] w-full max-w-[640px] lg:h-[625px]">
          <div className="absolute right-0 top-0 h-[445px] w-[76%] overflow-hidden rounded-[10rem_1.5rem_1.5rem_1.5rem] border-[7px] border-[#fff4e4] shadow-[0_22px_50px_rgba(87,56,25,0.18)]">
            <img src="/brand/flavours.jpg" alt="Flavour and seasoning ingredients" className="h-full w-full object-cover object-right" data-testid="img-hero-flavours" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#273e36]/35 to-transparent" />
            <div className="absolute bottom-5 left-6 text-[#fff9ee]">
              <p className="eyebrow">Applications</p>
              <p className="mt-1 font-display text-2xl">Complete flavour systems</p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 h-[285px] w-[47%] overflow-hidden rounded-[1.5rem_5.5rem_1.5rem_1.5rem] border-[7px] border-[#f4eadb] shadow-[0_17px_35px_rgba(87,56,25,0.2)]">
            <img src="/brand/fried-food.jpg" alt="Fried food in cooking oil" className="h-full w-full object-cover" data-testid="img-hero-fried-food" />
          </div>
          <div className="absolute bottom-20 right-[9%] flex h-28 w-28 rotate-6 flex-col items-center justify-center rounded-full bg-[#1e3d38] text-center text-[#fff9ee] shadow-lg">
            <span className="font-display text-3xl leading-none">01</span>
            <span className="mt-1 text-[9px] font-bold uppercase tracking-[0.12em]">speciality<br />partner</span>
          </div>
          <div className="absolute left-3 top-20 h-16 w-16 rounded-full border border-[#e2602c]/50" />
          <div className="absolute left-0 top-28 h-2 w-2 rounded-full bg-[#e2602c]" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex h-12 items-center overflow-hidden border-y border-[#dfcdb7] bg-[#e9ddcb]">
        <div className="flex min-w-max animate-[marquee_26s_linear_infinite] gap-8 whitespace-nowrap px-5 text-[11px] font-bold uppercase tracking-[0.17em] text-[#51645b]">
          <span>Citric Acid</span><span className="text-[#e2602c]">·</span><span>Maltodextrin</span><span className="text-[#e2602c]">·</span><span>Natural Extracts</span><span className="text-[#e2602c]">·</span><span>Paneer Coagulants</span><span className="text-[#e2602c]">·</span><span>Fruit Preparations</span><span className="text-[#e2602c]">·</span><span>Citric Acid</span><span className="text-[#e2602c]">·</span><span>Maltodextrin</span>
        </div>
      </div>
    </section>
  );
}

function Solutions() {
  const [activeId, setActiveId] = useState('food');
  const active = industries.find((industry) => industry.id === activeId) ?? industries[0];
  const Icon = active.icon;
  return (
    <section id="solutions" className="bg-[#1e3d38] px-5 py-24 text-[#fff9ee] sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div>
            <div className="eyebrow flex items-center gap-3 text-[#e4c16e]"><span className="h-px w-8 bg-[#e4c16e]" /> What we solve</div>
            <h2 className="mt-5 max-w-[450px] font-display text-5xl leading-[0.98] tracking-[-0.05em] sm:text-6xl" data-testid="heading-solutions">Ingredients in.<br /><span className="text-[#e4c16e]">Better products</span> out.</h2>
            <p className="mt-7 max-w-[390px] text-[15px] leading-7 text-[#c3d0c5]">The right ingredient changes everything downstream — from process performance to the product on the shelf.</p>
            <div className="mt-10 flex flex-wrap gap-2">
              {industries.map((industry) => (
                <button key={industry.id} onClick={() => setActiveId(industry.id)} className={`rounded-full border px-4 py-3 text-xs font-bold transition-all ${activeId === industry.id ? 'border-[#e4c16e] bg-[#e4c16e] text-[#1e3d38]' : 'border-[#55726b] text-[#cfdbd0] hover:border-[#e4c16e] hover:text-[#e4c16e]'}`} data-testid={`button-solution-${industry.id}`}>
                  {industry.label}
                </button>
              ))}
            </div>
          </div>
          <div className="relative grid gap-6 sm:grid-cols-[1fr_0.75fr]">
            <div className="relative min-h-[415px] overflow-hidden rounded-[1.5rem_7rem_1.5rem_1.5rem] border border-[#547269]">
              <img src={active.image} alt={active.label} className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500" data-testid={`img-solution-${active.id}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#102b28] via-transparent to-transparent" />
              <div className="absolute bottom-7 left-7 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e4c16e] text-[#1e3d38]"><Icon size={20} /></div>
                <span className="text-sm font-semibold">{active.label}</span>
              </div>
            </div>
            <div className={`flex min-h-[415px] flex-col justify-between rounded-[1.5rem] bg-gradient-to-br ${active.accent} p-7 text-[#1e3d38]`}>
              <div className="flex justify-between">
                <span className="eyebrow opacity-70">Application lens</span>
                <span className="font-display text-5xl leading-none opacity-30">0{industries.findIndex((item) => item.id === active.id) + 1}</span>
              </div>
              <div>
                <h3 className="font-display text-4xl leading-[0.98] tracking-[-0.04em]" data-testid={`heading-solution-${active.id}`}>{active.title}</h3>
                <p className="mt-5 text-sm leading-6 opacity-80">{active.description}</p>
                <button onClick={() => scrollToId('catalogue')} className="mt-7 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] transition-colors hover:text-[#e2602c]" data-testid="button-solution-catalogue">
                  Browse ingredients <ArrowUpRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Catalogue() {
  return (
    <section id="catalogue" className="bg-[#f4eadb] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-14 flex flex-col justify-between gap-7 md:flex-row md:items-end">
          <div>
            <div className="eyebrow flex items-center gap-3 text-[#e2602c]"><span className="h-px w-8 bg-[#e2602c]" /> Product catalogue</div>
            <h2 className="mt-4 max-w-[560px] font-display text-5xl leading-[0.95] tracking-[-0.05em] text-[#1e3d38] sm:text-6xl" data-testid="heading-catalogue">The building blocks<br /><span className="text-[#e2602c]">of better.</span></h2>
          </div>
          <p className="max-w-[320px] text-sm leading-6 text-[#66716b]">A considered range for formulations that need to perform consistently at scale.</p>
        </div>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-[#d6c6b2] bg-[#d6c6b2] md:grid-cols-2">
          {ingredientGroups.map((group, groupIndex) => (
            <div key={group.eyebrow} className={`bg-[#fff9ee] p-7 sm:p-9 ${groupIndex === 0 ? 'md:rounded-tl-2xl' : ''}`} data-testid={`group-ingredients-${groupIndex}`}>
              <div className="mb-7 flex items-center justify-between">
                <span className="eyebrow text-[#9d6f3d]">{group.eyebrow}</span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#dfcdb7] text-[#e2602c]"><Plus size={14} /></span>
              </div>
              <div className="grid gap-0 sm:grid-cols-2">
                {group.items.map((item, index) => (
                  <button key={item} onClick={() => scrollToId('contact')} className="group flex items-center justify-between border-t border-[#ebdfce] py-4 text-left text-[15px] font-semibold text-[#283932] transition-colors hover:text-[#e2602c]" data-testid={`button-product-${groupIndex}-${index}`}>
                    <span>{item}</span><ArrowUpRight size={14} className="text-[#bda98e] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#e2602c]" />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative min-h-[310px] overflow-hidden rounded-2xl bg-[#e2602c] p-8 sm:p-11">
            <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full border-[24px] border-[#f58242]/45" />
            <div className="relative z-10 max-w-[420px]">
              <span className="eyebrow text-[#ffe4b2]">Product-led by nature</span>
              <h3 className="mt-4 font-display text-4xl leading-[0.98] tracking-[-0.045em] text-[#fff9ee] sm:text-5xl">Start with the product you want to make.</h3>
              <button onClick={() => scrollToId('contact')} className="mt-8 flex items-center gap-2 rounded-full bg-[#fff9ee] px-5 py-3 text-xs font-bold text-[#1e3d38] transition-transform hover:-translate-y-1" data-testid="button-catalogue-enquiry">
                Discuss an ingredient <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-2xl bg-[#dbe7df] p-8 sm:p-11">
            <div className="absolute bottom-0 right-0 h-full w-[49%] overflow-hidden rounded-tl-[8rem]">
              <img src="/brand/pharma.jpg" alt="Pharmaceutical and nutraceutical formulations" className="h-full w-full object-cover object-right" data-testid="img-catalogue-pharma" />
            </div>
            <div className="relative z-10 max-w-[260px]">
              <span className="eyebrow text-[#547064]">Formulation support</span>
              <h3 className="mt-4 font-display text-3xl leading-[1] tracking-[-0.04em] text-[#1e3d38]">Reliable ingredients for high-performance pharma products.</h3>
              <button onClick={() => scrollToId('applications')} className="mt-7 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#e2602c]" data-testid="button-catalogue-pharma">
                See applications <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function XtendraFeature() {
  const claims = ['Prevents rancidity', 'Enhances shelf life', 'Reduces smoke during frying', 'Reduces oil absorption by 5–15%', 'Maintains oil quality by reducing FFA & PV levels'];
  return (
    <section className="relative overflow-hidden bg-[#e2602c] px-5 py-24 text-[#fff9ee] sm:px-8 lg:px-12 lg:py-32">
      <div className="absolute -left-28 bottom-[-12rem] h-[38rem] w-[38rem] rounded-full border-[70px] border-[#f58242]/40" />
      <div className="mx-auto grid max-w-[1320px] items-center gap-14 lg:grid-cols-[1fr_0.82fr] lg:gap-24">
        <div className="relative z-10">
          <div className="eyebrow text-[#ffe0a4]">Featured solution / fried-food producers</div>
          <h2 className="mt-5 max-w-[600px] font-display text-6xl leading-[0.9] tracking-[-0.06em] sm:text-8xl" data-testid="heading-xtendra">Oil life up.<br /><span className="text-[#1e3d38]">Product quality</span> up.</h2>
          <p className="mt-8 max-w-[490px] text-lg leading-7 text-[#ffe6c7]">XTENDRA 06 is an advanced natural anti-oxidant blend for fried-food manufacturers.</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <div className="rounded-2xl bg-[#1e3d38] px-6 py-5">
              <div className="font-display text-4xl leading-none">1 gm</div>
              <div className="mt-2 text-[11px] font-bold uppercase tracking-[0.1em] text-[#c4d3c5]">per 1 kg cooking oil</div>
            </div>
            <div className="rounded-2xl border border-[#f7b070] px-6 py-5">
              <div className="font-display text-4xl leading-none">75L–100L+</div>
              <div className="mt-2 text-[11px] font-bold uppercase tracking-[0.1em] text-[#ffe1b7]">cooking oil producers</div>
            </div>
          </div>
          <p className="mt-7 text-xs font-semibold text-[#ffe1b7]">Available in 1L / 5L / 25L cans</p>
        </div>
        <div className="relative z-10">
          <div className="relative overflow-hidden rounded-[1.5rem_8rem_1.5rem_1.5rem] border-[8px] border-[#f7a060] shadow-[0_25px_60px_rgba(90,38,14,.25)]">
            <img src="/brand/fried-food-flyer.png" alt="XTENDRA 06 natural anti-oxidant blend" className="aspect-[0.72] w-full object-cover object-top" data-testid="img-xtendra-flyer" />
          </div>
          <div className="absolute -bottom-6 -left-6 max-w-[235px] rounded-xl bg-[#fff9ee] p-5 text-[#1e3d38] shadow-xl">
            <div className="eyebrow text-[#e2602c]">Key benefits</div>
            <ul className="mt-3 space-y-2">
              {claims.slice(0, 3).map((claim) => <li key={claim} className="flex items-start gap-2 text-xs font-semibold"><Check size={14} className="mt-0.5 shrink-0 text-[#e2602c]" />{claim}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function DairyFeature() {
  return (
    <section className="bg-[#f0e9d8] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto grid max-w-[1320px] items-center gap-14 lg:grid-cols-[0.9fr_1fr] lg:gap-24">
        <div className="order-2 lg:order-1">
          <div className="relative mx-auto max-w-[550px] overflow-hidden rounded-[8rem_1.5rem_1.5rem_1.5rem] border-[8px] border-[#fff9ee] shadow-[0_22px_45px_rgba(49,62,54,.14)]">
            <img src="/brand/dairy-flyer.png" alt="EZENTIAL 4001 COAGULANT for paneer manufacturers" className="aspect-[0.72] w-full object-cover object-top" data-testid="img-dairy-flyer" />
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <div className="eyebrow flex items-center gap-3 text-[#e2602c]"><span className="h-px w-8 bg-[#e2602c]" /> Dairy solution</div>
          <h2 className="mt-5 max-w-[580px] font-display text-6xl leading-[0.9] tracking-[-0.06em] text-[#1e3d38] sm:text-7xl" data-testid="heading-ezential">Soft, spongy paneer.<br /><span className="text-[#e2602c]">More yield.</span></h2>
          <p className="mt-7 max-w-[480px] text-[16px] leading-7 text-[#5f6b62]">EZENTIAL 4001 COAGULANT is designed for paneer manufacturers who want consistency and production efficiency.</p>
          <div className="mt-10 grid max-w-[530px] gap-px overflow-hidden rounded-2xl border border-[#d5c8b3] bg-[#d5c8b3] sm:grid-cols-3">
            <div className="bg-[#fff9ee] p-5"><div className="font-display text-4xl text-[#e2602c]">0.35%</div><p className="mt-2 text-xs font-bold leading-4 text-[#53605a]">dosage required</p></div>
            <div className="bg-[#fff9ee] p-5"><div className="font-display text-4xl text-[#e2602c]">Soft</div><p className="mt-2 text-xs font-bold leading-4 text-[#53605a]">spongy paneer</p></div>
            <div className="bg-[#fff9ee] p-5"><div className="font-display text-4xl text-[#e2602c]">18–20%</div><p className="mt-2 text-xs font-bold leading-4 text-[#53605a]">yield improvement</p></div>
          </div>
          <button onClick={() => scrollToId('contact')} className="mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#1e3d38] transition-colors hover:text-[#e2602c]" data-testid="button-dairy-enquiry">
            Talk about your dairy line <ArrowUpRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}

function Applications() {
  return (
    <section id="applications" className="bg-[#fff9ee] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid items-end gap-8 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <div className="eyebrow flex items-center gap-3 text-[#e2602c]"><span className="h-px w-8 bg-[#e2602c]" /> Built for the application</div>
            <h2 className="mt-5 font-display text-5xl leading-[0.94] tracking-[-0.05em] text-[#1e3d38] sm:text-6xl" data-testid="heading-applications">A flavour for<br /><span className="text-[#e2602c]">every direction.</span></h2>
          </div>
          <p className="max-w-[455px] justify-self-end text-[16px] leading-7 text-[#66716b]">Flavour applications include the products people reach for every day — and the specialised formulations that help them get there.</p>
        </div>
        <div className="mt-14 grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="relative min-h-[530px] overflow-hidden rounded-[1.5rem_8rem_1.5rem_1.5rem] bg-[#dbe7df]">
            <img src="/brand/flavours-flyer.png" alt="Flavour and seasoning solutions" className="absolute inset-0 h-full w-full object-cover object-top" data-testid="img-flavours-flyer" />
            <div className="absolute bottom-5 left-5 right-5 rounded-xl bg-[#1e3d38]/95 p-5 text-[#fff9ee]">
              <p className="eyebrow text-[#e4c16e]">Our flavour range</p>
              <p className="mt-2 font-display text-2xl leading-none">Liquid. Encapsulated. Powder.</p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {flavourApplications.map((application, index) => (
              <button key={application} onClick={() => scrollToId('contact')} className={`group flex min-h-[87px] items-center justify-between border-b border-[#ded2c1] px-1 text-left transition-colors hover:border-[#e2602c] ${index === 0 ? 'sm:border-t sm:pt-3' : ''}`} data-testid={`button-application-${index}`}>
                <span className="flex items-center gap-4">
                  <span className="font-display text-2xl text-[#d6aa58]">{String(index + 1).padStart(2, '0')}</span>
                  <span className="text-sm font-bold text-[#2c4138]">{application}</span>
                </span>
                <ArrowUpRight size={16} className="text-[#a99070] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#e2602c]" />
              </button>
            ))}
            <div className="col-span-full mt-6 rounded-2xl bg-[#f4eadb] p-7">
              <div className="flex items-start gap-4">
                <FlaskConical className="mt-1 shrink-0 text-[#e2602c]" size={22} />
                <div><p className="font-display text-2xl leading-none text-[#1e3d38]">Natural Extracts</p><p className="mt-2 text-sm leading-6 text-[#68736b]">For pharma & nutraceutical applications.</p></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="relative overflow-hidden bg-[#1e3d38] px-5 py-24 text-[#fff9ee] sm:px-8 lg:px-12 lg:py-28">
      <div className="absolute right-[-8rem] top-[-14rem] h-[38rem] w-[38rem] rounded-full border-[75px] border-[#e4c16e]/15" />
      <div className="mx-auto grid max-w-[1320px] gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-24">
        <div className="relative z-10">
          <div className="eyebrow text-[#e4c16e]">Let’s make better products</div>
          <h2 className="mt-5 max-w-[530px] font-display text-6xl leading-[0.9] tracking-[-0.06em] sm:text-7xl" data-testid="heading-contact">Bring us the<br /><span className="text-[#e4c16e]">application.</span></h2>
          <p className="mt-8 max-w-[430px] text-[15px] leading-7 text-[#c5d0c7]">Tell us what you are making and we will start with the ingredient that can make it better.</p>
          <div className="mt-10 space-y-4 text-sm text-[#e0e7df]">
            <a href="tel:+919483389387" className="flex items-center gap-3 transition-colors hover:text-[#e4c16e]" data-testid="link-contact-phone"><Phone size={16} className="text-[#e4c16e]" /> Ashita · +91 9483389387</a>
            <a href="tel:+917019477940" className="flex items-center gap-3 transition-colors hover:text-[#e4c16e]" data-testid="link-contact-phone-secondary"><Phone size={16} className="text-[#e4c16e]" /> +91 70194 77940 / 099169 17517</a>
            <p className="flex max-w-[420px] items-start gap-3 leading-6"><span className="mt-1 h-4 w-4 shrink-0 rounded-full border border-[#e4c16e]" /> #1963/B, BCCHS Layout, near Vajarahalli Metro station, Kanakapura Road, Bengaluru-560109.</p>
          </div>
        </div>
        <div className="relative z-10 rounded-2xl bg-[#fff9ee] p-6 text-[#1e3d38] sm:p-9">
          {sent ? (
            <div className="flex min-h-[360px] flex-col items-center justify-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e4c16e]"><Check size={26} /></div>
              <h3 className="mt-6 font-display text-4xl tracking-[-0.04em]">Message received.</h3>
              <p className="mt-3 max-w-[300px] text-sm leading-6 text-[#68736b]">Ashita will be in touch to understand your application.</p>
              <button onClick={() => setSent(false)} className="mt-8 text-xs font-bold uppercase tracking-[0.12em] text-[#e2602c]" data-testid="button-send-another">Send another message</button>
            </div>
          ) : (
            <form onSubmit={(event) => { event.preventDefault(); setSent(true); }} className="space-y-6" data-testid="form-contact">
              <div><label htmlFor="name" className="eyebrow text-[#8d6d4b]">Your name</label><input id="name" name="name" required placeholder="Name" className="mt-2 w-full border-b border-[#d7c8b6] bg-transparent py-3 text-lg outline-none placeholder:text-[#ad9d89] focus:border-[#e2602c]" data-testid="input-name" /></div>
              <div><label htmlFor="company" className="eyebrow text-[#8d6d4b]">Company</label><input id="company" name="company" required placeholder="Company name" className="mt-2 w-full border-b border-[#d7c8b6] bg-transparent py-3 text-lg outline-none placeholder:text-[#ad9d89] focus:border-[#e2602c]" data-testid="input-company" /></div>
              <div><label htmlFor="email" className="eyebrow text-[#8d6d4b]">Work email</label><input id="email" name="email" type="email" required placeholder="you@company.com" className="mt-2 w-full border-b border-[#d7c8b6] bg-transparent py-3 text-lg outline-none placeholder:text-[#ad9d89] focus:border-[#e2602c]" data-testid="input-email" /></div>
              <div><label htmlFor="application" className="eyebrow text-[#8d6d4b]">What are you making?</label><textarea id="application" name="application" required placeholder="Tell us about your product or application" rows={3} className="mt-2 w-full resize-none border-b border-[#d7c8b6] bg-transparent py-3 text-lg outline-none placeholder:text-[#ad9d89] focus:border-[#e2602c]" data-testid="input-application" /></div>
              <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-full bg-[#e2602c] py-4 text-sm font-bold text-[#fff9ee] transition-transform hover:-translate-y-1" data-testid="button-submit-contact">Start the conversation <ArrowUpRight size={16} /></button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#152d2a] px-5 py-10 text-[#d6ded7] sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-[1320px] flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div><BrandWordmark light /><p className="mt-5 max-w-[280px] text-xs leading-5 text-[#96aaa0]">Ingredients That Make Better Products.</p></div>
        <div className="flex flex-col gap-2 text-xs text-[#96aaa0] md:items-end"><span>Food · Dairy · Beverage</span><span>Pharmaceutical · Nutraceutical</span><span className="mt-2 text-[#e4c16e]">Bengaluru, India</span></div>
      </div>
      <div className="mx-auto mt-9 flex max-w-[1320px] justify-between border-t border-[#315149] pt-5 text-[10px] uppercase tracking-[0.12em] text-[#789087]"><span>© Avighna Speciality Ingredients Pvt Ltd</span><span>Application-first / Product-led</span></div>
    </footer>
  );
}

function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Solutions />
      <Catalogue />
      <XtendraFeature />
      <DairyFeature />
      <Applications />
      <Contact />
      <Footer />
    </main>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;