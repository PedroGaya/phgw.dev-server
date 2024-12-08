import { Elysia } from "elysia";

import { posts } from "./routes/posts";
import { categories } from "./routes/categories";
import { tags } from "./routes/tags";
import { series } from "./routes/series";
import { NODE_ENV } from "./constants";

import cors from "@elysiajs/cors";

export const app = new Elysia()
  .use(cors())
  .onRequest(({ request }) => {
    if (NODE_ENV == "development") console.log(request.method, request.url);
  })
  .get("/", () => {
    return "OK";
  })
  .use(posts)
  .use(categories)
  .use(tags)
  .use(series);
