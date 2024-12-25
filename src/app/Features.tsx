'use client'

import { TrendingUp, Users, GitCompare } from 'lucide-react';

const features = [
  {
    icon: TrendingUp,
    title: 'Individual Analytics',
    description: 'Dive deep into your LeetCode stats. Track your progress and uncover detailed patterns to improve.',
    image: '/Ss6.png', // Updated image URL
  },
  {
    icon: GitCompare,
    title: '2-Profile Comparison',
    description: 'Compare your performance with a peer. Analyze strengths and weaknesses side by side.',
    image: '/Ss5.png', // Updated image URL
  },
  {
    icon: Users,
    title: 'Multi-Profile Stats',
    description: 'Manage and compare multiple LeetCode profiles for team or group tracking in one place.',
    image: '/Ss7.png', // Updated image URL
  },
];

export default function Features() {
  return (
    <div className="bg-leetcode-gray py-16">
      <h2 className="text-4xl font-bold text-center text-[#FFA116] my-8">
        Features 
      </h2>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-[350px] gap-2 md:gap-4"> {/* Improved height and spacing */}
          {features.map((feature) => (
            <div
              key={feature.title}
              className="relative overflow-hidden bg-black/30 rounded-lg shadow-md transition-all duration-300 ease-in-out hover:flex-[7] flex-1 group"
            >
              {/* Feature Content */}
              <div className="relative z-10 p-6">
                <feature.icon className="h-10 w-10 text-[#00ADB5] mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#00ADB5] transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {feature.description}
                </p>
              </div>

              {/* Background Image */}
              <img
                src={feature.image}
                alt={feature.title}
                className="absolute inset-0 h-full w-full object-cover opacity-30 group-hover:opacity-10 transition-opacity duration-300"
              />

              {/* Overlay Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20 opacity-70 group-hover:opacity-50 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
