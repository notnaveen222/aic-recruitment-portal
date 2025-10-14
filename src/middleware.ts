export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/apply/:path*"], // protect /apply and all subpaths
};
