import React from 'react';
import { Users, Trophy, Target, Clock } from 'lucide-react';

export const GroupDetails = () => {
  return (
    <div className="bg-[#2C2C2C] rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[#EFEFEF]">Team Alpha</h2>
        <div className="flex items-center space-x-2 text-gray-400">
          <Users className="h-5 w-5" />
          <span>3 members</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Member Cards */}
        {['user1', 'user2', 'user3'].map((user, index) => (
          <div key={index} className="bg-[#1A1A1A] p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-[#EFEFEF] mb-4">{user}</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Trophy className="h-5 w-5 text-[#FFA116]" />
                <div>
                  <p className="text-sm text-gray-400">Total Solved</p>
                  <p className="text-[#EFEFEF] font-semibold">{200 + index * 45}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Target className="h-5 w-5 text-[#FFA116]" />
                <div>
                  <p className="text-sm text-gray-400">Success Rate</p>
                  <p className="text-[#EFEFEF] font-semibold">{65 + index * 5}%</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-[#FFA116]" />
                <div>
                  <p className="text-sm text-gray-400">Last Active</p>
                  <p className="text-[#EFEFEF] font-semibold">{index + 1} days ago</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};