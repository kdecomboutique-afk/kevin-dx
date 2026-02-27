"use client";

import { useRef, useEffect, useState } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

interface ScrollCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  once?: boolean;
}

export default function ScrollCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 2,
  className = "",
  once = true,
}: ScrollCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, amount: 0.5 });
  const [displayValue, setDisplayValue] = useState(0);

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
    duration: duration * 1000,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(target);
    }
  }, [isInView, motionValue, target]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(Math.round(latest));
    });
    return unsubscribe;
  }, [springValue]);

  return (
    <span ref={ref} className={className}>
      {prefix}{displayValue.toLocaleString("fr-FR")}{suffix}
    </span>
  );
}
