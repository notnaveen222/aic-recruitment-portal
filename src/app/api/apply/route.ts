import { connectToDatabase } from "@/lib/mongodb";
import Application from "@/app/models/Application";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    await connectToDatabase();

    // Check if email already exists
    const existingApp = await Application.findOne({ email });
    if (existingApp) {
      return new Response(
        JSON.stringify({
          success: false,
          existingApplicaiton: true,
          message: "This email has already been used to submit an application.",
        }),
        { status: 409 }
      );
    }

    // Create new application
    const newApp = await Application.create(body);

    return new Response(JSON.stringify({ success: true, data: newApp }), {
      status: 201,
    });
  } catch (error: unknown) {
    console.error("Error saving form data:", error);

    let message = "An unexpected error occurred";
    if (error instanceof Error) {
      message = error.message;
    }

    return new Response(JSON.stringify({ success: false, error: message }), {
      status: 500,
    });
  }
}
