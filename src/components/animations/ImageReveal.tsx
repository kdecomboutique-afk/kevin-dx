"use client";

import { motion } from "framer-motion";

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  direction?: "left" | "right" | "up" | "down";
  delay?: number;
  duration?: number;
  once?: boolean;
}

const clipPaths = {
  left: { hidden: "inset(0 100% 0 0)", visible: "inset(0 0% 0 0)" },
  right: { hidden: "inset(0 0 0 100%)", visible: "inset(0 0 0 0%)" },
  up: { hidden: "inset(100% 0 0 0)", visible: "inset(0% 0 0 0)" },
  down: { hidden: "inset(0 0 100% 0)", visible: "inset(0 0 0% 0)" },
};

export default function ImageReveal({
  src,
  alt,
  className = "",
  direction = "left",
  delay = 0,
  duration = 0.8,
  once = true,
}: ImageRevealProps) {
  const clip = clipPaths[direction];

  return (
    <motion.div
      initial={{ clipPath: clip.hidden, opacity: 0.8 }}
      whileInView={{ clipPath: clip.visible, opacity: 1 }}
      viewport={{ once, amount: 0.3 }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      <motion.img
        src={src}
        alt={alt}
        initial={{ scale: 1.2 }}
        whileInView={{ scale: 1 }}
        viewport={{ once, amount: 0.3 }}
        transition={{ duration: duration * 1.5, delay, ease: [0.22, 1, 0.36, 1] }}
        className="h-full w-full object-cover"
      />
    </motion.div>
  );
}
