// components/Navbar.tsx
"use client";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-white shadow px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-orange-600">Travel</Link>
        <div className="space-x-4">
          <Link href="/" className="text-gray-700 hover:text-orange-500">Home</Link>
          {/* <Link href="/package/add" className="text-gray-700 hover:text-orange-500">Add Package</Link> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
