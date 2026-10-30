export function BrandWordmark({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  return (
    <div className={`flex items-center ${compact ? 'gap-2.5' : 'gap-3.5'}`} data-testid="brand-wordmark">
      <img
        src="/brand-logo.png"
        alt="Avighna logo"
        className={compact ? 'h-11 w-11 shrink-0 object-contain' : 'h-14 w-14 shrink-0 object-contain sm:h-16 sm:w-16'}
      />
      <div className="leading-none">
        <div
          className={`font-display tracking-[-0.03em] ${
            compact ? 'text-[1.35rem]' : 'text-[1.55rem] sm:text-[1.7rem]'
          } ${light ? 'text-[#faf8f2]' : 'text-[#073D36]'}`}
        >
          Avighna
        </div>
        <div
          className={`font-semibold uppercase ${
            compact ? 'mt-1 text-[8px] tracking-[0.14em]' : 'mt-1.5 text-[9px] tracking-[0.13em] sm:text-[10px]'
          } ${light ? 'text-[#d7ddd2]' : 'text-[#5d6e69]'}`}
        >
          Speciality Ingredients Pvt Ltd
        </div>
      </div>
    </div>
  );
}
