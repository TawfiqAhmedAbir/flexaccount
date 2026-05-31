interface IconProps {
  className?: string;
  size?: number;
}

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
});

export function CurlMark({ className, size = 24 }: IconProps) {
  // Stylized red "n"-like arc / swoosh
  return (
    <svg {...base(size)} className={className}>
      <path
        d="M5 19V11.5C5 7.91 7.91 5 11.5 5C15.09 5 18 7.91 18 11.5V13.2C18 14.46 19.2 15.2 20.2 14.7"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PersonIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M5 19.5C5 16.18 8.13 14 12 14C15.87 14 19 16.18 19 19.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BellIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path
        d="M6 9C6 5.69 8.69 3 12 3C15.31 3 18 5.69 18 9C18 14 19.5 16 19.5 16H4.5C4.5 16 6 14 6 9Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M10 19C10.27 19.86 11.07 20.5 12 20.5C12.93 20.5 13.73 19.86 14 19"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PencilIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path
        d="M4 20L4 16L15 5L19 9L8 20L4 20Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M13 7L17 11" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function HouseIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path
        d="M4 11L12 4L20 11V20H14V14H10V20H4V11Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SwapIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path
        d="M7 7H18L15 4M17 17H6L9 20"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PoundIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path
        d="M9 20H17M8 14H14M14 20C14 20 9 19.5 9 15.5V9.5C9 6.74 11.24 5 13.5 5C15.5 5 16.5 6.2 16.5 6.2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function QuestionIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="12" cy="12" r="8.2" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M9.7 9.5C9.7 8.2 10.7 7.3 12 7.3C13.3 7.3 14.3 8.1 14.3 9.3C14.3 11 12 11 12 13"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="12" cy="16.3" r="1" fill="currentColor" />
    </svg>
  );
}

export function MoreIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="5" cy="12" r="1.6" fill="currentColor" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" />
      <circle cx="19" cy="12" r="1.6" fill="currentColor" />
    </svg>
  );
}

export function CardIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <rect
        x="3"
        y="6"
        width="18"
        height="12"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="M3 10H21" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function InfoIcon({ className, size = 18 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 11V16.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="7.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function SearchIcon({ className, size = 18 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.8" />
      <path d="M15.5 15.5L20 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function ChevronRight({ className, size = 20 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path
        d="M9 6L15 12L9 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LockGlyph({ className, size = 40 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="6" y="6" width="28" height="28" rx="8" stroke="currentColor" strokeWidth="2" />
      <rect x="14" y="18.5" width="12" height="9" rx="2" stroke="currentColor" strokeWidth="2" />
      <path
        d="M16.5 18.5V16.5C16.5 14.57 18.07 13 20 13C21.93 13 23.5 14.57 23.5 16.5V18.5"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
