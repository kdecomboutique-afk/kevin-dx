"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right";

interface FadeInProps {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number;
  scale?: boolean;
}

function getDirectionOffset(direction: Direction): { x: number; y: number } {
  switch (direction) {
    case "up":
      return { x: 0, y: 30 };
    case "down":
      return { x: 0, y: -30 };
    case "left":
      return { x: 30, y: 0 };
    case "right":
      return { x: -30, y: 0 };
  }
}

export default function FadeIn({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  className,
  once = true,
  amount = 0.2,
  scale = false,
}: FadeInProps) {
  const offset = getDirectionOffset(direction);

  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: offset.x,
      y: offset.y,
      ...(scale && { scale: 0.95 }),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      ...(scale && { scale: 1 }),
      transition: {
        duration,
        delay,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
