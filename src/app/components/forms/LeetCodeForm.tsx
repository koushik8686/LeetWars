import React, { useState } from 'react';
import { User } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

interface LeetcodeFormProps {
  sethideform: (value: boolean) => void;
}

export const LeetcodeForm = ({ sethideform }: LeetcodeFormProps) => {
  const [leetcodeUsername, setLeetcodeUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleLeetcodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFeedbackMessage('');

    try {
      // Validate the username
      const validationResponse = await fetch(`https://alfa-leetcode-api.onrender.com/${leetcodeUsername}`);
      const validationData = await validationResponse.json();

      if (validationData.errors) {
        setFeedbackMessage('Incorrect LeetCode ID');
        toast.error('Incorrect LeetCode ID');
        return;
      }

      // Save the username if validation succeeds
      const response = await fetch('/api/update-leetcode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leetcodeUsername }),
        credentials: 'include',
      });

      if (response.ok) {
        toast.success('LeetCode username saved successfully!');
        sethideform(true);
      } else {
        setFeedbackMessage('Failed to save LeetCode username.');
        toast.error('Failed to save LeetCode username');
      }
    } catch (error) {
      console.error('Error updating LeetCode username:', error);
      setFeedbackMessage('An error occurred while updating your LeetCode username.');
      toast.error('An error occurred while updating your LeetCode username');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-2rem)]">
      <Toaster position="top-right" />
      <div className="bg-[#2C2C2C] p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-6">
          <User className="h-12 w-12 text-[#FFA116]" />
        </div>
        
        <h2 className="text-xl font-bold text-[#EFEFEF] mb-6 text-center">
          Please Provide Your LeetCode Username
        </h2>
        
        <form onSubmit={handleLeetcodeSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Enter LeetCode Username"
              value={leetcodeUsername}
              onChange={(e) => setLeetcodeUsername(e.target.value)}
              className="w-full bg-[#1A1A1A] text-[#EFEFEF] pl-10 pr-4 py-2 rounded-md border border-[#3D3D3D] focus:border-[#FFA116] focus:ring-1 focus:ring-[#FFA116] outline-none transition-colors"
              required
              disabled={loading}
            />
          </div>

          {feedbackMessage && (
            <div className={`text-sm p-2 rounded ${
              feedbackMessage.includes('Incorrect') || feedbackMessage.includes('Failed') || feedbackMessage.includes('error')
                ? 'bg-red-500/10 text-red-400'
                : 'bg-green-500/10 text-green-400'
            }`}>
              {feedbackMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[#FFA116] text-black py-2 rounded-md font-medium transition-all ${
              loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-opacity-90'
            }`}
          >
            {loading ? 'Verifying...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};