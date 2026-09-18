/**
 * Realistic phone frame showing a simplified iAffirm app screen.
 * Used on the landing page to make the product feel tangible.
 */
export function PhoneMockup({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative mx-auto w-[240px] sm:w-[260px] select-none ${className}`}
      aria-hidden="true"
    >
      {/* Outer bezel */}
      <div className="relative rounded-[2.4rem] bg-[#1c1c1e] p-[10px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35),0_0_0_1px_rgba(0,0,0,0.08)]">
        {/* Side buttons (volume / power) */}
        <div className="absolute -left-[2px] top-[100px] h-8 w-[3px] rounded-l-sm bg-[#2c2c2e]" />
        <div className="absolute -left-[2px] top-[140px] h-12 w-[3px] rounded-l-sm bg-[#2c2c2e]" />
        <div className="absolute -right-[2px] top-[120px] h-16 w-[3px] rounded-r-sm bg-[#2c2c2e]" />

        {/* Screen */}
        <div className="relative overflow-hidden rounded-[1.9rem] bg-[#f4f0ea] aspect-[9/19.5]">
          {/* Status bar */}
          <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-5 pt-2.5 text-[10px] font-medium text-[#2c2a26]/80">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor" className="opacity-80">
                <rect x="0" y="3" width="3" height="7" rx="0.5" />
                <rect x="4" y="2" width="3" height="8" rx="0.5" />
                <rect x="8" y="0.5" width="3" height="9.5" rx="0.5" />
                <rect x="12" y="0" width="2" height="10" rx="0.5" opacity="0.35" />
              </svg>
              <svg width="14" height="10" viewBox="0 0 24 12" fill="currentColor" className="opacity-80">
                <rect x="0" y="1" width="20" height="10" rx="2" stroke="currentColor" strokeWidth="1.2" fill="none" />
                <rect x="1.5" y="2.5" width="14" height="7" rx="1" />
                <rect x="21" y="3.5" width="2" height="5" rx="0.5" opacity="0.5" />
              </svg>
            </div>
          </div>

          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 h-[22px] w-[90px] rounded-full bg-[#1c1c1e]" />

          {/* App content */}
          <div className="absolute inset-0 pt-11 pb-6 px-3.5 flex flex-col">
            {/* Mini header */}
            <div className="flex items-center justify-between mb-3 px-0.5">
              <span className="text-[11px] font-semibold tracking-tight text-[#2c2a26]">
                i<span className="text-[#5b8a72]">A</span>ffirm
              </span>
              <span className="text-[9px] text-[#6b6560] bg-[#e8f0eb] px-1.5 py-0.5 rounded-full">
                Today
              </span>
            </div>

            {/* Affirmation card */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="rounded-2xl bg-white/90 border border-[#e5dfd5]/80 shadow-sm px-4 py-5 text-center">
                <p className="text-[9px] uppercase tracking-[0.14em] text-[#5b8a72] mb-2.5 font-medium">
                  Confidence
                </p>
                <p className="text-[13px] sm:text-[14px] leading-snug font-medium text-[#2c2a26]">
                  I am allowed to take up space.
                </p>
              </div>
            </div>

            {/* Record control */}
            <div className="mt-3 flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-full bg-[#5b8a72] flex items-center justify-center shadow-md shadow-[#5b8a72]/25">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" x2="12" y1="19" y2="22" />
                </svg>
              </div>
              <p className="text-[9px] text-[#6b6560]">Tap to record in your voice</p>
            </div>

            {/* Bottom nav hint */}
            <div className="mt-4 flex justify-center gap-6 text-[8px] text-[#9a958e]">
              <span className="text-[#5b8a72] font-medium">Practice</span>
              <span>Library</span>
              <span>You</span>
            </div>
          </div>

          {/* Home indicator */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full bg-[#2c2a26]/25" />
        </div>
      </div>
    </div>
  );
}
