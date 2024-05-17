import * as Rule from "./recurrence";

export default function Schedule(from: Date | string, to: Date | string) {
  const f = typeof from === "string" ? new Date(from) : from;
  const t = typeof to === "string" ? new Date(to) : to;
  return new ScheduleBuilder(f, t);
}

class ScheduleBuilder {
  private from: Date;
  private to: Date;
  private rule: RecurrenceRule;

  constructor(from: Date, to: Date) {
    this.from = from;
    this.to = to;
    this.rule = { freq: "DAILY", interval: 1 };
  }

  interval(interval: number) {
    this.rule.interval = interval;
    return this;
  }

  daily() {
    this.rule.freq = "DAILY";
    return this;
  }

  weekly() {
    this.rule.freq = "WEEKLY";
    return this;
  }

  monthly() {
    this.rule.freq = "MONTHLY";
    return this;
  }

  yearly() {
    this.rule.freq = "YEARLY";
    return this;
  }

  count(count: number) {
    this.rule.count = count;
    return this;
  }

  byMonth(...months: Month[] | number[]) {
    if (months.length > 0) {
      if (typeof months[0] === "string") {
        this.rule.bymonth = (months as Month[]).map((m) => monthToNumber(m));
      } else {
        this.rule.bymonth = months as number[];
      }
    }
    return this;
  }

  byYearday(...days: number[]) {
    if (days.length > 0) {
      this.rule.byyearday = days;
    }
    return this;
  }

  byWeekno(...weeks: number[]) {
    if (weeks.length > 0) {
      this.rule.byweekno = weeks;
    }
    return this;
  }

  byWeekday(...weekdays: Array<Weekday | number>) {
    if (weekdays.length > 0) {
      if (typeof weekdays[0] === "string") {
        this.rule.byweekday = (weekdays as Weekday[]).map((w) => weekdayToNumber(w));
      } else {
        this.rule.byweekday = weekdays as number[];
      }
    }
    return this;
  }

  byMonthday(...days: number[]) {
    if (days.length > 0) {
      this.rule.bymonthday = days;
    }
    return this;
  }

  byHour(...hours: number[]) {
    if (hours.length > 0) {
      this.rule.byhour = hours;
    }
    return this;
  }

  byMinute(...minutes: number[]) {
    if (minutes.length > 0) {
      this.rule.byminute = minutes;
    }
    return this;
  }

  build() {
    return Rule.generate(this.rule, this.from, this.to);
  }
}

const months: Month[] = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"] as const;
function monthToNumber(month: Month) {
  return months.indexOf(month);
}

const weekdays: Weekday[] = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"] as const;
function weekdayToNumber(weekday: Weekday) {
  return weekdays.indexOf(weekday);
}
