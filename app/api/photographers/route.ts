import { getAllPhotographers } from "../../lib/photographers";

export async function GET() {
  const photographers = await getAllPhotographers();

  return Response.json(photographers);
}
