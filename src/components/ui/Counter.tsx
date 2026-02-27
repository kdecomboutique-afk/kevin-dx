"use client";

import { cn } from "@/lib/utils";
import AnimatedCounter from "@/components/animations/AnimatedCounter";

interface CounterProps {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export default function Counter({
  value,
  label,
  prefix = "",
  suffix = "",
  className,
}: CounterProps) {
  return (
    <div className={cn("text-center", className)}>
      <div className="relative font-heading text-5xl font-extrabold text-white sm:text-6xl drop-shadow-[0_0_15px_rgba(255,107,53,0.3)]">
        <AnimatedCounter
          target={value}
          prefix={prefix}
          suffix={suffix}
          duration={2}
        />
      </div>
      <p className="mt-3 text-sm font-medium text-gray-400 sm:text-base">{label}</p>
    </div>
  );
}
