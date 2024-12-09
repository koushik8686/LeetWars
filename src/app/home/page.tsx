'use client';
import { Menu, PlusCircle, Users, LogOut, GitCompare, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {LeetcodeForm} from '../components/forms/LeetCodeForm'; // Import the new form component
import { signOut } from 'next-auth/react';
import { ComparisonForm } from '../components/forms/ComparisionForm';
import { GroupForm } from '../components/forms/GroupForm';
import { ComparisonDetails } from '../components/home/ComparisonDetails';
import { GroupDetails } from '../components/home/GroupDetails';
export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasLeetCodeId, setHasLeetCodeId] = useState(null); // null indicates loading
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeContent, setActiveContent] = useState(null);
  const [activeForm, setActiveForm] = useState(null);
  const [comparisons, setComparisons] = useState([
    { id: 1, users: ['user1', 'user2'], date: '2024-03-10' },
    { id: 2, users: ['user3', 'user4'], date: '2024-03-11' }
  ]);
  const [groups, setGroups] = useState([
    { id: 1, name: 'Team Alpha', users: ['user1', 'user2', 'user3'] },
    { id: 2, name: 'Team Beta', users: ['user4', 'user5', 'user6'] }
  ]);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
    <div>
       <div className="flex min-h-screen bg-[#1A1A1A]">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} w-64 bg-[#2C2C2C] transition-transform duration-300 ease-in-out z-30`}>
        <div className="flex items-center justify-between p-4 border-b border-[#3D3D3D]">
          <div className="flex items-center space-x-2">
            <GitCompare className="h-6 w-6 text-[#FFA116]" />
            <span className="text-[#EFEFEF] font-bold text-lg">LeetWars</span>
          </div>
          <button onClick={toggleSidebar} className="lg:hidden text-[#EFEFEF]">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-4">
          <div className="space-y-4">
            <button
              onClick={() => setActiveForm('addComparison')}
              className="w-full flex items-center space-x-2 px-4 py-2 text-[#EFEFEF] hover:bg-[#3D3D3D] rounded-md transition-colors"
            >
              <PlusCircle className="h-5 w-5" />
              <span>Add Comparison</span>
            </button>
            <button
              onClick={() => setActiveForm('addGroup')}
              className="w-full flex items-center space-x-2 px-4 py-2 text-[#EFEFEF] hover:bg-[#3D3D3D] rounded-md transition-colors"
            >
              <Users className="h-5 w-5" />
              <span>Add Group</span>
            </button>
          </div>

          {/* Comparisons List */}
          <div className="mt-8">
            <div className="flex items-center space-x-2 text-[#EFEFEF] mb-2">
              <GitCompare className="h-5 w-5" />
              <span className="font-semibold">Comparisons</span>
            </div>
            <div className="space-y-2">
              {comparisons.map((comparison) => (
                <button
                  key={comparison.id}
                  onClick={() => {
                    setActiveContent('comparison');
                    setActiveForm(null);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-[#EFEFEF] hover:bg-[#3D3D3D] rounded-md transition-colors"
                >
                  {comparison.users.join(' vs ')}
                </button>
              ))}
            </div>
          </div>

          {/* Groups List */}
          <div className="mt-8">
            <div className="flex items-center space-x-2 text-[#EFEFEF] mb-2">
              <Users className="h-5 w-5" />
              <span className="font-semibold">Groups</span>
            </div>
            <div className="space-y-2">
              {groups.map((group) => (
                <button
                  key={group.id}
                  onClick={() => {
                    setActiveContent('group');
                    setActiveForm(null);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-[#EFEFEF] hover:bg-[#3D3D3D] rounded-md transition-colors"
                >
                  {group.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="absolute bottom-4 left-4 flex items-center space-x-2 px-4 py-2 text-red-400 hover:bg-red-400/10 rounded-md transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-0'} transition-margin duration-300 ease-in-out`}>
        <div className="p-4">
          <button
            onClick={toggleSidebar}
            className="lg:hidden fixed top-4 left-4 z-40 bg-[#2C2C2C] p-2 rounded-md"
          >
            <Menu className="h-6 w-6 text-[#EFEFEF]" />
          </button>
            {isAuthenticated && ( <>{!hasLeetCodeId && <LeetcodeForm sethideform={setHasLeetCodeId} />}</>)}
          {/* Forms */}
          {activeForm === 'addComparison' && (
            <ComparisonForm onSubmit={(data) => {
              setComparisons([...comparisons, { id: Date.now(), ...data }]);
              setActiveForm(null);
            }} />
          )}
          {activeForm === 'addGroup' && (
            <GroupForm onSubmit={(data) => {
              setGroups([...groups, { id: Date.now(), ...data }]);
              setActiveForm(null);
            }} />
          )}

          {/* Content */}
          {activeContent === 'comparison' && <ComparisonDetails />}
          {activeContent === 'group' && <GroupDetails />}

          {!activeForm && !activeContent && (
            <div className="flex items-center justify-center min-h-[calc(100vh-2rem)]">
              <div className="text-center">
                <GitCompare className="h-16 w-16 text-[#FFA116] mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-[#EFEFEF] mb-2">Welcome to LeetWars</h1>
                <p className="text-gray-400">Select a comparison or group from the sidebar to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}
