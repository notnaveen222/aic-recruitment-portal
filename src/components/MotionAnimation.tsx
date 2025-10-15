"use client";
import { easeOut, motion } from "motion/react";
export function OpacityAnimation({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 0.4,
        ease: easeOut,
        delay: delay ? delay : 0,
      }}
    >
      {children}
    </motion.div>
  );
}

export function FadeUpAnimation({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
        ease: easeOut,
        delay: delay ? delay : 0,
      }}
    >
      {children}
    </motion.div>
  );
}

export function FadeDownAnimation({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
        ease: easeOut,
        delay: delay ? delay : 0,
      }}
    >
      {children}
    </motion.div>
  );
}
