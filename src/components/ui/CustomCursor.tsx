"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 350, mass: 0.5 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Detect touch/coarse pointer devices
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) {
      setIsTouchDevice(true);
      return;
    }
    setIsTouchDevice(false);

    // Add cursor: none to body
    document.body.style.cursor = "none";

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role=\"button\"]") ||
        target.closest("input[type=\"submit\"]")
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role=\"button\"]") ||
        target.closest("input[type=\"submit\"]")
      ) {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  // Don't render on touch devices
  if (isTouchDevice) return null;

  return (
    <>
      {/* Small dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full"
        style={{
          x: springX,
          y: springY,
          width: 8,
          height: 8,
          backgroundColor: "#FF6B35",
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
      {/* Larger ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full border-2"
        style={{
          x: springX,
          y: springY,
          width: 32,
          height: 32,
          borderColor: "#1E3A5F",
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 0.6 : 0,
        }}
        animate={{
          scale: isHovering ? 1.6 : 1,
          borderColor: isHovering ? "#FF6B35" : "#1E3A5F",
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
    </>
  );
}
