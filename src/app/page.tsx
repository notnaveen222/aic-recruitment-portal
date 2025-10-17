import { ApplyNowButton } from "@/components/Buttons";
import Departments from "@/components/Departments";
import Footer from "@/components/Footer";
import HeroText from "@/components/HeroText";
import { OpacityAnimation } from "@/components/MotionAnimation";
import DarkVeil from "@/components/Backgrouds/DarkVeil";
import { Particles } from "@/components/Backgrouds/Particles";

export default function Home() {
  return (
    <>
      <div className="grow flex flex-col items-center  overflow-x-hidden">
        <div style={{ width: "100%" }} className="absolute z-0 h-1/3 sm:h-full">
          <DarkVeil speed={0.8} />
        </div>
        <div className="hidden sm:block absolute [mask-image:linear-gradient(to_bottom,transparent_5%,white_100%)] z-10 inset-x-0 h-[90vh] ">
          <Particles />
        </div>
        <div className="relative flex w-full z-20 justify-center font-medium pt-16 sm:pt-52">
          <OpacityAnimation delay={0.2}>
            <svg
              className="opacity-0 h-full relative left-10 lg:left-0 hidden sm:block"
              xmlns="http://www.w3.org/2000/svg"
              width="70"
              height="568"
              viewBox="0 0 89 568"
              fill="none"
            >
              <path
                d="M1 0.23938V207.654L88 285.695C88 285.695 87.5 493.945 88 567.813"
                stroke="url(#animation_gradient_left)"
                strokeWidth="1.2"
                opacity="1"
              ></path>

              <path
                d="M1 0.23938V207.654L88 285.695C88 285.695 87.5 493.945 88 567.813"
                stroke="url(#paint0_linear_left)"
                strokeWidth="0.7"
              ></path>

              <defs>
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
          </OpacityAnimation>
          {/*grid*/}
          {/* <OpacityAnimation delay={0.2}>
            <div className=" left-0 absolute top-4 sm:top-10 flex size-full items-center justify-center overflow-hidden z-0 opacity-[0.7]">
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
                    "absolute inset-0 [mask-image:radial-gradient(450px_150px_at_center,white,transparent)]"
                  )}
                />
              </div>
            </div>
          </OpacityAnimation> */}
          <div className=" text-center mx-28 text-shadow-lg/80 z-10 flex flex-col pt-10 sm:pt-0">
            <HeroText />
            <OpacityAnimation delay={0.5}>
              <div className="text-base sm:text-lg mb-20 sm:mb-10 font-medium text-neutral-400  max-w-xl mx-auto">
                Join our community and explore opportunities to learn, create,
                and lead through innovation and collaboration.
              </div>
              <ApplyNowButton title="Apply Now" />
            </OpacityAnimation>
          </div>
          <OpacityAnimation delay={0.2}>
            <svg
              className="opacity-0 h-full relative right-10 lg:right-0 hidden sm:block"
              xmlns="http://www.w3.org/2000/svg"
              width="70"
              height="568"
              viewBox="0 0 89 568"
              fill="none"
            >
              <path
                d="M88 0.23938V207.654L1 285.695C1 285.695 1.5 493.945 1 567.813"
                stroke="url(#animation_gradient_right)"
                strokeWidth="1"
                opacity="1"
              ></path>

              <path
                d="M88 0.23938V207.654L1 285.695C1 285.695 1.5 493.945 1 567.813"
                stroke="url(#paint0_linear_right)"
                strokeWidth="0.3"
              ></path>

              <defs>
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
          </OpacityAnimation>
        </div>
        <Departments />
        <Footer />
      </div>
    </>
  );
}
