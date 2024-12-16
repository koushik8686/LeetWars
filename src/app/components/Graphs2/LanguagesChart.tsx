import React from 'react';
import {  Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { motion } from 'framer-motion';

const colors = ['#ffa116', '#36cfc9', '#ff4d4f', '#597ef7', '#73d13d', '#f8e231', '#e6b8a3', '#9ca3e2', '#e6d8c3', '#b3acf2'];
const LanguagesChart2 = ({ inputData }) => {
    const allLanguages = Array.from(
        new Set(inputData.flatMap((user) => user.languages.map((lang) => lang.languageName)))
    );
    const formatData = (inputData) => {
        return inputData.flatMap((user) => {
          return allLanguages.map((language) => {
            const languageData = user.languages.find((lang) => lang.languageName === language);
            return {
              name: user.name,
              language,
              problemsSolved: languageData ? languageData.problemsSolved : 0,
            };
          });
        });
      };
      
  console.log(inputData);
    const data = formatData(inputData);
  const pieData = allLanguages.map(language => ({
    name: language,
    value: data.reduce((acc, curr) => 
      curr.language === language ? acc + curr.problemsSolved : acc, 0
    )
  }));

  return (
    <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-[#282828] p-4 sm:p-6 rounded-lg shadow-lg"
  >
    <h3 className="text-lg sm:text-xl font-semibold text-[#EFEFEF] mb-4 sm:mb-6">Problems Solved by Language</h3>
    <div className="h-[300px] sm:h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius="80%"
            paddingAngle={5}
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={colors[index % colors.length]} 
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: '#3A3A3A', border: 'none' }}
            itemStyle={{ color: '#EFEFEF' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
    <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-4">
      {pieData.map((entry, index) => (
        <div key={index} className="flex items-center">
          <div 
            className="w-2 h-2 sm:w-3 sm:h-3 rounded-full mr-1 sm:mr-2 flex-shrink-0" 
            style={{ backgroundColor: colors[index % colors.length] }}
          />
          <span className="text-xs sm:text-sm text-[#EFEFEF] whitespace-nowrap">
            {entry.name}: {entry.value}
          </span>
        </div>
      ))}
    </div>
  </motion.div>
  );
};

export default LanguagesChart2;

