import { connectToDatabase } from "@/lib/mongodb";
import Applicant from "@/app/models/Application";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, registrationNumber } = body;

    await connectToDatabase();

    const existingByEmail = await Applicant.findOne({ email });
    if (existingByEmail) {
      return new Response(
        JSON.stringify({
          success: false,
          existingApplicaiton: true,
          message: "This email has already been used to submit an application.",
        }),
        { status: 409 }
      );
    }
    if (registrationNumber) {
      const existingByReg = await Applicant.findOne({ registrationNumber });
      if (existingByReg) {
        return new Response(
          JSON.stringify({
            success: false,
            existingApplicaiton: true,
            message:
              "This registration number has already been used to submit an application.",
          }),
          { status: 409 }
        );
      }
    }

    const newApp = await Applicant.create(body);

    return new Response(JSON.stringify({ success: true, data: newApp }), {
      status: 201,
    });
  } catch (error: unknown) {
    console.error("Error saving form data:", error);

    const err = error as {
      code?: number;
      keyPattern?: Record<string, unknown>;
      name?: string;
      errors?: Record<string, { message?: string }>;
      message?: string;
    };

    if (err?.code === 11000) {
      const fields = Object.keys(err.keyPattern || {});
      const field = fields[0] || "field";
      return new Response(
        JSON.stringify({
          success: false,
          error: `${field} already exists`,
        }),
        { status: 409 }
      );
    }

    if (err?.name === "ValidationError") {
      const firstErr = Object.values(err.errors ?? {})[0];
      const message = firstErr?.message || "Validation failed";
      return new Response(JSON.stringify({ success: false, error: message }), {
        status: 400,
      });
    }

    const message =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return new Response(JSON.stringify({ success: false, error: message }), {
      status: 500,
    });
  }
}
