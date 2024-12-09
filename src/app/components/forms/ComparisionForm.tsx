import React, { useState } from 'react';

interface ComparisonFormProps {
  onSubmit: (data: { users: string[], date: string }) => void;
}

export const ComparisonForm = ({ onSubmit }: ComparisonFormProps) => {
  const [users, setUsers] = useState(['', '']);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      users,
      date: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="bg-[#2C2C2C] rounded-lg p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold text-[#EFEFEF] mb-6">Add New Comparison</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {users.map((user, index) => (
          <div key={index} className="space-y-2">
            <label className="block text-sm font-medium text-[#EFEFEF]">
              LeetCode Username {index + 1}
            </label>
            <input
              type="text"
              value={user}
              onChange={(e) => {
                const newUsers = [...users];
                newUsers[index] = e.target.value;
                setUsers(newUsers);
              }}
              className="w-full bg-[#1A1A1A] text-[#EFEFEF] px-4 py-2 rounded-md border border-[#3D3D3D] focus:border-[#FFA116] focus:ring-1 focus:ring-[#FFA116] outline-none"
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-[#FFA116] text-black py-2 rounded-md font-medium hover:bg-opacity-90 transition-colors"
        >
          Create Comparison
        </button>
      </form>
    </div>
  );
};