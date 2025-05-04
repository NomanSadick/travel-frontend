"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();

  return (
    <nav className="bg-white shadow px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-orange-600">
        OtaSphere
        </Link>

        <div className="space-x-4 flex items-center">
          <Link href="/" className="text-gray-700 hover:text-orange-500">
            Home
          </Link>

          {status === "loading" ? null : session ? (
            <>
              <span className="text-sm text-gray-600">Hi, {session.user?.name}</span>
              <button
                onClick={() => signOut()}
                className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Google Sign-in Button */}
              {/* <button
                onClick={() => signIn("google")}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Login with Google
              </button> */}

              {/* Optional: Traditional login/register links */}
              <Link
                href="/api/auth/login"
                className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600"
              >
                Login
              </Link>
              <Link
                href="/api/auth/register"
                className="text-gray-700 hover:text-orange-500"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
