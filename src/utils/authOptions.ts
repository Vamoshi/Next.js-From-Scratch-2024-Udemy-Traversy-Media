import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      //   doing this doesn't make it so that the last used google account isn't used
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    // TODO: callbacks
    // Invoked on successful sign in
    async signIn({ profile }) {
      // Connect to db
      // Check if user exists
      // If not, create user
      // Return true to allow sign in

      console.log("====================================");
      console.log(profile);
      console.log("====================================");

      return false;
    },
    // Session callback function that modifies the session object
    async session({ session }) {
      // Get user from db
      // Assign user id from the session
      // Return session

      console.log("====================================");
      console.log(session);
      console.log("====================================");

      return session;
    },
  },
};
