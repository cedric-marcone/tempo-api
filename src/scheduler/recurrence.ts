const enum Month {
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

const enum Weekday {
  SU = 0,
  MO = 1,
  TU = 2,
  WE = 3,
  TH = 4,
  FR = 5,
  SA = 6,
}

/**
 *
 */

/**
 * Du 15 décembre au 01 février, tous les jours sauf le mercredi, de 9h à 10h et de 15h à 16h
 */

// const rules: Array<RecurrenceRule> = [
//   {
//     type: "month",
//     bymonth: [Month.DEC, Month.JAN, Month.FEB],
//     subRules: [
//       {
//         type: "monthday",
//         bymonthday: [15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
//         subRules: [
//           {
//             type: "weekday",
//             byweekday: [Weekday.SU, Weekday.MO, Weekday.TU, Weekday.TH, Weekday.FR, Weekday.SA],
//             subRules: [
//               {
//                 type: "time",
//                 byhour: [9, 15],
//                 byminute: [0],
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
// ];

type MonthlyRecurrenceRule = {
  type: "month";
  interval: number;
  bymonth: Array<Month>;
  subRules: Array<MonthdayRecurrenceRule | WeekdayRecurrenceRule | TimeRecurrenceRule>;
};

type MonthdayRecurrenceRule = {
  type: "monthday";
  interval: number;
  bymonthday: Array<number>;
  subRules: Array<WeekdayRecurrenceRule | TimeRecurrenceRule>;
};

type WeekdayRecurrenceRule = {
  type: "weekday";
  interval: number;
  byweekday: Array<Weekday>;
  subRules: Array<TimeRecurrenceRule>;
};

type TimeRecurrenceRule = {
  type: "time";
  interval: number;
  byhour?: Array<number>;
  byminute?: Array<number>;
};

type RecurrenceRule = MonthlyRecurrenceRule | MonthdayRecurrenceRule | WeekdayRecurrenceRule | TimeRecurrenceRule;

function nextDateFromMonth(from: Date, to: Date, month: Month) {
  const date = new Date(from);
  date.setUTCMonth(month - 1);
  date.setUTCHours(0, 0, 0, 0);

  if (date < from) {
    date.setUTCFullYear(date.getUTCFullYear() + 1);
  }
  if (date > to) return null;

  return date;
}

function nextDateFromMonthDay(from: Date, to: Date, day: number) {
  const date = new Date(from);
  date.setUTCMonth(date.getUTCMonth());
  date.setUTCHours(0, 0, 0, 0);
  date.setUTCDate(1);

  const month = date.getUTCMonth();
  date.setUTCDate(day);

  if (date.getUTCMonth() !== month) return null;
  if (date > to) return null;

  return date;
}

function nextDateFromWeekday(from: Date, to: Date, weekday: Weekday) {
  const date = new Date(from);
  const delta = weekday - 1 - date.getUTCDay();
  date.setUTCDate(date.getUTCDate() + delta);
  date.setUTCHours(0, 0, 0, 0);

  if (date > to) return null;

  return date;
  // const date = new Date(from);
  // date.setUTCHours(0, 0, 0, 0);
  // while (date < to) {
  //   if (date.getUTCDay() === weekday) {
  //     return date;
  //   }
  //   date.setUTCDate(date.getUTCDate() + 1);
  // }
  // return null;
}

function generate(from: Date, to: Date, rules: RecurrenceRule[]) {
  const result: Array<Date> = [];
  for (const rule of rules) {
    if (rule.type === "month") {
      for (const month of rule.bymonth) {
        const date = nextDateFromMonth(from, to, month);
        if (date === null) {
          continue;
        }
        console.log("YEARLY", date);
        result.push(...generate(date, to, rule.subRules));
      }
    } else if (rule.type === "monthday") {
      for (const day of rule.bymonthday) {
        const date = nextDateFromMonthDay(from, to, day);
        if (date === null) {
          continue;
        }
        console.log("MONTHLY", date);
        result.push(...generate(date, to, rule.subRules));
      }
    } else if (rule.type === "weekday") {
      for (const weekday of rule.byweekday) {
        const date = nextDateFromWeekday(from, to, weekday);
        if (date === null) {
          continue;
        }
        console.log("WEEKLY", date);
        // result.push(...generate(date, to, rule.subRules));
      }
    }
    // else if (rule.type === "time") {
    //   const date = new Date(from);
    //   date.setUTCHours(0, 0, 0, 0);
    //   while (date < to) {
    //     if (rule.byhour && !rule.byhour.includes(date.getUTCHours())) {
    //       date.setUTCHours(date.getUTCHours() + 1);
    //       continue;
    //     }
    //     if (rule.byminute && !rule.byminute.includes(date.getUTCMinutes())) {
    //       date.setUTCMinutes(date.getUTCMinutes() + 1);
    //       continue;
    //     }
    //     console.log(date);
    //     result.push(new Date(date));
    //     date.setUTCHours(date.getUTCHours() + rule.interval);
    //   }
    // }
  }
  return result;
}

const rules: Array<RecurrenceRule> = [
  {
    type: "month",
    interval: 1,
    bymonth: [Month.DEC, Month.APR],
    subRules: [
      {
        type: "monthday",
        interval: 1,
        bymonthday: [3, 31],
        subRules: [
          {
            type: "time",
            interval: 1,
            byhour: [9, 10],
            byminute: [0, 15, 30, 45],
          },
        ],
      },
    ],
  },
];

const rules2: Array<RecurrenceRule> = [
  {
    type: "month",
    interval: 1,
    bymonth: [Month.DEC, Month.APR],
    subRules: [
      {
        type: "monthday",
        interval: 1,
        bymonthday: [3, 31],
        subRules: [
          {
            type: "time",
            interval: 1,
            byhour: [9, 10],
            byminute: [0, 15, 30, 45],
          },
        ],
      },
    ],
  },
];

console.log(generate(new Date("2024-12-28"), new Date("2025-06-03"), rules));
