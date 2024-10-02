import connectDB from "@/config/database";
import User from "@/models/User";
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
  // These are all handled by next auth
  callbacks: {
    // Invoked on successful sign in
    async signIn({ profile }) {
      // Connect to db
      await connectDB();
      // Check if user exists
      const userExists = await User.findOne({ email: profile?.email });

      // If not, create user
      if (!userExists) {
        const username = profile?.name?.slice(0, 20);

        await User.create({
          email: profile?.email,
          username,
          image: profile?.image,
        });
      }
      // Return true to allow sign in
      return true;
    },
    // Session callback function that modifies the session object
    async session({ session }) {
      if (session && session.user) {
        // Get user from db
        await connectDB();
        const user = await User.findOne({ email: session.user?.email });
        // Assign user id from the session
        session.user.id = user._id.toString();
      }
      // Return session
      return session;
    },
  },
};
