import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addLeetData } from '../../store/slice';
import fetchLeetcodeData from '../../utils/FetchLeetcodeData';
import Loader from '../Loader';
import { LeetCodeData } from '../../types/leetcodeData';
import { ActivityLineGraph2 } from '../Graphs2/ActivityLineGraph';
import ProblemsChart2 from '../Graphs2/ProblemsChart2';
import LanguagesChart2 from '../Graphs2/LanguagesChart';
import SkillsChart2 from '../Graphs2/SkillsGraph2';
import Badges2 from '../Graphs2/Badges2';
import { gsap } from 'gsap';
import LeaderBoard from '../Graphs2/LeaderBoard';

interface GroupDetailsProps {
  group: {
    group_name: string;
    group_members: Array<{
      user: string;
      leetcode_id: string;
      img: string;
    }>;
  };
}

interface UserCalendarData {
  name: string;
  calendar: Record<string, number>;
}

export const GroupDetails = ({ group }: GroupDetailsProps) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [usersData, setUsersData] = useState([]);
  const [activityLineProps, setActivityLineProps] = useState<UserCalendarData[]>([]);
  const [ProblemsProps, setProblemsProps] = useState([]);
  const [LanguageProps, setLanguageProps] = useState([]);
  const [skillsprops, setSkillsPRops] = useState([]);
  const [badgeprops, setbadgeprops] = useState([]);
  const leetData = useSelector((state: { leetinfo: { value: LeetCodeData[] } }) => state.leetinfo.value);
  const [RankingsData, setRankingsData] = useState([])
  // Utility function to merge calendars and normalize dates
  const mergeCalendars = (calendar: Record<string, number>, calendars: Record<string, number>[]) => {
    const updatedCalendar1 = { ...calendar };
    const allDates = new Set(calendars.reduce((acc, calendar) => [...acc, ...Object.keys(calendar)], Object.keys(calendar)));
    allDates.forEach((date) => {
      if (!(date in updatedCalendar1)) {
        updatedCalendar1[date] = 0;
      }
    });
    return updatedCalendar1;
  };
  // Fetch data for all group members
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const fetchedData = await Promise.all(
          group.group_members.map(async (member) => {
            const existingData = leetData.find((item) => item.id === member.leetcode_id);

            if (!existingData) {
              const data = await fetchLeetcodeData(member.leetcode_id, member.user);
              dispatch(addLeetData(data));
              return data;
            }
            return existingData;
          })
        );

        setUsersData(fetchedData);
      } catch (error) {
        console.error('Error fetching group member data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [group, leetData, dispatch]);

  // Process activity data after fetching is complete
  useEffect(() => {
    setTimeout(() => {
      if (!loading && usersData.length > 0) {
        // Map user calendars
        const activityData = group.group_members.map((member) => {
          const userData = usersData.find((user) => user.id === member.leetcode_id);
          const mergedCalendar = mergeCalendars(userData.calender, usersData.map(data => data.calender));
          return {
            name: member.user,
            calender: mergedCalendar,
          };
        });

        // Update state with fetched data
        const finalActivityData = activityData.map(data => ({
          name: data.name,
          calendar: { ...data.calender }
        }));

        const problems = usersData.map(data => ({
          name: data.name,
          problems: data.problems_solved,
        }));
        const languages = usersData.map(data => ({
          name: data.name,
          languages: data.languages,
        }));
        const skills = usersData.map(data => ({
          name: data.name,
          skills: data.skills,
        }));
        const badges = usersData.map(data => ({
          name: data.name,
          badges: data.badges,
        }));
        const rankings = usersData.map(data => ({
          name: data.name,
          ranking: data.ranking,
        }));    
        console.log("rankings" , rankings);
        setRankingsData(rankings)
        setbadgeprops(badges);
        setSkillsPRops(skills);
        setLanguageProps(languages);
        setProblemsProps(problems);
        setActivityLineProps(finalActivityData);
      }
    }, 500);
  }, [loading, usersData, group]);

  // GSAP Animations after loading is done
  useEffect(() => {
    if (!loading) {
      gsap.from(".group-name", {
        duration: 1,
        y: -50,
        opacity: 0,
        ease: "power4.out"
      });

      gsap.from(".activity-line-graph", {
        duration: 1.5,
        x: -100,
        opacity: 0,
        ease: "power4.out",
        delay: 0.5
      });

      gsap.from(".problems-chart", {
        duration: 1.5,
        x: 100,
        opacity: 0,
        ease: "power4.out",
        delay: 1
      });

      gsap.from(".skills-chart", {
        duration: 1.5,
        scale: 0.8,
        opacity: 0,
        ease: "back.out(1.7)",
        delay: 1.5
      });

      gsap.from(".languages-chart", {
        duration: 1.5,
        scale: 0.8,
        opacity: 0,
        ease: "back.out(1.7)",
        delay: 2
      });

      gsap.from(".badges", {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: "power4.out",
        delay: 2.5
      });
    }
  }, [loading]);

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white p-4 sm:p-8">
      {loading ? (
        <Loader />
      ) : (
        <div className="overflow-hidden">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 group-name">{group.group_name}</h2>
          <div className="space-y-4 sm:space-y-6">
            <LeaderBoard Data={RankingsData} />
            <div className="activity-line-graph">
              <ActivityLineGraph2 userCalendars={activityLineProps} />
            </div>
            <div className="problems-chart">
              <ProblemsChart2 data={ProblemsProps} />
            </div>
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
              <div className="w-full lg:w-1/2">
                <div className="bg-[#282828] p-4 sm:p-6 rounded-lg shadow-lg h-full">
                  <h3 className="text-white text-base sm:text-lg font-semibold mb-2 sm:mb-4">Skill Tags</h3>
                  <div className="skills-chart">
                    <SkillsChart2 data={skillsprops} />
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <div className="languages-chart">
                  <LanguagesChart2 inputData={LanguageProps} />
                </div>
              </div>
            </div>
          </div>
          <div className="badges">
            <Badges2 badges={badgeprops} />
          </div>
        </div>
      )}
    </div>
  );
};
