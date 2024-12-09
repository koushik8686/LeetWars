const fs = require('fs');

// Example array of submission data
const submissionData = [
  {
   submissionCalendar: {"1704585600": 4, "1704672000": 3, "1705017600": 4, "1705104000": 3, "1706400000": 9, "1706918400": 3, "1707264000": 4, "1707436800": 3, "1707523200": 12, "1707782400": 6, "1707868800": 1, "1708041600": 7, "1708128000": 2, "1708214400": 1, "1708300800": 3, "1711324800": 6, "1712275200": 5, "1712534400": 5, "1713052800": 11, "1713312000": 2, "1715212800": 2, "1716681600": 9, "1717027200": 6, "1717632000": 3, "1721692800": 1, "1724025600": 4, "1724112000": 12, "1724198400": 8, "1724284800": 2, "1724371200": 4, "1724457600": 1, "1724544000": 1, "1724716800": 2, "1728345600": 2, "1728432000": 6, "1728518400": 3, "1728604800": 2, "1728864000": 1, "1728950400": 12, "1729036800": 5, "1729123200": 5, "1729296000": 7, "1729382400": 7, "1729468800": 9, "1729555200": 1, "1730160000": 16, "1730419200": 1, "1730678400": 4, "1730764800": 8, "1730851200": 4, "1730937600": 3, "1731024000": 1, "1731110400": 1, "1731196800": 12, "1731283200": 5, "1731369600": 6, "1731456000": 1, "1731542400": 1, "1731628800": 2, "1731715200": 1, "1731801600": 1, "1731888000": 2, "1731974400": 5, "1732924800": 1, "1733443200": 4, "1733616000": 3, "1703635200": 3, "1703894400": 4}
  }
];
var total = 0;
// Combine and flatten submission data into a single object
const combinedData = submissionData.reduce((acc, curr) => {
  Object.entries(curr.submissionCalendar).forEach(([timestamp, count]) => {
    acc[timestamp] = (acc[timestamp] || 0) + count;
    total+=count // Combine counts for the same timestamp
  });
  return acc;
}, {});

// Optional: Convert timestamps to human-readable dates
const readableData = Object.entries(combinedData).map(([timestamp, count]) => ({
  date: new Date(timestamp * 1000).toISOString().split('T')[0], // Convert to YYYY-MM-DD
  count
}));

// Save the combined data to a JSON file
fs.writeFileSync('submissionData.json', JSON.stringify(readableData, null, 2));

console.log('Data saved to submissionData.json' , total);
