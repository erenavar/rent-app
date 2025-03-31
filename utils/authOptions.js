import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/config/database";
import User from "@/models/User";

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
    async signIn({ profile }) {
      try {
        await connectDB();
        const userExists = await User.findOne({ email: profile.email });

        if (!userExists) {
          const username = profile.name.slice(0, 20); // Doğru değişkeni kullan
          await User.create({
            email: profile.email,
            username,
            image: profile.picture,
          });
        }
      } catch (error) {
        console.log("signIn Error:", error);
      }
      return true;
    },
    async session({ session }) {
      try {
        await connectDB();
        const user = await User.findOne({ email: session.user.email });

        if (user) {
          session.user.id = user._id.toString();
        } else {
          console.log("User not found in session callback");
        }
      } catch (error) {
        console.log("Session error:", error);
      }
      return session;
    },
  },
};
