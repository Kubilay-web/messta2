interface TimeFormat {
  time: string; // e.g., "14:30:45"
  timeWithSeconds: string; // e.g., "14:30:45"
  timeAmPm: string; // e.g., "02:30 PM"
  isoString: string; // e.g., "2024-02-03T14:30:45.000Z"
  timestamp: number; // Unix timestamp
}

export const getCurrentTime = (): TimeFormat => {
  const now = new Date();

  // Get hours in 12-hour format
  const hours12 = now.getHours() % 12 || 12;
  const amPm = now.getHours() >= 12 ? "PM" : "AM";

  // Pad numbers with leading zeros
  const padZero = (num: number): string => num.toString().padStart(2, "0");

  const hours = padZero(now.getHours());
  const minutes = padZero(now.getMinutes());
  const seconds = padZero(now.getSeconds());

  return {
    time: `${hours}:${minutes}`,
    timeWithSeconds: `${hours}:${minutes}:${seconds}`,
    timeAmPm: `${padZero(hours12)}:${minutes} ${amPm}`,
    isoString: now.toISOString(),
    timestamp: now.getTime(),
  };
};

// Usage example:
/*
const timeInfo = getCurrentTime();
console.log(timeInfo.time);           // "14:30"
console.log(timeInfo.timeWithSeconds); // "14:30:45"
console.log(timeInfo.timeAmPm);       // "02:30 PM"
console.log(timeInfo.isoString);      // "2024-02-03T14:30:45.000Z"
console.log(timeInfo.timestamp);      // 1706971845000
*/
