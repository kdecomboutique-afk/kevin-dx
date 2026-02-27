"use client";

import { motion } from "framer-motion";

interface LighthouseScoreProps {
  score: number;
}

function getScoreColor(score: number): string {
  if (score >= 90) return "#22C55E";
  if (score >= 70) return "#EAB308";
  return "#EF4444";
}

export default function LighthouseScore({ score }: LighthouseScoreProps) {
  const color = getScoreColor(score);
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="56" height="56" viewBox="0 0 56 56" className="-rotate-90">
        <circle
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          stroke="#E2E8F0"
          strokeWidth="4"
        />
        <motion.circle
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        />
      </svg>
      <span
        className="absolute text-xs font-bold"
        style={{ color }}
      >
        {score}
      </span>
    </div>
  );
}
