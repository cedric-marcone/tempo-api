import { test, expect } from "bun:test";
import * as Sets from "../scheduler/sets";

const l = 100_000;
const d = 10;
const a = new Set(Array.from({ length: l }, (_, i) => i + 1));
const b = new Set(Array.from({ length: l }, (_, i) => i + 1 + d));

test("sets intersection works", () => {
  const result = Sets.intersection(a, b);
  expect(result).toHaveLength(l - d);
});

test("sets union works", () => {
  const result = Sets.union(a, b);
  expect(result).toHaveLength(l + d);
});

test("sets difference works", () => {
  const result = Sets.difference(a, b);
  expect(result).toHaveLength(d);
});

test("sets symmetric difference works", () => {
  const result = Sets.symmetricDifference(a, b);
  expect(result).toHaveLength(2 * d);
});

test("sets is subset works", () => {
  const result = Sets.isSubset(a, b);
  expect(result).toBe(false);
});

test("sets is superset works", () => {
  const result = Sets.isSuperset(a, b);
  expect(result).toBe(false);
});
