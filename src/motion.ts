import type { Variants, Transition } from "framer-motion";

export const screenTransition: Transition = {
  duration: 0.45,
  ease: [0.22, 1, 0.36, 1],
};

export const fadeScreen: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: screenTransition },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

export const slideScreen: Variants = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0, transition: screenTransition },
  exit: { opacity: 0, x: -24, transition: { duration: 0.3 } },
};
