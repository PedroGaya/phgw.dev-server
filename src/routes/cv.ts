import { Elysia } from "elysia";
import { getCurriculumVitae } from "../crud/cv";

export const cv = new Elysia({ prefix: "/cv" }).get(
  "/:language",
  async ({ params: { language } }) => {
    const data = await getCurriculumVitae(language);
    return data;
  }
);
