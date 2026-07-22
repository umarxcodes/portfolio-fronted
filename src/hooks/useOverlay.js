import { useEffect, useRef } from "react";

/**
 * Shared overlay behavior for Modal and Drawer.
 *
 * - Locks body scroll while open.
 * - Handles Escape key to close.
 * - Returns a ref for the panel element (focus target) and a boolean `isOpen`.
 */
export function useOverlay(open, onClose) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return { panelRef, isOpen: open };
}

export default useOverlay;
