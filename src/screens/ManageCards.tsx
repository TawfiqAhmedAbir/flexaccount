import { useState } from "react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PhoneFrame from "../components/PhoneFrame";
import TabBar from "../components/TabBar";
import { CurlMark, ChevronRight } from "../components/icons";
import { slideScreen } from "../motion";

function ContactlessIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M7 8.5C9 10.7 9 13.3 7 15.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M10.5 6C13.7 9.2 13.7 14.8 10.5 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M14 3.5C18.5 8 18.5 16 14 20.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function SnowflakeIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <path d="M12 3V21" />
        <path d="M4.2 7.5L19.8 16.5" />
        <path d="M19.8 7.5L4.2 16.5" />
        <path d="M12 6.5L9.6 5M12 6.5L14.4 5M12 17.5L9.6 19M12 17.5L14.4 19" />
        <path d="M6.5 9.2L5.6 6.6M6.5 9.2L3.8 9.6M17.5 14.8L18.4 17.4M17.5 14.8L20.2 14.4" />
        <path d="M6.5 14.8L3.8 14.4M6.5 14.8L5.6 17.4M17.5 9.2L20.2 9.6M17.5 9.2L18.4 6.6" />
      </g>
    </svg>
  );
}

function ReportIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="6" width="18" height="12" rx="2.4" stroke="currentColor" strokeWidth="1.7" />
      <path d="M3 10H21" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="14.5" r="0.4" fill="currentColor" stroke="currentColor" strokeWidth="1.2" />
      <path d="M12 12V13.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function LockIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="5" y="10.5" width="14" height="9.5" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M8 10.5V8C8 5.79 9.79 4 12 4C14.21 4 16 5.79 16 8V10.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function Chip() {
  return (
    <svg width="34" height="26" viewBox="0 0 34 26" fill="none" aria-hidden>
      <rect x="1" y="1" width="32" height="24" rx="5" fill="#D9C27A" />
      <rect x="1" y="1" width="32" height="24" rx="5" stroke="#B9A05E" />
      <path
        d="M12 1V25M22 1V25M1 9H12M22 9H33M1 17H12M22 17H33"
        stroke="#B9A05E"
        strokeWidth="1"
      />
      <rect x="12" y="9" width="10" height="8" fill="#CBB36C" stroke="#B9A05E" />
    </svg>
  );
}

function DebitCard() {
  return (
    <div className="relative mx-auto h-[200px] w-[320px] overflow-hidden rounded-2xl bg-gradient-to-br from-[#28305F] via-[#1B2350] to-[#10173A] shadow-2xl ring-1 ring-white/10">
      {/* top row: brand + product pill */}
      <div className="flex items-start justify-between px-5 pt-5">
        <div className="flex items-center gap-1.5">
          <CurlMark size={22} className="text-brand" />
          <span className="text-[18px] font-semibold lowercase tracking-tight text-white">
            flexaccount
          </span>
        </div>
        <span className="rounded-md bg-brand px-2.5 py-1 text-[12px] font-semibold text-white">
          FlexAccount
        </span>
      </div>

      {/* chip + contactless */}
      <div className="mt-5 flex items-center gap-3 px-5 text-white/90">
        <Chip />
        <ContactlessIcon size={22} />
        <span className="ml-auto text-white/40">
          <svg width="6" height="22" viewBox="0 0 6 22" aria-hidden>
            <circle cx="3" cy="3" r="1.5" fill="currentColor" />
            <circle cx="3" cy="11" r="1.5" fill="currentColor" />
            <circle cx="3" cy="19" r="1.5" fill="currentColor" />
          </svg>
        </span>
      </div>

      {/* VISA Debit */}
      <div className="absolute bottom-5 right-5 flex items-end gap-1.5">
        <span className="text-[24px] font-extrabold italic tracking-tight text-white">
          VISA
        </span>
        <span className="pb-1 text-[11px] font-medium text-white/80">Debit</span>
      </div>

      {/* red accent */}
      <div className="absolute inset-x-0 bottom-0 h-1.5 bg-brand" />
    </div>
  );
}

function SettingRow({
  icon,
  label,
  right,
  divider,
}: {
  icon: ReactNode;
  label: string;
  right: ReactNode;
  divider: boolean;
}) {
  return (
    <>
      {divider && <div className="mx-4 h-px bg-white/10" />}
      <div className="flex items-center gap-3.5 px-4 py-4">
        <span className="text-white">{icon}</span>
        <span className="flex-1 text-[16px] text-white">{label}</span>
        {right}
      </div>
    </>
  );
}

function Toggle({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={`flex h-[30px] w-[52px] items-center rounded-full px-0.5 transition-colors ${
        on ? "bg-credit" : "bg-white/20"
      }`}
    >
      <motion.span
        layout
        className={`h-[26px] w-[26px] rounded-full bg-white shadow ${on ? "ml-auto" : ""}`}
      />
    </button>
  );
}

export default function ManageCards() {
  const navigate = useNavigate();
  const [frozen, setFrozen] = useState(false);

  return (
    <PhoneFrame>
      <motion.div
        variants={slideScreen}
        initial="initial"
        animate="animate"
        exit="exit"
        className="flex h-full flex-col"
      >
        <div className="grid grid-cols-[1fr_auto_1fr] items-center px-4 py-2">
          <button
            type="button"
            onClick={() => navigate("/account")}
            className="justify-self-start text-[17px] text-link"
          >
            ‹ Back
          </button>
          <h1 className="text-[17px] font-bold text-white">Manage cards</h1>
          <span className="justify-self-end" />
        </div>

        <div className="no-scrollbar flex-1 overflow-y-auto px-4 pb-28">
          <div className="pt-4">
            <DebitCard />
          </div>

          <p className="mt-7 text-center text-[20px] font-bold text-white">
            FlexAccount Debit Card
          </p>
          <p className="mt-1 text-center text-[15px] text-muted">
            Card ending 1406 · Exp: 01/30
          </p>

          <div className="mt-5 overflow-hidden rounded-2xl border border-white/12">
            <SettingRow
              icon={<SnowflakeIcon />}
              label="Freeze card"
              divider={false}
              right={<Toggle on={frozen} onClick={() => setFrozen((v) => !v)} />}
            />
            <SettingRow
              icon={<ReportIcon />}
              label="Report lost, stolen or damaged"
              divider
              right={<ChevronRight size={20} className="text-link" />}
            />
            <SettingRow
              icon={<LockIcon />}
              label="Gambling"
              divider
              right={<ChevronRight size={20} className="text-link" />}
            />
            <SettingRow
              icon={<ContactlessIcon />}
              label="Contactless"
              divider
              right={<ChevronRight size={20} className="text-link" />}
            />
          </div>

          <p className="mt-4 text-[14px] font-semibold text-white">
            Card added to Apple Wallet
          </p>
        </div>

        <TabBar />
      </motion.div>
    </PhoneFrame>
  );
}
