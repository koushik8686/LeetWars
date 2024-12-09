import React from 'react';
import { motion } from 'framer-motion';
import { Swords, ArrowRight } from 'lucide-react';
export const Hero = () => {
  return (
    <div className=" relative overflow-hidden bg-leetcode-dark">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,#FFA11620,transparent_50%)]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -top-20 left-1/2 transform -translate-x-1/2">
              <Swords className="h-16 w-16 text-leetcode-orange animate-float" />
            </div>
            
            <h1 className="text-5xl sm:text-7xl font-bold text-leetcode-text tracking-tight">
              Leet<span className="text-leetcode-orange">Wars</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-400">
              Compare LeetCode profiles, track progress, and compete with friends.
              The ultimate platform for LeetCode profile analytics.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10 max-w-md mx-auto sm:flex sm:justify-center md:mt-12 gap-4"
          >
            <a
              href="#"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-black bg-leetcode-orange hover:bg-opacity-90 transition-all"
            >
              Compare Profiles
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <a
              href="#"
              className="mt-3 sm:mt-0 inline-flex items-center px-6 py-3 border border-leetcode-orange text-base font-medium rounded-md text-leetcode-orange hover:bg-leetcode-orange hover:bg-opacity-10 transition-all"
            >
              Create Group
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};