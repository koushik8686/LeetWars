'use client'

import { motion } from 'framer-motion'

interface UserData {
  name: string
  rank: number
}

interface RankVisualizationProps {
  users: UserData[]
}

export default function RankVisualization({ users }: RankVisualizationProps) {
  const totalRank = users.reduce((sum, user) => sum + user.rank, 0)

  return (
    <div className="w-full bg-leetcode-gray max-w-100 mx-auto p-6 space-y-8">
      <motion.h1 
        className="text-4xl font-bold text-center text-white dark:text-zinc-100"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
       Leetcode Rankings
      </motion.h1>

      <motion.div 
        className="h-48 bg-zinc-900 rounded-lg flex overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {users.map((user, index) => {
          const widthPercentage = 10+(((totalRank - user.rank) / totalRank) * 100)* 0.9
          return (  
            <motion.div
              key={user.name}
              className={`relative flex items-center justify-center group
                ${index === 0 ? 'bg-gradient-to-r from-[#2C2C2C] to-[#FF6B16]' : 'bg-gradient-to-l from-[#2C2C2C] to-[#4299E1]'}
              `}
              style={{ width: `${widthPercentage}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${widthPercentage}%` }}
              transition={{ duration: 0.8, delay: 0.6 + index * 0.2 }}
              whileHover={{ 
                transition: { duration: 0.2 }
              }}
            >
              <div className="text-center z-10 space-y-2">
                <motion.h3 
                  className="text-white font-bold text-lg md:text-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.2 }}
                >
                  {user.name}
                </motion.h3>
                <motion.p 
                  className="text-white/90 text-base md:text-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.2 }}
                >
                  {user.rank.toLocaleString()}
                </motion.p>
              </div>
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}

