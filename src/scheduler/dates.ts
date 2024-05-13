import { Frequency } from "./constants";

export function* iterate(from: Date, to: Date, iteration: Iteration = { freq: Frequency.DAILY, interval: 1 }) {
  const date = new Date(from);

  let count = 0;
  while (date <= to) {
    if (iteration.count && count >= iteration.count) {
      break;
    }
    yield new Date(date);
    count++;
    switch (iteration.freq) {
      case Frequency.YEARLY:
        date.setUTCFullYear(date.getUTCFullYear() + iteration.interval);
        break;
      case Frequency.MONTHLY:
        date.setUTCMonth(date.getUTCMonth() + iteration.interval);
        break;
      case Frequency.WEEKLY:
        date.setUTCDate(date.getUTCDate() + 7 * iteration.interval);
        break;
      case Frequency.DAILY:
        date.setUTCDate(date.getUTCDate() + iteration.interval);
        break;
      case Frequency.HOURLY:
        date.setUTCHours(date.getUTCHours() + iteration.interval);
        break;
      case Frequency.MINUTELY:
        date.setUTCMinutes(date.getUTCMinutes() + iteration.interval);
        break;
    }
  }
}

export function dayOfYear(date: Date) {
  const start = new Date(date.getUTCFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

export function weekNumber(date: Date) {
  const start = new Date(date.getUTCFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneWeek = 1000 * 60 * 60 * 24 * 7;
  return Math.floor(diff / oneWeek);
}

export function nthWeekdayOfMonth(date: Date) {
  const n = Math.floor((date.getUTCDate() - 1) / 7) + 1;
  return [n, date.getUTCDay()];
}
