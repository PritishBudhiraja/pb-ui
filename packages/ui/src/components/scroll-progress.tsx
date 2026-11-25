"use client"

import { motion, useScroll, useSpring } from "framer-motion"
import { useReducedMotion } from "../hooks/use-reduced-motion"
import { cn } from "../lib/cn"

export function ScrollProgress({ className }: { className?: string }) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      aria-hidden
      className={cn("fixed top-0 right-0 left-0 z-[100] h-[3px] origin-left bg-primary", className)}
      style={{ scaleX: reducedMotion ? 1 : scaleX }}
    />
  )
}
