import { prisma } from "../prisma";

import { parse } from "yaml";
import { POSTS_DIR } from "../constants";
import { readdir } from "node:fs/promises";

type PostsYaml = {
  version: string;
  author: string;
  categories: string[];
  series: string[];
  posts: {
    file: string;
    title: string;
    subtitle: string;
    tags: string[];
    series: string;
    category: string;
    createdAt: Date;
  }[];
};

const file = Bun.file(POSTS_DIR + "/posts.yaml");
const yaml = parse(await file.text()) as PostsYaml;

const postFiles = (await readdir(POSTS_DIR, { recursive: true })).filter(
  (f) => f.includes(".md") && f != "README.md"
);

await prisma.post.deleteMany();
await prisma.category.deleteMany();
await prisma.series.deleteMany();
await prisma.tag.deleteMany();

await prisma.series.createMany({
  data: yaml.series.map((el: string) => {
    return { name: el };
  }),
});
await prisma.category.createMany({
  data: yaml.categories.map((el: string) => {
    return { name: el };
  }),
});
const tags: Set<string> = new Set();
yaml.posts.forEach((element) => {
  for (const tag of element.tags) tags.add(tag);
});
await prisma.tag.createMany({
  data: Array.from(tags).map((el: string) => {
    return { name: el };
  }),
});

for (const post of yaml.posts) {
  const files = postFiles.filter((f) => f.includes(post.file));
  const content = await Bun.file(POSTS_DIR + "/" + files[0]).text();

  await prisma.post.create({
    data: {
      createdAt: post.createdAt,
      title: post.title,
      subtitle: post.subtitle,
      content: content,
      category: {
        connect: {
          name: post.category,
        },
      },
      series: {
        connect: {
          name: post.series,
        },
      },
      tags: {
        connect: post.tags.map((t) => {
          return {
            name: t,
          };
        }),
      },
    },
  });
}
