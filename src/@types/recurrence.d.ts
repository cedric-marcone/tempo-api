import { Frequency } from "../scheduler/constants";

declare global {
  export type Weekday = "MO" | "TU" | "WE" | "TH" | "FR" | "SA" | "SU";

  export type Iteration = {
    freq: Frequency;
    interval: number;
    count?: number;
    // wkst?: Weekday | number;
  };

  export type RecurrenceRule = Iteration & {
    // bysetpos?: number[];
    bymonth?: number[];
    bymonthday?: number[];
    bynmonthday?: number[];
    byyearday?: number[];
    byweekno?: number[];
    byweekday?: Array<Weekday | number>;
    bynweekday?: number[][];
    byhour?: number[];
    byminute?: number[];
  };
}
