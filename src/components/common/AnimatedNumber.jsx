import { useEffect, useRef, useState } from "react";
import { formatNumber } from "@/lib/format";

function reducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

export function AnimatedNumber({ value = 0, duration = 900, suffix = "" }) {
  const target = Number(value) || 0;
  const [display, setDisplay] = useState(target);
  const previous = useRef(target);

  useEffect(() => {
    if (reducedMotion()) {
      setDisplay(target);
      previous.current = target;
      return undefined;
    }

    let frame = 0;
    let start = 0;
    const initial = previous.current;
    const delta = target - initial;

    const tick = (time) => {
      if (!start) start = time;
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplay(initial + delta * eased);

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        previous.current = target;
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return (
    <>
      {formatNumber(Math.round(display))}
      {suffix}
    </>
  );
}

export default AnimatedNumber;
