type Weekday = "MO" | "TU" | "WE" | "TH" | "FR" | "SA" | "SU";

type Month = "JAN" | "FEB" | "MAR" | "APR" | "MAY" | "JUN" | "JUL" | "AUG" | "SEP" | "OCT" | "NOV" | "DEC";

type Frequency = "YEARLY" | "MONTHLY" | "WEEKLY" | "DAILY" | "HOURLY" | "MINUTELY";

type Iteration = {
  freq: Frequency;
  interval: number;
  count?: number;
};

type RecurrenceRule = Iteration & {
  bymonth?: Array<number>;
  bymonthday?: Array<number>;
  byyearday?: Array<number>;
  byweekno?: Array<number>;
  byweekday?: Array<number>;
  byhour?: Array<number>;
  byminute?: Array<number>;
};
