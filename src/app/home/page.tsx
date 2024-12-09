'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LeetcodeForm from '../components/LeetCodeForm'; // Import the new form component
import { signOut } from 'next-auth/react';
export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasLeetCodeId, setHasLeetCodeId] = useState(null); // null indicates loading

  useEffect(() => {
    // Check authentication and LeetCode ID
    async function checkUser() {
      try {
        const response = await fetch('/api/verify', { method: 'GET', credentials: 'include' });
        if (response.ok) {
          const data = await response.json();
          setIsAuthenticated(true);
          setHasLeetCodeId(data.user.hasLeetCodeUsername);
        } else {
          router.push('/auth'); // Redirect to login if not authenticated
        }
      } catch (error) {
        console.error('Error checking user authentication:', error);
        router.push('/login');
      }
    }
    checkUser();
  }, [router]);

  // Logout handler
  async function handleLogout() {
    try {
      await signOut({ redirect: false }); // No redirect after sign-out
      const response = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (response.ok) {
        setIsAuthenticated(false);
        router.push('/auth'); // Redirect to login page after logout
      } else {
        console.error('Failed to log out');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {isAuthenticated && (
        <>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome to the Home Page</h1>
          <button
            onClick={handleLogout}
            className="absolute top-4 right-4 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
          {!hasLeetCodeId && <LeetcodeForm sethideform={setHasLeetCodeId} />}
        </>
      )}
    </div>
  );
}
