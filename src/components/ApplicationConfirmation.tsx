export default function ApplicationConfirm({
  visible,
  status,
}: {
  visible: boolean;
  status: string;
}) {
  return (
    visible && (
      <div className="fixed top-14 sm:top-20 bottom-5 sm:bottom-10 inset-x-5 sm:inset-x-10 border-neutral-400/60 rounded-2xl border backdrop-blur-sm flex text-2xl font-semibold justify-center items-center text-center">
        {status == "loading" && (
          <div className="fade-loop ">
            Submitting Your Application, Hold Tight!
          </div>
        )}
        {status == "confirmed" && (
          <div className="">
            Your Application Submitted Successfully! We&apos;ll get back to you
            soon!
          </div>
        )}{" "}
        {status == "existing" && (
          <div className="">
            You have already submitted the application, We&apos;ll Get back to
            you shortly!
          </div>
        )}
        {status == "error" && (
          <div className="">
            There was an error submitting your response, Please Try Again Later
          </div>
        )}
      </div>
    )
  );
}
