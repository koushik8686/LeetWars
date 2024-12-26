import React, { useState } from 'react';
import validateLeetCodeId from '../../utils/VerifYLeetcode';
import Loader  from '../../components/Loader2'; // Assuming you have a Loader component

interface UserEditPropa {
  HideForm: () => void;
   User: {
    name : string;
    leetcode_id : string;
  };
  CloseForm:()=>void;
}

export const UserEdit = ({ HideForm , User , CloseForm}: UserEditPropa) => {
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [name, setname] = useState(User.name);
  const [leetcode_id, setFriendLeetCode] = useState(User.leetcode_id);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const validationData = await validateLeetCodeId(leetcode_id);
      if (validationData.errors) {
        setFeedbackMessage('Incorrect LeetCode ID');
        return;
      }

      const response = await fetch('/api/register', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: name, leetcode_id: leetcode_id }),
      });

      if (response.ok) {
        setFeedbackMessage(null);
        setname("");
        setFriendLeetCode("");
        HideForm();
      } else {
        const errorData = await response.json();
        setFeedbackMessage(errorData.error || 'An error occurred');
      }
    } catch (error) {
      setFeedbackMessage(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-[#2C2C2C] rounded-lg p-6 max-w-md w-full mx-4 relative">
        <button
          onClick={CloseForm}
          className="absolute top-2 right-2 text-[#EFEFEF] hover:text-[#FFA116] transition-colors"
          aria-label="Close"
        >
          &times;
        </button>
        
        <h2 className="text-xl font-bold text-[#EFEFEF] mb-6">Edit Your Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#EFEFEF]">
              Edit Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setname(e.target.value)}
              className="w-full bg-[#1A1A1A] text-[#EFEFEF] px-4 py-2 rounded-md border border-[#3D3D3D] focus:border-[#FFA116] focus:ring-1 focus:ring-[#FFA116] outline-none"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#EFEFEF]">
              Edit LeetCode ID
            </label>
            <input
              type="text"
              value={leetcode_id}
              onChange={(e) => setFriendLeetCode(e.target.value)}
              className="w-full bg-[#1A1A1A] text-[#EFEFEF] px-4 py-2 rounded-md border border-[#3D3D3D] focus:border-[#FFA116] focus:ring-1 focus:ring-[#FFA116] outline-none"
              required
            />
          </div>
          {feedbackMessage && (
            <div
              className={`text-sm p-2 rounded ${
                feedbackMessage.includes('Incorrect') || feedbackMessage.includes('Failed') || feedbackMessage.includes('error') || feedbackMessage.includes('exists')
                  ? 'bg-red-500/10 text-red-400'
                  : 'bg-green-500/10 text-green-400'
              }`}
            >
              {feedbackMessage}
            </div>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#FFA116] text-black py-2 rounded-md font-medium hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader /> : 'Create Comparison'}
          </button>
        </form>
      </div>
    </div>
  );
};

