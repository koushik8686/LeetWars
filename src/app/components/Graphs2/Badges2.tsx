'use client'

import { useState } from 'react';
import React  from 'react';
import { motion } from 'framer-motion';

const Badges2= ({ badges }) => {
  // Prepare the table data
  const tableData = badges.map(user => {
    const badgeCount = user.badges.length;
    return {
      userName: user.name,
      badges: user.badges,
      badgeCounts: badgeCount
    };
  });
  const useHoverState = (length: number) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    
    const getHoverStyles = (index: number) => {
      if (hoveredIndex === null) return {};
      const offset = (index - hoveredIndex) * 20; // Adjust this value to change the spread
      return { x: offset };
    };
  
    return { setHoveredIndex, getHoverStyles };
  };
  const BadgeStack = ({ badges }) => {
    const visibleBadges = badges.slice(0, 10);
    const remainingCount = Math.max(0, badges.length - 10);
    const { setHoveredIndex, getHoverStyles } = useHoverState(visibleBadges.length);
  
    return (
      <div className="flex items-center">
        <div className="flex items-center">
          {visibleBadges.map((badge, index) => (
            <motion.div
              key={badge.id}
              className="relative"
              whileHover={{ scale: 2.2, zIndex: 10 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <motion.img
                src={badge.icon.startsWith('/') ? `https://leetcode.com${badge.icon}` : badge.icon}
                alt={badge.displayName}
                className="w-8 h-8 rounded-full border-2 border-gray-800 bg-gray-700"
                title={badge.displayName}
                layout
                animate={getHoverStyles(index)}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            </motion.div>
          ))}
        </div>
        {remainingCount > 0 && (
          <motion.div
            className="ml-1 bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            +{remainingCount}
          </motion.div>
        )}
      </div>
    );
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="overflow-hidden my-4 p-4 bg-[#2A2A2A] rounded-lg shadow-lg"
    >
      <table className="min-w-full text-sm text-left text-[#EFEFEF]">
        <thead className="bg-[#393E46]">
          <tr>
            <th className="py-3 px-4 border-b border-gray-700 rounded-tl-lg">User Name</th>
            <th className="py-3 px-4 border-b border-gray-700">Badges</th>
            <th className="py-3 px-4 border-b border-gray-700 rounded-tr-lg">Count</th>
          </tr>
        </thead>
        <tbody className="text-[#EEEEEE]">
          {tableData.map((row, index) => (
            <motion.tr
              key={index}
              className="hover:bg-[#3A3A3A] transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <td className="py-3 px-4 border-b border-gray-700">{row.userName}</td>
              <td className="py-3 px-4 border-b border-gray-700">
                <BadgeStack badges={row.badges} />
              </td>
              <td className="py-3 px-4 border-b border-gray-700">{row.badgeCounts}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default Badges2;

