import { motion } from 'framer-motion';
import { ProblemSolved } from '../../types/leetcodeData';

interface ProblemStatsProps {
  problems: ProblemSolved;
}

export const ProblemStats = ({ problems }: ProblemStatsProps) => {
  const categories = [
    { name: 'Easy', solved: problems.easy, total: problems.easy_total, color: '#00b8a3' },
    { name: 'Medium', solved: problems.medium, total: 1500, color: '#ffa116' },
    { name: 'Hard', solved: problems.hard, total: problems.hard_total, color: '#ef4743' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#282828] p-6 rounded-lg shadow-lg"
    >
      <h3 className="text-white text-lg font-semibold mb-6">Problem Solving Progress</h3>
      <div className="space-y-4">
        {categories.map((category) => (
          <div key={category.name} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[#b3b3b3]">{category.name}</span>
              <span className="text-[#b3b3b3]">
                {category.solved} / {category.total} ({((category.solved / category.total) * 100).toFixed(1)}%)
              </span>
            </div>
            <div className="h-2 bg-[#3e3e3e] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${(category.solved / category.total) * 100}%`,
                  backgroundColor: category.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};