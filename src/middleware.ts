export { default } from "next-auth/middleware";

// Specify which routes require authentication
export const config = {
  matcher: ["/apply"],
};
