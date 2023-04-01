import dayjs from 'dayjs';
import 'dayjs/plugin/duration';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

export const getTodaysDateAndTomorrowsDate = () => {
  dayjs.extend(utc);
  dayjs.extend(timezone);

  const now = dayjs().tz('America/Toronto');
  const nextDay = now.clone().add(1, 'day');
  const expirationTime = nextDay.startOf('day');
  const todaysDateTimeString = now.toISOString();
  const tomorrowsDateTimeString = expirationTime.toISOString();

  return {
    todaysDateTimeString,
    tomorrowsDateTimeString,
  };
};
