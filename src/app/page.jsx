'use client'

import React, {  } from 'react'
import { motion,  } from 'framer-motion'
import { Swords, ArrowRight, ChevronDown, Search, UserCircle2, ArrowRightCircle, Trophy } from 'lucide-react'
import Navbar from './Navbar'
import StatsSection from './Stats'
import Features from './Features'

const steps = [
  {
    title: "Find Your LeetCode Profile ID ",
    description: "Log in to your LeetCode account and navigate to URL",
    icon: Search,
    image: "/Ss1.png",
    color: "from-purple-500 to-indigo-500"
  },
  {
    title: "Sign Up",
    description: "Enter your details to create a new account and start comparing LeetCode profiles.",
    icon: UserCircle2,
    image: "/SS2.png",
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "Give Your LeetCode Id",
    description: "Paste your ID in LeetWars ",
    icon: ArrowRightCircle,
    image: "/Ss3.png",
    color: "from-green-500 to-emerald-500"
  },
  {
    title: "Individual And Group Comparisions",
    description: "Add Individual And Grop Comparisions Using Navbar Buttons",
    icon: Trophy,
    image: "/ScreenShot4.png",
    color: "from-orange-500 to-yellow-500"
  }
]


export default function Home() {
  return (
    <div className="min-h-screen bg-[#1A1A1A] text-[#EFEFEF]">
      <Navbar/>
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-[#1A1A1A]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,161,22,0.1),transparent_50%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute -top-20 left-1/2 transform -translate-x-1/2">
                <Swords className="h-16 w-16 animate-float text-[#FFA116]" />
              </div>
              
              <h1 className="text-5xl sm:text-7xl font-bold tracking-tight">
                Leet<span className="text-[#FFA116]">Wars</span>
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-xl text-[#9CA3AF]">
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
              <a href="/home" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-black transition-all hover:bg-opacity-90 bg-[#FFA116]">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </motion.div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center">
            <span className="px-2 bg-[#1A1A1A] text-sm text-gray-500">
              <ChevronDown className="h-5 w-5 text-[#FFA116] animate-bounce" />
            </span>
          </div>
        </div>
      </div>

      {/* Wave Separator */}
      <div className="relative h-24 bg-[#1A1A1A]">
        <svg className="absolute bottom-0 w-full h-24 -mb-1 text-[#2C2C2C]" preserveAspectRatio="none" viewBox="0 0 1440 54">
          <path fill="currentColor" d="M0 22L120 16.7C240 11 480 1.00001 720 0.700012C960 1.00001 1200 11 1320 16.7L1440 22V54H1320C1200 54 960 54 720 54C480 54 240 54 120 54H0V22Z"></path>
        </svg>
      </div>
      {/* Steps */}
      <div className="bg-leetcode-gray py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Get Started in <span className="text-[#FFA116]">Minutes</span></h2>
            <p className="text-xl text-[#9CA3AF]">Follow these simple steps to begin your LeetWars journey</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="relative overflow-hidden rounded-xl aspect-[4/3]">
                  <div className={`absolute inset-0 opacity-75`}></div>
                  <img
                    src={step.image}
                    alt={step.title}
                    className="absolute inset-0 w-full h-full object-cover mix-blend-overlay transition-transform duration-500 group-hover:scale-110 filter blur-sm group-hover:blur-none"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-6 relative z-10">
                      <div className="bg-white/10 backdrop-blur-lg rounded-full p-4 mx-auto w-16 h-16 flex items-center justify-center mb-4">
                        <step.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                      <p className="text-white/90">{step.description}</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -left-4 -top-4 w-8 h-8 bg-[#FFA116] rounded-full flex items-center justify-center text-black font-bold">
                  {index + 1}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      {/* Stats Section */}
     <StatsSection/>
      {/* Features Section */}
      <Features/>
      {/* Steps Section */}
     

      {/* Footer */}
      <div className="bg-[#222831] text-[#9CA3AF] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-8 md:mb-0">
              <h2 className="text-2xl font-bold text-[#FFA116]">LeetWars</h2>
              <p className="mt-2 max-w-md">Your ultimate platform for LeetCode profile analytics and comparison.</p>
            </div>
            <div className="flex space-x-8">
              <a href="#" className="text-lg hover:text-[#FFA116] transition-colors">Privacy</a>
              <a href="#" className="text-lg hover:text-[#FFA116] transition-colors">Terms</a>
              <a href="#" className="text-lg hover:text-[#FFA116] transition-colors">Help</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} LeetWars. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  )
}