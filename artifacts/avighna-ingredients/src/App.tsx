import { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Apple, ArrowDownRight, ArrowRight, ArrowUpRight, Beaker, Building2, Candy, Check, Cherry, Citrus, Droplets, Factory, FileText, FlaskConical, GlassWater, Leaf, Lock, Mail, MapPin, Milk, Package, Phone, Sparkles, User, Users, Wheat, type LucideIcon } from 'lucide-react';
import { CategoryCard, type CategoryTheme } from '@/components/catalogue/CategoryCard';
import { ErrorBoundary } from '@/components/error-boundary';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import About from '@/pages/about';
import CompanyPage from '@/pages/company';
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

type IngredientItem = {
  label: string;
  icon: LucideIcon;
};

const industries: Industry[] = [
  {
    id: 'food',
    label: 'Food & beverage',
    title: 'Taste, texture, consistency.',
    description: 'Flavour and ingredient solutions for instant soups/snacks, chips/masalas, beverages, bakeries and more.',
    image: '/generated/flavours.jpg',
    accent: 'from-[#fbefe0] to-[#edc27f]',
    icon: Sparkles,
  },
  {
    id: 'dairy',
    label: 'Dairy',
    title: 'Higher yield. Better texture.',
    description: 'Ingredients and solutions for paneer, cheese, curd and ghee production.',
    image: '/generated/dairy.jpg',
    accent: 'from-[#f4efdd] to-[#d8e3dd]',
    icon: Milk,
  },
  {
    id: 'pharma',
    label: 'Pharma & nutraceuticals',
    title: 'Reliable formulation inputs.',
    description: 'Premium ingredients and flavour systems for pharma & nutraceutical industry applications.',
    image: '/generated/pharma.jpg',
    accent: 'from-[#e8f4f3] to-[#b8d9dc]',
    icon: FlaskConical,
  },
];

const categoryThemes = {
  core: {
    cardBg: 'bg-[#f7f0e5]',
    cardBorder: 'border-[#e5d7c3]',
    label: 'text-[#d35a2b]',
    badge: 'border-[#e4a07a] text-[#c24f24] bg-[#fff8f1]/85',
    row: 'border-[#eadfce] bg-[#fffaf4]/95 hover:border-[#e0a882] hover:bg-white hover:text-[#d35a2b]',
    icon: 'bg-[#f1e4d1] text-[#1e3d38] group-hover/item:bg-[#edd2b4] group-hover/item:text-[#d35a2b]',
    blob: 'bg-[#efdcc0]',
    slogan: 'text-[#8f6236]',
    blend: '#f7f0e5',
  },
  flavour: {
    cardBg: 'bg-[#eef4ef]',
    cardBorder: 'border-[#d2dfd5]',
    label: 'text-[#4f7a5d]',
    badge: 'border-[#8fb39a] text-[#3f6b51] bg-[#f7fbf8]/85',
    row: 'border-[#d6e3da] bg-[#fbfefc]/95 hover:border-[#95b8a3] hover:bg-white hover:text-[#3f6b51]',
    icon: 'bg-[#e0ebe4] text-[#1e3d38] group-hover/item:bg-[#cfe1d5] group-hover/item:text-[#3f6b51]',
    blob: 'bg-[#d7e7dd]',
    slogan: 'text-[#3f6b51]',
    blend: '#eef4ef',
  },
  fruit: {
    cardBg: 'bg-[#fff2e7]',
    cardBorder: 'border-[#efd5bd]',
    label: 'text-[#e06a2f]',
    badge: 'border-[#efb07a] text-[#d35a2b] bg-[#fff8f0]/85',
    row: 'border-[#efdcc9] bg-[#fffaf5]/95 hover:border-[#ebb07a] hover:bg-white hover:text-[#d35a2b]',
    icon: 'bg-[#f7e3d0] text-[#1e3d38] group-hover/item:bg-[#f2d1b2] group-hover/item:text-[#d35a2b]',
    blob: 'bg-[#f6dfc5]',
    slogan: 'text-[#c24f24]',
    blend: '#fff2e7',
  },
} satisfies Record<string, CategoryTheme>;

const ingredientGroups = [
  {
    eyebrow: 'Core ingredients',
    title: 'Core and dairy essentials',
    description: 'Foundational inputs for sweetness, texture, stability, and dependable dairy processing.',
    slogan: 'Building the essentials together',
    image: '/generated/catalogue-core.jpg',
    imageAlt: 'Milk powder and dairy ingredient textures',
    theme: categoryThemes.core,
    items: [
      { label: 'Citric Acid', icon: Beaker },
      { label: 'Maltodextrin', icon: Wheat },
      { label: 'Sorbitol 70% IP Solution', icon: Droplets },
      { label: 'Dextrose Anhydrous', icon: Candy },
      { label: 'Dextrose Monohydrate', icon: Candy },
      { label: 'Liquid Glucose', icon: GlassWater },
      { label: 'Maize Starch', icon: Wheat },
      { label: 'Paneer Coagulants', icon: Milk },
    ] satisfies IngredientItem[],
  },
  {
    eyebrow: 'Flavour systems',
    title: 'Layered flavour delivery',
    description: 'Flexible flavour formats for products that need aroma, taste retention, and processing fit.',
    slogan: 'Flavours that inspire',
    image: '/generated/catalogue-flavour.jpg',
    imageAlt: 'Vanilla, botanicals, and natural flavour extracts',
    theme: categoryThemes.flavour,
    items: [
      { label: 'Natural Antioxidant Blends', icon: Leaf },
      { label: 'Liquid Flavours', icon: Droplets },
      { label: 'Encapsulated Flavours', icon: Package },
      { label: 'Powder Flavours', icon: Sparkles },
      { label: 'Natural Extracts', icon: FlaskConical },
    ] satisfies IngredientItem[],
  },
  {
    eyebrow: 'Fruit solutions',
    title: 'Fruit-forward product formats',
    description: 'Preparation and syrup systems built for colour, mouthfeel, and real-product character.',
    slogan: 'Real Fruit. Real Possibilities.',
    image: '/generated/catalogue-fruit.jpg',
    imageAlt: 'Fresh mango, citrus, and fruit preparations',
    theme: categoryThemes.fruit,
    items: [
      { label: 'Fruit Preparations', icon: Apple },
      { label: 'Fruit Powders', icon: Cherry },
      { label: 'Fruit & Vegetable Syrups', icon: Citrus },
    ] satisfies IngredientItem[],
  },
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

function Hero() {
  return (
    <section id="top" className="noise relative min-h-[640px] overflow-hidden bg-[#f4eadb] pt-6 lg:min-h-[700px] lg:pt-8">
      <div className="absolute -right-36 -top-40 h-[540px] w-[540px] rounded-full bg-[#e8bb68]/25 blur-3xl" />
      <div className="mx-auto grid page-container max-w-none items-center gap-10 pb-14 lg:grid-cols-[0.46fr_0.54fr] lg:gap-12 xl:gap-16 lg:pb-16">
        <div className="relative z-10 max-w-[680px]">
          <div className="reveal mb-5">
            <span className="eyebrow text-[#e2602c]">Ingredient solutions / Bengaluru</span>
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
              Start a conversation <Phone size={15} />
            </button>
          </div>
          <div className="mt-12 flex items-center gap-6 border-t border-[#d9c7af] pt-5 text-xs font-semibold text-[#697069]">
            <span>Food</span><span className="h-1 w-1 rounded-full bg-[#e2602c]" /><span>Dairy</span><span className="h-1 w-1 rounded-full bg-[#e2602c]" /><span>Pharma</span><span className="h-1 w-1 rounded-full bg-[#e2602c]" />
          </div>
        </div>

        <div className="relative mx-auto h-[570px] w-full max-w-[760px] lg:h-[640px] lg:max-w-none">
          <div className="absolute right-0 top-0 h-[445px] w-[76%] overflow-hidden rounded-[10rem_1.5rem_1.5rem_1.5rem] border-[7px] border-[#fff4e4] shadow-[0_22px_50px_rgba(87,56,25,0.18)]">
            <img src="/generated/hero.jpg" alt="Specialty ingredients and finished product applications" className="h-full w-full object-cover object-right" data-testid="img-hero-ingredients" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a2a24]/90 via-[#1a2a24]/45 to-transparent" />
            <div className="absolute bottom-8 left-[38%] right-5 z-10 drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)] lg:bottom-10">
              <p className="eyebrow text-[#fff9ee]/85">Applications</p>
              <p className="mt-1 font-display text-2xl leading-tight text-[#e2602c]">Complete flavour systems</p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 z-[1] h-[285px] w-[47%] overflow-hidden rounded-[1.5rem_5.5rem_1.5rem_1.5rem] border-[7px] border-[#f4eadb] shadow-[0_17px_35px_rgba(87,56,25,0.2)]">
            <img src="/generated/food.jpg" alt="Crisp fried food and cooking oil" className="h-full w-full object-cover" data-testid="img-hero-food" />
          </div>
          <div className="absolute bottom-20 right-[9%] flex h-28 w-28 rotate-6 flex-col items-center justify-center rounded-full bg-[#1e3d38] text-center text-[#fff9ee] shadow-lg">
            <span className="font-display text-3xl leading-none">01</span>
            <span className="mt-1 text-[9px] font-bold uppercase tracking-[0.12em]">speciality<br />partner</span>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex h-12 items-center overflow-hidden border-y border-[#dfcdb7] bg-[#e9ddcb]">
        <div className="flex w-max animate-[marquee_28s_linear_infinite] whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.17em] text-[#51645b]">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center gap-8 px-4" aria-hidden={copy === 1 || undefined}>
              {['Citric Acid', 'Maltodextrin', 'Natural Extracts', 'Paneer Coagulants', 'Fruit Preparations', 'Liquid Flavours', 'Maize Starch', 'Natural Antioxidant Blends'].flatMap((item) => [
                <span key={`${copy}-${item}`}>{item}</span>,
                <span key={`${copy}-${item}-dot`} className="text-[#e2602c]">·</span>,
              ])}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Solutions() {
  const [activeId, setActiveId] = useState('food');
  const active = industries.find((industry) => industry.id === activeId) ?? industries[0];
  return (
    <section id="solutions" className="bg-[#1e3d38] py-10 text-[#fff9ee] lg:py-12">
      <div className="mx-auto page-container max-w-none">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div>
            <div className="eyebrow text-[#e4c16e]">What we solve</div>
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
              <div className="absolute bottom-7 left-7">
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
    <section id="catalogue" className="bg-[#f7f0e4] py-10 lg:py-12">
      <div className="mx-auto page-container max-w-none">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="eyebrow text-[#e2602c]">Product catalogue</div>
            <h2 className="mt-4 max-w-[560px] font-display text-5xl leading-[0.95] tracking-[-0.05em] text-[#1e3d38] sm:text-6xl" data-testid="heading-catalogue">The building blocks<br /><span className="text-[#e2602c]">of better.</span></h2>
          </div>
          <p className="max-w-[320px] text-sm leading-6 text-[#66716b]">A considered range for formulations that need to perform consistently at scale.</p>
        </div>

        <div className="grid items-stretch gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-5">
          {ingredientGroups.map((group, groupIndex) => (
            <CategoryCard
              key={group.eyebrow}
              eyebrow={group.eyebrow}
              title={group.title}
              description={group.description}
              slogan={group.slogan}
              image={group.image}
              imageAlt={group.imageAlt}
              offerings={group.items}
              theme={group.theme}
              delayMs={groupIndex * 90}
              onSelectOffering={() => scrollToId('contact')}
              testId={`group-ingredients-${groupIndex}`}
            />
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
              <img src="/generated/pharma.jpg" alt="Pharmaceutical and nutraceutical ingredients" className="h-full w-full object-cover object-right" data-testid="img-catalogue-pharma" />
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
  const benefits = [
    { icon: Droplets, title: 'Extends', label: 'Oil life' },
    { icon: Leaf, title: 'Preserves', label: 'Food quality' },
    { icon: Sparkles, title: 'Reduces', label: 'Frying smoke' },
  ];

  return (
    <section className="relative overflow-hidden bg-[#f8f2e8] py-10 lg:py-12">
      <div
        className="pointer-events-none absolute -left-28 top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full bg-[#e95b28]/10"
        aria-hidden
      />

      <div className="relative mx-auto grid page-container max-w-none gap-10 lg:grid-cols-[0.48fr_0.52fr] lg:items-stretch lg:gap-12 xl:gap-16">
        <div className="order-1">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#e95b28]">
            Featured solution / fried-food producers
          </p>

          <h2
            className="mt-4 max-w-[560px] font-display text-[clamp(2.75rem,5vw,4rem)] leading-[0.92] tracking-[-0.05em] text-[#173f3a]"
            data-testid="heading-xtendra"
          >
            Oil life up.
            <br />
            <span className="text-[#e95b28]">Product quality</span> up.
          </h2>

          <p className="mt-5 max-w-[460px] text-[15px] leading-7 text-[#5f6b62] sm:text-[16px]">
            XTENDRA 06 is an advanced natural anti-oxidant blend for fried-food manufacturers.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <div className="min-w-[150px] rounded-2xl bg-[#173f3a] px-5 py-4 text-[#fff9ee]">
              <div className="font-display text-[1.75rem] leading-none tracking-[-0.03em] sm:text-[2rem]">1 gm</div>
              <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#c4d3c5] sm:text-[11px]">
                Per kg cooking oil
              </div>
            </div>
            <div className="min-w-[150px] rounded-2xl border border-[#e95b28] bg-[#fff9ee]/70 px-5 py-4 text-[#173f3a]">
              <div className="font-display text-[1.75rem] leading-none tracking-[-0.03em] sm:text-[2rem]">75L–100L+</div>
              <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#6f7a72] sm:text-[11px]">
                Producers served
              </div>
            </div>
          </div>

          <div className="mt-8 grid max-w-[480px] grid-cols-3 border-y border-[#e0d2bf] py-5">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.label}
                  className={`pr-3 ${index > 0 ? 'border-l border-[#e0d2bf] pl-3 sm:pl-5' : ''}`}
                >
                  <Icon size={16} className="text-[#e95b28]" strokeWidth={1.75} />
                  <p className="mt-2 text-[12px] font-semibold leading-tight text-[#173f3a] sm:text-[13px]">
                    {benefit.title}
                  </p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#7a6a55]">
                    {benefit.label}
                  </p>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => scrollToId('contact')}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#e95b28] px-5 py-3.5 text-[15px] font-bold text-[#fff9ee] transition-colors hover:bg-[#d14f20]"
            data-testid="button-xtendra-learn-more"
          >
            Learn More <ArrowRight size={15} />
          </button>

          <p className="mt-4 text-[12px] font-semibold text-[#7a6a55]">Available in 1L / 5L / 25L cans</p>
        </div>

        <div className="order-2 relative aspect-[4/5] w-full sm:aspect-[3/4] lg:aspect-auto lg:min-h-0">
          <div className="overflow-hidden rounded-[1.5rem] border border-[#e5d6c2] shadow-[0_20px_50px_rgba(49,62,54,0.12)] lg:absolute lg:inset-0">
            <img
              src="/generated/xtendra-oil.jpg"
              alt="Golden cooking oil and crispy fried snacks for the XTENDRA 06 solution"
              className="h-full w-full object-cover object-center"
              data-testid="img-xtendra-food"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function DairyFeature() {
  const stats = [
    { value: '0.35%', label: 'Dosage required' },
    { value: 'Soft', label: 'Spongy paneer' },
    { value: '18–20%', label: 'Yield improvement' },
  ];

  return (
    <section className="relative overflow-hidden bg-[#f4eadb] py-10 lg:py-12">
      <div className="pointer-events-none absolute -right-24 bottom-[-8rem] h-[22rem] w-[22rem] rounded-full border-[42px] border-[#e4d4bc]/45" aria-hidden />

      <div className="relative mx-auto grid page-container max-w-none gap-10 lg:grid-cols-[0.48fr_0.52fr] lg:items-stretch lg:gap-12 xl:gap-16">
        <div className="order-2 relative aspect-[4/5] w-full sm:aspect-[3/4] lg:order-1 lg:aspect-auto lg:min-h-0">
          <div className="overflow-hidden rounded-[1.75rem] shadow-[0_20px_50px_rgba(49,62,54,0.12)] lg:absolute lg:inset-0">
            <img
              src="/generated/dairy-paneer.jpg"
              alt="Fresh soft paneer cubes with milk for EZENTIAL 4001 COAGULANT"
              className="h-full w-full object-cover object-center"
              data-testid="img-dairy-ingredients"
            />
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#e2602c]">Dairy solution</p>

          <h2
            className="mt-4 max-w-[560px] font-display text-[clamp(2.75rem,5vw,4rem)] leading-[0.92] tracking-[-0.05em] text-[#1e3d38]"
            data-testid="heading-ezential"
          >
            Soft, spongy paneer.
            <br />
            <span className="text-[#e2602c]">More yield.</span>
          </h2>

          <p className="mt-3 text-[12px] font-bold uppercase tracking-[0.14em] text-[#8a7358]">
            EZENTIAL 4001 COAGULANT
          </p>

          <p className="mt-5 max-w-[460px] text-[15px] leading-7 text-[#5f6b62] sm:text-[16px]">
            EZENTIAL 4001 COAGULANT is designed for paneer manufacturers who want consistency and production efficiency.
          </p>

          <div className="mt-9 grid max-w-[520px] grid-cols-3 border-y border-[#d9c8b2] py-6">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`pr-4 ${index > 0 ? 'border-l border-[#d9c8b2] pl-4 sm:pl-6' : ''}`}
              >
                <div className="font-display text-[1.75rem] leading-none tracking-[-0.03em] text-[#1e3d38] sm:text-[2rem]">
                  {stat.value}
                </div>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#6f7a72] sm:text-[11px]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={() => scrollToId('contact')}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#e2602c] px-5 py-3.5 text-[14px] font-bold text-[#fff9ee] transition-colors hover:bg-[#cb4c20]"
            data-testid="button-dairy-enquiry"
          >
            Talk about your dairy line <ArrowUpRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}

function Applications() {
  return (
    <section id="applications" className="bg-[#fff9ee] py-10 lg:py-12">
      <div className="mx-auto page-container max-w-none">
        <div className="grid items-end gap-5 md:grid-cols-[0.8fr_1.2fr] lg:gap-6">
          <div>
            <div className="eyebrow text-[#e2602c]">Built for the application</div>
            <h2 className="mt-4 font-display text-4xl leading-[0.94] tracking-[-0.05em] text-[#1e3d38] sm:text-5xl lg:text-[3.25rem]" data-testid="heading-applications">A flavour for<br /><span className="text-[#e2602c]">every direction.</span></h2>
          </div>
          <p className="max-w-[455px] justify-self-end text-[15px] leading-7 text-[#66716b] lg:text-[16px]">Flavour applications include the products people reach for every day — and the specialised formulations that help them get there.</p>
        </div>
        <div className="mt-10 grid gap-5 lg:mt-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-7">
          <div className="relative min-h-[360px] overflow-hidden rounded-[1.5rem_8rem_1.5rem_1.5rem] bg-[#dbe7df] lg:min-h-[420px]">
            <img src="/generated/flavours.jpg" alt="Fruits, spices, extracts, and flavour ingredients" className="absolute inset-0 h-full w-full object-cover object-center" data-testid="img-flavours-ingredients" />
            <div className="absolute bottom-5 left-5 right-5 rounded-xl bg-[#1e3d38]/95 p-4 text-[#fff9ee] lg:p-5">
              <p className="eyebrow text-[#e4c16e]">Our flavour range</p>
              <p className="mt-2 font-display text-xl leading-none lg:text-2xl">Liquid. Encapsulated. Powder.</p>
            </div>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:gap-2.5">
            {flavourApplications.map((application, index) => (
              <button key={application} onClick={() => scrollToId('contact')} className={`group flex min-h-[64px] items-center justify-between border-b border-[#ded2c1] px-1 text-left transition-colors hover:border-[#e2602c] lg:min-h-[70px] ${index === 0 ? 'sm:border-t sm:pt-2' : ''}`} data-testid={`button-application-${index}`}>
                <span className="flex items-center gap-3.5">
                  <span className="font-display text-xl text-[#d6aa58] lg:text-2xl">{String(index + 1).padStart(2, '0')}</span>
                  <span className="text-sm font-bold text-[#2c4138]">{application}</span>
                </span>
                <ArrowUpRight size={16} className="text-[#a99070] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#e2602c]" />
              </button>
            ))}
            <div className="col-span-full mt-3 rounded-2xl bg-[#f4eadb] p-5 lg:mt-4 lg:p-6">
              <div className="flex items-start gap-4">
                <FlaskConical className="mt-1 shrink-0 text-[#e2602c]" size={20} />
                <div><p className="font-display text-xl leading-none text-[#1e3d38] lg:text-2xl">Natural Extracts</p><p className="mt-2 text-sm leading-6 text-[#68736b]">For pharma & nutraceutical applications.</p></div>
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

  const valueProps = [
    { icon: Leaf, label: 'Real ingredient solutions' },
    { icon: FlaskConical, label: 'Expert technical support' },
    { icon: Users, label: 'A partner in your growth' },
  ];

  const fieldShell =
    'group relative mt-1.5 flex items-center rounded-lg border border-[#ddd0bc] bg-[#fffcf7]/80 transition-colors focus-within:border-[#e2602c] focus-within:bg-white';

  return (
    <section id="contact" className="contact-section relative overflow-hidden bg-[#152d2a] text-[#fff9ee]">
      {/* Full-bleed ingredient photography — pinned flush to the viewport right edge */}
      <div className="contact-photo pointer-events-none absolute inset-y-0 left-[38%] right-0 hidden overflow-hidden lg:block">
        <img
          src="/generated/contact-ingredients.jpg"
          alt="Natural specialty ingredients, powders, grains, and botanical leaves"
          className="h-full w-full object-cover object-[85%_center]"
          data-testid="img-contact-ingredients"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#152d2a] from-0% via-[#152d2a]/50 via-18% to-transparent to-42%" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#152d2a]/45 via-transparent to-[#152d2a]/15" />
      </div>

      {/* Organic decorative arcs */}
      <div className="pointer-events-none absolute -left-32 top-1/4 h-[28rem] w-[28rem] rounded-full border-[48px] border-[#1f3d38]/70" aria-hidden />
      <div className="pointer-events-none absolute bottom-[-10rem] left-[18%] h-[22rem] w-[22rem] rounded-full bg-[#1a3531]" aria-hidden />
      <div className="pointer-events-none absolute -right-20 top-[-8rem] h-[26rem] w-[26rem] rounded-full border-[56px] border-[#e4c16e]/10" aria-hidden />
      <svg className="pointer-events-none absolute bottom-0 left-0 h-full w-[55%] text-[#1a3531]" viewBox="0 0 600 800" fill="none" aria-hidden>
        <path d="M-40 120C80 40 220 80 280 220C360 420 120 480 40 620C-20 720 -80 760 -120 800" stroke="currentColor" strokeWidth="90" opacity="0.55" />
        <path d="M80 700C180 640 260 560 300 460" stroke="#e4c16e" strokeWidth="1.25" opacity="0.35" />
      </svg>

      <div className="relative mx-auto grid page-container max-w-none lg:grid-cols-[0.42fr_0.58fr]">
        {/* LEFT — message & contact */}
        <div className="relative z-10 flex flex-col py-8 lg:px-2 lg:py-10 xl:pr-6">
          <div className="reveal">
            <span className="eyebrow text-[#e8d9b0]">Let’s make better products</span>
          </div>

          <h2
            className="reveal reveal-delay-1 mt-5 max-w-[480px] font-display text-[2.75rem] leading-[0.92] tracking-[-0.05em] sm:text-5xl lg:text-[3.5rem]"
            data-testid="heading-contact"
          >
            Bring us the
            <br />
            <span className="text-[#e2602c]">application.</span>
          </h2>

          <p className="reveal reveal-delay-2 mt-5 max-w-[380px] text-[15px] leading-6 text-[#c5d0c7]">
            Tell us what you are making and we will start with the ingredient that can make it better.
          </p>

          <div className="reveal reveal-delay-3 mt-7 space-y-3">
            <a
              href="tel:+919483389387"
              className="group flex items-center gap-3 text-sm text-[#e8efe6] transition-colors hover:text-[#e4c16e]"
              data-testid="link-contact-phone"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#2f4f48] bg-[#1a3531] text-[#e4c16e] transition-colors group-hover:border-[#e4c16e]/50">
                <Phone size={13} strokeWidth={1.75} />
              </span>
              Ashita · +91 9483389387
            </a>
            <a
              href="tel:+917019477940"
              className="group flex items-center gap-3 text-sm text-[#e8efe6] transition-colors hover:text-[#e4c16e]"
              data-testid="link-contact-phone-secondary"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#2f4f48] bg-[#1a3531] text-[#e4c16e] transition-colors group-hover:border-[#e4c16e]/50">
                <Phone size={13} strokeWidth={1.75} />
              </span>
              +91 70194 77940 / 099169 17517
            </a>
            <p className="flex max-w-[400px] items-start gap-3 text-sm leading-5 text-[#d0dad3]">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#2f4f48] bg-[#1a3531] text-[#e4c16e]">
                <MapPin size={13} strokeWidth={1.75} />
              </span>
              #1963/B, BCCHS Layout, near Vajarahalli Metro station, Kanakapura Road, Bengaluru–560109.
            </p>
          </div>

          <div className="mt-8 grid gap-4 border-t border-[#2a4540] pt-6 sm:grid-cols-3 lg:gap-3">
            {valueProps.map(({ icon: Icon, label }) => (
              <div key={label} className="contact-value-prop flex items-start gap-3 sm:flex-col sm:gap-2">
                <Icon size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[#e4c16e]" />
                <p className="text-[10px] font-bold uppercase leading-4 tracking-[0.14em] text-[#c8d4cb]">{label}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6f847c]">
            From ingredients to a brighter tomorrow
          </p>
        </div>

        {/* RIGHT — form over photography */}
        <div className="relative lg:min-h-full">
          {/* Natural trusted global badge */}
          <div className="absolute right-5 top-4 z-20 hidden items-center gap-2 lg:flex lg:right-8 lg:top-5">
            <Leaf size={14} className="text-[#e4c16e]" strokeWidth={1.5} />
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#e8efe6]/80">Natural · Trusted · Global</span>
          </div>

          {/* Mobile / tablet image strip */}
          <div className="relative mx-5 mb-2 h-40 overflow-hidden rounded-2xl sm:mx-8 sm:h-48 lg:hidden">
            <img
              src="/generated/contact-ingredients.jpg"
              alt="Natural specialty ingredients, powders, grains, and botanical leaves"
              className="h-full w-full object-cover object-right"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#152d2a]/70 to-transparent" />
          </div>

          {/* Form card */}
          <div className="relative z-10 pb-10 pt-3 sm:pb-10 lg:flex lg:h-full lg:items-center lg:justify-start lg:py-10 xl:pl-2 xl:pr-0">
            <div className="contact-form-card w-full rounded-[1.5rem] border border-[#eadfce] bg-[#fff9ee] p-5 shadow-[0_28px_60px_-28px_rgba(10,28,24,0.55)] sm:p-6 lg:max-w-[520px] lg:p-7">
              {sent ? (
                <div className="flex min-h-[340px] flex-col items-center justify-center text-center text-[#1e3d38]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e4c16e]">
                    <Check size={22} />
                  </div>
                  <h3 className="mt-5 font-display text-3xl tracking-[-0.04em]">Message received.</h3>
                  <p className="mt-3 max-w-[300px] text-sm leading-6 text-[#68736b]">
                    Ashita will be in touch to understand your application.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-6 text-xs font-bold uppercase tracking-[0.12em] text-[#e2602c]"
                    data-testid="button-send-another"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    setSent(true);
                  }}
                  className="space-y-3.5 text-[#1e3d38]"
                  data-testid="form-contact"
                >
                  <div>
                    <h3 className="font-display text-[1.55rem] leading-none tracking-[-0.03em] text-[#243832] sm:text-[1.75rem]">
                      Get in touch
                    </h3>
                    <p className="mt-2 text-[13px] leading-5 text-[#68736b]">
                      Share a few details and our team will get back to you.
                    </p>
                  </div>

                  <div>
                    <label htmlFor="name" className="eyebrow text-[#8d6d4b]">
                      Your name
                    </label>
                    <div className={fieldShell}>
                      <input
                        id="name"
                        name="name"
                        required
                        placeholder="Name"
                        className="w-full bg-transparent px-3.5 py-2.5 text-[14px] outline-none placeholder:text-[#ad9d89]"
                        data-testid="input-name"
                      />
                      <User size={15} strokeWidth={1.5} className="mr-3 shrink-0 text-[#b5a48f]" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className="eyebrow text-[#8d6d4b]">
                      Company
                    </label>
                    <div className={fieldShell}>
                      <input
                        id="company"
                        name="company"
                        required
                        placeholder="Company name"
                        className="w-full bg-transparent px-3.5 py-2.5 text-[14px] outline-none placeholder:text-[#ad9d89]"
                        data-testid="input-company"
                      />
                      <Building2 size={15} strokeWidth={1.5} className="mr-3 shrink-0 text-[#b5a48f]" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="eyebrow text-[#8d6d4b]">
                      Work email
                    </label>
                    <div className={fieldShell}>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="you@company.com"
                        className="w-full bg-transparent px-3.5 py-2.5 text-[14px] outline-none placeholder:text-[#ad9d89]"
                        data-testid="input-email"
                      />
                      <Mail size={15} strokeWidth={1.5} className="mr-3 shrink-0 text-[#b5a48f]" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="application" className="eyebrow text-[#8d6d4b]">
                      What are you making?
                    </label>
                    <div className={`${fieldShell} items-start`}>
                      <textarea
                        id="application"
                        name="application"
                        required
                        placeholder="Tell us about your product or application"
                        rows={3}
                        className="w-full resize-none bg-transparent px-3.5 py-2.5 text-[14px] outline-none placeholder:text-[#ad9d89]"
                        data-testid="input-application"
                      />
                      <FileText size={15} strokeWidth={1.5} className="mr-3 mt-2.5 shrink-0 text-[#b5a48f]" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="group mt-0.5 flex h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#e2602c] text-sm font-bold text-[#fff9ee] shadow-[0_12px_28px_-12px_rgba(226,96,44,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d45524] hover:shadow-[0_18px_36px_-14px_rgba(226,96,44,0.85)]"
                    data-testid="button-submit-contact"
                  >
                    Start the conversation
                    <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </button>

                  <div className="flex flex-col gap-2 pt-0.5 text-[11px] text-[#8a7a68] sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <span className="inline-flex items-center gap-1.5">
                      <Lock size={12} strokeWidth={1.75} className="text-[#a89278]" />
                      Your information is safe with us.
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Leaf size={12} strokeWidth={1.75} className="text-[#a89278]" />
                      Building better products together.
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Home() {
  return (
    <main>
      <SiteHeader />
      <Hero />
      <Solutions />
      <Catalogue />
      <XtendraFeature />
      <DairyFeature />
      <Applications />
      <Contact />
      <SiteFooter />
    </main>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/companies/:slug" component={CompanyPage} />
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
