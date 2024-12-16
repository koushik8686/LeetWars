import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import { ProblemSolved } from '../../types/leetcodeData';

interface ProblemsPieChartProps {
  problems: ProblemSolved;
}

export const ProblemsPieChart = ({ problems }: ProblemsPieChartProps) => {
  const data = [
    { name: 'Easy', value: problems.easy, color: '#00b8a3' },
    { name: 'Medium', value: problems.medium, color: '#ffa116' },
    { name: 'Hard', value: problems.hard, color: '#ef4743' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-[#282828] p-6 rounded-lg shadow-lg"
    >
      <h3 className="text-white text-lg font-semibold mb-4">Problems Solved</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: '#1a1a1a', border: 'none' }}
              itemStyle={{ color: '#ffffff' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center gap-4 mt-4">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-[#b3b3b3] text-sm">
              {item.name}: {item.value}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};