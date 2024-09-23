import { Elysia } from "elysia";

import { posts } from "./routes/posts";
import { categories } from "./routes/categories";
import { tags } from "./routes/tags";
import { series } from "./routes/series";

export const app = new Elysia()
  .onRequest(({ request }) => {
    console.log(request.method, request.url);
  })
  .get("/", () => {
    return "OK";
  })
  .use(posts)
  .use(categories)
  .use(tags)
  .use(series);
