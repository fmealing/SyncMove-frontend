// Utility function to calculate age from a DOB string in "dd/mm/yyyy" format
export const calculateAgeFromDob = (dobString: string): number => {
  // Split the dob string by "/" to extract day, month, and year
  const [year, month, day] = dobString.split("-").map(Number);

  // Create a new Date object from the dob
  const dob = new Date(year, month - 1, day);

  // Get the current date
  const today = new Date();

  // Calculate age
  let age = today.getFullYear() - dob.getFullYear();
  const monthDifference = today.getMonth() - dob.getMonth();

  // If the current date is before the birthday this year, subtract one from the age
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < dob.getDate())
  ) {
    age--;
  }

  return age;
};
