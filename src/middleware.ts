import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

const protectedRoutes = ["/apply"];
const authRoutes = ["/auth/signin"];
export default async function middleware(req: NextRequest) {
  console.log("hello");
  const { pathname, origin } = req.nextUrl;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isProtectedRoute = protectedRoutes.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname);
  if (isProtectedRoute && !token?.email) {
    return NextResponse.redirect(new URL(`${origin}/auth/signin`, req.nextUrl));
  }
  if (isAuthRoute && token?.email) {
    return NextResponse.redirect(new URL("/apply", req.nextUrl));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/apply", "/auth/signin"],
};
