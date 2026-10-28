import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../generated/prisma/client.ts";
import photographers from "../app/src/datas/photographer.json" with { type: "json" };
import medias from "../app/src/datas/media.json" with { type: "json" };

const prisma = new PrismaClient({
  adapter: new PrismaBetterSqlite3({
    url: process.env["DATABASE_URL"] ?? "file:./dev.db",
  }),
});

// `skipDuplicates` n'existe pas sur SQLite : on vide donc les tables avant
// d'insérer, ce qui rend le seed rejouable autant de fois que nécessaire.
// Media doit être purgée avant Photographer (FK ON DELETE RESTRICT).
await prisma.$transaction([
  prisma.media.deleteMany(),
  prisma.photographer.deleteMany(),
  prisma.photographer.createMany({ data: photographers }),
  prisma.media.createMany({ data: medias }),
]);

const [nbPhotographers, nbMedias] = await Promise.all([
  prisma.photographer.count(),
  prisma.media.count(),
]);

console.log(
  `Seed termine : ${nbPhotographers} photographe(s), ${nbMedias} media(s).`
);

await prisma.$disconnect();
