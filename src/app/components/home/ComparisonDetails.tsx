import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addLeetData } from '../../store/slice'; // Adjust the path
import fetchLeetcodeData from '../../utils/FetchLeetcodeData'; // Adjust the path
import { LeetCodeData } from '../../types/leetcodeData'; // Import the type
import { ActivityLineGraph2 } from '../Graphs2/ActivityLineGraph';
import Loader from '../Loader'; // Adjust the path to your Loader component
import ProblemsChart2 from '../Graphs2/ProblemsChart2';
import LanguageChart2  from '../Graphs2/LanguagesChart';
import SkillsChart2 from '../Graphs2/SkillsGraph2';
import Badges2 from '../Graphs2/Badges2';
import Rank from '../Graphs2/Rank';
interface ComparisonDetailsProps {
  comparission: {
    user1: string;
    user1_leetcode_id: string;
    user2: string;
    user2_leetcode_id: string;
    img: string;
  };
}

export const ComparisonDetails: React.FC<ComparisonDetailsProps> = ({ comparission }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const leetData = useSelector((state: { leetinfo: { value: LeetCodeData[] } }) => state.leetinfo.value);

  useEffect(() => {
    const fetchData = async (id: string) => {
      const existingData = leetData.find((item) => item.id === id);
      if (!existingData) {
        const data = await fetchLeetcodeData(id, ""); // Fetch data from utils
        dispatch(addLeetData(data)); // Add to Redux store
      }
    };

    const loadData = async () => {
      setLoading(true); // Start loading
      await Promise.all([
        fetchData(comparission.user1_leetcode_id),
        fetchData(comparission.user2_leetcode_id),
      ]);
      setLoading(false); // End loading
    };

    loadData();
  }, [leetData, dispatch, comparission.user1_leetcode_id, comparission.user2_leetcode_id]);

  // Get user data from state
  const user1Data = leetData.find((item) => item.id === comparission.user1_leetcode_id);
  const user2Data = leetData.find((item) => item.id === comparission.user2_leetcode_id);
  const mergeCalendars = (calendar1: Record<string, number>, calendar2: Record<string, number>) => {
    const updatedCalendar1 = { ...calendar1 };
    const allDates = new Set([...Object.keys(updatedCalendar1), ...Object.keys(calendar2)]);  
    // Update updatedCalendar1 with missing dates from calendar2
    allDates.forEach((date) => {
      if (!(date in updatedCalendar1)) {
        // If the date is missing in updatedCalendar1, set it to 0
        updatedCalendar1[date] = 0;
      }
    });
    return updatedCalendar1; // Return the modified copy of calendar1
  };
  
  const activitylineprops = user1Data && user2Data ? [
    {
      name: comparission.user1,
      calendar: mergeCalendars(user2Data.calender, user1Data.calender),
    },
    {
      name: comparission.user2,
      calendar: mergeCalendars(user1Data.calender, user2Data.calender),
    }
  ] : [];

  const ProblemsProps= user1Data && user2Data? [
    {name : comparission.user1 , problems : user1Data.problems_solved},
    {name : comparission.user2 , problems : user2Data.problems_solved}
  ] :[]

  const languageData = user1Data && user2Data? [
    {name: comparission.user1, languages: user1Data.languages},
    {name: comparission.user2, languages: user2Data.languages}
  ] : [];

  const skillsData = user1Data&& user2Data?[
    {name: comparission.user1, skills: user1Data.skills},
    {name: comparission.user2, skills: user2Data.skills}
  ]:[]

  const RankData=user1Data&&user2Data?[
    {name: comparission.user1, rank: user1Data.ranking},
    {name: comparission.user2, rank: user2Data.ranking}
  ]:[]
  const BadgesData = user1Data&&user2Data?[
    {name: comparission.user1, badges: user1Data.badges},
    {name: comparission.user2, badges: user2Data.badges}
  ]:[]
  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white p-8">
      {loading ? (
        <Loader /> // Use your Loader component here
      ) : (
        <>
        <ActivityLineGraph2 userCalendars={activitylineprops} />
        <ProblemsChart2 data={ProblemsProps}  />
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          <div className="w-full lg:w-1/2">
            <div className="bg-[#282828] p-4 sm:p-6 rounded-lg shadow-lg h-full">
              <h3 className="text-white text-base sm:text-lg font-semibold mb-2 sm:mb-4">Skill Tags</h3>
              <SkillsChart2 data={skillsData}/>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <LanguageChart2 inputData={languageData} />
          </div>
        </div>
        <Badges2 badges={BadgesData} />
        <Rank users={RankData}/>
        </>
      )}
    </div>
  );
};
