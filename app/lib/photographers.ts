import { prisma } from "./prisma";

export async function getAllPhotographers() {
  return prisma.photographer.findMany({
    orderBy: { name: "asc" },
  });
}

export async function getPhotographerById(id: number) {
  return prisma.photographer.findUnique({
    where: { id },
    include: { medias: true },
  });
}
