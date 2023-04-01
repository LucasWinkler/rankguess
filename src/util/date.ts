const moment = require('moment-timezone');

export const getTodaysDateAndTomorrowsDate = () => {
  moment.tz.setDefault('UTC');

  const now = moment();
  const nextDay = now.clone().tz('America/New_York').add(1, 'day');
  const expirationTime = nextDay.startOf('day').tz('America/New_York');
  const todaysDateTimeString = now.toISOString();
  const tomorrowsDateTimeString = expirationTime.toISOString();

  return {
    todaysDateTimeString,
    tomorrowsDateTimeString,
  };
};
