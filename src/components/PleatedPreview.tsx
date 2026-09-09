import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef } from "react";

const FOLDS = 40;

function AccordionMesh({ colorHex }: { colorHex: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 flex overflow-hidden mix-blend-multiply">
      {Array.from({ length: FOLDS }, (_, i) => (
        <div
          key={i}
          className="h-full min-w-0 flex-1"
          style={{
            background:
              i % 2 === 0
                ? "linear-gradient(90deg, rgba(16,18,17,0.62) 0%, rgba(52,56,52,0.22) 48%, rgba(18,20,19,0.55) 100%)"
                : "linear-gradient(90deg, rgba(22,24,22,0.4) 0%, rgba(78,82,76,0.1) 50%, rgba(24,26,24,0.36) 100%)",
          }}
        />
      ))}
      <div
        className="absolute inset-0 opacity-35"
        style={{
          backgroundImage: "radial-gradient(rgba(8,10,9,0.55) 0.45px, transparent 0.55px)",
          backgroundSize: "2.4px 2.4px",
        }}
      />
      <div
        className="absolute inset-y-[3%] right-0 w-[7px] rounded-[1px] shadow-[2px_0_10px_rgba(0,0,0,0.28)]"
        style={{ background: colorHex }}
      />
    </div>
  );
}

export function PleatedPreview({
  photo,
  netPhoto,
  coverage,
  onCoverageChange,
  interactive = false,
  colorHex = "#3A3A3C",
  className = "",
  alt = "Pliszé szúnyogháló előnézet",
  showFrame = true,
  inset,
  objectPosition = "center",
}: {
  photo: string;
  netPhoto?: string;
  coverage: number;
  onCoverageChange?: (value: number) => void;
  interactive?: boolean;
  colorHex?: string;
  className?: string;
  alt?: string;
  showFrame?: boolean;
  inset?: { top: number; right: number; bottom: number; left: number };
  objectPosition?: string;
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
      /* window listeners still track the drag */
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

  const glass = inset ?? { top: 0, right: 0, bottom: 0, left: 0 };
  const glassWidth = 100 - glass.left - glass.right;
  const shown = glassWidth * c;
  const clipRight = 100 - glass.left - shown;

  return (
    <div
      ref={ref}
      className={`relative select-none overflow-hidden ${interactive ? "touch-none cursor-ew-resize" : ""} ${className}`}
      onPointerDown={interactive ? beginDrag : undefined}
    >
      <img
        src={photo}
        alt={alt}
        className="pointer-events-none h-full w-full object-cover"
        style={{ objectPosition }}
        draggable={false}
      />
      {netPhoto && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{ clipPath: `inset(${glass.top}% ${clipRight}% ${glass.bottom}% ${glass.left}%)` }}
        >
          <img
            src={netPhoto}
            alt=""
            className="h-full w-full object-cover"
            style={{ objectPosition }}
            draggable={false}
          />
        </div>
      )}
      {showFrame && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{ boxShadow: `inset 0 0 0 10px ${colorHex}` }}
        />
      )}
      <div
        ref={glassRef}
        className="absolute overflow-hidden"
        style={{
          top: `${glass.top}%`,
          right: `${glass.right}%`,
          bottom: `${glass.bottom}%`,
          left: `${glass.left}%`,
        }}
      >
        {!netPhoto && (
          <div className="absolute inset-y-0 left-0" style={{ width: `${c * 100}%` }}>
            <AccordionMesh colorHex={colorHex} />
          </div>
        )}
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
            <div
              className="pointer-events-none absolute inset-y-[2%] left-1/2 w-[6px] -translate-x-1/2 rounded-[1px] shadow-[2px_0_12px_rgba(0,0,0,0.3)]"
              style={{ background: colorHex }}
            />
            <div className="pointer-events-none relative flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-[0_8px_28px_rgba(0,0,0,0.18)]">
              <ChevronLeft size={15} strokeWidth={2} className="text-ink" />
              <ChevronRight size={15} strokeWidth={2} className="-ml-1 text-ink" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
