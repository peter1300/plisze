import type { OpeningMode, ProductType } from "../types";

export function MiniProductArt({
  type,
  opening = "ltr",
  color = "#3A3A3C",
}: {
  type: ProductType;
  opening?: OpeningMode;
  color?: string;
}) {
  if (type === "double" || opening === "center") {
    return (
      <svg viewBox="0 0 220 150" className="h-auto w-full" aria-hidden="true">
        <rect x="8" y="8" width="204" height="134" fill="none" stroke={color} strokeWidth="5" />
        <rect x="16" y="128" width="188" height="6" fill={color} opacity="0.7" />
        {Array.from({ length: 10 }, (_, i) => (
          <rect key={`l${i}`} x={18 + i * 8} y="16" width="6" height="112" fill={color} opacity={i % 2 ? 0.18 : 0.32} />
        ))}
        {Array.from({ length: 10 }, (_, i) => (
          <rect key={`r${i}`} x={122 + i * 8} y="16" width="6" height="112" fill={color} opacity={i % 2 ? 0.18 : 0.32} />
        ))}
        <rect x="96" y="16" width="5" height="112" fill={color} />
        <rect x="119" y="16" width="5" height="112" fill={color} />
      </svg>
    );
  }

  if (type === "window") {
    return (
      <svg viewBox="0 0 220 150" className="h-auto w-full" aria-hidden="true">
        <rect x="38" y="18" width="144" height="114" fill="none" stroke={color} strokeWidth="5" />
        {Array.from({ length: 16 }, (_, i) => (
          <rect
            key={i}
            x={46 + i * 8}
            y="26"
            width="5.5"
            height="90"
            fill={color}
            opacity={i % 2 ? 0.16 : 0.3}
          />
        ))}
        <rect x="168" y="26" width="5" height="90" fill={color} />
      </svg>
    );
  }

  const fromRight = opening === "rtl";
  return (
    <svg viewBox="0 0 220 150" className="h-auto w-full" aria-hidden="true">
      <rect x="18" y="8" width="184" height="134" fill="none" stroke={color} strokeWidth="5" />
      <rect x="26" y="128" width="168" height="6" fill={color} opacity="0.7" />
      {Array.from({ length: 14 }, (_, i) => {
        const x = fromRight ? 178 - i * 9 : 28 + i * 9;
        return (
          <rect key={i} x={x} y="16" width="7" height="112" fill={color} opacity={i % 2 ? 0.16 : 0.32} />
        );
      })}
      <rect x={fromRight ? 56 : 152} y="16" width="5" height="112" fill={color} />
    </svg>
  );
}
