import { CalenderType } from "../types/CustomScore";
export const calculatecalendarscore = (calendar1:CalenderType, calendar2:CalenderType) => {
  const calendarScores = [
    { name: calendar1.name, score: 0 },
    { name: calendar2.name, score: 0 },
  ];

  for (const day in calendar1.calendar) {
    const maxSubmissions = Math.max(
      calendar1.calendar[day] ,calendar2.calendar[day]
    );
    if (calendar1.calendar[day] === maxSubmissions) {
      calendarScores[0].score++;
    }
    if (calendar2.calendar[day] === maxSubmissions) {
      calendarScores[1].score++;
    }
  }
  return calendarScores;
};

