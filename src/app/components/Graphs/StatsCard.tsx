import { motion } from 'framer-motion';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

export const StatsCard = ({ title, value, icon }: StatsCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#282828] p-6 rounded-lg shadow-lg"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[#b3b3b3] text-sm">{title}</p>
          <p className="text-white text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className="text-[#ffa116]">{icon}</div>
      </div>
    </motion.div>
  );
};