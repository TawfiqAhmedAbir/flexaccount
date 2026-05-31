import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PhoneFrame from "../components/PhoneFrame";
import { InfoIcon, LockGlyph } from "../components/icons";
import { fadeScreen } from "../motion";

const labels = ["2nd", "3rd", "4th"];

export default function Passnumber() {
  const navigate = useNavigate();
  const [filled, setFilled] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timers: number[] = [];
    [0, 1, 2].forEach((i) => {
      timers.push(
        window.setTimeout(() => {
          setFilled(i + 1);
          setActive(Math.min(i + 1, 2));
        }, 500 + i * 500)
      );
    });
    timers.push(window.setTimeout(() => navigate("/home"), 2300));
    return () => timers.forEach(clearTimeout);
  }, [navigate]);

  return (
    <PhoneFrame>
      <motion.div
        variants={fadeScreen}
        initial="initial"
        animate="animate"
        exit="exit"
        className="flex h-full flex-col px-6"
      >
        <div className="flex items-center justify-between py-2">
          <button type="button" className="text-[17px] text-link">
            ‹ Quick Balance
          </button>
          <button type="button" className="flex items-center gap-1 text-[17px] text-link">
            Help <InfoIcon size={17} />
          </button>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center">
          <h1 className="mb-10 max-w-[260px] text-center text-[22px] font-semibold leading-snug text-white">
            Enter these numbers from your passnumber
          </h1>

          <div className="flex items-end gap-5">
            {labels.map((label, i) => {
              const isFilled = i < filled;
              const isActive = i === active && !isFilled;
              return (
                <div key={label} className="flex flex-col items-center gap-2">
                  <span className="text-[13px] text-muted">{label}</span>
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl border bg-[#11173A] transition-colors ${
                      isActive
                        ? "border-link ring-2 ring-link/40"
                        : "border-white/15"
                    }`}
                  >
                    {isFilled && (
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
          </div>

          <button type="button" className="mt-8 text-[16px] text-link">
            Forgotten passnumber
          </button>
        </div>

        <div className="flex flex-col items-center gap-2 pb-16">
          <LockGlyph size={40} className="text-white/80" />
        </div>
      </motion.div>
    </PhoneFrame>
  );
}
