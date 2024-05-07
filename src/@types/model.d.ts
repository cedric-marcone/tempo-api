import * as DBSchema from "../db/schema";

declare global {
  type EventBlob = {
    meta: {
      hello: string;
    };
  };

  type Entry = typeof DBSchema.entry.$inferSelect;
  type InsertEntry = typeof DBSchema.entry.$inferInsert;

  type Event = typeof DBSchema.event.$inferSelect;
  type InsertEvent = typeof DBSchema.event.$inferInsert;

  type EntryException = typeof DBSchema.entryException.$inferSelect;
  type InsertEntryException = typeof DBSchema.entryException.$inferInsert;
}
