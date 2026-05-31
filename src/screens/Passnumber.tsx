import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PhoneFrame from "../components/PhoneFrame";
import { InfoIcon } from "../components/icons";
import { fadeScreen } from "../motion";

const labels = ["2nd", "5th", "6th"];
const CORRECT = [2, 5, 8];
const digitKeys = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function KeyButton({
  onClick,
  children,
  ariaLabel,
}: {
  onClick: () => void;
  children: ReactNode;
  ariaLabel?: string;
}) {
  return (
    <motion.button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      whileTap={{ scale: 0.9, backgroundColor: "rgba(255,255,255,0.22)" }}
      className="mx-auto flex h-[68px] w-[68px] items-center justify-center rounded-full bg-white/10 text-[28px] font-medium text-white"
    >
      {children}
    </motion.button>
  );
}

function BackspaceGlyph() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 5H20C21.1 5 22 5.9 22 7V17C22 18.1 21.1 19 20 19H9L2 12L9 5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M13 9.5L17 14.5M17 9.5L13 14.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FscsBadge() {
  return (
    <div className="flex flex-col items-center rounded-xl bg-white px-3.5 py-1.5">
      <span className="text-[17px] font-extrabold italic leading-none text-bg">
        fscs
      </span>
      <span className="mt-1 text-[7px] font-bold tracking-[0.22em] text-bg">
        PROTECTED
      </span>
    </div>
  );
}

export default function Passnumber() {
  const navigate = useNavigate();
  const [digits, setDigits] = useState<number[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (digits.length !== 3) return;
    const correct = digits.every((d, i) => d === CORRECT[i]);
    if (correct) {
      const t = setTimeout(() => navigate("/home"), 280);
      return () => clearTimeout(t);
    }
    setError(true);
    const t = setTimeout(() => {
      setDigits([]);
      setError(false);
    }, 750);
    return () => clearTimeout(t);
  }, [digits, navigate]);

  const pressDigit = (n: number) => {
    if (error) return;
    setDigits((prev) => (prev.length >= 3 ? prev : [...prev, n]));
  };

  const backspace = () => {
    if (error) return;
    setDigits((prev) => prev.slice(0, -1));
  };

  return (
    <PhoneFrame>
      <motion.div
        variants={fadeScreen}
        initial="initial"
        animate="animate"
        exit="exit"
        className="flex h-full flex-col px-6 pb-6"
      >
        <div className="flex items-center justify-between py-2">
          <button type="button" className="text-[17px] text-link">
            ‹ Quick Balance
          </button>
          <button type="button" className="flex items-center gap-1 text-[17px] text-link">
            Help <InfoIcon size={17} />
          </button>
        </div>

        <div className="flex flex-col items-center pt-6">
          <h1 className="mb-9 max-w-[280px] text-center text-[22px] font-semibold leading-snug text-white">
            Enter these numbers from your passnumber
          </h1>

          <motion.div
            className="flex items-end gap-5"
            animate={error ? { x: [0, -10, 10, -8, 8, -4, 4, 0] } : { x: 0 }}
            transition={{ duration: 0.45 }}
          >
            {labels.map((label, i) => {
              const filled = i < digits.length;
              const active = !error && i === digits.length;
              return (
                <div key={label} className="flex flex-col items-center gap-2">
                  <span className="text-[13px] text-muted">{label}</span>
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl border bg-[#11173A] transition-colors ${
                      error
                        ? "border-brand ring-2 ring-brand/40"
                        : active
                        ? "border-link ring-2 ring-link/40"
                        : "border-white/15"
                    }`}
                  >
                    {filled && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="h-3 w-3 rounded-full bg-white"
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </motion.div>

          <button type="button" className="mt-6 text-[16px] text-link">
            Forgotten passnumber
          </button>
        </div>

        <div className="mx-auto mt-auto w-full max-w-[300px]">
          <div className="grid grid-cols-3 gap-x-7 gap-y-4">
            {digitKeys.map((n) => (
              <KeyButton key={n} onClick={() => pressDigit(n)}>
                {n}
              </KeyButton>
            ))}
            <span />
            <KeyButton onClick={() => pressDigit(0)}>0</KeyButton>
            <KeyButton onClick={backspace} ariaLabel="Backspace">
              <BackspaceGlyph />
            </KeyButton>
          </div>
        </div>

        <div className="mt-7 flex justify-center">
          <FscsBadge />
        </div>
      </motion.div>
    </PhoneFrame>
  );
}
