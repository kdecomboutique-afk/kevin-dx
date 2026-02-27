"use client";

import { motion } from "framer-motion";

interface TextRevealProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
}

export default function TextReveal({
  children,
  className = "",
  as: Tag = "h2",
  delay = 0,
  staggerDelay = 0.04,
  once = true,
}: TextRevealProps) {
  const words = children.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <Tag className={className}>
      <motion.span
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount: 0.5 }}
        className="inline"
      >
        {words.map((word, i) => (
          <motion.span key={i} variants={child} className="inline-block mr-[0.25em]">
            {word}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}
