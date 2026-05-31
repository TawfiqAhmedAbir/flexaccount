import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PhoneFrame from "../components/PhoneFrame";
import { CurlMark } from "../components/icons";
import { fadeScreen } from "../motion";

const splashBg =
  "radial-gradient(120% 80% at 50% 0%, #3A2C7A 0%, #1A1B52 45%, #0A0E27 100%)";

export default function Splash() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("Establishing secure connection");

  useEffect(() => {
    const t1 = setTimeout(() => setStatus("Talking to FlexAccount"), 1200);
    const t2 = setTimeout(() => navigate("/passnumber"), 2600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [navigate]);

  return (
    <PhoneFrame background={splashBg}>
      <motion.div
        variants={fadeScreen}
        initial="initial"
        animate="animate"
        exit="exit"
        className="flex h-full flex-col items-center justify-between py-20"
      >
        <div className="flex flex-1 flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex items-center gap-2"
          >
            <CurlMark size={44} className="text-brand" />
            <span className="text-[34px] font-semibold lowercase tracking-tight text-white">
              flexaccount
            </span>
          </motion.div>
        </div>

        <div className="flex flex-col items-center gap-4 pb-4">
          <span className="h-7 w-7 animate-spin rounded-full border-2 border-white/25 border-t-white/90" />
          <motion.p
            key={status}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-white/70"
          >
            {status}
          </motion.p>
        </div>
      </motion.div>
    </PhoneFrame>
  );
}
