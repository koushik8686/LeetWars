import React, { useState } from "react";
import { Swords, Menu, X } from "lucide-react"; // Replace with actual icons you're using
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="sticky top-0 w-full z-50 border-b backdrop-blur-sm bg-[rgba(26,26,26,0.8)] border-[#2C2C2C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Swords className="h-8 w-8 text-[#FFA116]" />
            <span className="ml-2 text-xl font-bold">LeetWars</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="#"
              className="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-[#FFA116] text-[#9CA3AF]"
            >
              Compare
            </a>
            <a
              href="#"
              className="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-[#FFA116] text-[#9CA3AF]"
            >
              Groups
            </a>
            <a
              href="#"
              className="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-[#FFA116] text-[#9CA3AF]"
            >
              About
            </a>
            <a
              href="/auth"
              className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-all text-black hover:bg-opacity-90 bg-[#FFA116]"
            >
              Sign In
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="hover:text-[#FFA116] text-[#9CA3AF]"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Popup Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-[rgba(26,26,26,0.95)] border-t border-[#2C2C2C] z-40">
          <div className="flex flex-col items-center space-y-4 py-4">
            <a
              href="#"
              className="px-3 py-2 text-sm font-medium transition-colors hover:text-[#FFA116] text-[#9CA3AF]"
            >
              Compare
            </a>
            <a
              href="#"
              className="px-3 py-2 text-sm font-medium transition-colors hover:text-[#FFA116] text-[#9CA3AF]"
            >
              Groups
            </a>
            <a
              href="#"
              className="px-3 py-2 text-sm font-medium transition-colors hover:text-[#FFA116] text-[#9CA3AF]"
            >
              About
            </a>
            <a
              href="/auth"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-all text-black hover:bg-opacity-90 bg-[#FFA116]"
            >
              Sign In
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
