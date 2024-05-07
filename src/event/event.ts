// UI : for the calendar view
// https://schedule-x.dev/

// https://medium.com/tomorrowapp/the-complex-world-of-calendars-4a1bff1c4bfa

// https://aklaver.org/wordpress/2023/06/22/using-icalendar-rrule-in-postgres/

// https://stackoverflow.com/questions/1054201/icalendar-field-list-for-database-schema-based-on-icalendar-standard/1397019#1397019

// http://svn.expressolivre.org/contrib/davical/dba/rrule_functions-8.1.sql

// https://dba.stackexchange.com/questions/62066/efficiently-storing-irregular-repeating-intervals-think-calendar-events

// See example for "Every 15 minutes for 6 occurrences" and "Every 20th Monday of the year" on https://icalendar.org/iCalendar-RFC-5545/3-8-5-3-recurrence-rule.html.

// https://icalevents.com/2447-need-to-know-the-possible-combinations-for-repeating-dates-an-ical-cheatsheet/

// https://www.ietf.org/rfc/rfc5545.txt

import { RRule, RRuleSet } from "rrule";

const DateFormatter = new Intl.DateTimeFormat("fr-FR", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  timeZone: "UTC",
});

// -----------------------

const startRule = new RRule({
  tzid: "UTC",
  dtstart: new Date("2024-12-28 00:00:00"),
  until: new Date("2025-04-04 23:59:59.999"),

  freq: RRule.DAILY,
  interval: 1,

  byweekday: [RRule.SU, RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR],
  byminute: [0, 15, 30, 45],
  byhour: [9, 10, 11],
});

const exStartRule = new RRule({
  tzid: "UTC",
  dtstart: new Date("2024-12-30 00:00:00"),
  until: new Date("2024-12-30 23:59:59.999"),
  // count: 4,

  freq: RRule.DAILY,
  interval: 1,

  byminute: [0, 15, 30, 45],
  byhour: [9, 10, 11],
});

// console.log(cpRule.all().map((date) => DateFormatter.format(date)).join("\n"));

// -----------------------

const startRuleSet = new RRuleSet();

startRuleSet.rrule(startRule);
startRuleSet.exrule(exStartRule);
// startRuleSet.exdate(new Date("2024-12-31 09:00"));
// startRuleSet.exdate(new Date("2024-12-31 09:15"));

const all = startRuleSet.between(new Date("2025-01-01"), new Date("2025-01-05"));
console.log(startRuleSet.toString());
console.log(all.map((date) => DateFormatter.format(date)).join("\n"));

// -----------------------

const ccRule = new RRule({
  dtstart: new Date("2024-12-28 09:00"),
  count: 5,

  freq: RRule.DAILY,
  interval: 1,

  byweekday: [RRule.SU, RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR],
});

// console.log(ccRule.all().map((date) => DateFormatter.format(date)).join("\n"));

// -----------------------

type Time = {
  hour: number;
  minute: number;
};

type Slot = {
  dayOffset: number;
  begin: Time;
  end: Time;
};

type Entry = {
  slots: Array<Slot>;
  recurrence: RecurringRule;
};

type RecurringRule = {
  frequency: "daily" | "weekly" | "monthly" | "yearly";
  interval: number;
  count: number;
  until: Date;
  wkSt: "SU" | "MO" | "TU" | "WE" | "TH" | "FR" | "SA";
  byDay: Array<"SU" | "MO" | "TU" | "WE" | "TH" | "FR" | "SA">;
  byMonthDay: Array<number>;
  byYearDay: Array<number>;
  byWeekNo: Array<number>;
  byMonth: Array<number>;
  bySetPos: Array<number>;
  byHour: Array<number>;
  byMinute: Array<number>;
  bySecond: Array<number>;
  byEaster: Array<number>;
  byWeekDay: Array<number>;
  byNthWeekDay: Array<number>;
  byNthMonthDay: Array<number>;
  byNthYearDay: Array<number>;
  byNthWeekNo: Array<number>;
  byNthMonth: Array<number>;
  byNthSetPos: Array<number>;
  byNthYear: Array<number>;
};

type Event = {
  kind: "product" | "instructor";
};

type Product = {
  parent: Product | null;
};
