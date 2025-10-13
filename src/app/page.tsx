import { ApplyNowButton } from "@/components/Buttons";
import Departments from "@/components/Departments";
import Footer from "@/components/Footer";
import HeroBadge from "@/components/hero-badge";
import { GridPattern } from "@/components/patter-bg";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="">
      <div className="relative flex font-medium justify-center gap-x-28 pt-60">
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
        <div className=" left-0 absolute top-10 flex size-full items-center justify-center overflow-hidden z-0 p-20 opacity-70">
          <GridPattern
            width={25}
            height={25}
            x={-1}
            y={-1}
            className={cn(
              "[mask-image:radial-gradient(500px_200px_at_center,white,transparent)]"
            )}
          />
        </div>
        <div className="text-center text-shadow-lg/80 pt-10 z-10 flex flex-col">
          <div className="flex flex-col mb-3 text-8xl">
            <HeroBadge />
            <div className="">Welcome to</div>
            <div>AIC Recruitment Portal</div>
          </div>
          <div className="text-lg mb-10 font-medium text-neutral-400 max-w-xl mx-auto">
            Join the our community and explore opportunities to learn, create,
            and lead through innovation and collaboration.
          </div>
          {/* <a className="mx-auto text-lg px-4 py-2 relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-flex items-center justify-center border-[0.6px] border-solid [border-image-source:linear-gradient(180deg,#1F1F1F_0%,#858585_100%),linear-gradient(180deg,#1F1F1F_0%,#858585_100%)] [background:linear-gradient(0deg,#151515,#151515),linear-gradient(180deg,rgba(21,21,21,0)_66.3%,rgba(255,255,255,0.5)_100%),linear-gradient(183.22deg,rgba(255,255,255,0.5)_2.62%,rgba(21,21,21,0)_52.03%)] shadow-[inset_0px_6px_8px_0px_#FAFAFA40,inset_0px_-6px_8px_0px_#FAFAFA40,0px_0px_0px_0px_#FAFAFA40,0px_0px_0px_0px_#FAFAFA40] text-white 0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08), h-10 md:h-12 lg:h-16 w-32 md:w-40 lg:w-48 rounded-full  font-medium">
          Apply Now
        </a> */}
          <ApplyNowButton title="Apply Now" />
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
      <Departments />
      <Footer />
    </div>
  );
}
