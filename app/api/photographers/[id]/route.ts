import type { NextRequest } from "next/server";
import {
  getAllPhotographers,
  getPhotographerById,
} from "../../../lib/photographers";

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  const photographers = await getAllPhotographers();

  return photographers.map((photographer) => ({
    id: String(photographer.id),
  }));
}

export async function GET(
  request: NextRequest,
  { params }: RouteContext<"/api/photographers/[id]">
) {
  const { id } = await params;
  const photographerId = Number(id);

  if (!Number.isInteger(photographerId)) {
    return Response.json(
      { error: "L'id doit etre un entier." },
      { status: 400 }
    );
  }

  const photographer = await getPhotographerById(photographerId);

  if (!photographer) {
    return Response.json(
      { error: `Aucun photographe avec l'id ${photographerId}.` },
      { status: 404 }
    );
  }

  return Response.json(photographer);
}