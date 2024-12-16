 export interface LeetCodeData {
    name: string;
    id: string;
    ranking: string; // Adjust this to correct type if it's not a string (e.g., number)
    problems_solved: ProblemSolved;
    skills: Skills;
    calender: Record<string, number>; // Using Record to represent timestamp to number mapping
    languages: Languages;
    badges: Badges[];
  }
  
  // Reusing previous types for other sections
  export interface ProblemSolved {
    total: number;
    easy: number;
    medium: number;
    hard: number;
    easy_total: number;
    med_total: number;
    hard_total: number;
  }
  
  export interface Skills {
    advanced: number;
    intermediate: number;
    fundamental: number;
  }
  
  export interface Languages {
    [language: string]: number; // Language name as key and number of problems solved as value
  }
  
  export interface Badges {
    badgeType: string; // Example of a badge type, customize based on your actual data structure
    name: string;
  }
  export interface calender {
    calendar: Record<string, number>;
  }
  