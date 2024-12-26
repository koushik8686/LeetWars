import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SkillsChart2 = ({ data }) => {
  // Extract user names and their performance data
  const chartData = data.map(user => ({
    name: user.name,
    fundamental: user.skills.fundamental.reduce((acc, curr) => acc + curr.problemsSolved, 0),
    intermediate: user.skills.intermidiate.reduce((acc, curr) => acc + curr.problemsSolved, 0),
    advanced: user.skills.advanced.reduce((acc, curr) => acc + curr.problemsSolved, 0),
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="fundamental" fill="#73d13d" />
        <Bar dataKey="intermediate" fill="#36cfc9" />
        <Bar dataKey="advanced" fill="#ff7300" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SkillsChart2;
