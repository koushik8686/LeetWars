import React from 'react';
import { motion } from 'framer-motion';
import { GitCompare, Users, TrendingUp } from 'lucide-react';

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
];

export const Features = () => {
  return (
    <div className="bg-leetcode-darker py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-leetcode-orange">Features</h2>
          <p className="mt-4 text-leetcode-text">Simple yet powerful LeetCode profile comparison tools</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-leetcode-gray p-6 rounded-lg hover:bg-opacity-80 transition-all"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-leetcode-orange bg-opacity-20 mb-4">
                <feature.icon className="w-6 h-6 text-leetcode-orange" />
              </div>
              <h3 className="text-xl font-semibold text-leetcode-orange mb-2">{feature.title}</h3>
              <p className="text-leetcode-text">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};