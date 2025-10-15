"use client";

import ApplicationConfirm from "@/components/ApplicationConfirmation";
import React from "react";
import { AnimatePresence } from "motion/react";
import { CanvasRevealEffect } from "@/components/CanvasRevealEffect";
import { cn } from "@/lib/utils";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useState,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { useForm } from "react-hook-form";
import { motion, useInView } from "motion/react";
import { easeOut } from "motion";
import { useRef } from "react";
import { OpacityAnimation } from "@/components/MotionAnimation";

type FormValues = {
  name: string;
  registerNumber: string;
  phone: string;
  email: string;
  preference1: string | null;
  preference2: string | null;
  whyJoin: string;
  fitPref1: string;
  fitPref2: string;
  experiences: string;
  workLink: string;
};

export default function ApplyPage() {
  const STEPS = [
    "Student Information",
    "Choose Department",
    "Personal Insights",
    "Finalize",
  ];
  const DEPT = [
    "Operations",
    "Technical",
    "Creatives",
    "Visual Media",
    "Outreach",
  ];
  //handle invalid current Step
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [preference1, setPreference1] = useState<number | null>(null);
  const [preference2, setPreference2] = useState<number | null>(null);
  const { data: session } = useSession();
  const router = useRouter();
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      registerNumber: "",
      phone: "",
      email: session?.user?.email ?? "",
      preference1: null,
      preference2: null,
      whyJoin: "",
      fitPref1: "",
      fitPref2: "",
      experiences: "",
      workLink: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (session?.user?.email) setValue("email", session.user.email);
  }, [session?.user?.email, setValue]);

  const onSubmit = async (values: FormValues) => {
    setConfirmationVisible(true);
    setConfirmationStatus("loading");
    const res = await fetch("/api/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const result = await res.json();
    if (result.success) {
      setConfirmationStatus("confirmed");
      setTimeout(() => {
        router.push("/");
        setConfirmationVisible(false);
      }, 5000);
    } else {
      if (result.existingApplicaiton) {
        setConfirmationStatus("existing");
        setTimeout(() => {
          router.push("/");
          setConfirmationVisible(false);
        }, 5000);
      } else {
        setConfirmationStatus("error");
        setTimeout(() => setConfirmationVisible(false), 5000);
      }
    }
  };
  const requiredFields: (keyof FormValues)[] = [
    "name",
    "registerNumber",
    "phone",
    "email",
    "preference1",
    "preference2",
  ];
  const watchedValues = watch();
  const isFormComplete = requiredFields.every(
    (field) =>
      watchedValues[field] && watchedValues[field]?.toString().trim() !== ""
  );

  const [confirmationVisible, setConfirmationVisible] =
    useState<boolean>(false);
  const [confirmationStatus, setConfirmationStatus] = useState<
    "" | "loading" | "confirmed" | "error" | "existing"
  >("");
  return (
    <div className="mt-10 max-w-xs sm:max-w-6xl grow mb-10 w-full mx-auto border border-white/20  rounded-xl  flex ">
      <div className="hidden sm:flex flex-col py-5 w-2xs px-2 border-r-white/20 border-r">
        <OpacityAnimation>
          <div className="text-lg  mb-2 px-2 font-medium pb-5 ">
            Recruitment Form
          </div>
        </OpacityAnimation>
        <StaggerAnimation>
          <div className="space-y-1">
            {STEPS.map((s, index) => (
              <motion.div key={index} variants={childVariants}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentStep(index);
                  }}
                  className={cn(
                    "group flex w-full items-center gap-3 cursor-none rounded-lg border border-transparent px-3 py-2.5 text-left transition",
                    index === currentStep && "border-border bg-neutral-400/10",
                    index !== currentStep && "hover:bg-neutral-400/10"
                  )}
                >
                  <span
                    className={cn(
                      "grid size-6 place-items-center rounded-full text-[10px] font-semibold",
                      index < currentStep &&
                        "bg-primary text-primary-foreground",
                      index === currentStep && "bg-secondary text-foreground",
                      index > currentStep && "bg-muted text-muted-foreground"
                    )}
                  >
                    {index < currentStep ? (
                      <Check className="size-4" />
                    ) : (
                      index + 1
                    )}
                  </span>
                  <span
                    className={cn(
                      "text-sm",
                      index === currentStep
                        ? "text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {s}
                  </span>
                </button>
              </motion.div>
            ))}
          </div>
        </StaggerAnimation>
      </div>
      <form
        onSubmit={(e) => {
          if (currentStep !== 3) {
            e.preventDefault();
            e.stopPropagation();
            return;
          }
          void handleSubmit(onSubmit)(e);
        }}
        className="flex flex-col w-full"
      >
        {currentStep == 0 && (
          <div className="grow pt-5 flex flex-col justify-center items-center px-0 sm:pl-5">
            <OpacityAnimation>
              <div className="font-bold text-2xl sm:text-3xl mb-1 tracking-wide">
                Tell us about yourself
              </div>
              <div className="text-center text-neutral-400 text-sm sm:text-base mb-5">
                Let&apos;s begin with your personal details.
              </div>
            </OpacityAnimation>
            <StaggerAnimation>
              <div className="flex flex-col space-y-5">
                {[
                  <InputBox
                    key="name"
                    label="Name"
                    inputProps={{
                      placeholder: "Name",
                      ...register("name", { required: true }),
                    }}
                    error={errors.name ? "Required" : undefined}
                  />,
                  <InputBox
                    key="reg"
                    label="Registration Number"
                    inputProps={{
                      placeholder: "Registration Number",
                      ...register("registerNumber", { required: true }),
                    }}
                    error={errors.registerNumber ? "Required" : undefined}
                  />,
                  <InputBox
                    key="phone"
                    label="Phone Number"
                    inputProps={{
                      placeholder: "Phone Number",
                      inputMode: "numeric",
                      ...register("phone", { required: true }),
                      onChange: (e) => {
                        const digits = (
                          e.target as HTMLInputElement
                        ).value.replace(/\D/g, "");
                        setValue("phone", digits, { shouldValidate: true });
                      },
                    }}
                    error={errors.phone ? "Digits only" : undefined}
                  />,
                  <DisabledInput
                    key="email"
                    label="Email"
                    value={watch("email") || ""}
                    placeholder="Fetching your email..."
                  />,
                ].map((input, idx) => (
                  <motion.div key={idx} variants={childVariants}>
                    {input}
                  </motion.div>
                ))}
              </div>
            </StaggerAnimation>
          </div>
        )}
        {currentStep == 1 && (
          <div className="grow pt-5 flex flex-col justify-center items-center px-0 sm:pl-5">
            <OpacityAnimation>
              <div className="font-bold text-2xl sm:text-3xl mb-5 text-center">
                Select the department you&apos;re applying for
              </div>
              <div className="text-center text-neutral-400 mb-4">
                Preference 1
              </div>
            </OpacityAnimation>
            <div className="flex justify-center flex-wrap gap-3 mb-5">
              <StaggerAnimation>
                <div className="flex justify-center flex-wrap gap-3">
                  {DEPT.map((dept, idx) => (
                    <motion.div key={idx} variants={childVariants}>
                      <div
                        onClick={() => {
                          setPreference1(idx);
                          setValue("preference1", dept, {
                            shouldValidate: true,
                          });
                        }}
                      >
                        <DepartmentCard
                          title={dept}
                          idx={idx}
                          pref1={preference1}
                          colorSet={DEPT_COLORS[dept]}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </StaggerAnimation>
            </div>
            <OpacityAnimation delay={0.3}>
              <div className="text-center text-neutral-400 mb-4">
                Preference 2
              </div>
            </OpacityAnimation>
            <div className="flex justify-center flex-wrap gap-3 mb-5">
              <StaggerAnimation>
                <div className="flex justify-center flex-wrap gap-3">
                  {DEPT.map((dept, idx) => (
                    <motion.div key={idx} variants={childVariants}>
                      <div
                        onClick={() => {
                          setPreference2(idx);
                          setValue("preference2", dept, {
                            shouldValidate: true,
                          });
                        }}
                      >
                        <DepartmentCard
                          title={dept}
                          idx={idx}
                          pref1={preference2}
                          colorSet={DEPT_COLORS[dept]}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </StaggerAnimation>
            </div>
          </div>
        )}
        {currentStep == 2 && (
          <div className="grow pt-12 flex flex-col justify-center items-center px-0 sm:pl-5">
            <div className="font-bold text-xl text-center sm:text-3xl mb-1">
              Tell us about why you wanna join us
            </div>
            <div className="text-neutral-400 text-sm sm:text-base mb-7">
              We&apos;d love to know what inspires you to join us.
            </div>
            <div className="w-full flex justify-center">
              <StaggerAnimation>
                <div className="flex px-2 sm:px-0 w-fit flex-col space-y-3">
                  {[
                    <TextArea
                      key="why"
                      label="Why do you wish to join our club?"
                      textareaProps={{
                        placeholder: "Type your response...",
                        ...register("whyJoin"),
                      }}
                    />,
                    <TextArea
                      key="fit1"
                      label={`Why would you be a good fit for ${
                        preference1 != null
                          ? DEPT[preference1]
                          : "your preference 1"
                      } department`}
                      textareaProps={{
                        placeholder: "Type your response...",
                        ...register("fitPref1"),
                      }}
                    />,
                    <TextArea
                      key="fit2"
                      label={`Why would you be a good fit for ${
                        preference2 != null
                          ? DEPT[preference2]
                          : "your preference 2"
                      } department`}
                      textareaProps={{
                        placeholder: "Type your response...",
                        ...register("fitPref2"),
                      }}
                    />,
                    <TextArea
                      key="exp"
                      label="Any previous experiences related to your department?"
                      textareaProps={{
                        placeholder: "Type your response...",
                        ...register("experiences"),
                      }}
                    />,
                    <TextArea
                      key="link"
                      label="If any previous work, drop the link"
                      subtitle="Mandatory for technical/creatives (GitHub or portfolio link)"
                      textareaProps={{
                        placeholder: "Link...",
                        ...register("workLink"),
                      }}
                    />,
                  ].map((ta, idx) => (
                    <motion.div key={idx} variants={childVariants}>
                      {ta}
                    </motion.div>
                  ))}
                </div>
              </StaggerAnimation>
            </div>
          </div>
        )}
        {currentStep == 3 && (
          <div className="grow pt-12 flex flex-col justify-center items-center px-0 sm:pl-5">
            <div className="font-bold text-2xl text-center sm:text-3xl mb-1">
              Kindly double check your details
            </div>
            <div className="text-neutral-400 mb-7 text-sm sm:text-base text-center">
              Make sure these details are correct.
            </div>

            {/* ✅ stagger animation for review inputs */}
            <StaggerAnimation>
              <div className="flex flex-col items-center space-y-5 mb-5">
                {[
                  <DisabledInput
                    key="name"
                    label="Name"
                    value={watch("name") || ""}
                  />,
                  <DisabledInput
                    key="reg"
                    label="Registration Number"
                    value={watch("registerNumber") || ""}
                  />,
                  <DisabledInput
                    key="phone"
                    label="Phone Number"
                    value={watch("phone") || ""}
                  />,
                  <DisabledInput
                    key="email"
                    label="Email"
                    value={watch("email") || ""}
                    placeholder="Fetching your email..."
                  />,
                  <DisabledInput
                    key="pref1"
                    label="Department Preference 1"
                    value={watch("preference1") || ""}
                  />,
                  <DisabledInput
                    key="pref2"
                    label="Department Preference 2"
                    value={watch("preference2") || ""}
                  />,
                ].map((input, idx) => (
                  <motion.div key={idx} variants={childVariants}>
                    {input}
                  </motion.div>
                ))}
              </div>
            </StaggerAnimation>
          </div>
        )}

        <div className="w-full mt-5 px-10 ">
          <div className="w-full flex border-t border-t-border justify-between py-5 h-fit">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setCurrentStep(currentStep == 0 ? 0 : currentStep - 1);
              }}
              disabled={currentStep === 0}
              className={cn(
                "inline-flex items-center gap-2 rounded-md border border-border/60 px-3 py-2 text-sm transition",
                "bg-transparent text-foreground hover:bg-secondary/30 disabled:opacity-50 disabled:hover:bg-transparent",
                "focus-visible:outline-none cursor-none focus-visible:ring-2 focus-visible:ring-ring/60"
              )}
              aria-label="Previous step"
            >
              <ChevronLeft className="size-4" />
              <span className="hidden sm:inline">Previous</span>
            </button>
            <button
              type={currentStep === 3 ? "submit" : "button"}
              disabled={currentStep === 3 && !isFormComplete}
              onClick={(e) => {
                if (currentStep !== 3) {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrentStep((s) => Math.min(s + 1, 3));
                }
              }}
              className={cn(
                "inline-flex cursor-none items-center gap-2 rounded-md px-3 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
                currentStep === 3
                  ? isFormComplete
                    ? "neon-button cursor-pointer"
                    : "border border-neutral-200 text-neutral-200 cursor-not-allowed opacity-50"
                  : "bg-foreground text-background hover:bg-foreground/90"
              )}
            >
              <span className=" cursor-none">
                {currentStep === 3 ? "Submit Application" : "Next"}
              </span>
              {currentStep !== 3 && <ChevronRight className="size-4" />}
            </button>
          </div>
        </div>
      </form>
      <ApplicationConfirm
        visible={confirmationVisible}
        status={confirmationStatus}
      />
    </div>
  );
}

function InputBox({
  label,
  inputProps,
  error,
}: {
  label: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  error?: string;
}) {
  return (
    <div className="w-full max-w-sm sm:min-w-[300px]">
      <div className="mb-2">{label}</div>
      <div className="w-full relative max-w-sm min-w-[200px]">
        <input
          className="cursor-none w-full bg-transparent placeholder:text-white/40 text-white text-sm border border-border rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-white hover:border-white shadow-sm focus:shadow ring-0 focus:ring-2 focus:ring-white"
          placeholder={label}
          {...inputProps}
        />
        {error && (
          <div className="text-red-500 absolute text-xs -top-2 px-1 right-2 bg-black">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
function DisabledInput({
  label,
  value,
  placeholder,
}: {
  label: string;
  value: string;
  placeholder?: string | null;
}) {
  const isEmpty = !value || value.trim() === "";

  return (
    <div className="w-full max-w-sm sm:min-w-[300px]">
      <div className="mb-2">{label}</div>

      <div className="w-full relative max-w-sm min-w-[200px]">
        <input
          className={`w-full bg-transparent placeholder:text-white/40 text-white text-sm rounded-md px-3 py-2 transition duration-300 ease focus:outline-none shadow-sm ring-0 focus:ring-2 focus:ring-white disabled:cursor-default
            ${
              isEmpty
                ? "border border-red-500/80 ring-1 ring-red-500 "
                : "border border-border"
            }`}
          placeholder={
            placeholder || "Please fill this input box before to submit."
          }
          disabled
          value={value}
        />
      </div>
    </div>
  );
}

function TextArea({
  label,
  subtitle,
  textareaProps,
}: {
  label: string;
  subtitle?: string;
  textareaProps?: TextareaHTMLAttributes<HTMLTextAreaElement>;
}) {
  return (
    <div className="w-fit sm:w-full  sm:max-w-fit sm:min-w-[300px]">
      <div className="">{label}</div>
      <div className=" text-neutral-400  md:w-[500px] text-sm sm:text-base ">
        {subtitle}
      </div>
      <div className=" mt-2 min-w-[300px] md:min-w-[400px]">
        <textarea
          rows={4}
          className="w-full bg-transparent cursor-none placeholder:text-white/40 text-white text-sm border border-border rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-white hover:border-white shadow-sm focus:shadow ring-0 focus:ring-2 focus:ring-white resize-none"
          placeholder="Type your response..."
          {...textareaProps}
        ></textarea>
      </div>
    </div>
  );
}
// Each department gets its own gradient color set
export const DEPT_COLORS: Record<string, number[][]> = {
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
export function DepartmentCard({
  title,
  idx,
  pref1,
  colorSet,
}: {
  title: string;
  idx: number;
  pref1: number | null;
  colorSet: number[][];
}) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "group/canvas-card  border border-white/10  transition-all duration-200 rounded-xl overflow-hidden relative flex items-center justify-center cursor-none",
        "w-full min-w-[250px] h-[100px] sm:h-[120px]",
        pref1 === idx
          ? "border-white/100 ring-2 ring-white"
          : "hover:border-white/30"
      )}
    >
      {/* Hover background animation */}
      <AnimatePresence>
        {(hovered || pref1 == idx) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full w-full absolute inset-0"
          >
            <CanvasRevealEffect
              animationSpeed={5}
              containerClassName="bg-black"
              colors={colorSet}
              dotSize={2}
            />
            <div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/50" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Text Content */}
      <div className="relative z-10 text-center flex items-center justify-center px-3">
        <motion.div
          initial={{ scale: 1 }}
          animate={{
            scale: hovered ? 1.15 : 1,
          }}
          transition={{ duration: 0.3 }}
          className="text-lg sm:text-xl font-semibold"
        >
          {title}
        </motion.div>
      </div>
    </div>
  );
}

function StaggerAnimation({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  const parentVariants = {
    hidden: { opacity: 0, y: 15, filter: "blur(5px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        ease: easeOut,
        duration: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={parentVariants}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

const childVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: easeOut } },
};
