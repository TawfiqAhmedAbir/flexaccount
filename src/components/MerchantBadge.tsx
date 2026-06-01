import type { Badge } from "../data";

export default function MerchantBadge({
  badge,
  size = 44,
}: {
  badge: Badge;
  size?: number;
}) {
  const style = { width: size, height: size };
  const wrap =
    "flex shrink-0 items-center justify-center rounded-[14px] overflow-hidden";

  if (badge.kind === "uber") {
    return (
      <div className={`${wrap} bg-[#06C167]`} style={style}>
        <span className="text-center text-[10px] font-bold leading-none text-black">
          Uber
          <br />
          Eats
        </span>
      </div>
    );
  }

  if (badge.kind === "uberBlack") {
    return (
      <div className={`${wrap} bg-black`} style={style}>
        <span className="text-[12px] font-bold leading-none text-white">Uber</span>
      </div>
    );
  }

  if (badge.kind === "deliveroo") {
    return (
      <div className={`${wrap} bg-[#00CCBC]`} style={style}>
        <span className="text-[18px] font-extrabold leading-none text-white">D</span>
      </div>
    );
  }

  if (badge.kind === "apple") {
    return (
      <div className={`${wrap} bg-white`} style={style}>
        <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 384 512" aria-hidden>
          <path
            d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zM262.1 104.5c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
            fill="#000"
          />
        </svg>
      </div>
    );
  }

  if (badge.kind === "tfl") {
    return (
      <div className={`${wrap} bg-white`} style={style}>
        <svg width={size * 0.66} height={size * 0.66} viewBox="0 0 30 30" aria-hidden>
          <circle cx="15" cy="15" r="9" fill="none" stroke="#1C3F94" strokeWidth="3.2" />
          <rect x="3" y="13" width="24" height="4" fill="#1C3F94" />
        </svg>
      </div>
    );
  }

  return (
    <div className={wrap} style={{ ...style, backgroundColor: badge.color ?? "#2A2D6B" }}>
      <span className="text-[18px] font-bold leading-none text-white">{badge.letter}</span>
    </div>
  );
}
