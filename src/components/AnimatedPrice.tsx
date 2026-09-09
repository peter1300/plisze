import { useEffect, useRef, useState } from "react";

export function AnimatedPrice({ value, className = "" }: { value: number; className?: string }) {
  const [display, setDisplay] = useState(value);
  const current = useRef(value);

  useEffect(() => {
    const start = current.current;
    const diff = value - start;
    if (diff === 0) {
      setDisplay(value);
      current.current = value;
      return;
    }
    const duration = 520;
    const t0 = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / duration);
      const eased = 1 - (1 - t) ** 3;
      const next = start + diff * eased;
      current.current = next;
      setDisplay(next);
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return (
    <span className={className}>
      {new Intl.NumberFormat("hu-HU").format(Math.round(display))} Ft
    </span>
  );
}
