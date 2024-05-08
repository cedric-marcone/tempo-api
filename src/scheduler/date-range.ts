export function* iterate(from: Date, to: Date) {
  const date = new Date(from);
  date.setUTCHours(0, 0, 0, 0);

  while (date <= to) {
    yield new Date(date);
    date.setUTCDate(date.getUTCDate() + 1);
  }
}
