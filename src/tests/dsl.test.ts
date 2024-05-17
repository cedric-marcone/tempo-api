import { test, expect } from "bun:test";
import Schedule from "../scheduler/recurrence-dsl";
import * as Sets from "../scheduler/sets";

test("DSL should be able to generate a set of dates", () => {
  const a = Schedule("2023-12-22", "2024-01-20").byWeekday(0).byHour(0, 12).byMinute(15, 30).build();
  expect(a.size).toBe(16);
});

test("DSL should be able to generate a set of dates", () => {
  const b = Schedule("2024-01-06", "2024-01-13").byWeekday(0).byHour(0, 12).byMinute(15, 30).build();
  expect(b.size).toBe(4);
});

test("DSL should be able to generate a set of dates", () => {
  const a = Schedule("2023-12-22", "2024-01-20").byWeekday(0).byHour(0, 12).byMinute(15, 30).build();
  const b = Schedule("2024-01-06", "2024-01-13").byWeekday(0).byHour(0, 12).byMinute(15, 30).build();
  const c = Sets.difference(a, b);
  expect(c.size).toBe(12);
});
