import type { NextRequest } from "next/server";
import { getPhotographerById } from "../../../lib/photographers";

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
