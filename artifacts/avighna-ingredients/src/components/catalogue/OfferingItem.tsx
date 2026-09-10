import { ChevronRight, type LucideIcon } from 'lucide-react';
import { OfferingIcon } from './OfferingIcon';

type OfferingItemProps = {
  label: string;
  icon: LucideIcon;
  iconAccentClassName: string;
  rowClassName: string;
  onSelect: () => void;
  testId?: string;
};

export function OfferingItem({
  label,
  icon,
  iconAccentClassName,
  rowClassName,
  onSelect,
  testId,
}: OfferingItemProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group/item flex h-12 w-full items-center justify-between rounded-[15px] border px-3 text-left transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(62,48,28,0.07)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e2602c]/45 focus-visible:ring-offset-2 ${rowClassName}`}
      data-testid={testId}
    >
      <span className="flex min-w-0 items-center gap-2.5 pr-2">
        <OfferingIcon icon={icon} accentClassName={iconAccentClassName} />
        <span className="truncate text-[14px] font-medium tracking-[-0.01em] text-[#24332d] transition-colors duration-300 group-hover/item:text-inherit sm:text-[15px]">
          {label}
        </span>
      </span>
      <ChevronRight
        size={15}
        className="shrink-0 text-[#b7a48c] transition-transform duration-300 group-hover/item:translate-x-0.5 group-hover/item:text-current"
        aria-hidden="true"
      />
    </button>
  );
}
