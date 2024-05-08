import * as Dates from "./date-range";

export type RecurrenceRule = {
  bymonth: Array<Month>;
};

export const enum Month {
  JAN = 1,
  FEB = 2,
  MAR = 3,
  APR = 4,
  MAY = 5,
  JUN = 6,
  JUL = 7,
  AUG = 8,
  SEP = 9,
  OCT = 10,
  NOV = 11,
  DEC = 12,
}

export function generate(rule: RecurrenceRule, from: Date, to: Date) {
  const result: Array<Date> = [];
  for (const date of Dates.iterate(from, to)) {
    const month = date.getUTCMonth() + 1;
    if (rule.bymonth.includes(month as Month)) {
      result.push(date);
    }
  }
  return result;
}
