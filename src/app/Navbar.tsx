import React from "react";
import { Swords } from "lucide-react"; // Replace with actual icons you're using
const Navbar = () => {
  return (
    <nav className="sticky top-0 w-full z-50 border-b backdrop-blur-sm bg-[rgba(26,26,26,0.8)] border-[#2C2C2C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Swords className="h-8 w-8 text-[#FFA116]" />
            <span className="ml-2 text-xl font-bold">LeetWars</span>
          </div>

          {/* Desktop Menu */}
          <div className="flex items-center space-x-4">
            <a
              href="/auth"
              className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-all text-black hover:bg-opacity-90 bg-[#FFA116]"
            >
              Sign In
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
