import { Elysia } from "elysia";
import { getCategories } from "../crud/categories";

export const categories = new Elysia({ prefix: "/categories" }).get(
  "/",
  async () => {
    const data = await getCategories();
    return data;
  }
);
