export function generateRegistrationNumber(
  schoolCode: string,
  sponsorshipType: "PS" | "SS",
  sequence: number
): string {
  // const { schoolCode = "BU", sponsorshipType, sequence } = options;

  // Validate sequence number
  if (sequence < 1 || sequence > 9999) {
    throw new Error("Sequence number must be between 1 and 9999");
  }

  // Pad the sequence number with leading zeros to ensure 4 digits
  const paddedSequence = sequence.toString().padStart(4, "0");
  const year = new Date().getFullYear();
  // Construct the registration number
  const registrationNumber = `${schoolCode}/${sponsorshipType}/${year}/${paddedSequence}`;

  return registrationNumber;
}
