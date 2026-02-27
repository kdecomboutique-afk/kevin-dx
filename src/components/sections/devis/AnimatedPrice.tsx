"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

export default function AnimatedPrice({
  value,
  suffix,
  className,
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const motionVal = useMotionValue(value);
  const springVal = useSpring(motionVal, {
    stiffness: 120,
    damping: 25,
    mass: 0.8,
  });
  const display = useTransform(springVal, (v) =>
    new Intl.NumberFormat("fr-FR").format(Math.round(v))
  );

  motionVal.set(value);

  return (
    <span className={className}>
      <motion.span>{display}</motion.span>
      {" €"}
      {suffix && <span className="text-base font-normal">{suffix}</span>}
    </span>
  );
}
