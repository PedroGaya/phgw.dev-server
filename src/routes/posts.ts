import { Elysia } from "elysia";
import { findPost, getPosts } from "../crud/post";

export const posts = new Elysia({ prefix: "/posts" })
  .get("/", async () => {
    const data = await getPosts();
    return data;
  })
  .get("/:id", async ({ params: { id } }) => {
    const data = await findPost(id);
    return data;
  });
