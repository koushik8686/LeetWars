import React from 'react';
import { Trophy, Target, Clock } from 'lucide-react';

export const ComparisonDetails = () => {
  return (
    <div className="bg-[#2C2C2C] rounded-lg p-6">
      <h2 className="text-xl font-bold text-[#EFEFEF] mb-6">Comparison Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User 1 Stats */}
        <div className="bg-[#1A1A1A] p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-[#EFEFEF] mb-4">user1</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Trophy className="h-5 w-5 text-[#FFA116]" />
              <div>
                <p className="text-sm text-gray-400">Total Solved</p>
                <p className="text-[#EFEFEF] font-semibold">245</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Target className="h-5 w-5 text-[#FFA116]" />
              <div>
                <p className="text-sm text-gray-400">Success Rate</p>
                <p className="text-[#EFEFEF] font-semibold">67.5%</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-[#FFA116]" />
              <div>
                <p className="text-sm text-gray-400">Last Active</p>
                <p className="text-[#EFEFEF] font-semibold">2 days ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* User 2 Stats */}
        <div className="bg-[#1A1A1A] p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-[#EFEFEF] mb-4">user2</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Trophy className="h-5 w-5 text-[#FFA116]" />
              <div>
                <p className="text-sm text-gray-400">Total Solved</p>
                <p className="text-[#EFEFEF] font-semibold">198</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Target className="h-5 w-5 text-[#FFA116]" />
              <div>
                <p className="text-sm text-gray-400">Success Rate</p>
                <p className="text-[#EFEFEF] font-semibold">72.3%</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-[#FFA116]" />
              <div>
                <p className="text-sm text-gray-400">Last Active</p>
                <p className="text-[#EFEFEF] font-semibold">5 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};