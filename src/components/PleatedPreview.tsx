import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef } from "react";

export function PleatedPreview({
  photo,
  coverage,
  onCoverageChange,
  interactive = false,
  colorHex = "#3A3A3C",
  className = "",
  alt = "Pliszé szúnyogháló előnézet",
  showFrame = true,
  inset,
}: {
  photo: string;
  coverage: number;
  onCoverageChange?: (value: number) => void;
  interactive?: boolean;
  colorHex?: string;
  className?: string;
  alt?: string;
  showFrame?: boolean;
  inset?: { top: number; right: number; bottom: number; left: number };
}) {
  const ref = useRef<HTMLDivElement>(null);
  const glassRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const onChangeRef = useRef(onCoverageChange);
  const c = Math.min(0.92, Math.max(0.08, coverage));

  onChangeRef.current = onCoverageChange;

  const map = (clientX: number) => {
    const el = glassRef.current ?? ref.current;
    const update = onChangeRef.current;
    if (!el || !update) return;
    const r = el.getBoundingClientRect();
    if (r.width <= 0) return;
    update(Math.min(0.92, Math.max(0.08, (clientX - r.left) / r.width)));
  };

  const beginDrag = (e: React.PointerEvent) => {
    if (!interactive) return;
    dragging.current = true;
    e.preventDefault();
    e.stopPropagation();
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      /* capture is optional; window listeners still track the drag */
    }
    map(e.clientX);
  };

  useEffect(() => {
    if (!interactive) return;

    const move = (e: PointerEvent) => {
      if (!dragging.current) return;
      e.preventDefault();
      map(e.clientX);
    };
    const end = () => {
      dragging.current = false;
    };

    window.addEventListener("pointermove", move, { passive: false });
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", end);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", end);
      window.removeEventListener("pointercancel", end);
    };
  }, [interactive]);

  return (
    <div
      ref={ref}
      className={`relative select-none overflow-hidden ${interactive ? "touch-none cursor-ew-resize" : ""} ${className}`}
      onPointerDown={interactive ? beginDrag : undefined}
    >
      <img src={photo} alt={alt} className="pointer-events-none h-full w-full object-cover" draggable={false} />
      {showFrame && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{ boxShadow: `inset 0 0 0 10px ${colorHex}` }}
        />
      )}
      <div
        ref={glassRef}
        className="absolute overflow-hidden"
        style={
          inset
            ? {
                top: `${inset.top}%`,
                right: `${inset.right}%`,
                bottom: `${inset.bottom}%`,
                left: `${inset.left}%`,
              }
            : { inset: 0 }
        }
      >
        <div className="pointer-events-none absolute inset-y-0 left-0" style={{ width: `${c * 100}%` }}>
          <div
            className="h-full w-full"
            style={{
              background:
                "repeating-linear-gradient(90deg, rgba(22,24,22,0.38) 0px, rgba(22,24,22,0.38) 5px, rgba(10,12,10,0.58) 5px, rgba(10,12,10,0.58) 10px)",
            }}
          />
        </div>
        {interactive && (
          <div
            className="absolute inset-y-0 z-20 flex w-16 -translate-x-1/2 cursor-ew-resize touch-none items-center justify-center"
            style={{ left: `${c * 100}%` }}
            onPointerDown={beginDrag}
            role="slider"
            aria-label="Szúnyogháló húzása"
            aria-valuemin={8}
            aria-valuemax={92}
            aria-valuenow={Math.round(c * 100)}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") {
                e.preventDefault();
                onChangeRef.current?.(Math.max(0.08, c - 0.06));
              }
              if (e.key === "ArrowRight") {
                e.preventDefault();
                onChangeRef.current?.(Math.min(0.92, c + 0.06));
              }
            }}
          >
            <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/95" />
            <div className="pointer-events-none relative flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-[0_8px_28px_rgba(0,0,0,0.18)]">
              <ChevronLeft size={16} strokeWidth={2} className="text-ink" />
              <ChevronRight size={16} strokeWidth={2} className="-ml-1 text-ink" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
