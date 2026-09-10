export function BrandWordmark({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-3.5" data-testid="brand-wordmark">
      <img
        src="/brand-logo.png"
        alt="Avighna logo"
        className="h-14 w-14 shrink-0 object-contain sm:h-16 sm:w-16"
      />
      <div className="leading-none">
        <div
          className={`font-display text-[1.55rem] tracking-[-0.04em] sm:text-[1.7rem] ${
            light ? 'text-[#fff9ee]' : 'text-[#1d2522]'
          }`}
        >
          Avighna
        </div>
        <div
          className={`mt-1.5 text-[9px] font-semibold uppercase tracking-[0.13em] sm:text-[10px] ${
            light ? 'text-[#d7ddd2]' : 'text-[#68706a]'
          }`}
        >
          Speciality Ingredients Pvt Ltd
        </div>
      </div>
    </div>
  );
}
