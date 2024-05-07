import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const events = sqliteTable("events", {
  id: integer("id").primaryKey(),
  title: text("title", { length: 256 }).notNull(),
  kind: text("kind", { enum: ["product", "instructor"] }),
  blob: text("blob", { mode: "json" }).$type<EventBlob>().notNull(),
});

export const entries = sqliteTable("entries", {
  id: integer("id").primaryKey(),
  rule: text("rule").notNull(),
  event_id: integer("events_id")
    .references(() => events.id)
    .notNull(),
});

export const entryExclusion = sqliteTable("entries_exclusions", {
  id: integer("id").primaryKey(),
  entries_id: integer("entries_id")
    .references(() => entries.id)
    .notNull(),
  originalDate: text("original_date").notNull(),
  date: text("date").notNull(),
});
