export const calculateLeaveDays = (startDate, numberOfDays, publicHolidays) => {
  // Convert start date to a JavaScript Date object
  const startDateObj = new Date(startDate);

  // Create an array to store public holidays as Date objects
  const publicHolidaysArray = publicHolidays.map(
    (holiday) => new Date(holiday),
  );

  // Initialize a variable to count leave days
  let leaveDays = 0;

  // Initialize a variable for the return date
  let returnDate = new Date(startDate);

  // Loop through each day and check if it's a weekend or public holiday
  while (leaveDays < numberOfDays) {
    // Check if the current day is a weekend (Saturday or Sunday)
    const dayOfWeek = returnDate.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      // Check if the current day is not a public holiday
      const isPublicHoliday = publicHolidaysArray.some(
        (holiday) => holiday.toDateString() === returnDate.toDateString(),
      );

      if (!isPublicHoliday) {
        leaveDays++;
      }
    }

    // Move to the next day
    returnDate.setDate(returnDate.getDate() + 1);
  }

  // Return the calculated leave days and the return date
  return {
    leaveDays,
    returnDate: returnDate.toISOString().split("T")[0], // Format the return date as YYYY-MM-DD
  };
};
