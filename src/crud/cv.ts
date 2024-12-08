import { prisma } from "../prisma";

export async function getCurriculumVitae(
  language: string
): Promise<ArrayBuffer> {
  if (language == "en" || language == "pt") {
    const pdf = Bun.file(`./posts/cv-phgw-${language}.pdf`);

    return pdf.arrayBuffer();
  }

  return Promise.reject();
}
