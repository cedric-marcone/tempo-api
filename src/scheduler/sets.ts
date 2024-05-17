export function intersection<T>(a: Set<T>, b: Set<T>) {
  const xs = new Set<T>();
  for (const x of b) {
    if (a.has(x)) {
      xs.add(x);
    }
  }
  return xs;
}

export function union<T>(a: Set<T>, b: Set<T>) {
  const xs = new Set<T>(a);
  for (const x of b) {
    xs.add(x);
  }
  return xs;
}

export function difference<T>(a: Set<T>, b: Set<T>) {
  const xs = new Set<T>(a);
  for (const x of b) {
    xs.delete(x);
  }
  return xs;
}

export function symmetricDifference<T>(a: Set<T>, b: Set<T>) {
  const xs = new Set<T>(a);
  for (const x of b) {
    if (xs.has(x)) {
      xs.delete(x);
    } else {
      xs.add(x);
    }
  }
  return xs;
}

export function isSubset<T>(a: Set<T>, b: Set<T>) {
  for (const x of a) {
    if (!b.has(x)) {
      return false;
    }
  }
  return true;
}

export function isSuperset<T>(a: Set<T>, b: Set<T>) {
  return isSubset(b, a);
}

export function numberToDate(xs: Set<number>) {
  const dates = new Set<Date>();
  for (const x of xs) {
    dates.add(new Date(x));
  }
  return dates;
}
