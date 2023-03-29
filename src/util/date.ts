export const getTodaysDateAndTomorrowsDate = () => {
  const now = new Date();
  const timezoneOffset = now.getTimezoneOffset();

  const todaysDateTime = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours(),
      now.getUTCMinutes(),
      now.getUTCSeconds(),
      now.getUTCMilliseconds()
    )
  );

  const tomorrowsDateTime = new Date(todaysDateTime.getTime());
  tomorrowsDateTime.setDate(tomorrowsDateTime.getDate() + 1);

  if (timezoneOffset === 300) {
    tomorrowsDateTime.setUTCHours(5, 0, 0, 0);
  } else if (timezoneOffset === 240) {
    tomorrowsDateTime.setUTCHours(4, 0, 0, 0);
  }

  const todaysDateTimeString = todaysDateTime.toISOString();
  const tomorrowsDateTimeString = tomorrowsDateTime.toISOString();

  return {
    todaysDateTimeString,
    tomorrowsDateTimeString,
  };
};
