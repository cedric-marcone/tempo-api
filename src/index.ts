import { Database } from "bun:sqlite";
import { Hono } from "hono";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { events, entries } from "./db/schema.js";

const sqlite = new Database("sqlite.db");
const db = drizzle(sqlite);

const app = new Hono();

app.get("/", async (c) => {
  const ret = await db
    .insert(events)
    .values({ title: "CC MAT ENF", kind: "product", blob: { meta: { hello: "world" } } })
    .returning({ insertId: events.id });

  for await (const { insertId } of ret) {
    await db.insert(entries).values({ rule: "rule", event_id: insertId });
  }

  const result = await db.select().from(events);
  return c.text("Hello Hono!\n" + JSON.stringify(result));
});

export default app;
