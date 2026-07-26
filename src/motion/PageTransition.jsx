import { motion, useReducedMotion } from "framer-motion";
import { motionEasing, motionDuration } from "./constants";

const variants = {
  initial: { opacity: 0, y: 10, scale: 0.995, filter: "blur(1px)" },
  enter: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, y: -8, scale: 0.995, filter: "blur(1px)" },
};

export function PageTransition({ children, className }) {
  const prefersReduced = useReducedMotion();
  const transition = prefersReduced
    ? { duration: 0 }
    : { duration: motionDuration.slow, ease: motionEasing.easeOutExpo };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="initial"
      animate="enter"
      exit="exit"
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
