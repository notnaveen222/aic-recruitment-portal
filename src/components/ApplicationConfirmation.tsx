export default function ApplicationConfirm({
  visible,
  status,
}: {
  visible: boolean;
  status: string;
}) {
  return (
    visible && (
      <div className=" absolute top-20 bottom-10 inset-x-10 border-neutral-400/60 rounded-2xl border backdrop-blur-sm flex justify-center items-center">
        {status == "loading" && (
          <div className="text-2xl fade-loop font-semibold">
            Submitting Your Application, Hold Tight!
          </div>
        )}
        {status == "confirmed" && (
          <div className="text-2xl  font-semibold">
            Your Application Submitted Successfully! We&apos;ll get back to you
            soon!
          </div>
        )}{" "}
        {status == "existing" && (
          <div className="text-2xl  font-semibold">
            You have already submitted the application, We&apos;ll Get back to
            you shortly!
          </div>
        )}
        {status == "error" && (
          <div className="text-2xl font-semibold">
            There was an error submitting your response, Please Try Again Later
          </div>
        )}
      </div>
    )
  );
}
