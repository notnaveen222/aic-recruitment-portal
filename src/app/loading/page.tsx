import { GridPattern } from "@/components/patter-bg";
import { cn } from "@/lib/utils";

export default function Loading() {
  return (
    <div className="w-screen overflow-x-hidden">
      <div className="relative flex font-medium justify-center gap-x-28 pt-16 sm:pt-52">
        <svg
          className="h-full relative -top-0"
          xmlns="http://www.w3.org/2000/svg"
          width="70"
          height="568"
          viewBox="0 0 89 568"
          fill="none"
        >
          <path
            d="M1 0.23938V207.654L88 285.695C88 285.695 87.5 493.945 88 567.813"
            stroke="url(#animation_gradient_left)"
            strokeWidth="2"
            opacity="1"
          ></path>

          <path
            d="M1 0.23938V207.654L88 285.695C88 285.695 87.5 493.945 88 567.813"
            stroke="url(#paint0_linear_left)"
            strokeWidth="1.5"
          ></path>

          <defs>
            {/* ANIMATED GRADIENT (traveling particle) */}
            <linearGradient
              id="animation_gradient_left"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
              gradientUnits="objectBoundingBox"
            >
              <stop offset="0%" stopColor="white" stopOpacity="0">
                <animate
                  attributeName="offset"
                  values="-0.2; 1.2"
                  dur="2.5s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="10%" stopColor="white" stopOpacity="1">
                <animate
                  attributeName="offset"
                  values="0; 1.4"
                  dur="2.5s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="20%" stopColor="white" stopOpacity="0">
                <animate
                  attributeName="offset"
                  values="0.2; 1.6"
                  dur="2.5s"
                  repeatCount="indefinite"
                />
              </stop>
            </linearGradient>

            {/* GREY STATIC BACK PATH */}
            <linearGradient
              id="paint0_linear_left"
              x1="1"
              y1="4.50012"
              x2="1"
              y2="568"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#6F6F6F" stopOpacity="0" />
              <stop offset="0.1" stopColor="#6F6F6F" stopOpacity="0.3" />
              <stop offset="0.8" stopColor="#6F6F6F" stopOpacity="1" />
              <stop offset="1" stopColor="#6F6F6F" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
        <div className=" left-0 absolute top-40 sm:top-32 lg:top-10 flex size-full items-center justify-center overflow-hidden z-0 p-20 opacity-70">
          <div className="block sm:hidden">
            <GridPattern
              width={18}
              height={18}
              x={-1}
              y={-1}
              className={cn(
                "[mask-image:radial-gradient(200px_150px_at_center,white,transparent)] "
              )}
            />
          </div>
          <div className="hidden sm:block">
            <GridPattern
              width={25}
              height={25}
              x={-1}
              y={-1}
              className={cn(
                "[mask-image:radial-gradient(350px_160px_at_center,white,transparent)] md:[mask-image:radial-gradient(500px_200px_at_center,white,transparent)]"
              )}
            />
          </div>
        </div>
        <div className="text-center text-shadow-lg/80 pt-52 sm:pt-40 z-10 flex  flex-col">
          <div className="text-5xl sm:text-6xl lg:text-8xl">
            Artifical Intelligence Club
          </div>
        </div>
        <svg
          className="relative -top-0 h-full"
          xmlns="http://www.w3.org/2000/svg"
          width="70"
          height="568"
          viewBox="0 0 89 568"
          fill="none"
        >
          <path
            d="M88 0.23938V207.654L1 285.695C1 285.695 1.5 493.945 1 567.813"
            stroke="url(#animation_gradient_right)"
            strokeWidth="2"
            opacity="1"
          ></path>

          <path
            d="M88 0.23938V207.654L1 285.695C1 285.695 1.5 493.945 1 567.813"
            stroke="url(#paint0_linear_right)"
            strokeWidth="1.5"
          ></path>

          <defs>
            {/* ANIMATED GRADIENT (traveling particle) */}
            <linearGradient
              id="animation_gradient_right"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
              gradientUnits="objectBoundingBox"
            >
              <stop offset="0%" stopColor="white" stopOpacity="0">
                <animate
                  attributeName="offset"
                  values="-0.2; 1.2"
                  dur="2.5s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="10%" stopColor="white" stopOpacity="1">
                <animate
                  attributeName="offset"
                  values="0; 1.4"
                  dur="2.5s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="20%" stopColor="white" stopOpacity="0">
                <animate
                  attributeName="offset"
                  values="0.2; 1.6"
                  dur="2.5s"
                  repeatCount="indefinite"
                />
              </stop>
            </linearGradient>

            {/* GREY STATIC BACK PATH */}
            <linearGradient
              id="paint0_linear_right"
              x1="88"
              y1="4.50012"
              x2="88"
              y2="568"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#6F6F6F" stopOpacity="0" />
              <stop offset="0.1" stopColor="#6F6F6F" stopOpacity="0.3" />
              <stop offset="0.8" stopColor="#6F6F6F" stopOpacity="1" />
              <stop offset="1" stopColor="#6F6F6F" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
