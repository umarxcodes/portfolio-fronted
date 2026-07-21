import { useMemo } from "react";
import { cn } from "@/lib/cn";
import { useScrollReveal } from "@/hooks";

const HIDDEN_BY_DIRECTION = {
  up: "translate-y-6",
  down: "-translate-y-6",
  left: "translate-x-6",
  right: "-translate-x-6",
  none: "",
};

/**
 * Scroll-triggered reveal. Uses transform + opacity only (GPU friendly) and
 * honors prefers-reduced-motion via useScrollReveal (reveals instantly).
 */
export function Reveal({ children, className, delay = 0, direction = "up", as: Comp = "div" }) {
  const options = useMemo(() => ({ threshold: 0.15, rootMargin: "0px 0px -8% 0px" }), []);
  const [ref, visible] = useScrollReveal(options);
  const hidden = HIDDEN_BY_DIRECTION[direction] ?? HIDDEN_BY_DIRECTION.up;

  return (
    <Comp
      ref={ref}
      className={cn(
        "transition-all duration-500 ease-out-expo motion-reduce:transition-none",
        visible ? "opacity-100 translate-x-0 translate-y-0" : cn("opacity-0", hidden),
        className
      )}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </Comp>
  );
}

export default Reveal;
