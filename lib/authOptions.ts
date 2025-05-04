import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";

// Extend NextAuth session type to include the custom 'id'
declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      id?: string;
    };
  }
}

// Define the User type to be used in the JWT callback
interface UserWithId extends Omit<typeof User, "_id"> {
  _id: string;
}

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
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
        if (!user || !user.password) throw new Error("Invalid email or password");
        const isPasswordCorrect = await bcrypt.compare(credentials!.password, user.password);
        if (!isPasswordCorrect) throw new Error("Invalid email or password");
        return user;
      },
    }),
  ],
  pages: { signIn: "/signin" },
  callbacks: {
    async signIn({ user, account }) {
      await dbConnect();
      if (account?.provider === "google") {
        const userExists = await User.findOne({ email: user.email });
        if (!userExists) {
          await User.create({ email: user.email, name: user.name });
        }
      }
      return true;
    },
    async session({ session }) {
      if (session.user && session.user.email) {
        const dbUser = await User.findOne({ email: session.user.email });
        if (dbUser) {
          session.user.id = dbUser._id.toString();
        } else {
          console.error(`User not found: ${session.user.email}`);
        }
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        // Explicitly type `user` as `UserWithId` to avoid the unknown type for `_id`
        const userWithId = user as unknown as UserWithId;
        token.id = userWithId._id; // Now TypeScript knows `_id` is a string
      }
      return token;
    },
  },
  session: { strategy: "jwt" },
  secret: process.env.AUTHSECRET,
};
