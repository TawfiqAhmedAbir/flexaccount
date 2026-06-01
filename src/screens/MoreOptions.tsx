import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PhoneFrame from "../components/PhoneFrame";
import TabBar from "../components/TabBar";
import { ChevronRight } from "../components/icons";
import { slideScreen } from "../motion";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mb-6">
      <h2 className="mb-2.5 px-1 text-[19px] font-bold text-white">{title}</h2>
      <div className="overflow-hidden rounded-2xl border border-white/12">{children}</div>
    </div>
  );
}

function LinkRow({
  title,
  subtitle,
  divider,
}: {
  title: string;
  subtitle?: string;
  divider?: boolean;
}) {
  return (
    <>
      {divider && <div className="mx-4 h-px bg-white/10" />}
      <button
        type="button"
        className="flex w-full items-center gap-3 px-4 py-4 text-left active:bg-white/5"
      >
        <span className="flex-1">
          <span className="block text-[16px] font-medium text-white">{title}</span>
          {subtitle && (
            <span className="mt-0.5 block text-[14px] text-muted">{subtitle}</span>
          )}
        </span>
        <ChevronRight size={20} className="text-link" />
      </button>
    </>
  );
}

export default function MoreOptions() {
  const navigate = useNavigate();

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
          <h1 className="text-[17px] font-bold text-white">More options</h1>
          <span className="justify-self-end" />
        </div>

        <div className="no-scrollbar flex-1 overflow-y-auto px-4 pb-28 pt-3">
          <Section title="Payments">
            <LinkRow
              title="Scheduled payments"
              subtitle="Change or cancel payments and bills"
            />
            <LinkRow title="Saved payees" divider />
          </Section>

          <Section title="Account information">
            <div className="flex items-start justify-between px-4 py-4">
              <span>
                <span className="block text-[16px] font-bold text-white">Account name</span>
                <span className="mt-0.5 block text-[15px] text-muted">FlexAccount</span>
              </span>
              <button type="button" className="text-[16px] text-link">
                Rename
              </button>
            </div>
            <div className="mx-4 h-px bg-white/10" />
            <button
              type="button"
              className="flex w-full items-center gap-3 px-4 py-4 text-left active:bg-white/5"
            >
              <span className="flex-1">
                <span className="block text-[16px] font-bold text-white">
                  Share account details
                </span>
                <span className="mt-0.5 block text-[15px] text-muted">
                  UK and International
                </span>
              </span>
              <ChevronRight size={20} className="text-link" />
            </button>
          </Section>

          <Section title="Overdraft">
            <LinkRow title="Apply for an arranged overdraft" />
          </Section>

          <Section title="Statements">
            <LinkRow title="View statements and documents" />
            <LinkRow title="Paperless settings" divider />
            <LinkRow title="Interest and tax paid" divider />
          </Section>
        </div>

        <TabBar />
      </motion.div>
    </PhoneFrame>
  );
}
