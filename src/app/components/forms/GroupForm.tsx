import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import validateLeetCodeId from '../../utils/VerifYLeetcode';
interface GroupFormProps {
  HideForm: () => void;
}

export const GroupForm = ({ HideForm }: GroupFormProps) => {
  const [groupName, setGroupName] = useState('');
  const [users, setUsers] = useState([{ user: '', leetcode_id: '' }]);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      for (const user of users) {
        const validationData = await validateLeetCodeId(user.leetcode_id);
        if (validationData.errors) {
          setFeedbackMessage(`Invalid LeetCode ID for ${user.user}`);
          return;
        }
      }

      const response = await fetch('/api/addgroup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ groupName, users }),
      });

      if (!response.ok) {
        throw new Error('Failed to create group');
      }

      setFeedbackMessage('Group created successfully!');
      setGroupName('');
      setUsers([{ user: '', leetcode_id: '' }]);
      HideForm();
    } catch (error) {
      setFeedbackMessage(`Error: Unable to create group. ${error}`);
    }
  };

  const addUser = () => {
    if (users.length < 10) {
      setUsers([...users, { user: '', leetcode_id: '' }]);
    } else {
      setFeedbackMessage('Maximum of 10 users allowed.');
    }
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
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="w-full bg-[#1A1A1A] text-[#EFEFEF] px-4 py-2 rounded-md border border-[#3D3D3D] focus:border-[#FFA116] focus:ring-1 focus:ring-[#FFA116] outline-none"
            required
          />
        </div>

        {users.map((user, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-[#EFEFEF]">
                User {index + 1}
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
              placeholder="Name"
              value={user.user}
              onChange={(e) => {
                const newUsers = [...users];
                newUsers[index].user = e.target.value;
                setUsers(newUsers);
              }}
              className="w-full bg-[#1A1A1A] text-[#EFEFEF] px-4 py-2 rounded-md border border-[#3D3D3D] focus:border-[#FFA116] focus:ring-1 focus:ring-[#FFA116] outline-none"
              required
            />
            <input
              type="text"
              placeholder="LeetCode ID"
              value={user.leetcode_id}
              onChange={(e) => {
                const newUsers = [...users];
                newUsers[index].leetcode_id = e.target.value;
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

        {feedbackMessage && (
          <div
            className={`text-sm p-2 rounded mt-4 ${
              feedbackMessage.includes('Invalid') || feedbackMessage.includes('Failed') || feedbackMessage.includes('error') || feedbackMessage.includes('exists')
              ? 'bg-red-500/10 text-red-400'
                : 'bg-green-500/10 text-green-400'
            }`}
          >
            {feedbackMessage}
          </div>
        )}

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
