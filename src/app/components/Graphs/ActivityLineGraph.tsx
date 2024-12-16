import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

interface ActivityLineGraphProps {
  calendar: Record<string, number>;
}

export const ActivityLineGraph = ({ calendar }: ActivityLineGraphProps) => {
  const data = Object.entries(calendar)
    .map(([timestamp, count]) => ({
      date: new Date(parseInt(timestamp) * 1000).toLocaleDateString(),
      submissions: count,
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#282828] p-6 rounded-lg shadow-lg"
    >
      <h3 className="text-white text-lg font-semibold mb-6">Submission Activity</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis
              dataKey="date"
              stroke="#b3b3b3"
              tick={{ fill: '#b3b3b3' }}
              tickLine={{ stroke: '#b3b3b3' }}
            />
            <YAxis
              stroke="#b3b3b3"
              tick={{ fill: '#b3b3b3' }}
              tickLine={{ stroke: '#b3b3b3' }}
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#1a1a1a', border: 'none' }}
              itemStyle={{ color: '#ffffff' }}
              labelStyle={{ color: '#b3b3b3' }}
            />
            <Line
              type="monotone"
              dataKey="submissions"
              stroke="#ffa116"
              strokeWidth={2}
              dot={{ fill: '#ffa116', r: 4 }}
              activeDot={{ r: 6, fill: '#ffa116' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};