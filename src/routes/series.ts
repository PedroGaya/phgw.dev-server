import { Elysia } from "elysia";
import { getSeries } from "../crud/series";

export const series = new Elysia({ prefix: "/series" }).get("/", async () => {
  const data = await getSeries();
  return data;
});
