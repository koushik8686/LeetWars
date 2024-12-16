import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import { Languages } from '../../types/leetcodeData';

interface LanguagesChartProps {
  languages: Languages[];
}

export const LanguagesChart = ({ languages }: LanguagesChartProps) => {
  const colors = ['#00b8a3', '#ffa116', '#ef4743', '#2cbb5d', '#9e8cfc', '#f87171'];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#282828] p-6 rounded-lg shadow-lg"
    >
      <h3 className="text-white text-lg font-semibold mb-4">Languages Used</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={languages}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="problemsSolved"
              nameKey="languageName"
            >
              {languages.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: '#1a1a1a', border: 'none' }}
              itemStyle={{ color: '#ffffff' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {languages.map((lang, index) => (
          <div key={lang.languageName} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: colors[index % colors.length] }}
            />
            <span className="text-[#b3b3b3] text-sm">
              {lang.languageName}: {lang.problemsSolved}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};