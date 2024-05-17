export function* iterate(from: Date, to: Date, iteration: Iteration = { freq: "DAILY", interval: 1 }) {
  const date = new Date(from);

  let count = 0;
  while (date <= to) {
    if (iteration.count && count >= iteration.count) {
      break;
    }
    yield new Date(date);
    count++;
    const interval = iteration.interval;
    switch (iteration.freq) {
      case "YEARLY":
        date.setUTCFullYear(date.getUTCFullYear() + interval);
        break;
      case "MONTHLY":
        date.setUTCMonth(date.getUTCMonth() + interval);
        break;
      case "WEEKLY":
        date.setUTCDate(date.getUTCDate() + 7 * interval);
        break;
      case "DAILY":
        date.setUTCDate(date.getUTCDate() + interval);
        break;
      case "HOURLY":
        date.setUTCHours(date.getUTCHours() + interval);
        break;
      case "MINUTELY":
        date.setUTCMinutes(date.getUTCMinutes() + interval);
        break;
    }
  }
}

const ONE_DAY = 1000 * 60 * 60 * 24;
const ONE_WEEK = 1000 * 60 * 60 * 24 * 7;

export function dayOfYear(date: Date) {
  const start = new Date(date.getUTCFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / ONE_DAY);
}

export function weekNumber(date: Date) {
  const start = new Date(date.getUTCFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / ONE_WEEK);
}
