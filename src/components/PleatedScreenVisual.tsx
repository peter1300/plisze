import { useCallback, useId, useRef, type PointerEvent } from "react";
import { getColor } from "../config/colors";
import type { ColorId, OpeningMode, ProductType } from "../types";

export type SceneKind = "terrace" | "interior" | "dusk" | "minimal" | "none";

interface PleatedScreenVisualProps {
  coverage: number;
  colorId: ColorId;
  productType: ProductType;
  opening: OpeningMode;
  widthMm: number;
  heightMm: number;
  interactive?: boolean;
  onCoverageChange?: (value: number) => void;
  scene?: SceneKind;
  className?: string;
  showHandleHint?: boolean;
  fill?: boolean;
}

function shade(hex: string, amount: number): string {
  const n = hex.replace("#", "");
  const r = Math.min(255, Math.max(0, parseInt(n.slice(0, 2), 16) + amount));
  const g = Math.min(255, Math.max(0, parseInt(n.slice(2, 4), 16) + amount));
  const b = Math.min(255, Math.max(0, parseInt(n.slice(4, 6), 16) + amount));
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

function Scene({ kind, uid, height }: { kind: SceneKind; uid: string; height: number }) {
  if (kind === "none" || kind === "minimal") return null;

  const sky =
    kind === "dusk"
      ? [`#3d4a66`, `#e08a5a`, `#f2c48a`]
      : [`#6eb4ea`, `#c4e4b8`, `#f2ecc0`];
  const ground = kind === "dusk" ? "#4a5a3a" : "#5f9a46";

  return (
    <g>
      <defs>
        <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={sky[0]} />
          <stop offset="55%" stopColor={sky[1]} />
          <stop offset="100%" stopColor={sky[2]} />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="1000" height={height} fill={`url(#${uid}-sky)`} />
      <ellipse cx="180" cy={height * 0.62} rx="160" ry="220" fill={kind === "dusk" ? "#2d3a28" : "#5d7a48"} opacity="0.9" />
      <ellipse cx="820" cy={height * 0.6} rx="200" ry="260" fill={kind === "dusk" ? "#243220" : "#4f6b3d"} />
      <ellipse cx="500" cy={height * 0.66} rx="240" ry="160" fill={kind === "dusk" ? "#35462c" : "#6a8750"} opacity="0.85" />
      <rect x="0" y={height * 0.74} width="1000" height={height} fill={ground} />
      {kind === "dusk" && (
        <circle cx="760" cy="220" r="42" fill="#f2d2a8" opacity="0.9" />
      )}
    </g>
  );
}

function MeshPanel({
  x,
  y,
  panelWidth,
  height,
  coverage,
  anchor,
  uid,
  suffix,
}: {
  x: number;
  y: number;
  panelWidth: number;
  height: number;
  coverage: number;
  anchor: "left" | "right";
  uid: string;
  suffix: string;
}) {
  const foldCount = 26;
  const stack = 22;
  const width = stack + (panelWidth - stack) * coverage;
  const originX = anchor === "left" ? x : x + panelWidth - width;
  const foldW = width / foldCount;

  const folds = Array.from({ length: foldCount }, (_, i) => {
    const fx = originX + i * foldW;
    const even = i % 2 === 0;
    const lean = foldW * 0.22;
    const points = even
      ? `${fx},${y} ${fx + foldW},${y} ${fx + foldW - lean},${y + height} ${fx - lean},${y + height}`
      : `${fx + lean},${y} ${fx + foldW + lean},${y} ${fx + foldW},${y + height} ${fx},${y + height}`;
    return { points, even, fx };
  });

  return (
    <g>
      {folds.map((fold, i) => (
        <polygon
          key={`${suffix}-${i}`}
          points={fold.points}
          fill={fold.even ? "rgba(18,20,18,0.22)" : "rgba(8,10,8,0.42)"}
        />
      ))}
      <rect
        x={originX}
        y={y}
        width={width}
        height={height}
        fill={`url(#${uid}-mesh)`}
        opacity="0.55"
      />
      {folds.map((fold, i) => (
        <line
          key={`hl-${suffix}-${i}`}
          x1={fold.fx + (fold.even ? foldW * 0.15 : foldW * 0.55)}
          y1={y}
          x2={fold.fx + (fold.even ? foldW * 0.05 : foldW * 0.4)}
          y2={y + height}
          stroke="rgba(255,255,255,0.16)"
          strokeWidth="0.7"
        />
      ))}
      <line
        x1={originX}
        y1={y}
        x2={originX + width}
        y2={y}
        stroke="rgba(0,0,0,0.18)"
        strokeWidth="1"
      />
    </g>
  );
}

function Handle({
  x,
  y,
  height,
  color,
  interactive,
}: {
  x: number;
  y: number;
  height: number;
  color: string;
  interactive?: boolean;
}) {
  const mid = y + height / 2;
  return (
    <g style={{ cursor: interactive ? "ew-resize" : "default" }}>
      {interactive && (
        <rect x={x - 32} y={y} width={64} height={height} fill="transparent" />
      )}
      <rect
        x={x - 6}
        y={y}
        width={12}
        height={height}
        rx="6"
        fill={color}
        stroke={shade(color, -28)}
        strokeWidth="0.8"
      />
      <rect
        x={x - 16}
        y={mid - 36}
        width={32}
        height={72}
        rx="10"
        fill={shade(color, 22)}
        stroke="#ffffff"
        strokeWidth="2.2"
      />
      <line x1={x - 5} y1={mid - 12} x2={x - 5} y2={mid + 12} stroke={shade(color, -70)} strokeWidth="1.6" />
      <line x1={x} y1={mid - 14} x2={x} y2={mid + 14} stroke={shade(color, -70)} strokeWidth="1.6" />
      <line x1={x + 5} y1={mid - 12} x2={x + 5} y2={mid + 12} stroke={shade(color, -70)} strokeWidth="1.6" />
    </g>
  );
}

export function PleatedScreenVisual({
  coverage,
  colorId,
  productType,
  opening,
  widthMm,
  heightMm,
  interactive = false,
  onCoverageChange,
  scene = "terrace",
  className = "",
  showHandleHint = false,
  fill = false,
}: PleatedScreenVisualProps) {
  const uid = useId().replace(/:/g, "");
  const svgRef = useRef<SVGSVGElement>(null);
  const dragging = useRef<"left" | "right" | "single" | null>(null);
  const color = getColor(colorId);

  const aspect = Math.min(2.1, Math.max(0.45, widthMm / heightMm));
  const innerW = fill ? 900 : 780;
  const innerH = innerW / aspect;
  const frame = fill ? 14 : 16;
  const track = 10;
  const openingX = (1000 - innerW) / 2;
  const openingY = fill ? 28 : scene === "none" || scene === "minimal" ? 48 : 64;
  const wallPad = fill ? 20 : 36;
  const vbH = openingY + innerH + (fill ? 36 : 72);

  const glassX = openingX + frame;
  const glassY = openingY + frame;
  const glassW = innerW - frame * 2;
  const glassH = innerH - frame * 2 - track;

  const isDouble = productType === "double" || opening === "center";
  const c = Math.min(1, Math.max(0.08, coverage));

  const clientToSvgX = useCallback((clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return null;
    const ctm = svg.getScreenCTM();
    if (!ctm) return null;
    return new DOMPoint(clientX, clientY).matrixTransform(ctm.inverse()).x;
  }, []);

  const mapPointer = useCallback(
    (clientX: number, clientY: number, which: "left" | "right" | "single") => {
      const x = clientToSvgX(clientX, clientY);
      if (x == null) return;
      const local = (x - glassX) / glassW;

      if (which === "single") {
        const next = opening === "rtl" ? 1 - local : local;
        onCoverageChange?.(Math.min(1, Math.max(0.08, next)));
        return;
      }
      if (which === "left") {
        onCoverageChange?.(Math.min(1, Math.max(0.08, local * 2)));
        return;
      }
      onCoverageChange?.(Math.min(1, Math.max(0.08, (1 - local) * 2)));
    },
    [clientToSvgX, glassW, glassX, onCoverageChange, opening],
  );

  const resolveWhich = useCallback(
    (clientX: number, clientY: number): "left" | "right" | "single" => {
      if (!isDouble) return "single";
      const x = clientToSvgX(clientX, clientY);
      if (x == null) return "left";
      return x < glassX + glassW / 2 ? "left" : "right";
    },
    [clientToSvgX, glassW, glassX, isDouble],
  );

  const onDown = (which: "left" | "right" | "single") => (e: PointerEvent<SVGElement>) => {
    if (!interactive || !onCoverageChange) return;
    e.preventDefault();
    dragging.current = which;
    svgRef.current?.setPointerCapture(e.pointerId);
    mapPointer(e.clientX, e.clientY, which);
  };

  const onGlassDown = (e: PointerEvent<SVGRectElement>) => {
    if (!interactive || !onCoverageChange) return;
    e.preventDefault();
    const which = resolveWhich(e.clientX, e.clientY);
    dragging.current = which;
    svgRef.current?.setPointerCapture(e.pointerId);
    mapPointer(e.clientX, e.clientY, which);
  };

  const onMove = (e: PointerEvent<SVGElement>) => {
    if (!dragging.current) return;
    mapPointer(e.clientX, e.clientY, dragging.current);
  };

  const onUp = () => {
    dragging.current = null;
  };

  const stack = 22;
  const singleWidth = stack + (glassW - stack) * c;
  const handleX =
    opening === "rtl" ? glassX + glassW - singleWidth : glassX + singleWidth;

  const leftPanelW = glassW / 2;
  const leftWidth = stack + (leftPanelW - stack) * c;
  const rightWidth = stack + (leftPanelW - stack) * c;

  const wallColor = scene === "dusk" ? "#2a2a2c" : scene === "interior" ? "#efece6" : "#f3f1ec";
  const floorColor = scene === "dusk" ? "#1c1c1e" : "#d8cfc3";

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 1000 ${vbH}`}
      preserveAspectRatio={fill ? "xMidYMid slice" : "xMidYMid meet"}
      className={`block select-none ${interactive ? "touch-none" : ""} ${fill ? "h-full w-full" : "h-auto w-full"} ${className}`}
      role="img"
      aria-label="Pliszé szúnyogháló előnézet"
      onPointerMove={interactive ? onMove : undefined}
      onPointerUp={interactive ? onUp : undefined}
      onPointerCancel={interactive ? onUp : undefined}
    >
      <defs>
        <pattern id={`${uid}-mesh`} width="5" height="5" patternUnits="userSpaceOnUse">
          <path d="M0 0L5 5M5 0L0 5" stroke="rgba(0,0,0,0.22)" strokeWidth="0.45" />
        </pattern>
        <linearGradient id={`${uid}-frame`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={shade(color.hex, 28)} />
          <stop offset="45%" stopColor={color.hex} />
          <stop offset="100%" stopColor={color.metal} />
        </linearGradient>
        <linearGradient id={`${uid}-glass`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
        </linearGradient>
        <filter id={`${uid}-soft`} x="-5%" y="-5%" width="110%" height="120%">
          <feDropShadow dx="0" dy="18" stdDeviation="18" floodColor="#000" floodOpacity="0.12" />
        </filter>
      </defs>

      <Scene kind={scene} uid={uid} height={vbH} />

      {(scene === "terrace" || scene === "dusk" || scene === "interior") && (
        <>
          <rect x="0" y={openingY + innerH - 8} width="1000" height={vbH} fill={floorColor} />
          <rect x="0" y="0" width="1000" height={openingY + 8} fill={wallColor} />
          <rect x="0" y="0" width={openingX - wallPad + 8} height={vbH} fill={wallColor} />
          <rect
            x={openingX + innerW + wallPad - 8}
            y="0"
            width={1000 - openingX - innerW}
            height={vbH}
            fill={wallColor}
          />
        </>
      )}

      {scene === "minimal" && (
        <rect x="0" y="0" width="1000" height={vbH} fill="#f5f5f7" />
      )}

      <g filter={`url(#${uid}-soft)`}>
        <rect
          x={openingX}
          y={openingY}
          width={innerW}
          height={innerH}
          fill={`url(#${uid}-frame)`}
        />
        <rect
          x={glassX}
          y={glassY}
          width={glassW}
          height={glassH}
          fill="transparent"
        />
        {scene === "none" && (
          <rect x={glassX} y={glassY} width={glassW} height={glassH} fill="#eef2f4" />
        )}
        <rect
          x={glassX}
          y={glassY}
          width={glassW}
          height={glassH}
          fill={`url(#${uid}-glass)`}
        />

        <rect
          x={glassX}
          y={glassY + glassH}
          width={glassW}
          height={track}
          fill={shade(color.hex, -12)}
        />
        <rect
          x={glassX}
          y={glassY + glassH + 2}
          width={glassW}
          height={3}
          fill={shade(color.hex, 30)}
          opacity="0.45"
        />

        {isDouble ? (
          <>
            <MeshPanel
              x={glassX}
              y={glassY}
              panelWidth={leftPanelW}
              height={glassH}
              coverage={c}
              anchor="left"
              uid={uid}
              suffix="l"
            />
            <MeshPanel
              x={glassX + leftPanelW}
              y={glassY}
              panelWidth={leftPanelW}
              height={glassH}
              coverage={c}
              anchor="right"
              uid={uid}
              suffix="r"
            />
            <g
              onPointerDown={onDown("left")}
              onPointerMove={onMove}
              onPointerUp={onUp}
              onPointerCancel={onUp}
            >
              <Handle
                x={glassX + leftWidth}
                y={glassY}
                height={glassH}
                color={color.hex}
                interactive={interactive}
              />
            </g>
            <g
              onPointerDown={onDown("right")}
              onPointerMove={onMove}
              onPointerUp={onUp}
              onPointerCancel={onUp}
            >
              <Handle
                x={glassX + glassW - rightWidth}
                y={glassY}
                height={glassH}
                color={color.hex}
                interactive={interactive}
              />
            </g>
          </>
        ) : (
          <>
            <MeshPanel
              x={glassX}
              y={glassY}
              panelWidth={glassW}
              height={glassH}
              coverage={c}
              anchor={opening === "rtl" ? "right" : "left"}
              uid={uid}
              suffix="s"
            />
            <g
              onPointerDown={onDown("single")}
              onPointerMove={onMove}
              onPointerUp={onUp}
              onPointerCancel={onUp}
            >
              <Handle
                x={handleX}
                y={glassY}
                height={glassH}
                color={color.hex}
                interactive={interactive}
              />
            </g>
          </>
        )}
        {interactive && onCoverageChange && (
          <rect
            x={glassX}
            y={glassY}
            width={glassW}
            height={glassH}
            fill="white"
            fillOpacity={0.001}
            style={{ cursor: "ew-resize" }}
            onPointerDown={onGlassDown}
          />
        )}
      </g>

      {showHandleHint && interactive && (
        <text
          x="500"
          y={openingY + innerH + 48}
          textAnchor="middle"
          fill="#6e6e73"
          fontSize="18"
          fontFamily="Inter, sans-serif"
        >
          Húzd a fogantyút — nyisd vagy zárd a hálót
        </text>
      )}
    </svg>
  );
}
