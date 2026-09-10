type CategoryBadgeProps = {
  count: number;
  className?: string;
};

export function CategoryBadge({ count, className = '' }: CategoryBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] ${className}`}
    >
      {String(count).padStart(2, '0')} offerings
    </span>
  );
}
