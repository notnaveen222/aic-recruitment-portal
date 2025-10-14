"use client";

import ApplicationConfirm from "@/components/ApplicationConfirmation";
import { CanvasRevealEffect } from "@/components/CanvasRevealEffect";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useState,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { useForm } from "react-hook-form";

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
    <div className="mt-10 max-w-6xl grow mb-10 w-full mx-auto border border-white/20  rounded-xl  flex ">
      <div className="flex flex-col py-5 w-2xs px-2 border-r-white/20 border-r">
        <div className="text-xl mb-3 px-2 font-semibold pb-5 ">
          Recruitment Form
        </div>
        <div className=" space-y-1">
          {STEPS.map((step, index) => (
            <div
              onClick={() => setCurrentStep(index)}
              className={`w-full text-sm font-medium px-2 py-2 cursor-pointer  rounded-lg transition-all duration-150 
              ${
                currentStep == index
                  ? "bg-neutral-400/20"
                  : "hover:bg-neutral-400/20"
              }
                `}
              key={index}
            >
              {step}
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col  w-full">
        {currentStep == 0 && (
          <div className="grow pt-5 flex flex-col justify-center items-center pl-5">
            <div className="font-bold text-3xl mb-1">
              Tell us about yourself
            </div>
            <div className="text-neutral-400 mb-5">
              Make sure these details are correct.
            </div>
            <div className="flex flex-col space-y-5">
              <InputBox
                label="Name"
                inputProps={{
                  placeholder: "Name",
                  ...register("name", { required: true }),
                }}
                error={errors.name ? "Required" : undefined}
              />
              <InputBox
                label="Registration Number"
                inputProps={{
                  placeholder: "Registration Number",
                  ...register("registerNumber", { required: true }),
                }}
                error={errors.registerNumber ? "Required" : undefined}
              />
              <InputBox
                label="Phone Number"
                inputProps={{
                  placeholder: "Phone Number",
                  inputMode: "numeric",
                  ...register("phone", { required: true }),
                  onChange: (e) => {
                    const target = e.target as HTMLInputElement;
                    const digits = target.value.replace(/\D/g, "");
                    setValue("phone", digits, { shouldValidate: true });
                  },
                }}
                error={errors.phone ? "Digits only" : undefined}
              />
              <DisabledInput
                label="Email"
                value={watch("email") || ""}
                placeholder="Fetching your email..."
              />
            </div>
          </div>
        )}
        {currentStep == 1 && (
          <div className="grow pt-5 flex flex-col justify-center items-center pl-5">
            <div className="font-bold text-3xl mb-5">
              Select the department you&apos;re applying for
            </div>
            <div className="text-neutral-400 mb-4">Preference 1</div>
            <div className="flex space-x-2 space-y-2 justify-center flex-wrap ">
              {DEPT.map((dept, idx) => (
                <div
                  onClick={() => {
                    setPreference1(idx);
                    setValue("preference1", dept, { shouldValidate: true });
                  }}
                  key={idx}
                >
                  <DepartmentCard
                    title={dept}
                    idx={idx}
                    pref1={preference1}
                    colorSet={DEPT_COLORS[dept]}
                  />
                </div>
              ))}
            </div>
            <div className="text-neutral-400 mb-4">Preference 2</div>
            <div className="flex flex-wrap gap-2 justify-center">
              {DEPT.map((dept, idx) => (
                <div
                  onClick={() => {
                    setPreference2(idx);
                    setValue("preference2", dept, { shouldValidate: true });
                  }}
                  key={idx}
                >
                  <DepartmentCard
                    title={dept}
                    idx={idx}
                    pref1={preference2}
                    colorSet={DEPT_COLORS[dept]}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        {currentStep == 2 && (
          <div className="grow  pt-12 flex flex-col justify-center items-center pl-5">
            <div className="font-bold text-3xl mb-1">
              Tell us about why you wanna join us
            </div>
            <div className="text-neutral-400 mb-7">
              Make sure these details are correct.
            </div>
            <div className="flex flex-col space-y-2">
              <TextArea
                label="Why do you wish to join our club?"
                textareaProps={{
                  placeholder: "Type your response...",
                  ...register("whyJoin"),
                }}
              />
              <TextArea
                label={`Why do you think you would be a good fit for ${
                  preference1 != null ? DEPT[preference1] : "your preference 1"
                } department`}
                textareaProps={{
                  placeholder: "Type your response...",
                  ...register("fitPref1"),
                }}
              />
              <TextArea
                label={`Why do you think you would be a good fit for ${
                  preference1 != null ? DEPT[preference1] : "your preference 1"
                } department`}
                textareaProps={{
                  placeholder: "Type your response...",
                  ...register("fitPref2"),
                }}
              />
              <TextArea
                label={`Any previous experiences regarding the department that you chose?`}
                textareaProps={{
                  placeholder: "Type your response...",
                  ...register("experiences"),
                }}
              />
              <TextArea
                label={`If any previous work, drop the link `}
                subtitle="Mandatory for the technical and creatives to drop a GitHub or any website link"
                textareaProps={{
                  placeholder: "Link...",
                  ...register("workLink"),
                }}
              />
            </div>
          </div>
        )}
        {currentStep == 3 && (
          <div className="grow  pt-12 flex flex-col justify-center items-center pl-5">
            <div className="font-bold text-3xl mb-1">
              Kindly double check your details
            </div>
            <div className="text-neutral-400 mb-7">
              Make sure these details are correct.
            </div>
            <div className="flex max-w-[480px] flex-col w-full  space-y-2">
              <DisabledInput label="Name" value={watch("name") || ""} />
              <DisabledInput
                label="Register Number"
                value={watch("registerNumber") || ""}
              />
              <DisabledInput
                label="Phone Number"
                value={watch("phone") || ""}
              />
              <DisabledInput
                label="Email"
                value={watch("email") || ""}
                placeholder="Fetching your email"
              />
              <DisabledInput
                label="Department Preference 1"
                value={watch("preference1") || ""}
              />
              <DisabledInput
                label="Department Preference 2"
                value={watch("preference2") || ""}
              />
            </div>
          </div>
        )}
        <div className="w-full flex justify-between px-2 py-2 h-fit">
          <div
            className="cursor-pointer  text-lg  rounded-full  flex justify-center items-center 
          "
            onClick={() => {
              setCurrentStep(currentStep == 0 ? 0 : currentStep - 1);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </div>
          {currentStep != 3 ? (
            <div
              className="ccursor-pointer  text-lg  rounded-full  flex justify-center items-center py-2"
              onClick={() => {
                setCurrentStep(currentStep == 3 ? 3 : currentStep + 1);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>
          ) : (
            <button
              type="submit"
              disabled={!isFormComplete}
              className={`border rounded-lg px-4 cursor-pointer py-2 mb-1 transition-all duration-150
            ${
              isFormComplete
                ? "neon-button cursor-pointer mb-1 mr-2"
                : "border-neutral-200 text-neutral-200 cursor-not-allowed opacity-50"
            }`}
            >
              Submit Application
            </button>
          )}
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
          className="w-full bg-transparent placeholder:text-white/40 text-white text-sm border border-white/60 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-white hover:border-white shadow-sm focus:shadow ring-0 focus:ring-2 focus:ring-white"
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
    <div className="w-full max-w-[500px] sm:min-w-[300px]">
      <div className="mb-2">{label}</div>
      <div className="w-full min-w-[200px]">
        <input
          className={`w-full bg-transparent placeholder:text-white/40 text-white text-sm rounded-md px-3 py-2 transition duration-300 ease focus:outline-none shadow-sm ring-0 focus:ring-2 focus:ring-white disabled:cursor-default
            ${
              isEmpty
                ? "border border-red-500 focus:border-red-500 hover:border-red-500"
                : "border border-white/60 focus:border-white hover:border-white"
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
    <div className="w-full min-w-[300px]">
      <div className="w-[500px]">{label}</div>
      <div className=" text-neutral-400 w-[500px]">{subtitle}</div>
      <div className="w-full mt-2 min-w-[500px]">
        <textarea
          rows={4}
          className="w-full bg-transparent placeholder:text-white/40 text-white text-sm border border-white/60 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-white hover:border-white shadow-sm focus:shadow ring-0 focus:ring-2 focus:ring-white resize-none"
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
  return (
    <div className="flex items-center justify-center bg-black">
      <div
        className={`relative border ${
          pref1 == idx ? "border-white " : "border-white/10"
        } rounded-xl overflow-hidden border-2 max-w-[250px] h-[100px] w-full flex items-center justify-center transition-all duration-150`}
      >
        {/* Canvas background */}
        <CanvasRevealEffect
          animationSpeed={3}
          containerClassName="bg-black"
          colors={colorSet}
          dotSize={2}
        />

        {/* Gradient overlay for soft fade */}
        <div className="absolute inset-0 [mask-image:radial-gradient(250px_at_center,white,transparent)] bg-black/50" />

        {/* Foreground text */}
        <div className="absolute inset-0 text-lg font-semibold text-white cursor-pointer flex justify-center items-center select-none">
          {title}
        </div>
      </div>
    </div>
  );
}
