'use client'

import React, { useEffect, useRef } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'
import { Swords, ArrowRight, Menu, Users2, GitCompare, Users, TrendingUp, ChevronDown } from 'lucide-react'

const stats = [
  { name: 'Active Users', value: 5000, icon: Users2 },
  { name: 'Comparisons Made', value: 50000, icon: GitCompare },
  { name: 'Groups Created', value: 1200, icon: Users },
]

const features = [
  {
    icon: GitCompare,
    title: 'Quick Comparisons',
    description: 'Compare LeetCode profiles instantly. Just enter usernames and get detailed analytics.'
  },
  {
    icon: Users,
    title: 'Group Analytics',
    description: 'Create groups to track and compare multiple LeetCode profiles in one place.'
  },
  {
    icon: TrendingUp,
    title: 'Detailed Insights',
    description: 'Get comprehensive statistics and visualizations of solving patterns and progress.'
  }
]

const testimonials = [
  { name: 'Alex Johnson', role: 'Software Engineer', content: 'LeetWars has been a game-changer for my interview prep!' },
  { name: 'Sarah Lee', role: 'CS Student', content: 'I love competing with my classmates using LeetWars groups.' },
  { name: 'Mike Chen', role: 'Tech Lead', content: 'The insights provided by LeetWars are invaluable for our team.' },
]

function AnimatedCounter({ value }: { value: number }) {
  const counterRef = useRef<HTMLSpanElement>(null)
  const inView = useInView(counterRef)
  const controls = useAnimation()

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        transition: { duration: 1 }
      })
      let start = 0
      const end = parseInt(value.toString())
      const duration = 2000
      const startTimestamp = performance.now()

      const step = (timestamp: number) => {
        if (!counterRef.current) return

        const progress = Math.min((timestamp - startTimestamp) / duration, 1)
        const currentCount = Math.floor(progress * (end - start) + start)

        counterRef.current.textContent = currentCount.toString()

        if (progress < 1) {
          window.requestAnimationFrame(step)
        } else {
          counterRef.current.textContent = end.toString()
        }
      }

      window.requestAnimationFrame(step)
    }
  }, [inView, value, controls])

  return <span ref={counterRef} className="text-4xl font-bold" style={{ color: '#FFA116' }}>0</span>
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1A1A1A] text-[#EFEFEF]">
      {/* Navbar */}
      <nav className="sticky top-0 w-full z-50 border-b backdrop-blur-sm bg-[rgba(26,26,26,0.8)] border-[#2C2C2C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Swords className="h-8 w-8 text-[#FFA116]" />
              <span className="ml-2 text-xl font-bold">LeetWars</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <a href="#" className="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-[#FFA116] text-[#9CA3AF]">
                Compare
              </a>
              <a href="#" className="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-[#FFA116] text-[#9CA3AF]">
                Groups
              </a>
              <a href="#" className="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-[#FFA116] text-[#9CA3AF]">
                About
              </a>
              <a href="/auth" className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-all text-black hover:bg-opacity-90 bg-[#FFA116]">
                Sign In
              </a>
            </div>
            
            <div className="md:hidden flex items-center">
              <button className="hover:text-[#FFA116] text-[#9CA3AF]">
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

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
              <a href="#" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-black transition-all hover:bg-opacity-90 bg-[#FFA116]">
                Compare Profiles
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a href="#" className="mt-3 sm:mt-0 inline-flex items-center px-6 py-3 border text-base font-medium rounded-md transition-all hover:bg-opacity-10 border-[#FFA116] text-[#FFA116]">
                Create Group
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

      {/* Stats Section */}
      <div className="py-16 bg-[#2C2C2C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full mb-4 bg-[rgba(255,161,22,0.2)]">
                  <stat.icon className="w-6 h-6 text-[#FFA116]" />
                </div>
                <AnimatedCounter value={stat.value} />
                <div className="mt-1 text-lg">{stat.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-[#151515]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-[#FFA116]">Features</h2>
            <p className="mt-4 text-xl">Simple yet powerful LeetCode profile comparison tools</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-lg transition-all hover:bg-opacity-80 bg-[#2C2C2C] relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#FFA116] to-[#FF6B6B] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                <div className="flex items-center justify-center w-12 h-12 rounded-full mb-4 bg-[rgba(255,161,22,0.2)] relative z-10">
                  <feature.icon className="w-6 h-6 text-[#FFA116]" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#FFA116] relative z-10">{feature.title}</h3>
                <p className="relative z-10">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-[#151515] text-[#9CA3AF] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#FFA116]">LeetWars</h3>
              <p>Empowering developers to excel in their coding journey.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#FFA116]">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[#FFA116] transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-[#FFA116] transition-colors">Compare Profiles</a></li>
                <li><a href="#" className="hover:text-[#FFA116] transition-colors">Create Group</a></li>
                <li><a href="#" className="hover:text-[#FFA116] transition-colors">About Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#FFA116]">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[#FFA116] transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-[#FFA116] transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-[#FFA116] transition-colors">API Documentation</a></li>
                <li><a href="#" className="hover:text-[#FFA116] transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#FFA116]">Connect</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[#FFA116] transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-[#FFA116] transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-[#FFA116] transition-colors">GitHub</a></li>
                <li><a href="#" className="hover:text-[#FFA116] transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>&copy; 2023 LeetWars. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

