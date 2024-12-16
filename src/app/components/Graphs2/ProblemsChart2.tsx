import React from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, PieChart as RePieChart, Pie, Cell } from 'recharts';
import { ProblemSolved } from '../../types/leetcodeData';
import {motion} from 'framer-motion'
interface UserStats {
  name: string;
  problems: ProblemSolved;
}

const ProblemsChart2: React.FC<{ data: UserStats[] }> = ({ data }) => {
  const difficulties = ['easy', 'medium', 'hard'] as const;
  const colors = ['#ffa116', '#36cfc9', '#ff4d4f', '#597ef7', '#73d13d', '#f8e231', '#e6b8a3', '#9ca3e2', '#e6d8c3', '#b3acf2'];

  // Bar Chart Data
  const barChartData = difficulties.map((difficulty) => {
    const difficultyData = {
      difficulty: difficulty.charAt(0).toUpperCase() + difficulty.slice(1),
    };

    data.forEach((user) => {
      difficultyData[user.name] = user.problems[difficulty];
    });

    return difficultyData;
  });

  // Pie Chart Data
  const pieChartData = data.map((user) => ({
    name: user.name,
    value: user.problems.total,
  }));

  return (
    <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className=" rounded-lg shadow-lg flex flex-wrap gap-6 my-4"
  >  
    {/* Pie Chart on the Left */}
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="flex-1 min-w-[300px] h-[300px] bg-[#282828] p-4 rounded-lg shadow-lg flex flex-wrap"
      style={{ flex: 0.3 }}
    >
      <h4 className="text-white text-md font-medium mb-4">Problems Solved</h4>
      <ResponsiveContainer width="100%" height="100%">
        <RePieChart>
          <Pie
            data={pieChartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {pieChartData.map((entry, index) => (
              <Cell key={`cell-${entry.name}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: '#3A3A3A', border: 'none' }}
            itemStyle={{ color: '#fff' }}
          />
        </RePieChart>
      </ResponsiveContainer>
    </motion.div>
  
    {/* Bar Chart on the Right */}
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="flex-1 min-w-[300px] h-[300px] bg-[#282828] p-4 rounded-lg shadow-lg"
    //   style={{ flex: 0.7 }}
    >
      <h4 className="text-white text-md font-medium mb-4">Difficulty Comparision</h4>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={barChartData}>
        <Legend />
          <XAxis dataKey="difficulty" stroke="#EFEFEF" />
          <YAxis stroke="#EFEFEF" />
         
          <Tooltip
            contentStyle={{ backgroundColor: '#3A3A3A', border: 'none' }}
            labelStyle={{ color: '#EFEFEF' }}
          />
          {data.map((user, index) => (
            <Bar key={user.name} dataKey={user.name} fill={colors[index % colors.length]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  </motion.div>
    
  );
};

export default ProblemsChart2;
