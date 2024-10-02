import { authOptions } from "@/utils/authOptions";
import NextAuth from "next-auth/next";

// when POST/GET is given to api/auth, nextauth takes over
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
