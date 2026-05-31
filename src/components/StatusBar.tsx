export default function StatusBar() {
  return (
    <div className="relative z-30 flex h-[44px] w-full select-none items-center justify-between px-6 pt-1 text-white">
      <span className="text-[15px] font-semibold tracking-tight">8:33</span>

      {/* Dynamic Island */}
      <div className="absolute left-1/2 top-[8px] h-[26px] w-[88px] -translate-x-1/2 rounded-full bg-black" />

      <div className="flex items-center gap-[5px]">
        {/* signal bars */}
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden>
          <rect x="0" y="8" width="3" height="4" rx="1" fill="white" />
          <rect x="5" y="5.5" width="3" height="6.5" rx="1" fill="white" />
          <rect x="10" y="3" width="3" height="9" rx="1" fill="white" />
          <rect x="15" y="0.5" width="3" height="11.5" rx="1" fill="white" fillOpacity="0.4" />
        </svg>
        <span className="text-[13px] font-semibold">5G</span>
        {/* battery ~33% */}
        <svg width="27" height="13" viewBox="0 0 27 13" fill="none" aria-hidden>
          <rect
            x="0.5"
            y="0.5"
            width="22"
            height="12"
            rx="3.5"
            stroke="white"
            strokeOpacity="0.5"
          />
          <rect x="2" y="2" width="6.6" height="9" rx="2" fill="white" />
          <rect x="24" y="4" width="2" height="5" rx="1" fill="white" fillOpacity="0.5" />
        </svg>
      </div>
    </div>
  );
}
