import * as Dates from "./dates";

export function generate(rule: RecurrenceRule, from: Date, to: Date) {
  const result: Set<number> = new Set();

  for (const date of Dates.iterate(from, to, { freq: rule.freq, interval: rule.interval, count: rule.count })) {
    const d = date.getUTCDate();
    if (rule.bymonth && !rule.bymonth.includes(date.getUTCMonth() + 1)) continue;
    if (rule.bymonthday && !rule.bymonthday.includes(d)) continue;
    if (rule.byyearday && !rule.byyearday.includes(Dates.dayOfYear(date))) continue;
    if (rule.byweekno && !rule.byweekno.includes(Dates.weekNumber(date))) continue;
    if (rule.byweekday && !rule.byweekday.includes(date.getUTCDay())) continue;

    const hasTimeSlots = rule.byminute || rule.byhour;
    if (hasTimeSlots) {
      generateTimeSlots(rule, date, result);
    } else {
      result.add(date.getTime());
    }
  }

  return result;
}

function generateTimeSlots(rule: RecurrenceRule, date: Date, result: Set<number>) {
  for (const hour of rule.byhour || [0]) {
    for (const minute of rule.byminute || [0]) {
      const slot = new Date(date);
      slot.setUTCHours(hour, minute);
      result.add(slot.getTime());
    }
  }
  return result;
}
