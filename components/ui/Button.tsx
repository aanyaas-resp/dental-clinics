import Link from "next/link";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "ghostInvert";
  className?: string;
  icon?: ReactNode;
  external?: boolean;
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  icon,
  external,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300 whitespace-nowrap";

  const variants: Record<string, string> = {
    primary:
      "bg-forest text-cream hover:bg-forest-dark shadow-soft hover:shadow-card hover:-translate-y-0.5",
    secondary:
      "bg-cream text-forest border border-forest/20 hover:border-forest/50 hover:-translate-y-0.5",
    ghost: "text-forest hover:text-gold underline-offset-4 hover:underline",
    ghostInvert:
      "text-cream hover:text-gold-light underline-offset-4 hover:underline",
  };

  const content = (
    <>
      {children}
      {icon}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(base, variants[variant], className)}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      {content}
    </Link>
  );
}
