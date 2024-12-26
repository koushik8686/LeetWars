
'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Home, AlertCircle } from 'lucide-react';
import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <AlertCircle className="h-20 w-20 text-[#FFA116] mx-auto mb-6" />
        
        <h1 className="text-6xl font-bold text-[#EFEFEF] mb-4">
          4<span className="text-[#FFA116]">0</span>4
        </h1>
        
        <p className="text-xl text-[#9CA3AF] mb-8">
          Oops! This page does not exist
        </p>

        <Link 
          href="/"
          className="inline-flex items-center px-6 py-3 rounded-md bg-[#FFA116] text-black font-medium transition-all hover:bg-opacity-90"
        >
          <Home className="h-5 w-5 mr-2" />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}