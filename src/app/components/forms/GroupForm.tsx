import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

interface GroupFormProps {
  onSubmit: (data: { name: string, users: string[] }) => void;
}

export const GroupForm = ({ onSubmit }: GroupFormProps) => {
  const [name, setName] = useState('');
  const [users, setUsers] = useState(['']);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, users });
  };

  const addUser = () => {
    setUsers([...users, '']);
  };

  const removeUser = (index: number) => {
    setUsers(users.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-[#2C2C2C] rounded-lg p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold text-[#EFEFEF] mb-6">Create New Group</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#EFEFEF]">
            Group Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-[#1A1A1A] text-[#EFEFEF] px-4 py-2 rounded-md border border-[#3D3D3D] focus:border-[#FFA116] focus:ring-1 focus:ring-[#FFA116] outline-none"
            required
          />
        </div>

        {users.map((user, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-[#EFEFEF]">
                LeetCode Username {index + 1}
              </label>
              {users.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeUser(index)}
                  className="text-red-400 hover:text-red-300"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
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
          type="button"
          onClick={addUser}
          className="flex items-center space-x-2 text-[#FFA116] hover:text-opacity-80"
        >
          <Plus className="h-4 w-4" />
          <span>Add User</span>
        </button>

        <button
          type="submit"
          className="w-full bg-[#FFA116] text-black py-2 rounded-md font-medium hover:bg-opacity-90 transition-colors"
        >
          Create Group
        </button>
      </form>
    </div>
  );
};