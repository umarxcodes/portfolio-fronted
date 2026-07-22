export const motionEasing = {
  easeOutExpo: [0.16, 1, 0.3, 1],
  easeOutCubic: [0.33, 1, 0.68, 1],
  easeInOutCubic: [0.65, 0, 0.35, 1],
  spring: [0.22, 1, 0.36, 1],
};

export const motionDuration = {
  fast: 0.18,
  base: 0.28,
  slow: 0.42,
  slower: 0.6,
};

export const motionTransition = {
  default: { duration: motionDuration.base, ease: motionEasing.easeOutExpo },
  page: { duration: motionDuration.slow, ease: motionEasing.easeOutExpo },
  button: { duration: motionDuration.fast, ease: motionEasing.easeOutCubic },
  card: { duration: motionDuration.base, ease: motionEasing.easeOutExpo },
  stagger: 0.07,
};
