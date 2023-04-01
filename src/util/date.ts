import dayjs from 'dayjs';
import 'dayjs/plugin/duration';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

export const getTodaysDateAndTomorrowsDate = () => {
  dayjs.extend(utc);
  dayjs.extend(timezone);

  dayjs.tz.setDefault('UTC');

  const now = dayjs();
  const nextDay = now.clone().tz('America/Toronto').add(1, 'day');
  const expirationTime = nextDay.startOf('day').tz('America/Toronto');
  const todaysDateTimeString = now.toISOString();
  const tomorrowsDateTimeString = expirationTime.toISOString();

  return {
    todaysDateTimeString,
    tomorrowsDateTimeString,
  };
};
