import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

interface ButtonAsButton
  extends ButtonBaseProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> {
  href?: undefined;
}

interface ButtonAsLink extends ButtonBaseProps {
  href: string;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "relative overflow-hidden bg-accent text-white hover:bg-accent-dark shadow-sm hover:shadow-lg hover:shadow-accent/20",
  secondary:
    "border-2 border-primary text-primary hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/10",
  ghost: "text-text-muted hover:text-text hover:bg-black/5",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-6 py-2.5 text-sm rounded-xl",
  lg: "px-8 py-3.5 text-base rounded-xl",
};

export default function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center font-semibold transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 hover:scale-[1.02] hover:-translate-y-[1px] active:scale-[0.98] active:translate-y-0",
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  const shimmer = variant === "primary" ? (
    <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:animate-[btn-shimmer_0.6s_ease-in-out] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
  ) : null;

  if ("href" in props && props.href !== undefined) {
    const { href, ...rest } = props as ButtonAsLink;
    return (
      <Link href={href} className={cn(classes, variant === "primary" && "group")} {...rest}>
        {shimmer}
        <span className="relative z-10">{children}</span>
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button className={cn(classes, variant === "primary" && "group")} {...buttonProps}>
      {shimmer}
      <span className="relative z-10">{children}</span>
    </button>
  );
}
