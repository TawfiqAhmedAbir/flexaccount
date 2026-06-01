import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import PhoneFrame from "../components/PhoneFrame";
import TabBar from "../components/TabBar";
import MerchantBadge from "../components/MerchantBadge";
import MapGraphic from "../components/MapGraphic";
import { getTransaction, variantFor } from "../data";
import type { Transaction } from "../data";
import { formatGBP, formatLongDate, signedGBP } from "../format";
import { slideScreen } from "../motion";
import { ChevronRight, QuestionIcon } from "../components/icons";

function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-[#141A3A] ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

function PendingVariant() {
  return (
    <>
      <Card className="mb-5 flex items-center justify-between px-4 py-4">
        <span className="text-[16px] font-bold text-white">Status</span>
        <span className="text-[16px] text-white">Pending</span>
      </Card>

      <h2 className="mb-2 text-[19px] font-bold text-white">
        About pending transactions
      </h2>
      <p className="mb-6 text-[15px] leading-relaxed text-white/85">
        Some transactions take a few days to process, so they&rsquo;re
        &lsquo;pending&rsquo; until they clear. They can be card payments, or cheques
        you&rsquo;ve paid in. Not all payments show as pending before they clear.
      </p>

      <h2 className="mb-2 text-[19px] font-bold text-white">
        Small payment you don&rsquo;t recognise?
      </h2>
      <p className="text-[15px] leading-relaxed text-white/85">
        It could be because you&rsquo;ve paid this business but they haven&rsquo;t told
        us the amount yet. It won&rsquo;t clear until we know the full amount.
      </p>
    </>
  );
}

function CardPaymentVariant({ txn }: { txn: Transaction }) {
  const descriptorLines = (txn.cardDescriptor ?? "").split(" / ");
  return (
    <>
      <Card className="mb-4 overflow-hidden p-0">
        {/* Swap this MapGraphic for a Google Static Maps image when an API key is available. */}
        <MapGraphic className="h-[150px] w-full" />
        <button
          type="button"
          className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
        >
          <span className="flex-1 text-[15px] leading-snug text-white">
            {txn.location}
          </span>
          <ChevronRight size={18} className="text-muted" />
        </button>
      </Card>

      <Card className="mb-4 px-4">
        <div className="flex items-center justify-between py-3.5">
          <span className="text-[16px] font-bold text-white">Phone</span>
          <a href={`tel:${txn.phone}`} className="text-[16px] text-link">
            {txn.phone}
          </a>
        </div>
        <div className="h-px bg-white/10" />
        <div className="flex items-center justify-between py-3.5">
          <span className="text-[16px] font-bold text-white">Website</span>
          <span className="text-[16px] text-link">{txn.website}</span>
        </div>
      </Card>

      <Card className="mb-4 flex justify-between gap-4 px-4 py-4">
        <span className="text-[16px] font-bold text-white">Transaction detail</span>
        <span className="flex flex-col text-right">
          {descriptorLines.map((line, i) => (
            <span key={i} className="text-[15px] leading-snug text-white">
              {line}
            </span>
          ))}
        </span>
      </Card>
    </>
  );
}

function ClearedVariant({ txn }: { txn: Transaction }) {
  return (
    <>
      <Card className="mb-4 px-4 py-4">
        <div className="flex justify-between gap-4">
          <span className="text-[16px] font-bold text-white">Transaction detail</span>
          <span className="flex flex-col text-right">
            <span className="text-[15px] leading-snug text-white">{txn.merchant}</span>
            <span className="text-[15px] leading-snug text-white">LONDON GB</span>
          </span>
        </div>
        <div className="my-3.5 h-px bg-white/10" />
        <div className="flex items-center justify-between">
          <span className="text-[16px] font-bold text-white">Balance before</span>
          <span className="text-[16px] text-white">{formatGBP(txn.balanceBefore)}</span>
        </div>
        <div className="my-3.5 h-px bg-white/10" />
        <div className="flex items-center justify-between">
          <span className="text-[16px] font-bold text-white">Balance after</span>
          <span className="text-[16px] text-white">{formatGBP(txn.balanceAfter)}</span>
        </div>
        <div className="my-3.5 h-px bg-white/10" />
        <div className="flex items-center justify-between">
          <span className="text-[16px] font-bold text-white">Status</span>
          <span className="text-[16px] text-white">Complete</span>
        </div>
      </Card>

      <Card className="px-4">
        <button type="button" className="flex w-full items-center gap-3 py-4 text-left">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/30 text-white">
            <QuestionIcon size={20} />
          </span>
          <span className="flex-1 text-[16px] font-semibold text-white">
            Need help with this transaction?
          </span>
          <ChevronRight size={18} className="text-muted" />
        </button>
      </Card>
    </>
  );
}

export default function TransactionDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const txn = id ? getTransaction(id) : undefined;

  if (!txn) {
    return (
      <PhoneFrame>
        <div className="flex h-full flex-col items-center justify-center gap-4 px-6">
          <p className="text-white">Transaction not found.</p>
          <button
            type="button"
            onClick={() => navigate("/account")}
            className="text-link"
          >
            Back to account
          </button>
        </div>
      </PhoneFrame>
    );
  }

  const variant = variantFor(txn);
  const isCredit = txn.type === "credit";

  return (
    <PhoneFrame>
      <motion.div
        variants={slideScreen}
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
            ‹ Back
          </button>
          <h1 className="text-[17px] font-bold text-white">Transaction info</h1>
          <span className="justify-self-end" />
        </div>

        <div className="no-scrollbar flex-1 overflow-y-auto px-4 pb-28">
          {/* Shared summary card */}
          <Card className="mb-5 mt-1 flex items-start justify-between px-5 py-5">
            <div>
              <p
                className={`text-[30px] font-bold leading-none ${
                  isCredit ? "text-credit" : "text-white"
                }`}
              >
                {signedGBP(txn.amount, txn.type)}
              </p>
              <p className="mt-3 text-[16px] text-white">{txn.merchant}</p>
              <p className="mt-1 text-[14px] text-muted">{formatLongDate(txn.date)}</p>
            </div>
            <MerchantBadge badge={txn.badge} size={48} />
          </Card>

          {variant === "A" && <PendingVariant />}
          {variant === "B" && <CardPaymentVariant txn={txn} />}
          {variant === "C" && <ClearedVariant txn={txn} />}
        </div>

        <TabBar />
      </motion.div>
    </PhoneFrame>
  );
}
