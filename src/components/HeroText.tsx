"use client";
import { easeIn, easeOut, motion } from "motion/react";
import HeroBadge from "./hero-badge";
export default function HeroText() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.2,
          },
        },
      }}
      className="flex flex-col mb-3 text-5xl sm:text-8xl"
    >
      <HeroBadge />
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
          visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.3, ease: easeIn },
          },
        }}
      >
        Welcome to
      </motion.div>

      <motion.div
        variants={{
          hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
          visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.3, ease: easeOut },
          },
        }}
      >
        AIC Recruitment Portal
      </motion.div>
    </motion.div>
  );
}
