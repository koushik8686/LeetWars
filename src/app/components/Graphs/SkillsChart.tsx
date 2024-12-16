import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

export const SkillsChart = ({ skills, title }) => {
  const sortedSkills = [...skills].sort((a, b) => b.problemsSolved - a.problemsSolved).slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#282828] p-6 rounded-lg shadow-lg"
    >
      <h3 className="text-white text-lg font-semibold mb-4">{title}</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sortedSkills} layout="vertical">
            <XAxis type="number" stroke="#b3b3b3" />
            <YAxis
              dataKey="tagName"
              type="category"
              width={100}
              stroke="#b3b3b3"
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#1a1a1a', border: 'none' }}
              itemStyle={{ color: '#ffffff' }}
            />
            <Bar dataKey="problemsSolved" fill="#ffa116" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};