import { test, expect } from "bun:test";
import * as Monthly from "../scheduler/monthly";

test("Montly rule", () => {
  const rule: Monthly.RecurrenceRule = {
    bymonth: [1, 2, 4, 7],
  };
  const dates = Monthly.generate(rule, new Date("2024-12-01"), new Date("2025-06-10"));
  expect(dates).toHaveLength(89);
});

// Du 16 au 22 décembre, du dimanche au vendredi à 09h00
// => On doit boucler sur chaque date entre le 16 et le 22 décembre
// => On ne doit conserver que les dates qui sont un dimanche, un lundi, un mardi, un jeudi, un vendredi
// => On doit émettre une date pour chaque jour à 09h00

// Du 23 décembre au 6 janvier, du dimanche au vendredi à 09h00 sauf le 25 décembre et le 1er janvier à 10h00
// => On doit boucler sur chaque date entre le 23 décembre et le 6 janvier
// => On ne doit conserver que les dates qui sont un dimanche, un lundi, un mardi, un jeudi, un vendredi
// => On doit émettre une date pour chaque jour à 09h00 sauf le 25 décembre et le 1er janvier à 10h00

// Du 7 au 10 février, du dimanche au vendredi à 09h00
// => On doit boucler sur chaque date entre le 7 et le 10 février
// => On ne doit conserver que les dates qui sont un dimanche, un lundi, un mardi, un jeudi, un vendredi
// => On doit émettre une date pour chaque jour à 09h00

// Du 11 au 15 février, du lundi au vendredi à 09h00 et à 15h00
// => On doit boucler sur chaque date entre le 11 et le 15 février
// => On ne doit conserver que les dates qui sont un lundi, un mardi, un jeudi, un vendredi
// => On doit émettre deux dates pour chaque jour, une à 09h00 et une à 15h00
