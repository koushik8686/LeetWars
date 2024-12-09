import React from 'react';
import { Swords, Menu } from 'lucide-react';

export const Navbar = () => {
  return (
    <nav className="fixed w-full z-50 bg-leetcode-dark/80 backdrop-blur-sm border-b border-leetcode-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Swords className="h-8 w-8 text-leetcode-orange" />
            <span className="ml-2 text-xl font-bold text-leetcode-text">LeetWars</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <a href="#" className="text-gray-300 hover:text-leetcode-orange px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Compare
            </a>
            <a href="#" className="text-gray-300 hover:text-leetcode-orange px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Groups
            </a>
            <a href="#" className="text-gray-300 hover:text-leetcode-orange px-3 py-2 rounded-md text-sm font-medium transition-colors">
              About
            </a>
            <a href="#" className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black bg-leetcode-orange hover:bg-opacity-90 transition-all">
              Sign In
            </a>
          </div>
          
          <div className="md:hidden flex items-center">
            <button className="text-gray-300 hover:text-leetcode-orange">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};