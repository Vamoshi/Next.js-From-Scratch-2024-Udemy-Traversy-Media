export { default } from "next-auth/middleware";

export const config = {
  // add protected routes here
  matcher: ["/properties/add", "/profile", "/properties/saved", "/messages"],
};
