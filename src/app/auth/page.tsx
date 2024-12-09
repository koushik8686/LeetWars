'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Swords, Mail, Lock, User } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '../components/Loader'; // Import the LoadingSpinner component
type TabType = 'login' | 'register';

export default function Auth() {
  const router = useRouter();
  const { data: session, status } = useSession(); // Get session data from next-auth
  const [activeTab, setActiveTab] = useState<TabType>('login');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    async function checkUser() {
      try {
        const response = await fetch('/api/verify', { method: 'GET', credentials: 'include' });
        if (response.ok) {
          router.push('/home');
        }
      } catch (error) {
        console.error('Error checking user authentication:', error);
        router.push('/login');
      }
    }

    if (status === 'authenticated') {
      console.log(session);
      if (session?.user?.email) {
        setToken(session.user.email); // Call to set token in your API
      }
    }

    checkUser();
  }, [router, session, status]);

  const setToken = async (email: string) => {
    try {
      setLoading(true);
      const response = await fetch('/api/set-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      }).then((resp)=>{
        if (resp.ok) {
          router.push('/home')
        }
      });
    } catch (error) {
      toast.error(error.message || 'An error occurred while setting token');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const url = activeTab === 'login' ? '/api/login' : '/api/register';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to process the request');
      } else {
        router.push('/home'); // Redirect to home page after successful login or registration
      }
      toast.success(
        activeTab === 'login' ? 'Successfully logged in!' : 'Account created successfully!'
      );
    } catch (error) {
      toast.error(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    setLoading(true);
    signIn('google').then((resp) => {
      console.log(resp);
      console.log(resp.user.email);
      // setToken(resp.user.email); 
      setLoading(false);
    });
  };

  return (
    <div className="min-h-screen bg-leetcode-dark flex items-center justify-center px-4">
      <Toaster position="top-right" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-leetcode-gray rounded-lg shadow-xl p-8">
          <div className="flex justify-center mb-8">
            <Swords className="h-12 w-12 text-leetcode-orange" />
          </div>

          <div className="flex mb-8">
            <button
              className={`flex-1 py-2 text-center transition-colors ${
                activeTab === 'login'
                  ? 'text-leetcode-orange border-b-2 border-leetcode-orange'
                  : 'text-gray-400 border-b-2 border-transparent hover:text-leetcode-orange'
              }`}
              onClick={() => setActiveTab('login')}
            >
              Login
            </button>
            <button
              className={`flex-1 py-2 text-center transition-colors ${
                activeTab === 'register'
                  ? 'text-leetcode-orange border-b-2 border-leetcode-orange'
                  : 'text-gray-400 border-b-2 border-transparent hover:text-leetcode-orange'
              }`}
              onClick={() => setActiveTab('register')}
            >
              Register
            </button>
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {activeTab === 'register' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className="w-full bg-leetcode-darker text-leetcode-text pl-10 pr-4 py-2 rounded-md border border-leetcode-gray focus:border-leetcode-orange focus:ring-1 focus:ring-leetcode-orange outline-none transition-colors"
                        placeholder="Enter your username"
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-leetcode-darker text-leetcode-text pl-10 pr-4 py-2 rounded-md border border-leetcode-gray focus:border-leetcode-orange focus:ring-1 focus:ring-leetcode-orange outline-none transition-colors"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full bg-leetcode-darker text-leetcode-text pl-10 pr-4 py-2 rounded-md border border-leetcode-gray focus:border-leetcode-orange focus:ring-1 focus:ring-leetcode-orange outline-none transition-colors"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-leetcode-orange text-black py-2 rounded-md font-medium transition-all ${
                  loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-opacity-90'
                }`}
              >
                {loading ? 'Processing...' : activeTab === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            </form>
          )}

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-leetcode-gray text-gray-400">Or continue with</span>
              </div>
            </div>

            <button
              onClick={handleGoogleSignIn}
              className="mt-6 w-full flex items-center justify-center gap-3 bg-white text-gray-900 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              Sign in with Google
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
