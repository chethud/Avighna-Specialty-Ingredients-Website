import {
  ArrowRight,
  Box,
  Droplets,
  FlaskConical,
  GlassWater,
  Handshake,
  Leaf,
  Milk,
  Pill,
  Settings2,
  ShieldCheck,
  Sparkles,
  Wheat,
  type LucideIcon,
} from 'lucide-react';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

type SolutionCard = {
  title: string;
  description: string;
  items: string[];
  image: string;
  imageAlt: string;
  icon: LucideIcon;
  tint: string;
  iconBg: string;
};

const solutions: SolutionCard[] = [
  {
    title: 'Food Processing',
    description: 'Support for everyday food products and processing applications.',
    items: [
      'Ice creams & milkshakes',
      'Fried foods',
      'Industrial bakery',
      'Cookies & biscuits',
      'Breads & pizzas',
      'Nutritional powders',
      'Mixes / premixes / blends',
    ],
    image: '/generated/food.jpg',
    imageAlt: 'Baked and fried food applications',
    icon: Wheat,
    tint: '#F6E4D0',
    iconBg: '#F8E7D6',
  },
  {
    title: 'Dairy Products',
    description: 'Ingredient solutions for dairy product manufacturers.',
    items: ['Paneer', 'Curd', 'Yoghurt', 'Cheese'],
    image: '/generated/dairy.jpg',
    imageAlt: 'Milk, paneer, and dairy ingredients',
    icon: Milk,
    tint: '#E4EEE6',
    iconBg: '#E7F0E8',
  },
  {
    title: 'Beverages',
    description: 'Ingredient and flavour solutions for beverage applications.',
    items: [
      'Alcoholic beverages',
      'Non-alcoholic beverages',
      'Liquid flavours',
      'Flavour blends',
    ],
    image: '/generated/catalogue-fruit.jpg',
    imageAlt: 'Fruit and beverage ingredient applications',
    icon: GlassWater,
    tint: '#F7E3CF',
    iconBg: '#F8E7D6',
  },
  {
    title: 'Pharmaceutical',
    description: 'Pharma-grade ingredients for pharmaceutical formulations.',
    items: ['Ointments', 'Syrups', 'Capsules', 'Tablets'],
    image: '/generated/pharma.jpg',
    imageAlt: 'Pharmaceutical formulation ingredients',
    icon: Pill,
    tint: '#E3EEE7',
    iconBg: '#E7F0E8',
  },
  {
    title: 'Flavours & Functional Ingredients',
    description: 'Solutions designed to improve taste, product quality, shelf life and consistency.',
    items: [
      'Liquid flavours',
      'Encapsulated flavours',
      'Powder flavours',
      'Natural extracts',
      'Natural antioxidants',
      'Functional ingredients',
    ],
    image: '/generated/catalogue-flavour.jpg',
    imageAlt: 'Vanilla, botanicals, and natural flavour extracts',
    icon: Leaf,
    tint: '#F6E6D4',
    iconBg: '#F8E7D6',
  },
  {
    title: 'Key Ingredients',
    description: 'High-quality ingredients for diverse applications.',
    items: [
      'Maltodextrin',
      'Dextrose monohydrate',
      'Dextrose anhydrous',
      'Maize starch',
      'Liquid glucose',
      'Sorbitol',
      'Citric acid',
    ],
    image: '/generated/catalogue-core.jpg',
    imageAlt: 'Core specialty ingredient powders',
    icon: FlaskConical,
    tint: '#E5EFE7',
    iconBg: '#E7F0E8',
  },
];

const benefits: { label: string; icon: LucideIcon }[] = [
  { label: 'Quality', icon: ShieldCheck },
  { label: 'Consistency', icon: Settings2 },
  { label: 'Shelf Life', icon: Box },
  { label: 'Flavour', icon: Droplets },
  { label: 'Functionality', icon: Sparkles },
  { label: 'Reliable Supply', icon: Handshake },
];

function goCatalogue() {
  window.location.assign(`${import.meta.env.BASE_URL.replace(/\/$/, '')}/#catalogue`);
}

const shell = 'mx-auto w-[min(1440px,calc(100%-6vw))] max-w-none';

export default function SolutionsPage() {
  return (
    <main className="bg-[#F6F0E4] font-[Manrope,ui-sans-serif,system-ui,sans-serif] text-[#17201D]">
      <SiteHeader />

      <section className="relative overflow-hidden pb-6 pt-8 lg:pb-2 lg:pt-12">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 92% 12%, rgba(246,228,208,0.95), transparent 42%), radial-gradient(ellipse at 8% 90%, rgba(227,238,231,0.7), transparent 34%), #F6F0E4',
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-16 top-0 hidden h-[280px] w-[420px] rounded-[50%] bg-[#F3E6D4]/80 lg:block"
          aria-hidden
        />
        <svg
          className="pointer-events-none absolute right-[6%] top-8 hidden h-44 w-44 text-[#7d9a78]/25 lg:block"
          viewBox="0 0 160 160"
          fill="currentColor"
          aria-hidden
        >
          <path d="M118 22c-30 10-54 38-62 72-4 16 2 32 14 42 14 12 34 8 48-8 16-20 20-52 12-80-2-8-6-16-12-26z" />
          <path d="M46 118c18-8 28-22 30-38" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>

        <div className={`relative grid items-end gap-10 ${shell} lg:grid-cols-[1.2fr_0.55fr]`}>
          <div className="pb-2">
            <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#F26522]">What we do</p>
            <h1
              className="mt-5 max-w-[820px] font-display text-[clamp(2.35rem,4.6vw,3.45rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-[#063F38]"
              data-testid="heading-solutions-page"
            >
              Ingredient solutions
              <br />
              for products people use every day.
            </h1>
            <p className="mt-6 max-w-[820px] text-[16.5px] leading-[1.55] text-[#5c6862]">
              Avighna provides ingredient and formulation solutions for food, dairy, beverage and pharmaceutical
              applications, helping manufacturers improve product quality, consistency and performance.
            </p>
          </div>

          <div className="relative hidden items-end justify-end gap-5 pb-4 lg:flex">
            <div className="text-right">
              <p className="text-[13px] font-semibold uppercase leading-[1.45] tracking-[0.16em] text-[#063F38]">
                Natural
                <br />
                Ingredients
                <br />
                Brighter
                <br />
                Tomorrows
              </p>
              <span className="ml-auto mt-3 block h-[2px] w-12 bg-[#F26522]" />
            </div>
            <p className="font-script max-w-[9.5rem] text-[2.35rem] leading-[1.05] text-[#8d7352]">
              From Nature to a Better Tomorrow
            </p>
          </div>
        </div>
      </section>

      <section className="relative pb-8 pt-8 lg:pb-10 lg:pt-10">
        <div className={`grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6 ${shell}`}>
          {solutions.map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.title}
                className="group relative flex min-h-[340px] flex-col overflow-hidden rounded-[22px] border border-[#e4d8c6] bg-[#FFFDF9] p-6 shadow-[0_16px_40px_rgba(23,32,29,0.05)] transition-transform duration-300 hover:-translate-y-1 lg:min-h-[380px] lg:p-7"
              >
                <div className="relative z-10 flex items-start gap-4">
                  <span
                    className="flex h-[84px] w-[84px] shrink-0 items-center justify-center rounded-full text-[#063F38]"
                    style={{ backgroundColor: card.iconBg }}
                  >
                    <Icon size={34} strokeWidth={1.5} />
                  </span>
                  <div className="min-w-0 pt-1">
                    <h2 className="font-display text-[1.45rem] font-semibold leading-[1.15] tracking-[-0.03em] text-[#063F38]">
                      {card.title}
                    </h2>
                    <p className="mt-2 max-w-[24ch] text-[14.5px] leading-6 text-[#66716b]">{card.description}</p>
                  </div>
                </div>

                <ul className="relative z-10 mt-6 max-w-[54%] flex-1 space-y-2 pb-2">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[14.5px] leading-[1.6] text-[#3d4a46]">
                      <span className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#F26522]" />
                      {item}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={goCatalogue}
                  className="relative z-10 mt-6 inline-flex w-fit items-center gap-2 text-[15px] font-semibold text-[#063F38] transition-colors hover:text-[#F26522]"
                >
                  Learn More
                  <ArrowRight size={16} className="text-[#F26522] transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                <div
                  className="pointer-events-none absolute -bottom-8 -right-6 h-[62%] w-[58%] rounded-full"
                  style={{ background: `radial-gradient(circle at 60% 60%, ${card.tint}, transparent 70%)` }}
                  aria-hidden
                />
                <img
                  src={card.image}
                  alt={card.imageAlt}
                  className="pointer-events-none absolute bottom-4 right-3 h-[40%] w-[40%] max-h-[180px] rounded-[26px] object-cover shadow-[0_12px_28px_rgba(23,32,29,0.14)] transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </article>
            );
          })}
        </div>
      </section>

      <section className="pb-16 lg:pb-20">
        <div className={shell}>
          <div className="flex min-h-[92px] flex-col justify-center gap-4 rounded-[18px] border border-[#e2d8c8] bg-[#F8F4EC] px-5 py-5 sm:px-7 lg:flex-row lg:items-center lg:gap-6 lg:py-0">
            <div className="flex shrink-0 items-center gap-3 lg:w-[190px]">
              <Leaf size={26} className="shrink-0 text-[#063F38]" strokeWidth={1.5} />
              <p className="text-[12px] font-bold uppercase leading-[1.35] tracking-[0.12em] text-[#063F38]">
                How we help
                <br />
                your products be better
              </p>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3 lg:flex lg:flex-1 lg:items-center lg:justify-between">
              {benefits.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center gap-2.5 lg:border-l lg:border-[#ddd2c2] lg:pl-4">
                    <Icon size={24} className="shrink-0 text-[#063F38]" strokeWidth={1.5} />
                    <span className="text-[14px] font-semibold text-[#063F38]">{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
