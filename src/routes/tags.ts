import { Elysia } from "elysia";
import { getTags } from "../crud/tags";

export const tags = new Elysia({ prefix: "/tags" }).get("/", async () => {
  const data = await getTags();
  return data;
});
