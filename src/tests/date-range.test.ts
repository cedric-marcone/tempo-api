import { test, expect } from "bun:test";
import * as DatesIterator from "../scheduler/date-range";

const from = new Date("2024-01-01");
const to = new Date("2024-12-31");

test("Should iterate over zero dates if from is after to", () => {
  const iterator = DatesIterator.iterate(to, from);
  const dates = Array.from(iterator);
  expect(dates).toHaveLength(0);
});

test("Should iterate over a single date", () => {
  const iterator = DatesIterator.iterate(from, from);
  const dates = Array.from(iterator);
  expect(dates).toHaveLength(1);
});

test("Should iterate over 366 dates for year 2024", () => {
  const iterator = DatesIterator.iterate(from, to);
  const dates = Array.from(iterator);
  expect(dates).toHaveLength(366);
});

test("Should iterate over 365 dates for year 2025", () => {
  const iterator = DatesIterator.iterate(new Date("2025-01-01"), new Date("2025-12-31"));
  const dates = Array.from(iterator);
  expect(dates).toHaveLength(365);
});
