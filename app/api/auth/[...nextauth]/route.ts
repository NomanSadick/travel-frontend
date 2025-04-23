import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb"; // Optional
import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise), // Optional if you want NextAuth to manage user/account/session tables
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();

        const user = await User.findOne({ email: credentials?.email });
        if (!user || !user.password) {
          throw new Error("Invalid email or password");
        }

        const isPasswordCorrect = await bcrypt.compare(credentials!.password, user.password);
        if (!isPasswordCorrect) {
          throw new Error("Invalid email or password");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/signin", // Your custom sign-in page
  },
  callbacks: {
    async signIn({ user, account }) {
      await dbConnect();

      // Manually save Google users if not already in DB
      if (account?.provider === "google") {
        const userExists = await User.findOne({ email: user.email });
        if (!userExists) {
          await User.create({
            email: user.email,
            name: user.name,
          });
        }
      }

      return true;
    },
    async session({ session, token }) {
      if (session.user) {
        const dbUser = await User.findOne({ email: session.user.email });
        session.user.id = dbUser._id.toString();
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTHSECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
