import { motion, useReducedMotion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { motionEasing, motionDuration } from "./constants";
import { cn } from "@/lib/cn";

const variants = {
  hidden: { opacity: 0, y: 18 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: motionDuration.base,
      ease: motionEasing.easeOutExpo,
      delay: i * 0.07,
    },
  }),
};

export function AnimatedSection({ children, className, delay = 0, once = true }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) {
      setInView(true);
      return;
    }
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReduced, once]);

  return (
    <motion.section
      ref={ref}
      className={cn(className)}
      custom={delay}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {children}
    </motion.section>
  );
}
