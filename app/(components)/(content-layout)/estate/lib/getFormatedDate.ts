/**
 * Formats a date in the pattern: "Mar 13th 2025 8:00AM"
 * @param date The date to format
 * @returns The formatted date string
 */
export function getFormattedDate(date: Date): string {
  // Get month abbreviation
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months[date.getMonth()];

  // Get day with ordinal suffix
  const day = date.getDate();
  const suffix = getDaySuffix(day);

  // Get year
  const year = date.getFullYear();

  // Get hours and format for 12-hour clock with AM/PM
  let hours = date.getHours();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // Convert 0 to 12

  // Get minutes with leading zero if needed
  const minutes = date.getMinutes().toString().padStart(2, "0");

  // Combine all parts
  return `${month} ${day}${suffix} ${year} ${hours}:${minutes}${ampm}`;
}

/**
 * Gets the ordinal suffix for a day number (st, nd, rd, th)
 * @param day The day of the month (1-31)
 * @returns The appropriate suffix
 */
function getDaySuffix(day: number): string {
  if (day > 3 && day < 21) return "th"; // Handle 4th through 20th

  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}
