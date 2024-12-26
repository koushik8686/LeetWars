'use client'

import React from 'react';
interface LeaderboardProps {
  Data: { name: string; ranking: number }[];
}

export default function Leaderboard({ Data }: LeaderboardProps) {
  const sortedData = [...Data].sort((a, b) => a.ranking - b.ranking);
  const topThree = sortedData.slice(0, 3);
  const remaining = sortedData.slice(3);
  const getPodiumStyles = (position: number) => {
    const styles = {
      1: {
        container: "w-full sm:w-[220px] -mt-20",
        wrapper: "scale-100 hover:scale-110",
        medal: "from-yellow-300 via-yellow-400 to-yellow-600",
        podium: "h-[180px] sm:h-[220px] from-yellow-400 via-yellow-500 to-yellow-700",
        text: "text-xl sm:text-2xl font-bold bg-gradient-to-r from-yellow-200 to-yellow-500 text-transparent bg-clip-text",
      },
      2: {
        container: "w-full sm:w-[200px]",
        wrapper: "scale-90 hover:scale-100",
        medal: "from-gray-300 via-gray-400 to-gray-500",
        podium: "h-[160px] sm:h-[180px] from-gray-400 via-gray-500 to-gray-600",
        text: "text-lg sm:text-xl font-bold text-gray-300",
      },
      3: {
        container: "w-full sm:w-[180px]",
        wrapper: "scale-80 hover:scale-90",
        medal: "from-amber-600 via-amber-700 to-amber-800",
        podium: "h-[140px] sm:h-[140px] from-amber-700 via-amber-800 to-amber-900",
        text: "text-base sm:text-lg font-bold text-amber-500",
      }
    };
    return styles[position as keyof typeof styles];
  };

  const renderPodiumPlace = (position: number, name: string, ranking: number) => {
    const style = getPodiumStyles(position);

    return (
      <div className={`${style.container} flex flex-col items-center animate-[slideUp_0.5s_ease-out]`}>
        <div 
          className={`mb-4 ${style.wrapper} transition-transform duration-300 cursor-pointer`}
        >
          <div className={`bg-gradient-to-b ${style.medal} rounded-full p-1 animate-[glow_2s_ease-in-out_infinite]`}>
            <div className="bg-gradient-to-b from-[#1E293B] to-[#0F172A] rounded-full p-4 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
              <span className="text-4xl sm:text-5xl font-bold">{position}</span>
            </div>
          </div>
          <div className="text-center mt-4">
            <p className={style.text}>{name}</p>
            <p className="text-gray-400">#{ranking}</p>
          </div>
        </div>
        <div className={`w-full bg-gradient-to-b ${style.podium} rounded-t-lg relative overflow-hidden animate-[rise_1s_ease-out]`}>
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        </div>
      </div>
    );
  };

  return (
    <>
      {sortedData.length > 0 && (
        <div className="min-h-screen bg-leetcode-gray text-white p-4 sm:p-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-center mb-8 sm:mb-12 animate-[fadeIn_1s_ease-out]">
              <h1 className="text-3xl sm:text-4xl font-bold text-center  text-leetcode-orange">
                Leetcode Rankings
              </h1>
            </div>

            {/* Podium Section */}
            <div className="relative flex flex-col sm:flex-row items-center sm:items-end justify-center gap-4 h-auto sm:h-[400px] mb-8 sm:mb-16">
              {[2, 1, 3].map((position) => (
                <React.Fragment key={position}>
                  {renderPodiumPlace(
                    position,
                    topThree[position - 1].name,
                    topThree[position - 1].ranking
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Table Section */}
            {remaining.length > 0 && (
              <div className="bg-gradient-to-b from-[#282828] to-[#1F1F1F] rounded-xl overflow-hidden border border-slate-700/50 animate-[fadeInUp_1s_ease-out]">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-[#1F1F1F] to-[#2A2A2A]">
                      <tr>
                        <th className="px-4 sm:px-6 py-4 text-left text-slate-400">Rank</th>
                        <th className="px-4 sm:px-6 py-4 text-left text-slate-400">Name</th>
                        <th className="px-4 sm:px-6 py-4 text-right text-slate-400">Ranking</th>
                      </tr>
                    </thead>
                    <tbody>
                      {remaining.map((participant, index) => (
                        <tr 
                          key={participant.name}
                          className="border-t border-[#363636] hover:bg-[#323232] transition-all duration-300 animate-[fadeIn_1s_ease-out]"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <td className="px-4 sm:px-6 py-4 text-slate-500">#{index + 4}</td>
                          <td className="px-4 sm:px-6 py-4 text-slate-300">{participant.name}</td>
                          <td className="px-4 sm:px-6 py-4 text-right text-slate-400">
                            {participant.ranking}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );

}

