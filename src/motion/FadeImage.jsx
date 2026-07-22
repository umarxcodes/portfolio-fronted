import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/cn";

const imageVariants = {
  hidden: { opacity: 0, scale: 1.02 },
  visible: { opacity: 1, scale: 1 },
};

export function FadeImage({ src, alt, className, ...props }) {
  const [loaded, setLoaded] = useState(false);
  const prefersReduced = useReducedMotion();

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {!loaded && <div className="absolute inset-0 skeleton" />}
      <motion.img
        src={src}
        alt={alt}
        variants={prefersReduced ? {} : imageVariants}
        initial={prefersReduced ? false : "hidden"}
        animate={loaded ? "visible" : "hidden"}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        onLoad={() => setLoaded(true)}
        className={cn("h-full w-full object-cover", loaded ? "opacity-100" : "opacity-0")}
        {...props}
      />
    </div>
  );
}
