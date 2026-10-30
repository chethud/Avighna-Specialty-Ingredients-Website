import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { Link } from 'wouter';
import { ArrowRight, ChevronLeft, ChevronRight, GlassWater, Pill, UtensilsCrossed, type LucideIcon } from 'lucide-react';

type IndustryCard = {
  id: string;
  title: string;
  description: string;
  items: string[];
  image: string;
  imageAlt: string;
  objectPosition: string;
  wash: string;
  icon: LucideIcon;
  iconClass: string;
  surface: string;
  offset: string;
};

const cards: IndustryCard[] = [
  {
    id: 'food',
    title: 'Food Processing',
    description: 'Ingredients for everyday food products.',
    items: [
      'Ice creams & milkshakes',
      'Fried foods',
      'Industrial bakery',
      'Cookies & biscuits',
      'Breads & pizzas',
      'Nutritional powders',
    ],
    image: '/generated/hero-food-processing.jpg',
    imageAlt: 'Ice cream, cookies, and bakery products',
    objectPosition: '68% 72%',
    wash: '247, 241, 230',
    icon: UtensilsCrossed,
    iconClass: 'bg-[#FDE8DC] text-[#F4511E]',
    surface: 'bg-[#F7F1E6]',
    offset: 'lg:translate-y-2 lg:-rotate-[0.8deg]',
  },
  {
    id: 'beverages',
    title: 'Beverages',
    description: 'Flavour solutions for every sip.',
    items: ['Alcoholic beverages', 'Non-alcoholic beverages', 'Liquid flavours', 'Flavour blends'],
    image: '/generated/hero-beverages.jpg',
    imageAlt: 'Citrus juice with lemon, orange, and mint',
    objectPosition: '62% 48%',
    wash: '243, 246, 239',
    icon: GlassWater,
    iconClass: 'bg-[#E5F0E4] text-[#073D36]',
    surface: 'bg-[#F3F6EF]',
    offset: '',
  },
  {
    id: 'pharma',
    title: 'Pharmaceutical',
    description: 'Pharma-grade ingredients for better health.',
    items: ['Ointments', 'Syrups', 'Capsules', 'Tablets'],
    image: '/generated/hero-pharmaceutical.jpg',
    imageAlt: 'Capsules, tablets, and a pharmaceutical bottle',
    objectPosition: '78% 58%',
    wash: '244, 247, 248',
    icon: Pill,
    iconClass: 'bg-[#E6EEF4] text-[#3E5964]',
    surface: 'bg-[#F4F7F8]',
    offset: 'lg:translate-y-1 lg:rotate-[0.6deg]',
  },
];

function IndustryCardView({
  card,
  active,
  width,
  layered,
  edge,
}: {
  card: IndustryCard;
  active: boolean;
  width: number;
  layered: boolean;
  edge: boolean;
}) {
  const Icon = card.icon;
  return (
    <article
      className={`relative shrink-0 overflow-hidden rounded-[24px] shadow-[0_18px_40px_rgba(7,61,54,0.14)] sm:rounded-[28px] ${card.surface} ${card.offset} ${layered ? 'h-[548px]' : 'h-[440px] sm:h-[480px]'}`}
      style={{ width }}
    >
      <img
        src={card.image}
        alt={card.imageAlt}
        width={900}
        height={1100}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: card.objectPosition }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `linear-gradient(108deg, rgb(${card.wash}) 0%, rgb(${card.wash}) 34%, rgba(${card.wash}, 0.9) 50%, rgba(${card.wash}, 0) 76%)`,
        }}
      />
      <div className={`relative z-10 flex h-full min-w-0 flex-col pb-5 pt-5 ${layered ? `w-[62%] ${edge ? 'pl-11 pr-2' : 'pl-5 pr-2'}` : 'w-[70%] px-4 sm:w-[64%] sm:px-5'}`}>
        <span className={`flex h-11 w-11 items-center justify-center rounded-full ${card.iconClass}`}>
          <Icon size={18} strokeWidth={1.6} />
        </span>
        <h2 className="mt-4 max-w-full font-display text-[1.15rem] uppercase leading-[1.05] text-[#073D36] lg:text-[1.22rem]">
          {card.title}
        </h2>
        <p className="mt-2 text-[13px] leading-5 text-[#263B38]/85">{card.description}</p>
        <span className="mt-3 block h-px w-8 bg-[#F4511E]" />
        <ul className="mt-2.5 space-y-0.5">
          {card.items.map((item) => (
            <li key={item} className="text-[12.5px] leading-[1.35] text-[#263B38]">
              {item}
            </li>
          ))}
        </ul>
        <Link
          href="/solutions"
          tabIndex={active ? 0 : -1}
          className="group/btn mt-auto inline-flex w-fit items-center gap-2 rounded-full border border-[#073D36]/25 bg-white px-4 py-2 text-[13px] font-semibold text-[#073D36] shadow-sm transition-colors hover:border-[#F4511E] hover:text-[#F4511E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4511E]"
        >
          Know More
          <ArrowRight size={14} className="transition-transform duration-300 group-hover/btn:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}

const controlButton =
  'flex h-11 w-11 items-center justify-center rounded-full border border-[#073D36]/10 bg-white text-[#073D36] shadow-[0_8px_20px_rgba(7,61,54,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4511E]';

export function IndustryCarousel() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(360);
  const [overlap, setOverlap] = useState(72);
  const [layered, setLayered] = useState(true);
  const [gap, setGap] = useState(14);
  const startX = useRef(0);
  const dragging = useRef(false);
  const indexRef = useRef(0);
  const count = cards.length;

  function settle(next: number) {
    const wrapped = (next + count) % count;
    indexRef.current = wrapped;
    setIndex(wrapped);
  }

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const measure = () => {
      const width = viewport.clientWidth;
      const stack = width >= 900;
      if (!stack) {
        setLayered(false);
        setGap(10);
        setOverlap(0);
        setCardWidth(Math.max(260, width - (width < 640 ? 28 : Math.round(width * 0.16))));
        return;
      }
      const preferredOverlap = 104;
      let nextCard = Math.round((width + preferredOverlap * 2) / 3);
      nextCard = Math.min(380, Math.max(340, nextCard));
      let nextOverlap = Math.round((nextCard * 3 - width) / 2);
      if (nextOverlap < 48) {
        nextCard = Math.min(380, Math.floor((width + 48 * 2) / 3));
        nextOverlap = Math.round((nextCard * 3 - width) / 2);
      }
      if (nextOverlap > 120) nextOverlap = 120;
      if (nextCard * 3 - nextOverlap * 2 > width) {
        nextOverlap = Math.ceil((nextCard * 3 - width) / 2);
      }
      setLayered(true);
      setCardWidth(nextCard);
      setOverlap(Math.max(48, nextOverlap));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  function go(direction: number) {
    settle(indexRef.current + direction);
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if ((event.target as HTMLElement).closest('a, button')) return;
    dragging.current = true;
    startX.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onPointerUp(event: PointerEvent<HTMLDivElement>) {
    if (!dragging.current) return;
    dragging.current = false;
    const delta = event.clientX - startX.current;
    if (delta > 48) go(-1);
    else if (delta < -48) go(1);
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      go(1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      go(-1);
    }
  }

  const step = cardWidth + gap;
  const offset = layered ? 0 : index * step;
  const groupRight = layered ? cardWidth * 3 - overlap * 2 : cardWidth;

  return (
    <div
      className="relative min-w-0 outline-none focus-visible:ring-2 focus-visible:ring-[#F4511E] focus-visible:ring-offset-4"
      role="region"
      aria-roledescription="carousel"
      aria-label="Industries we serve"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <p className="sr-only" aria-live="polite">
        Showing {cards[index].title}
      </p>

      <div
        ref={viewportRef}
        className="overflow-hidden"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          dragging.current = false;
        }}
      >
        <div
          className="flex items-start motion-safe:transition-transform motion-safe:duration-500"
          style={{ transform: `translateX(-${offset}px)` }}
        >
          {cards.map((card, cardIndex) => (
            <div
              key={card.id}
              className="shrink-0"
              style={{
                zIndex: cardIndex + 1,
                marginRight: layered && cardIndex < count - 1 ? -overlap : layered ? 0 : gap,
              }}
            >
              <IndustryCardView card={card} width={cardWidth} layered={layered} edge={cardIndex === 0} active={cardIndex === index} />
            </div>
          ))}
        </div>
      </div>

      {layered && (
        <>
          <button type="button" onClick={() => go(-1)} aria-label="Previous industry" className={`${controlButton} absolute left-0 top-[46%] z-20 -translate-y-1/2`}>
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next industry"
            className={`${controlButton} absolute top-[46%] z-20 -translate-x-full -translate-y-1/2`}
            style={{ left: groupRight }}
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}

      <div className="mt-3 flex flex-col items-center gap-2 sm:grid sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-3">
        <div className="flex items-center justify-center gap-2 sm:justify-start">
          {!layered && (
            <>
              <button type="button" onClick={() => go(-1)} aria-label="Previous industry" className={controlButton}>
                <ChevronLeft size={18} />
              </button>
              <button type="button" onClick={() => go(1)} aria-label="Next industry" className={controlButton}>
                <ChevronRight size={18} />
              </button>
            </>
          )}
        </div>
        <div className="flex items-center gap-2" role="tablist" aria-label="Industry slides">
          {cards.map((card, cardIndex) => (
            <button
              key={card.id}
              type="button"
              role="tab"
              aria-selected={cardIndex === index}
              aria-label={`Show ${card.title}`}
              onClick={() => settle(cardIndex)}
              className={`h-1.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4511E] ${
                cardIndex === index ? 'w-8 bg-[#F4511E]' : 'w-5 bg-[#C5D0C4]'
              }`}
            />
          ))}
        </div>
        <p className="max-w-full text-center text-[12px] font-medium leading-4 text-[#5d6e69] sm:justify-self-end sm:text-right">
          Swipe to explore our industries <span aria-hidden>→</span>
        </p>
      </div>
    </div>
  );
}
