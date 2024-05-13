import { test, expect, describe } from "bun:test";
import * as Dates from "../scheduler/dates";
import { Frequency } from "../scheduler/constants";

const from = new Date("2024-01-01");
const to = new Date("2024-12-31");

describe("DatesIterator with default iterator", () => {
  test("Should iterate over zero dates if from is after to", () => {
    const iterator = Dates.iterate(to, from);
    const dates = Array.from(iterator);
    expect(dates).toHaveLength(0);
  });

  test("Should iterate over a single date", () => {
    const iterator = Dates.iterate(from, from);
    const dates = Array.from(iterator);
    expect(dates).toHaveLength(1);
  });

  test("Should iterate over 366 dates for year 2024", () => {
    const iterator = Dates.iterate(from, to);
    const dates = Array.from(iterator);
    expect(dates).toHaveLength(366);
  });

  test("Should iterate over 365 dates for year 2025", () => {
    const iterator = Dates.iterate(new Date("2025-01-01"), new Date("2025-12-31"));
    const dates = Array.from(iterator);
    expect(dates).toHaveLength(365);
  });
});

describe("DatesIterator with iterator and interval: 1", () => {
  test("Should iterate over 2 dates for a weekly interval", () => {
    const iterator = Dates.iterate(from, to, { freq: Frequency.WEEKLY, interval: 1 });
    const dates = Array.from(iterator);
    expect(dates).toHaveLength(53);
  });

  test("Should iterate over 1 date for a monthly interval", () => {
    const iterator = Dates.iterate(from, to, { freq: Frequency.MONTHLY, interval: 1 });
    const dates = Array.from(iterator);
    expect(dates).toHaveLength(12);
  });

  test("Should iterate over 1 date for a yearly interval", () => {
    const iterator = Dates.iterate(from, to, { freq: Frequency.YEARLY, interval: 1 });
    const dates = Array.from(iterator);
    expect(dates).toHaveLength(1);
  });

  test("Should iterate over 1 date for a daily interval", () => {
    const iterator = Dates.iterate(from, to, { freq: Frequency.DAILY, interval: 1 });
    const dates = Array.from(iterator);
    expect(dates).toHaveLength(366);
  });

  test("Should iterate over 24 dates for an hourly interval", () => {
    const iterator = Dates.iterate(from, to, { freq: Frequency.HOURLY, interval: 1 });
    const dates = Array.from(iterator);
    expect(dates).toHaveLength(8761);
  });
});

describe("DatesIterator with iterator and interval: 2", () => {
  test("Should iterate over 2 dates for a weekly interval", () => {
    const iterator = Dates.iterate(from, to, { freq: Frequency.WEEKLY, interval: 2 });
    const dates = Array.from(iterator);
    expect(dates).toHaveLength(27);
  });

  test("Should iterate over 1 date for a monthly interval", () => {
    const iterator = Dates.iterate(from, to, { freq: Frequency.MONTHLY, interval: 2 });
    const dates = Array.from(iterator);
    expect(dates).toHaveLength(6);
  });

  test("Should iterate over 1 date for a yearly interval", () => {
    const iterator = Dates.iterate(from, to, { freq: Frequency.YEARLY, interval: 2 });
    const dates = Array.from(iterator);
    expect(dates).toHaveLength(1);
  });

  test("Should iterate over 1 date for a daily interval", () => {
    const iterator = Dates.iterate(from, to, { freq: Frequency.DAILY, interval: 2 });
    const dates = Array.from(iterator);
    expect(dates).toHaveLength(183);
  });

  test("Should iterate over 24 dates for an hourly interval", () => {
    const iterator = Dates.iterate(from, to, { freq: Frequency.HOURLY, interval: 2 });
    const dates = Array.from(iterator);
    expect(dates).toHaveLength(4381);
  });
});

describe("Dates utils", () => {
  test("Should return the day of year", () => {
    const date = new Date("2024-02-29");
    expect(Dates.dayOfYear(date)).toBe(60);
  });

  test("Should return the week number", () => {
    const date = new Date("2024-02-29");
    expect(Dates.weekNumber(date)).toBe(8);
  });

  test("Should return the nth weekday of the month", () => {
    const date = new Date("2024-02-29");
    expect(Dates.nthWeekdayOfMonth(date)).toEqual([5, 4]);
  });
});
