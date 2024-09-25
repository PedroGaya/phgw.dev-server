import { prisma } from "../prisma";
import { Post } from "../types";

export async function getPosts(): Promise<Post[]> {
  const data = await prisma.post.findMany({
    include: {
      tags: true,
      category: true,
      series: true,
    },
  });

  return data.map(prismaDataToPost);
}

export async function findPost(id: string): Promise<Post> {
  const post = await prisma.post.findFirstOrThrow({
    where: {
      id: id,
    },
    include: {
      tags: true,
      category: true,
      series: true,
    },
  });

  return prismaDataToPost(post);
}

export async function getPostsInCategory(category: string): Promise<Post[]> {
  const data = await prisma.post.findMany({
    where: {
      category: {
        name: category,
      },
    },
    include: {
      tags: true,
      category: true,
      series: true,
    },
  });

  return data.map(prismaDataToPost);
}

export async function getPostsInSeries(series: string): Promise<Post[]> {
  const data = await prisma.post.findMany({
    where: {
      series: {
        name: series,
      },
    },
    include: {
      tags: true,
      category: true,
      series: true,
    },
  });

  return data.map(prismaDataToPost);
}

// Helper
type PrismaPost = {
  category: {
    id: string;
    name: string;
  } | null;
  series: {
    id: string;
    name: string;
  } | null;
  tags: {
    id: string;
    name: string;
  }[];
} & {
  id: string;
  key: string;
  createdAt: Date;
  title: string;
  subtitle: string | null;
  content: string;
  categoryId: string;
  seriesId: string;
};
function prismaDataToPost(post: PrismaPost): Post {
  return {
    createdAt: post.createdAt,
    key: post.key,
    title: post.title,
    subtitle: post.subtitle,
    content: post.content,
    category: post.category?.name,
    series: post.series?.name,
    tags: post.tags.map((tag) => tag.name),
  };
}
