'use client';
import { Menu, PlusCircle, Users, LogOut, GitCompare, X, BarChart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LeetcodeForm } from '../components/forms/LeetCodeForm';
import { signOut } from 'next-auth/react';
import { ComparisonForm } from '../components/forms/ComparisionForm';
import { GroupForm } from '../components/forms/GroupForm';
import { ComparisonDetails } from '../components/home/ComparisonDetails';
import { GroupDetails } from '../components/home/GroupDetails';
import FetchData from '../utils/FetchData';
import Loader from '../components/Loader'; // Assuming you have a Loader component
import { StatsDetails } from '../components/StatsDetails';
import { useSelector, useDispatch } from 'react-redux'; // Import hooks for Redux
// import { addLeetData } from '../store/LeetSlice'; // Import the Redux action
import {addLeetData} from '../store/slice'
export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const existingLeetStats = useSelector((state) => state.leetinfo); // Access current stats from Redux store
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasLeetCodeId, setHasLeetCodeId] = useState(null); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeContent, setActiveContent] = useState(null);
  const [activeForm, setActiveForm] = useState(null);
  const [comparisons, setComparisons] = useState([]);
  const [current_comparision, setcurrent_comparision] = useState(null)
  const [current_group, setcurrent_group] = useState(null)
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [leetcode_id, setleetcode_id] = useState("")
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data = await FetchData();
      // console.log(data);
      console.log("yoo");
      
      if (data.comparisions) {
        setComparisons(data.comparisions);
        setGroups(data.groups);
        setStats(data.data);
        setleetcode_id(data.leetcode_id);
        // Check if data.data is already in Redux store
        const existingStats = existingLeetStats.value.find(stats => stats.id === leetcode_id);
        console.log();
        console.log("loo");
        if (!existingStats) {
          dispatch(addLeetData(data.data)); // Dispatch action to update Redux store
        } else {
          console.log("Data already exists in Redux store", existingStats);
        }
        console.log("updated" , existingLeetStats);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    async function checkUser() {
      try {
        const response = await fetch('/api/verify', { method: 'GET', credentials: 'include' });
        if (response.status) {
          const data = await response.json();
          setIsAuthenticated(true);
          setHasLeetCodeId(data.user.hasLeetCodeUsername);
        } else {
          router.push('/auth'); // Redirect to login if not authenticated
        }
      } catch (error) {
        console.error('Error checking user authentication:', error);
        router.push('/auth');
      }
    }
    fetchData(); // Call fetchData function to get data and update Redux
    checkUser(); // Call to check user authentication
  }, []); // Empty dependency array ensures it only runs once when the component mounts
  
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

  // If still loading, show a full-page loader
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#1A1A1A]">
        <Loader />
      </div>
    );
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
          <button onClick={toggleSidebar} className=" text-[#EFEFEF]">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-4">
          <div className="space-y-4">
            <button
              onClick={() => {setActiveContent('stats');}}
              className="w-full flex items-center space-x-2 px-4 py-2 text-[#EFEFEF] hover:bg-[#3D3D3D] rounded-md transition-colors"
            >
              <BarChart className="h-5 w-5" />
              <span>Your Analytics</span>
            </button>
            <button
              onClick={() => {setActiveForm('addComparison'); setActiveContent('null')}}
              className="w-full flex items-center space-x-2 px-4 py-2 text-[#EFEFEF] hover:bg-[#3D3D3D] rounded-md transition-colors"
            >
              <PlusCircle className="h-5 w-5" />
              <span>Add Comparison</span>
            </button>
            <button
              onClick={() => {setActiveForm('addGroup') ; setActiveContent('null')}}
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
            <div  className="space-y-2">
              {comparisons&& comparisons.length>0&& comparisons.map((comparison) => (
                <button
                  key={comparison.id}
                  onClick={() => {
                    setActiveContent('comparison');
                    setcurrent_comparision(comparison);
                    setActiveForm(null);
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-[#EFEFEF] hover:bg-[#3D3D3D] rounded-md transition-colors"
                >
                  <img
                    src={comparison.img}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full border border-[#3D3D3D]"
                  />
                  <span>{comparison.user2}</span>
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
              {  groups.length>0&& groups.map((group) => (
                <button
                  key={group.id}
                  onClick={() => {
                    setActiveContent('group');
                    setcurrent_group(group);
                    setActiveForm(null);
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-[#EFEFEF] hover:bg-[#3D3D3D] rounded-md transition-colors"
                >
                  <div className="flex -space-x-2">
                    {group.group_members.slice(0, 3).map((user, index) => (
                      <img
                        key={index}
                        src={user.img}
                        alt="Group Member Avatar"
                        className="w-6 h-6 rounded-full border border-[#3D3D3D]"
                      />
                    ))}
                    {group.group_members.length > 3 && (
                      <span className="w-6 h-6 bg-[#2C2C2C] text-xs text-[#EFEFEF] flex items-center justify-center rounded-full border border-[#3D3D3D]">
                        +{group.group_members.length - 3}
                      </span>
                    )}
                  </div>
                  <span>{group.group_name}</span>
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
      {!isSidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-40 bg-[#2C2C2C] p-2 rounded-md"
        >
          <Menu className="h-6 w-6 text-[#EFEFEF]" />
        </button>
      )}
          {isAuthenticated && ( <>{!hasLeetCodeId && <LeetcodeForm sethideform={setHasLeetCodeId} />}</>)}
          
          {/* Forms */}
          {activeForm === 'addComparison' && (
            <ComparisonForm HideForm={() => {setActiveForm(null) ; fetchData()}} />
          )}
          {activeForm === 'addGroup' && (
            <GroupForm  HideForm={() => {setActiveForm(null) ; fetchData()}}/>
          )}

          {/* Content */}
          {activeContent === 'comparison' && current_comparision && (<ComparisonDetails comparission={current_comparision} />)} 
          {activeContent === 'group' &&  current_group&& <GroupDetails group={current_group}/>}
          {activeContent ===  'stats' && <StatsDetails stats={stats} />}
          {!activeForm && !activeContent && (
            <div className="flex items-center justify-center min-h-[calc(100vh-2rem)]">
             <StatsDetails stats={stats} />
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}