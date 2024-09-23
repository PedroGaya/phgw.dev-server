import { Elysia } from "elysia";
import { findPost, getPosts } from "./crud/post";

export const app = new Elysia()
  .onRequest(({ request }) => {
    console.log(request.method, request.url);
  })
  .get("/", () => {
    return "OK";
  })
  .get("/posts", async () => {
    const data = await getPosts();
    return data;
  })
  .get("/posts/:id", async ({ params: { id } }) => {
    const data = await findPost(id);
    return id;
  });
