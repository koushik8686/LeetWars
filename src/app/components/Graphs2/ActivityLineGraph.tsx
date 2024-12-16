import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'framer-motion';
import { useState } from 'react';
export interface ActivityLineGraphProps {
  userCalendars: { name: string; calendar: Record<string, number> }[]; // Array of user data with calendars
}

// Function to calculate scores for a single calendar

export const ActivityLineGraph2 = ({ userCalendars }: ActivityLineGraphProps) => {
  const [activeUser, setActiveUser] = useState<string | null>(null);

  // Prepare data for the graph
  const data = userCalendars.flatMap(({ name, calendar }) =>
    Object.entries(calendar).map(([timestamp, count]) => ({
      date: new Date(parseInt(timestamp) * 1000).toLocaleDateString(),
      user: name,
      submissions: count,
    }))
  );

  // Group data by date for plotting
  const groupedData = data.reduce((acc, curr) => {
    const existing = acc.find((item) => item.date === curr.date);
    if (existing) {
      existing[curr.user] = curr.submissions;
    } else {
      acc.push({ date: curr.date, [curr.user]: curr.submissions });
    }
    return acc;
  }, []);
  const userNames = Array.from(new Set(data.map((entry) => entry.user)));
  const colors = ['#ffa116', '#36cfc9', '#ff4d4f', '#597ef7', '#73d13d', '#f8e231', '#e6b8a3', '#9ca3e2', '#e6d8c3', '#b3acf2'];

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
          <LineChart data={groupedData}>
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
            <Legend
              onMouseEnter={(e) => setActiveUser(e.value)}
              onMouseLeave={() => setActiveUser(null)}
            />
            {userNames.map((userName, index) => (
              <Line
                key={userName}
                type="monotone"
                dataKey={userName}
                stroke={colors[index % colors.length]}
                strokeWidth={2}
                dot={{ fill: colors[index % colors.length], r: 0 }}
                activeDot={{ r: 3, fill: colors[index % colors.length] }}
                opacity={activeUser === null || activeUser === userName ? 1 : 0.1}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
