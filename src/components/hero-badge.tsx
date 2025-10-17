"use client";

import { OpacityAnimation } from "./MotionAnimation";
import { motion } from "motion/react";

export default function HeroBadge() {
  return (
    <OpacityAnimation delay={0.5}>
      <div className="relative w-fit mx-auto overflow-visible z-50 group">
        <OpacityAnimation delay={0.5}>
          <Stars />
        </OpacityAnimation>
        <div className="bg-white/10 border hover:bg-transparent hover:backdrop-blur-xs border-white/30 hover:border-white/70 transition-all duration-150 px-3 py-px text-sm sm:text-base rounded-full mb-3 w-fit mx-auto flex gap-x-3 backdrop-blur-xs">
          Best Technical Club&apos;25 🏆
        </div>
      </div>
    </OpacityAnimation>
  );
}

function Stars() {
  const StarSVG = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 784.11 815.53"
      className="w-full h-full fill-[#fffdef]"
    >
      <path d="M392.05 0c-20.9 210.08-184.06 378.41-392.05 407.78 207.96 29.37 371.12 197.68 392.05 407.74 20.93-210.06 184.09-378.37 392.05-407.74-207.98-29.38-371.16-197.69-392.06-407.78z" />
    </svg>
  );
  const offset = 5;
  return (
    <>
      <motion.div
        animate={{
          y: [0, -offset, offset, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
        className="absolute  top-[-80%] left-[-10%] sm:left-[-30%] w-[10px] sm:w-[25px] opacity-100 drop-shadow-[0_0_10px_#fffdef]"
      >
        <StarSVG />
      </motion.div>

      <motion.div
        animate={{
          x: [0, -offset, offset, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
        className="absolute top-[120%] left-[35%] sm:left-[20%] w-[15px] opacity-100 drop-shadow-[0_0_10px_#fffdef]"
      >
        <StarSVG />
      </motion.div>

      <motion.div
        animate={{
          y: [0, offset, -offset, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
        className="absolute top-[55%] left-[10%] sm:left-[25%] w-[5px] opacity-100 drop-shadow-[0_0_10px_#fffdef]"
      >
        <StarSVG />
      </motion.div>

      <motion.div
        animate={{ x: [1, -2, 1], y: [-1, 2, -1] }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        className="absolute top-[30%] left-[80%] w-[8px] opacity-100 drop-shadow-[0_0_10px_#fffdef]"
      >
        <StarSVG />
      </motion.div>

      <motion.div
        animate={{ x: [-2, 3, -2], y: [1, -3, 1] }}
        transition={{
          duration: 7,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        className="absolute top-[-50%] sm:top-[25%] left-[102%] sm:left-[115%] w-[15px] opacity-100 drop-shadow-[0_0_10px_#fffdef]"
      >
        <StarSVG />
      </motion.div>

      <motion.div
        animate={{ x: [1, -1, 1], y: [1, -1, 1] }}
        transition={{
          duration: 6.5,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        className="absolute top-[5%] left-[60%] w-[5px] opacity-100 drop-shadow-[0_0_10px_#fffdef]"
      >
        <StarSVG />
      </motion.div>
    </>
  );
}
