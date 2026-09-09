import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";

const variants = {
  primary:
    "inline-flex h-11 items-center justify-center gap-1.5 rounded-[12px] bg-ink px-5 text-[15px] font-medium text-white transition hover:bg-black",
  secondary:
    "inline-flex h-11 items-center justify-center gap-1.5 rounded-[12px] border border-[#d2d2d7] bg-white px-5 text-[15px] font-medium text-ink transition hover:bg-surface",
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
