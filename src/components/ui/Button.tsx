import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";

const variants = {
  primary:
    "inline-flex h-11 items-center justify-center gap-1.5 rounded-full bg-gold px-5 text-[12px] font-black tracking-[0.08em] uppercase text-ink transition hover:bg-gold-dark",
  secondary:
    "inline-flex h-11 items-center justify-center gap-1.5 rounded-full bg-ink px-5 text-[12px] font-black tracking-[0.08em] uppercase text-white transition hover:bg-black",
  outline:
    "inline-flex h-11 items-center justify-center gap-1.5 rounded-full border border-line bg-white px-5 text-[12px] font-black tracking-[0.08em] uppercase text-ink transition hover:bg-surface",
  ghost:
    "inline-flex h-11 items-center justify-center gap-1.5 rounded-full border border-white/40 bg-white/10 px-5 text-[12px] font-black tracking-[0.08em] uppercase text-white backdrop-blur-sm transition hover:bg-white/20",
} as const;

type Variant = keyof typeof variants;

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button className={`${variants[variant]} ${className}`} {...props} />;
}

export function ButtonLink({
  to,
  variant = "primary",
  className = "",
  children,
  onClick,
}: {
  to: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  const cls = `${variants[variant]} ${className}`;
  if (to.startsWith("#") || to.startsWith("http") || to.startsWith("mailto") || to.startsWith("tel")) {
    return (
      <a href={to} className={cls} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <Link to={to} className={cls} onClick={onClick}>
      {children}
    </Link>
  );
}
