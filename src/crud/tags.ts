import { prisma } from "../prisma";

export async function getTags(): Promise<string[]> {
  const tags = await prisma.tag.findMany();
  return tags.map((tag) => tag.name);
}
