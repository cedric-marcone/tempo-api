export function* iterate(from: Date, to: Date) {
  const date = new Date(from);
  date.setUTCHours(0, 0, 0, 0);

  while (date <= to) {
    yield new Date(date);
    date.setUTCDate(date.getUTCDate() + 1);
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
