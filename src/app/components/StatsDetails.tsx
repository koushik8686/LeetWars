import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, Target, Brain } from 'lucide-react';
import { StatsCard } from './Graphs/StatsCard';
import { ProblemsPieChart } from './Graphs/ProblemsPieChart';
import { SkillsChart } from './Graphs/SkillsChart';
import { LanguagesChart } from './Graphs/LanguagesChart';
import { ProblemStats } from './Graphs/ProblemStats';
import { ActivityLineGraph } from './Graphs/ActivityLineGraph';
import Badges from './Graphs/Badges';

gsap.registerPlugin(ScrollTrigger);

export const StatsDetails = ({ stats }) => {
  const graphRefs = useRef([]);
  const cardRefs = useRef([]);
  const headingRef = useRef(null);
  useEffect(() => {
    // Animate heading
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: -50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'bounce.out',
      }
    );

    // Animate cards with stagger effect
    gsap.fromTo(
      cardRefs.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        stagger: 0.2,
      }
    );

    // Animate graphs when they come into view
    graphRefs.current.forEach((el) => {
      if (el) {
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Animated Heading */}
        <h1
          className="text-3xl font-bold mb-8 text-center"
          ref={headingRef}
        >
          Hey <span className='text-leetcode-orange'> {stats.name} </span> check your analytics
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {[
            { title: 'Total Problems', value: stats.problems_solved.total, icon: <Trophy size={24} /> },
            { title: 'Easy Problems', value: stats.problems_solved.easy, icon: <Brain size={24} /> },
            { title: 'Medium Problems', value: stats.problems_solved.medium, icon: <Brain size={24} /> },
            { title: 'Hard Problems', value: stats.problems_solved.hard, icon: <Brain size={24} /> },
            { title: 'Global Ranking', value: stats.ranking.toLocaleString(), icon: <Target size={24} /> },
          ].map((card, index) => (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              className="transition-transform transform hover:scale-105 hover:shadow-lg"
            >
              <StatsCard {...card} />
            </div>
          ))}
        </div>

        {/* Graph Sections */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
          ref={(el) => (graphRefs.current[0] = el)}
        >
          <ProblemStats problems={stats.problems_solved} />
          <ActivityLineGraph calendar={stats.calender} />
        </div>

        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
          ref={(el) => (graphRefs.current[1] = el)}
        >
          <ProblemsPieChart problems={stats.problems_solved} />
          <LanguagesChart languages={stats.languages} />
        </div>

        <div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
          ref={(el) => (graphRefs.current[2] = el)}
        >
          <SkillsChart skills={stats.skills.advanced} title="Advanced Skills" />
          <SkillsChart
            skills={stats.skills.intermidiate}
            title="Intermediate Skills"
          />
          <SkillsChart
            skills={stats.skills.fundamental}
            title="Fundamental Skills"
          />
        </div>
        <Badges Badges={stats.badges}/>

      </div>
    </div>
  );
};
