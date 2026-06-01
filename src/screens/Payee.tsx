import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PhoneFrame from "../components/PhoneFrame";
import { SearchIcon, ChevronRight } from "../components/icons";
import { fadeScreen } from "../motion";

interface Payee {
  name: string;
  label?: string;
  reference: string;
  sortCode: string;
  number: string;
}

const payees: Payee[] = [
  { name: "MR MD ABDUL BATEN", reference: "200", sortCode: "08-90-66", number: "13091271" },
  {
    name: "QAISER NAZNEEN",
    label: "MOTHER",
    reference: "50",
    sortCode: "08-92-49",
    number: "19290843",
  },
  { name: "TAWFIQ AHMED ABIR", reference: "20", sortCode: "04-29-09", number: "97897981" },
];

function PersonPlusIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="9.5" cy="8" r="3.3" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M3.5 19.5C3.5 16.2 6.2 14 9.5 14C11 14 12.4 14.45 13.5 15.2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M18.5 13.5V19.5M15.5 16.5H21.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Payee() {
  const navigate = useNavigate();

  return (
    <PhoneFrame>
      <motion.div
        variants={fadeScreen}
        initial="initial"
        animate="animate"
        exit="exit"
        className="flex h-full flex-col"
      >
        {/* Header */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center px-4 py-2">
          <button
            type="button"
            onClick={() => navigate("/account")}
            className="justify-self-start text-[17px] text-link"
          >
            Cancel
          </button>
          <h1 className="text-[17px] font-bold text-white">Choose payee</h1>
          <span className="justify-self-end" />
        </div>

        <div className="no-scrollbar flex-1 overflow-y-auto px-4 pb-10">
          {/* Search */}
          <div className="mt-2 flex items-center gap-3 rounded-2xl border border-white/15 px-4 py-3">
            <SearchIcon size={20} className="text-white/70" />
            <input
              placeholder="Search"
              className="w-full bg-transparent text-[16px] text-white placeholder:text-white/50 focus:outline-none"
            />
          </div>

          {/* Pay someone new */}
          <button
            type="button"
            className="mt-3 flex w-full items-center gap-3 rounded-2xl border border-white/15 px-4 py-3.5 text-left active:bg-white/5"
          >
            <span className="text-white">
              <PersonPlusIcon size={24} />
            </span>
            <span className="flex-1 text-[16px] font-semibold text-white">
              Pay someone new
            </span>
            <ChevronRight size={20} className="text-link" />
          </button>

          <h2 className="mb-2 mt-6 px-1 text-[18px] font-bold text-white">Everyone</h2>

          <div className="overflow-hidden rounded-2xl border border-white/12">
            {payees.map((p, idx) => (
              <div key={p.number}>
                {idx > 0 && <div className="mx-4 h-px bg-white/10" />}
                <button
                  type="button"
                  className="flex w-full items-center gap-3 px-4 py-3.5 text-left active:bg-white/5"
                >
                  <div className="flex-1">
                    <p className="text-[16px] font-bold text-white">
                      {p.name}
                      {p.label && (
                        <span className="ml-1 text-[13px] font-medium text-muted">
                          - {p.label}
                        </span>
                      )}
                    </p>
                    <p className="mt-0.5 text-[14px] text-muted">{p.reference}</p>
                    <p className="mt-0.5 text-[14px] text-muted">
                      {p.sortCode} · {p.number}
                    </p>
                  </div>
                  <ChevronRight size={20} className="text-link" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </PhoneFrame>
  );
}
