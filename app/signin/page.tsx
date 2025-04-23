"use client";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  return (
    <div className="p-4">
      <button onClick={() => signIn("google")} className="bg-blue-500 text-white px-4 py-2">
        Sign in with Google
      </button>
    </div>
  );
}