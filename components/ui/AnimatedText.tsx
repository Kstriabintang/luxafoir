"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  /** Stagger per word, seconds. */
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Word-by-word reveal for headlines. Each word rises and fades with a
 * staggered delay — the cinematic hero treatment. Use `\n` to force a line break.
 */
export function AnimatedText({
  text,
  className,
  delay = 0,
  stagger = 0.06,
  as: Tag = "span",
}: AnimatedTextProps) {
  const lines = text.split("\n");
  let wordIndex = 0;

  const MotionTag = motion[Tag];

  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { delayChildren: delay, staggerChildren: stagger } } }}
    >
      {lines.map((line, li) => (
        <span key={li} className="block overflow-hidden">
          {line.split(" ").map((word) => {
            const i = wordIndex++;
            return (
              <span key={i} className="inline-block overflow-hidden align-top">
                <motion.span
                  className="inline-block"
                  variants={{
                    hidden: { y: "110%", opacity: 0 },
                    show: { y: "0%", opacity: 1, transition: { duration: 0.8, ease: EASE } },
                  }}
                >
                  {word}
                  {" "}
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </MotionTag>
  );
}
