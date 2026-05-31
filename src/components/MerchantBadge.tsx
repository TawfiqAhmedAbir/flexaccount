import type { Badge } from "../data";

export default function MerchantBadge({ badge }: { badge: Badge }) {
  const wrap =
    "flex h-11 w-11 shrink-0 items-center justify-center rounded-full overflow-hidden";

  if (badge.kind === "uber") {
    return (
      <div className={`${wrap} bg-[#06C167]`}>
        <span className="text-[10px] font-bold leading-none text-black text-center">
          Uber
          <br />
          Eats
        </span>
      </div>
    );
  }

  if (badge.kind === "deliveroo") {
    return (
      <div className={`${wrap} bg-[#00CCBC]`}>
        <span className="text-[16px] font-extrabold leading-none text-white">D</span>
      </div>
    );
  }

  if (badge.kind === "tfl") {
    return (
      <div className={`${wrap} bg-white`}>
        {/* TfL roundel */}
        <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden>
          <circle cx="15" cy="15" r="9" fill="none" stroke="#1C3F94" strokeWidth="3.2" />
          <rect x="3" y="13" width="24" height="4" fill="#1C3F94" />
        </svg>
      </div>
    );
  }

  return (
    <div className={wrap} style={{ backgroundColor: badge.color ?? "#6B4FBB" }}>
      <span className="text-[18px] font-bold leading-none text-white">
        {badge.letter}
      </span>
    </div>
  );
}
