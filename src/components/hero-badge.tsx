"use client";

import { OpacityAnimation } from "./MotionAnimation";

export default function HeroBadge() {
  return (
    <OpacityAnimation delay={0.5}>
      <div className="relative w-fit mx-auto overflow-visible z-50 group">
        {/* Stars animation */}
        <Stars />

        {/* Original badge */}
        <div className="bg-white/10 border hover:bg-transparent hover:backdrop-blur-none border-white/30 hover:border-white/70 transition-all duration-150 px-3 py-px text-sm sm:text-base rounded-full mb-3 w-fit  mx-auto flex gap-x-3 backdrop-blur-sm">
          Best Technical Club&apos;25 🏆
        </div>
      </div>
    </OpacityAnimation>
  );
}

// --- Stars Component ---
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

  return (
    <>
      {/* Six stars around the badge */}
      <div className="absolute top-[20%] left-[20%] w-[25px] opacity-0 group-hover:opacity-100 group-hover:-top-[80%] group-hover:-left-[30%] transition-all duration-[1000ms] ease-[cubic-bezier(0.05,0.83,0.43,0.96)] drop-shadow-[0_0_10px_#fffdef]">
        <StarSVG />
      </div>
      <div className="absolute top-[45%] left-[45%] w-[15px] opacity-0 group-hover:opacity-100 group-hover:-top-[25%] group-hover:left-[10%] transition-all duration-[1000ms] ease-[cubic-bezier(0,0.4,0,1.01)] drop-shadow-[0_0_10px_#fffdef]">
        <StarSVG />
      </div>
      <div className="absolute top-[40%] left-[40%] w-[5px] opacity-0 group-hover:opacity-100 group-hover:top-[55%] group-hover:left-[25%] transition-all duration-[1000ms] ease-[cubic-bezier(0,0.4,0,1.01)] drop-shadow-[0_0_10px_#fffdef]">
        <StarSVG />
      </div>
      <div className="absolute top-[20%] left-[40%] w-[8px] opacity-0 group-hover:opacity-100 group-hover:top-[30%] group-hover:left-[80%] transition-all duration-[800ms] ease-[cubic-bezier(0,0.4,0,1.01)] drop-shadow-[0_0_10px_#fffdef]">
        <StarSVG />
      </div>
      <div className="absolute top-[25%] left-[45%] w-[15px] opacity-0 group-hover:opacity-100 group-hover:top-[25%] group-hover:left-[115%] transition-all duration-[600ms] ease-[cubic-bezier(0,0.4,0,1.01)] drop-shadow-[0_0_10px_#fffdef]">
        <StarSVG />
      </div>
      <div className="absolute top-[5%] left-[50%] w-[5px] opacity-0 group-hover:opacity-100 group-hover:top-[5%] group-hover:left-[60%] transition-all duration-[800ms] ease-[ease] drop-shadow-[0_0_10px_#fffdef]">
        <StarSVG />
      </div>
    </>
  );
}
