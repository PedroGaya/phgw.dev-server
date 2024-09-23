import { prisma } from "../prisma";

export async function getCategories(): Promise<string[]> {
  const categories = await prisma.category.findMany();
  return categories.map((c) => c.name);
}
