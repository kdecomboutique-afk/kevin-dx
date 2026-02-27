"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "sm" | "md" | "lg";
}

const paddingClasses = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export default function Card({
  children,
  className,
  hover = true,
  padding = "md",
}: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hover || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;
    setTransform(`perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`);
  };

  const handleMouseLeave = () => {
    setTransform("");
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative rounded-2xl border border-border bg-white",
        paddingClasses[padding],
        hover &&
          "transition-all duration-300 hover:shadow-lg hover:shadow-accent/5 hover:border-accent/20",
        className
      )}
      style={{
        transform: transform || undefined,
        transition: "transform 0.2s ease-out, box-shadow 0.3s ease, border-color 0.3s ease",
      }}
    >
      {children}
    </div>
  );
}
