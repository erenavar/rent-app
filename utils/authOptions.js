import User from "@/models/User";
import GoogleProvider from "next-auth/providers/google";
import { FaDatabase } from "react-icons/fa";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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
    async signIn({ profile }) {},
    async session({ session }) {},
  },
};
