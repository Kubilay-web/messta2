interface PRNGeneratorParams {
  schoolId: string;
  studentId: string;
  feeId: string;
  year: number;
  term: string;
}

/**
 * Generates a unique Payment Registration Number (PRN)
 * Format: SCH[schoolPrefix]-[year][term]-[studentPrefix]-[feePrefix]-[random]
 * Example: SCH123-2024T1-STU456-FEE789-1A2B
 *
 * @param params Object containing required parameters for PRN generation
 * @returns Generated PRN string
 */
export const generatePRN = (params: PRNGeneratorParams): string => {
  const { schoolId, studentId, feeId, year, term } = params;

  // Extract prefixes (first 3 characters) from IDs
  const schoolPrefix = schoolId.slice(-3).toUpperCase();
  const studentPrefix = studentId.slice(-3).toUpperCase();
  const feePrefix = feeId.slice(-3).toUpperCase();

  // Generate a random alphanumeric string (4 characters)
  const generateRandomString = (): string => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return Array.from({ length: 4 }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length))
    ).join("");
  };

  // Format term (ensure it starts with 'T')
  const formattedTerm = term.startsWith("T") ? term : `T${term}`;

  // Construct PRN
  const prn = [
    `SCH${schoolPrefix}`,
    `${year}${formattedTerm}`,
    `STU${studentPrefix}`,
    `FEE${feePrefix}`,
    generateRandomString(),
  ].join("-");

  return prn;
};
