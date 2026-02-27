import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "success";
  pulse?: boolean;
  className?: string;
}

const variantClasses = {
  default: "bg-primary/10 text-primary",
  accent: "bg-accent/10 text-accent",
  success: "bg-green-100 text-green-700",
};

export default function Badge({
  children,
  variant = "default",
  pulse = false,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold animate-[badge-enter_0.4s_ease-out_both]",
        variantClasses[variant],
        pulse && "animate-[badge-pulse_2s_ease-in-out_infinite]",
        className
      )}
    >
      {children}
    </span>
  );
}
