const calendarscore = (calendar: Record<string, number>, calendars: Record<string, number>[]) => {
    let score = 0;
    for (const day in calendar) {
      const maxSubmissions = Math.max(...calendars.map((cal) => cal[day] || 0));
      if (calendar[day] === maxSubmissions) {
        score++;
      }
    }
    return score;
  };
  
  // Function to calculate total scores for all users
export const calculatecalendarscore = (calendars: { name: string; calendar: Record<string, number> }[]) => {
    const scores = calendars.map(({ name, calendar }) => {
      const totalScore = calendarscore(calendar, calendars.map((c) => c.calendar));
      return { name, totalScore };
    });
  
    // Sort in descending order of scores
    return scores.sort((a, b) => b.totalScore - a.totalScore);
  };
  