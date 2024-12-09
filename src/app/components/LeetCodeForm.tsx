'use client';

import { useState } from 'react';

export default function LeetcodeForm({sethideform }) {
  const [leetcodeUsername, setLeetcodeUsername] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState(''); // Local state for the message

  // Handle form submission to save LeetCode username
  async function handleLeetcodeSubmit(e) {
    e.preventDefault();

    try {
      // Validate the username
      const validationResponse = await fetch(`https://alfa-leetcode-api.onrender.com/${leetcodeUsername}`);
      const validationData = await validationResponse.json();

      if (validationData.errors) {
        console.log("incorrect leetcode name");
        setFeedbackMessage('Incorrect LeetCode ID'); // Set error message
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
        setFeedbackMessage('LeetCode username saved successfully!');
        sethideform(true) // Set success message
      } else {
        setFeedbackMessage('Failed to save LeetCode username.');
      }
    } catch (error) {
      console.error('Error updating LeetCode username:', error);
      setFeedbackMessage('An error occurred while updating your LeetCode username.');
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Please Provide Your LeetCode Username</h2>
      <form onSubmit={handleLeetcodeSubmit} className="space-y-4">
        {/* Display feedback message above the submit button */}
        {feedbackMessage && (
          <div className="text-center text-sm text-gray-700 bg-gray-200 p-2 rounded-md">
            {feedbackMessage}
          </div>
        )}
        <input
          type="text"
          placeholder="Enter LeetCode Username"
          value={leetcodeUsername}
          onChange={(e) => setLeetcodeUsername(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
