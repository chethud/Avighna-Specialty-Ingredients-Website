import type { LucideIcon } from 'lucide-react';

type OfferingIconProps = {
  icon: LucideIcon;
  accentClassName: string;
};

export function OfferingIcon({ icon: Icon, accentClassName }: OfferingIconProps) {
  return (
    <span
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-transparent transition-transform duration-300 group-hover/item:scale-105 ${accentClassName}`}
      aria-hidden="true"
    >
      <Icon size={15} strokeWidth={1.75} />
    </span>
  );
}
