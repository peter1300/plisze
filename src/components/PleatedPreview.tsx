import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

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
  const c = Math.min(0.92, Math.max(0.08, coverage));

  const map = (clientX: number) => {
    const el = glassRef.current ?? ref.current;
    if (!el || !onCoverageChange) return;
    const r = el.getBoundingClientRect();
    onCoverageChange(Math.min(0.92, Math.max(0.08, (clientX - r.left) / r.width)));
  };

  return (
    <div
      ref={ref}
      className={`relative select-none overflow-hidden ${interactive ? "touch-none cursor-ew-resize" : ""} ${className}`}
      onPointerDown={
        interactive
          ? (e) => {
              dragging.current = true;
              e.currentTarget.setPointerCapture(e.pointerId);
              map(e.clientX);
            }
          : undefined
      }
      onPointerMove={
        interactive
          ? (e) => {
              if (dragging.current) map(e.clientX);
            }
          : undefined
      }
      onPointerUp={() => {
        dragging.current = false;
      }}
      onPointerCancel={() => {
        dragging.current = false;
      }}
    >
      <img src={photo} alt={alt} className="h-full w-full object-cover" draggable={false} />
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
          <div className="pointer-events-none absolute inset-y-0 z-10" style={{ left: `${c * 100}%` }}>
            <div className="absolute inset-y-0 w-px -translate-x-1/2 bg-white/95" />
            <div className="absolute top-1/2 left-0 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_8px_28px_rgba(0,0,0,0.18)]">
              <ChevronLeft size={16} strokeWidth={2} className="text-ink" />
              <ChevronRight size={16} strokeWidth={2} className="-ml-1 text-ink" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
