'use client'

import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { GitCompare, Users, GroupIcon } from 'lucide-react';

const features = [
  {
    icon: GitCompare,
    name: "comparisions",
    label: "Profile Comparisons",
  },
  {
    icon: GroupIcon,
    name: "groups",
    label: "Group Analytics",
  },
  {
    icon: Users,
    name: "users",
    label: "Active Users",
  },
];

function AnimatedCounter({ value }) {
  const counterRef = useRef(null);
  const inView = useInView(counterRef);
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        scale: [0.8, 1.2, 1],
        transition: { duration: 1 },
      });

      const start = 0;
      const end = parseInt(value.toString(), 10);
      const duration = 2000;
      const startTimestamp = performance.now();

      const step = (timestamp) => {
        if (!counterRef.current) return;

        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentCount = Math.floor(progress * (end - start) + start);

        counterRef.current.textContent = currentCount.toLocaleString();

        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          counterRef.current.textContent = end.toLocaleString();
        }
      };

      window.requestAnimationFrame(step);
    }
  }, [inView, value, controls]);

  return (
    <motion.span
      ref={counterRef}
      animate={controls}
      className="text-4xl font-bold bg-gradient-to-r from-[#FFA116] to-[#FF8A00] bg-clip-text text-transparent"
    >
      0
    </motion.span>
  );
}

const StatsSection = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/stats");
        const data = await res.json();
        setStats({
          users: data.users || 0,
          groups: data.groups || 0,
          comparisions: data.comparisions || 0,
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
        setStats({});
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="py-16 bg-[#2C2C2C] text-center">
        <motion.span
          className="text-4xl font-bold bg-gradient-to-r from-[#FFA116] to-[#FF8A00] bg-clip-text text-transparent"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading...
        </motion.span>
      </div>
    );
  }

  return (
    <div className="py-16 bg-[#2C2C2C] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(#FFA116 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center bg-gradient-to-r from-[#FFA116] to-[#FF8A00] bg-clip-text text-transparent my-8"
      >
        Till Now
      </motion.h2>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className="flex flex-col items-center p-6 rounded-xl backdrop-blur-sm bg-white/5 
                         hover:bg-white/10 transition-colors duration-300 cursor-pointer
                         hover:shadow-[0_0_30px_rgba(255,161,22,0.15)]"
            >
              <motion.div 
                className="flex items-center justify-center w-16 h-16 rounded-full mb-4 bg-[rgba(255,161,22,0.2)]"
                whileHover={{ 
                  rotate: 360,
                  scale: 1.1,
                  transition: { duration: 0.5 }
                }}
              >
                <feature.icon className="h-8 w-8 text-[#FFA116]" />
              </motion.div>
              
              <div className="text-3xl font-extrabold">
                <AnimatedCounter value={stats[feature.name] || 0} />
              </div>
              
              <motion.div 
                className="text-lg text-[#9CA3AF] mt-2"
                whileHover={{ scale: 1.05 }}
              >
                {feature.label}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;

