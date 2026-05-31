import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PhoneFrame from "../components/PhoneFrame";
import TabBar from "../components/TabBar";
import { account } from "../data";
import { formatGBP } from "../format";
import { fadeScreen } from "../motion";
import {
  PersonIcon,
  BellIcon,
  PencilIcon,
  ChevronRight,
} from "../components/icons";

function DismissButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Dismiss"
      className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full opacity-60"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
        <path
          d="M2 2L12 12M12 2L2 12"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [showPromo1, setShowPromo1] = useState(true);
  const [showStrip, setShowStrip] = useState(true);
  const [showPromo2, setShowPromo2] = useState(true);

  return (
    <PhoneFrame>
      <motion.div
        variants={fadeScreen}
        initial="initial"
        animate="animate"
        exit="exit"
        className="flex h-full flex-col"
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-3">
          <button type="button" className="text-link">
            <PersonIcon size={26} />
          </button>
          <h1 className="text-[19px] font-bold text-white">Home</h1>
          <div className="flex items-center gap-4 text-link">
            <button type="button">
              <BellIcon size={24} />
            </button>
            <button type="button">
              <PencilIcon size={24} />
            </button>
          </div>
        </div>

        {/* Scrollable */}
        <div className="no-scrollbar flex-1 overflow-y-auto px-4 pb-28">
          <div className="px-1 pb-3">
            <p className="text-[22px] font-semibold text-white">Good evening Abir</p>
          </div>
          <div className="mb-4 border-t border-white/10" />

          <AnimatePresence initial={false}>
            {showPromo1 && (
              <motion.div
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                className="relative mb-4 overflow-hidden rounded-card bg-white p-5 text-bg"
              >
                <DismissButton onClick={() => setShowPromo1(false)} />
                <h2 className="mb-2 max-w-[240px] text-[19px] font-bold">
                  Exclusive 5% savings rate.
                </h2>
                <p className="mb-4 text-[14px] leading-snug text-bg/80">
                  Earn 5% AER/gross for 15 months on balances up to £10,000 with our
                  Member Exclusive Bond. Limited-time only. Terms apply.
                </p>
                <button
                  type="button"
                  className="rounded-full bg-black px-6 py-2.5 text-[15px] font-semibold text-white"
                >
                  Open yours
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <h3 className="mb-3 px-1 text-[18px] font-bold text-white">Current account</h3>

          <button
            type="button"
            onClick={() => navigate("/account")}
            className="mb-4 flex w-full items-center justify-between rounded-card bg-card px-5 py-4 text-left active:brightness-110"
          >
            <div>
              <p className="text-[17px] font-semibold text-white">{account.name}</p>
              <p className="mt-1 text-[13px] text-muted">
                {account.sortCode} • {account.number}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[20px] font-bold text-white">
                {formatGBP(account.balance)}
              </span>
              <ChevronRight size={20} className="text-muted" />
            </div>
          </button>

          <AnimatePresence initial={false}>
            {showStrip && (
              <motion.div
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                className="relative mb-4 overflow-hidden rounded-card bg-[#232C63] px-5 py-4 pr-10"
              >
                <DismissButton onClick={() => setShowStrip(false)} />
                <p className="text-[14px] leading-snug text-white/90">
                  Get more from a current account. Get FlexPlus for £18 a month.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence initial={false}>
            {showPromo2 && (
              <motion.div
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                className="relative mb-4 overflow-hidden rounded-card bg-white p-5 text-bg"
              >
                <DismissButton onClick={() => setShowPromo2(false)} />
                <h2 className="mb-2 text-[19px] font-bold">Save with us too</h2>
                <p className="mb-4 text-[14px] leading-snug text-bg/80">
                  Instant Saver is just for our current account customers like you. It pays{" "}
                  <span className="font-semibold">2.30% AER/gross a year (variable)</span> for
                  12 months.
                </p>
                <button
                  type="button"
                  className="rounded-full bg-black px-6 py-2.5 text-[15px] font-semibold text-white"
                >
                  Save today
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <TabBar />
      </motion.div>
    </PhoneFrame>
  );
}
