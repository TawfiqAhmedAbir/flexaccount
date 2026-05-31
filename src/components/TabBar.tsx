import {
  HouseIcon,
  SwapIcon,
  PoundIcon,
  QuestionIcon,
  MoreIcon,
} from "./icons";

type TabItem = {
  label: string;
  Icon: (p: { className?: string; size?: number }) => JSX.Element;
};

const items: TabItem[] = [
  { label: "Home", Icon: HouseIcon },
  { label: "Payments", Icon: SwapIcon },
  { label: "Products", Icon: PoundIcon },
  { label: "Help", Icon: QuestionIcon },
  { label: "More", Icon: MoreIcon },
];

export default function TabBar() {
  return (
    <nav className="absolute inset-x-0 bottom-0 z-20 border-t border-white/10 bg-[#0B1030]/95 px-2 pb-[22px] pt-2 backdrop-blur">
      <ul className="flex items-stretch justify-between">
        {items.map((item, i) => {
          const active = i === 0;
          const color = active ? "text-brand" : "text-muted";
          return (
            <li key={item.label} className="flex-1">
              <button
                type="button"
                className={`flex w-full flex-col items-center gap-1 py-1 ${color}`}
              >
                <item.Icon size={24} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
