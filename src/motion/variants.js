import { motionEasing, motionDuration, motionTransition } from "./constants";

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: motionDuration.base,
      ease: motionEasing.easeOutExpo,
      delay: i * motionTransition.stagger,
    },
  }),
  exit: { opacity: 0, y: -8, transition: { duration: motionDuration.fast } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: motionDuration.base } },
  exit: { opacity: 0, transition: { duration: motionDuration.fast } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: motionTransition.default },
  exit: { opacity: 0, scale: 0.98, transition: { duration: motionDuration.fast } },
};

const slideInRight = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: motionTransition.default },
  exit: { opacity: 0, x: -12, transition: { duration: motionDuration.fast } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: motionTransition.stagger } },
};

export const revealVariants = {
  fadeIn,
  fadeInUp,
  scaleIn,
  slideInRight,
  staggerContainer,
};
