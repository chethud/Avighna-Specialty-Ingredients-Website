import { useEffect, useRef, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { CategoryBadge } from './CategoryBadge';
import { OfferingItem } from './OfferingItem';

export type CategoryTheme = {
  cardBg: string;
  cardBorder: string;
  label: string;
  badge: string;
  row: string;
  icon: string;
  blob: string;
  slogan: string;
  blend: string;
};

export type CategoryOffering = {
  label: string;
  icon: LucideIcon;
};

type CategoryCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  slogan: string;
  image: string;
  imageAlt: string;
  offerings: CategoryOffering[];
  theme: CategoryTheme;
  delayMs?: number;
  onSelectOffering: () => void;
  testId?: string;
};

export function CategoryCard({
  eyebrow,
  title,
  description,
  slogan,
  image,
  imageAlt,
  offerings,
  theme,
  delayMs = 0,
  onSelectOffering,
  testId,
}: CategoryCardProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const visualScale =
    offerings.length <= 3 ? 'prominent' : offerings.length <= 5 ? 'balanced' : 'compact';

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.14 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const visualMinClass =
    visualScale === 'prominent'
      ? 'min-h-[168px] lg:min-h-0'
      : visualScale === 'balanced'
        ? 'min-h-[132px] lg:min-h-0'
        : 'min-h-[92px] lg:min-h-0';

  const imageSizeClass =
    visualScale === 'prominent'
      ? 'bottom-[-6%] right-[-4%] h-[120%] w-[82%]'
      : visualScale === 'balanced'
        ? 'bottom-[-8%] right-[-6%] h-[124%] w-[74%]'
        : 'bottom-[-10%] right-[-2%] h-[128%] w-[62%]';

  return (
    <article
      ref={ref}
      className={`catalogue-card group/card relative flex h-auto flex-col overflow-hidden rounded-[1.75rem] border p-6 shadow-[0_14px_34px_rgba(78,54,28,0.055)] transition-[opacity,transform,box-shadow] duration-700 ease-out hover:shadow-[0_20px_42px_rgba(78,54,28,0.1)] lg:h-full lg:min-h-[700px] ${theme.cardBg} ${theme.cardBorder} ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-7 opacity-0'
      }`}
      style={{ transitionDelay: `${delayMs}ms` }}
      data-testid={testId}
    >
      <div className={`pointer-events-none absolute -right-14 top-10 h-40 w-40 rounded-full opacity-40 ${theme.blob}`} />

      <header className="relative z-10 shrink-0">
        <p className={`text-[10px] font-bold uppercase tracking-[0.16em] sm:text-[11px] ${theme.label}`}>
          {eyebrow}
        </p>
        <h3 className="mt-2 max-w-[13ch] font-display text-[1.7rem] leading-[1.05] tracking-[-0.04em] text-[#1d2f29] sm:text-[1.9rem]">
          {title}
        </h3>
        <p className="mt-2 max-w-[36ch] text-[13px] leading-5 text-[#5f6b64] sm:text-[14px] sm:leading-[1.5]">
          {description}
        </p>
        <div className="mt-3">
          <CategoryBadge count={offerings.length} className={theme.badge} />
        </div>
      </header>

      <div className="relative z-10 mt-3.5 flex shrink-0 flex-col gap-1.5">
        {offerings.map((item, index) => (
          <OfferingItem
            key={item.label}
            label={item.label}
            icon={item.icon}
            iconAccentClassName={theme.icon}
            rowClassName={theme.row}
            onSelect={onSelectOffering}
            testId={testId ? `button-product-${testId.replace('group-ingredients-', '')}-${index}` : undefined}
          />
        ))}
      </div>

      <div className={`catalogue-visual-zone relative z-10 mt-4 flex flex-1 flex-col justify-end ${visualMinClass}`}>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 top-2 overflow-hidden" aria-hidden="true">
          <div className={`absolute inset-0 opacity-50 ${theme.blob}`} />
          <div className={`catalogue-soft-image absolute ${imageSizeClass}`}>
            <img
              src={image}
              alt=""
              className="catalogue-parallax-img h-full w-full object-cover"
              loading="lazy"
            />
            <div
              className="catalogue-image-blend absolute inset-0"
              style={{ ['--blend' as string]: theme.blend }}
            />
          </div>
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, ${theme.blend} 0%, ${theme.blend}cc 18%, transparent 48%), linear-gradient(90deg, ${theme.blend} 0%, ${theme.blend}b3 16%, transparent 42%), linear-gradient(225deg, ${theme.blend}e6 0%, transparent 38%), linear-gradient(0deg, ${theme.blend}f2 0%, transparent 28%)`,
            }}
          />
        </div>

        <div className="relative z-10 inline-flex max-w-[82%] rounded-2xl px-3 py-2 backdrop-blur-[1.5px]" style={{ backgroundColor: `${theme.blend}b8` }}>
          <p className={`font-script text-[1.18rem] leading-none sm:text-[1.28rem] ${theme.slogan}`}>
            {slogan}
          </p>
        </div>
        <span className="sr-only">{imageAlt}</span>
      </div>
    </article>
  );
}
