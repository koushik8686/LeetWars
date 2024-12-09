import React from 'react';
import { motion } from 'framer-motion';
import { Users2, GitCompare, Users } from 'lucide-react';

const stats = [
  { name: 'Active Users', value: '5K+', icon: Users2 },
  { name: 'Comparisons Made', value: '50K+', icon: GitCompare },
  { name: 'Groups Created', value: '1.2K+', icon: Users },
];

export const Stats = () => {
  return (
    <div className="bg-leetcode-gray py-16">
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
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-leetcode-orange bg-opacity-20 mb-4">
                <stat.icon className="w-6 h-6 text-leetcode-orange" />
              </div>
              <div className="text-3xl font-bold text-leetcode-orange">{stat.value}</div>
              <div className="text-leetcode-text mt-1">{stat.name}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};