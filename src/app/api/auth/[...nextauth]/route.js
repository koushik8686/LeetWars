import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectMongoDB from "../../../utils/mongodb"; // MongoDB connection
import User from "../../../models/usermodel"; // Mongoose User model
import stats from '../../../models/statsmodel'
const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

const handler = NextAuth({
  session: {
    strategy: "jwt", // Use JWT for session management
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      console.log("Google sign-in callback called");

      try {
        const { email, name } = user;
        await connectMongoDB();
        let existingUser = await User.findOne({ email });
        if (!existingUser) {
          existingUser = new User({
            email,
            username: name,
            leetcodeUsername: null,
          });
          await existingUser.save();
          const statsInstance = await stats.findById("6769bcc93832e58fdf9d8e16");
          statsInstance.users++;
          await statsInstance.save();
        }

        // User exists or is created, return true to allow sign-in
        return true;
      } catch (error) {
        console.error("Error during Google sign-in callback:", error);
        return false; // Deny sign-in on error
      }
    },
    async session({ session, token }) {
      // Attach the token information (user ID and email) to the session
      session.user.id = token.id; // User ID
      session.user.email = token.email; // User email
      return session; // Return session with user information
    },
  },
  secret: SECRET_KEY,
});

export { handler as GET, handler as POST };
