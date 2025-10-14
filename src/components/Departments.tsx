import { CanvasRevealEffect } from "./CanvasRevealEffect";

export default function Departments() {
  const DEPT = [
    "Operations",
    "Technical",
    "Creatives",
    "Visual Media",
    "Outreach",
  ];
  return (
    <div className="w-screen flex flex-col pt-14 mb-10   justify-center items-center">
      <div className="text-4xl sm:text-5xl text-center font-medium">
        Our Departments
      </div>
      <div className="flex flex-row flex-wrap justify-center gap-y-5 w-full gap-x-3 my-10">
        {DEPT.map((dept, idx) => (
          <div key={idx}>
            <DepartmentCard title={dept} colorSet={DEPT_COLORS[dept]} />
          </div>
        ))}
      </div>
    </div>
  );
}
const DEPT_COLORS: Record<string, number[][]> = {
  Operations: [
    [16, 185, 129], // emerald
    [110, 231, 183],
  ],
  Technical: [
    [59, 130, 246], // sky
    [125, 211, 252],
  ],
  Creatives: [
    [236, 72, 153], // pink
    [232, 121, 249],
  ],
  "Visual Media": [
    [249, 115, 22], // orange
    [253, 186, 116],
  ],
  Outreach: [
    [139, 92, 246], // violet
    [196, 181, 253],
  ],
};

function DepartmentCard({
  title,

  colorSet,
}: {
  title: string;

  colorSet: number[][];
}) {
  return (
    <div className="flex items-center justify-center bg-black ">
      <div
        className={`relative 
           
         rounded-xl overflow-hidden border-2 border-white/10 max-w-[150px] h-52 sm:max-w-[250px] sm:h-80 w-full flex items-center justify-center transition-all duration-150`}
      >
        {/* Canvas background */}
        <CanvasRevealEffect
          animationSpeed={3}
          containerClassName="bg-black"
          colors={colorSet}
          dotSize={2}
        />

        {/* Gradient overlay for soft fade */}
        <div className="absolute inset-0  transition-all duration-150" />

        {/* Foreground text */}
        <div className="absolute inset-0 text-2xl sm:text-3xl shadow-lg/30 font-semibold text-white cursor-pointer flex justify-center items-center text-center select-none">
          {title}
        </div>
      </div>
    </div>
  );
}
