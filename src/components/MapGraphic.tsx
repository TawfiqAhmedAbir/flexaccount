// Static dark "map" graphic with a centred red pin.
// This is a self-contained inline SVG so no API key is needed for the mock.
// To use real maps later, swap this component for a Google Static Maps image, e.g.:
//   <img src={`https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}
//        &zoom=15&size=640x300&maptype=roadmap&style=...&markers=color:red|${lat},${lng}
//        &key=${API_KEY}`} />
export default function MapGraphic({ className }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className ?? ""}`}>
      <svg
        viewBox="0 0 400 200"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        aria-hidden
      >
        <rect width="400" height="200" fill="#1B2436" />
        {/* park / green areas */}
        <path d="M0 0H120V70Q70 90 0 80Z" fill="#22402F" />
        <rect x="300" y="120" width="120" height="90" fill="#22402F" opacity="0.9" />
        {/* water */}
        <path d="M250 0L320 0L300 60L240 80Z" fill="#1E3A52" />
        {/* roads */}
        <g stroke="#2E3950" strokeWidth="10" fill="none" strokeLinecap="round">
          <path d="M-10 60H410" />
          <path d="M-10 150H410" />
          <path d="M80 -10V210" />
          <path d="M230 -10V210" />
          <path d="M-10 -10L230 150" />
        </g>
        <g stroke="#3A465F" strokeWidth="3" fill="none" strokeLinecap="round">
          <path d="M-10 100H410" />
          <path d="M150 -10V210" />
          <path d="M330 -10V210" />
          <path d="M0 30H410" />
        </g>
        {/* blocks */}
        <g fill="#222C40">
          <rect x="95" y="70" width="45" height="25" rx="2" />
          <rect x="160" y="70" width="55" height="25" rx="2" />
          <rect x="95" y="110" width="45" height="30" rx="2" />
          <rect x="160" y="110" width="55" height="30" rx="2" />
          <rect x="245" y="70" width="70" height="25" rx="2" />
        </g>
      </svg>

      {/* red location pin */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[90%]">
        <svg width="34" height="44" viewBox="0 0 34 44" aria-hidden>
          <path
            d="M17 2C9.3 2 3 8.1 3 15.6 3 26 17 42 17 42S31 26 31 15.6C31 8.1 24.7 2 17 2Z"
            fill="#E23744"
            stroke="#B71C2B"
            strokeWidth="1"
          />
          <circle cx="17" cy="15.5" r="5" fill="#fff" />
        </svg>
      </div>

      {/* faux google attribution */}
      <span className="absolute bottom-1 left-2 text-[10px] font-semibold text-white/60">
        Google
      </span>
    </div>
  );
}
