import User from "@/models/User";
import GoogleProvider from "next-auth/providers/google";
import { FaDatabase } from "react-icons/fa";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    //Invoked on successful sign-in
    async signIn({ profile }) {},
    async session({ session }) {},
  },
};
