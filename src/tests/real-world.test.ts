import { test, expect } from "bun:test";
import * as x from "../scheduler/recurrence";

test("Should be able to generate a set of dates", () => {
  const from = new Date("2023-12-22");
  const to = new Date("2024-01-20");
  const rule: RecurrenceRule = {
    freq: "DAILY",
    interval: 2,
    byweekday: [0],
    byhour: [0, 12],
    byminute: [15, 30],
  };
  const r = x.generate(rule, from, to);
  expect(r).toBeInstanceOf(Set);
  expect(r.size).toBe(8);
});

// Du 16 au 22 décembre, du dimanche au vendredi à 09h00
// => On doit boucler sur chaque date entre le 16 et le 22 décembre
// => On ne doit conserver que les dates qui sont un dimanche, un lundi, un mardi, un jeudi, un vendredi
// => On doit émettre une date pour chaque jour à 09h00
test("Should be able to generate a set of dates", () => {
  const from = new Date("2023-12-16");
  const to = new Date("2023-12-22");
  const rule: RecurrenceRule = {
    freq: "DAILY",
    interval: 1,
    byweekday: [0, 1, 2, 4, 5],
    byhour: [9],
    byminute: [0],
  };
  const r = x.generate(rule, from, to);
  expect(r).toBeInstanceOf(Set);
  expect(r.size).toBe(5);
});

// Du 23 décembre au 6 janvier, du dimanche au vendredi à 09h00 sauf le 25 décembre et le 1er janvier à 10h00
// => On doit boucler sur chaque date entre le 23 décembre et le 6 janvier
// => On ne doit conserver que les dates qui sont un dimanche, un lundi, un mardi, un jeudi, un vendredi
// => On doit émettre une date pour chaque jour à 09h00 sauf le 25 décembre et le 1er janvier à 10h00
test("Should be able to generate a set of dates", () => {
  const from = new Date("2023-12-23");
  const to = new Date("2024-01-06");
  const rule: RecurrenceRule = {
    freq: "DAILY",
    interval: 1,
    byweekday: [0, 1, 2, 4, 5],
    byhour: [9],
    byminute: [0],
    // bymonthday: [25, 1],
    // byhour: [10],
  };
  const r = x.generate(rule, from, to);
  expect(r).toBeInstanceOf(Set);
  expect(r.size).toBe(10);
});

// Du 7 au 10 février, du dimanche au vendredi à 09h00
// => On doit boucler sur chaque date entre le 7 et le 10 février
// => On ne doit conserver que les dates qui sont un dimanche, un lundi, un mardi, un jeudi, un vendredi
// => On doit émettre une date pour chaque jour à 09h00

// Du 11 au 15 février, du lundi au vendredi à 09h00 et à 15h00
// => On doit boucler sur chaque date entre le 11 et le 15 février
// => On ne doit conserver que les dates qui sont un lundi, un mardi, un jeudi, un vendredi
// => On doit émettre deux dates pour chaque jour, une à 09h00 et une à 15h00
