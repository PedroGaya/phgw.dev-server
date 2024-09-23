import { prisma } from "../prisma";

export async function getSeries(): Promise<string[]> {
  const series = await prisma.series.findMany();
  return series.map((s) => s.name);
}
