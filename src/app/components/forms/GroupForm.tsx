'use client'

import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import validateLeetCodeId from '../../utils/VerifYLeetcode';

interface GroupFormProps {
  HideForm: () => void;    
  CloseForm :()=> void;

}

export const GroupForm = ({ HideForm , CloseForm}: GroupFormProps) => {
  const [groupName, setGroupName] = useState('');
  const [users, setUsers] = useState([{ user: '', leetcode_id: '' }]);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      for (const user of users) {
        const validationData = await validateLeetCodeId(user.leetcode_id);
        if (validationData.errors) {
          setFeedbackMessage(`Invalid LeetCode ID for ${user.user}`);
          setIsSubmitting(false);
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
      setTimeout(() => {
        HideForm();
      }, 1500);
    } catch (error) {
      setFeedbackMessage(`Error: Unable to create group. ${error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addUser = () => {
    if (users.length < 10) {
      const newUser = { user: '', leetcode_id: '' };
      if (!users.some(user => user.user === newUser.user || user.leetcode_id === newUser.leetcode_id)) {
        setUsers([...users, newUser]);
      } else {
        setFeedbackMessage('User or LeetCode ID already exists.');
      }
    } else {
      setFeedbackMessage('Maximum of 10 users allowed.');
    }
  };

  const removeUser = (index: number) => {
    setUsers(users.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
      <div className="bg-[#2C2C2C] rounded-lg w-full max-w-md relative flex flex-col max-h-[90vh]">
        <div className="p-6 pb-4">
          <button
            onClick={CloseForm}
            className="absolute top-4 right-4 text-[#EFEFEF] hover:text-[#FFA116]"
          >
            <X className="h-6 w-6" />
          </button>
          <h2 className="text-xl font-bold text-[#EFEFEF] mb-6">Create New Group</h2>
        </div>

        <div className="p-6 pt-0 overflow-y-auto flex-1">
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

            <div className="space-y-4">
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
            </div>

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
          </form>
        </div>

        <div className="p-6 pt-0 border-t border-[#3D3D3D] mt-4">
          <button
            type="submit"
            onClick={handleSubmit}
            form="group-form"
            disabled={isSubmitting}
            className={`w-full bg-[#FFA116] text-black py-2 rounded-md font-medium transition-colors ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-90'
            }`}
          >
            {isSubmitting ? 'Creating Group...' : 'Create Group'}
          </button>
        </div>
      </div>
    </div>
  );
};

