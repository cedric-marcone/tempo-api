import { RRule, RRuleSet, rrulestr } from "rrule";

type Scheduled = {
  start: RRuleSet;
  schedule: Omit<RRule, "dtstart" | "until">;
};

const startRule = new RRule({
  tzid: "UTC",
  dtstart: new Date("2024-12-28 00:00:00"),
  until: new Date("2025-01-04 23:59:59.999"),

  freq: RRule.DAILY,
  interval: 1,

  byweekday: [RRule.SU, RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR],
  byminute: [0, 15, 30, 45],
  byhour: [9, 10, 11],
});
const exStartRule = new RRule({
  tzid: "UTC",
  dtstart: new Date("2024-12-30 00:00:00"),
  until: new Date("2025-01-01 23:59:59.999"),

  freq: RRule.DAILY,
  interval: 1,

  byminute: [0, 15, 30, 45],
  byhour: [9, 10, 11],
});

const startRuleSet = new RRuleSet();
startRuleSet.rrule(startRule);
startRuleSet.exrule(exStartRule);

console.log("startRuleSet", startRuleSet.toString(), startRuleSet.all());

const startRuleSetFromString = rrulestr(`
DTSTART:20241227T230000Z
RRULE:COUNT=30;FREQ=DAILY;INTERVAL=1;BYDAY=SU,MO,TU,WE,TH,FR;BYMINUTE=0,15,30,45;BYHOUR=9,10,11
EXRULE:COUNT=5;FREQ=DAILY;INTERVAL=1;BYMINUTE=0,15,30,45;BYHOUR=9,10,11
`);

console.log(startRuleSetFromString.toString() === startRuleSet.toString());

console.log("startRuleSetFromString", startRuleSetFromString.toString(), startRuleSetFromString.all());

const schedule = new RRule({
  freq: RRule.DAILY,
  interval: 1,
  byweekday: [RRule.SA, RRule.SU],
  byhour: [9, 10, 11],
});

const scheduleRuleSet = new RRuleSet();

scheduleRuleSet.rrule(schedule);

const scheduled: Scheduled = {
  start: startRuleSet,
  schedule: scheduleRuleSet,
};
