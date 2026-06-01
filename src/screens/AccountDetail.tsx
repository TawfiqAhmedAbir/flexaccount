import { useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PhoneFrame from "../components/PhoneFrame";
import TabBar from "../components/TabBar";
import MerchantBadge from "../components/MerchantBadge";
import { account, transactions } from "../data";
import type { Transaction } from "../data";
import {
  formatGBP,
  formatGroupDate,
  formatMonthLabel,
  monthKey,
  signedGBP,
} from "../format";
import { slideScreen } from "../motion";
import {
  InfoIcon,
  SwapIcon,
  CardIcon,
  MoreIcon,
  SearchIcon,
  ChevronRight,
} from "../components/icons";

const actions = [
  { label: "Pay or move money", Icon: SwapIcon },
  { label: "Manage cards", Icon: CardIcon },
  { label: "More options", Icon: MoreIcon },
];

interface Group {
  key: string;
  label: string;
  date?: string;
  balance?: number;
  items: Transaction[];
}

function buildGroups(): Group[] {
  const groups: Group[] = [];
  for (const txn of transactions) {
    const isPending = txn.status === "pending";
    const key = isPending ? "pending" : txn.date;
    const last = groups[groups.length - 1];
    if (last && last.key === key) {
      last.items.push(txn);
      continue;
    }
    groups.push({
      key,
      label: isPending ? "Pending" : formatGroupDate(txn.date),
      date: isPending ? undefined : txn.date,
      balance: isPending ? undefined : txn.balanceAfter,
      items: [txn],
    });
  }
  return groups;
}

// Preserve the list's scroll position across navigation to a transaction.
let savedScroll = 0;

export default function AccountDetail() {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const groups = buildGroups();

  useLayoutEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = savedScroll;
  }, []);

  let prevMonth: string | undefined;

  return (
    <PhoneFrame>
      <motion.div
        variants={slideScreen}
        initial="initial"
        animate="animate"
        exit="exit"
        className="flex h-full flex-col"
      >
        {/* Top bar */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center px-4 py-2">
          <button
            type="button"
            onClick={() => navigate("/home")}
            className="justify-self-start text-[17px] text-link"
          >
            ‹ Home
          </button>
          <div className="text-center">
            <p className="text-[17px] font-bold text-white">{account.name}</p>
            <p className="text-[12px] text-muted">07-09-76 01299195</p>
          </div>
          <span className="justify-self-end" />
        </div>

        <div
          ref={scrollRef}
          onScroll={(e) => (savedScroll = e.currentTarget.scrollTop)}
          className="no-scrollbar flex-1 overflow-y-auto px-4 pb-28"
        >
          {/* Balance card */}
          <div className="relative mb-5 mt-1 rounded-card bg-card px-5 py-5">
            <button
              type="button"
              className="absolute right-4 top-4 flex items-center gap-1 text-[14px] text-link"
            >
              More info <InfoIcon size={16} />
            </button>
            <p className="text-[15px] font-semibold text-white">{account.name}</p>
            <p className="mt-3 text-[34px] font-bold leading-none text-white">
              {formatGBP(account.balance)}
            </p>
            <p className="mt-2 text-[13px] text-muted">Available</p>
          </div>

          {/* Action buttons */}
          <div className="mb-6 flex items-start justify-around px-2">
            {actions.map((a) => (
              <button
                key={a.label}
                type="button"
                className="flex w-[88px] flex-col items-center gap-2"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-bg">
                  <a.Icon size={24} />
                </span>
                <span className="text-center text-[12px] leading-tight text-white">
                  {a.label}
                </span>
              </button>
            ))}
          </div>

          {/* Transactions header */}
          <div className="mb-2 flex items-center justify-between px-1">
            <h2 className="text-[18px] font-bold text-white">Transactions</h2>
            <button type="button" className="flex items-center gap-1.5 text-[15px] text-link">
              <SearchIcon size={16} /> Search &amp; filter
            </button>
          </div>

          {/* Groups */}
          {groups.map((group) => {
            const showDivider =
              group.date !== undefined &&
              prevMonth !== undefined &&
              monthKey(group.date) !== prevMonth;
            if (group.date) prevMonth = monthKey(group.date);

            return (
              <div key={group.key}>
                {showDivider && (
                  <div className="my-3 flex items-center gap-3 px-1">
                    <span className="text-[13px] font-medium text-muted">
                      {formatMonthLabel(group.date!)}
                    </span>
                    <span className="h-px flex-1 bg-white/10" />
                  </div>
                )}

                <div className="mt-4 flex items-center justify-between px-1">
                  <span className="text-[15px] font-semibold text-white">
                    {group.label}
                  </span>
                  {group.balance !== undefined && (
                    <span className="text-[14px] font-medium text-muted">
                      {formatGBP(group.balance)}
                    </span>
                  )}
                </div>

                <div className="mt-2 overflow-hidden rounded-card bg-panel">
                  {group.items.map((txn, idx) => (
                    <div key={txn.id}>
                      {idx > 0 && <div className="ml-[68px] h-px bg-white/10" />}
                      <button
                        type="button"
                        onClick={() => navigate(`/transaction/${txn.id}`)}
                        className="flex w-full items-center gap-3 px-4 py-3 text-left active:bg-white/5"
                      >
                        <MerchantBadge badge={txn.badge} />
                        <span className="flex-1 truncate text-[15px] text-white">
                          {txn.merchant}
                        </span>
                        <span
                          className={`text-[15px] font-bold ${
                            txn.type === "credit" ? "text-credit" : "text-white"
                          }`}
                        >
                          {signedGBP(txn.amount, txn.type)}
                        </span>
                        <ChevronRight size={18} className="text-muted" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <TabBar />
      </motion.div>
    </PhoneFrame>
  );
}
