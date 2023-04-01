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
  tomorrowsDateTime.setUTCHours(timezoneOffset / 60, 0, 0, 0);

  const todaysDateTimeString = todaysDateTime.toISOString();
  const tomorrowsDateTimeString = tomorrowsDateTime.toISOString();

  return {
    todaysDateTimeString,
    tomorrowsDateTimeString,
  };
};
