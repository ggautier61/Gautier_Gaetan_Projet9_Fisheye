import { getAllPhotographers } from "../../lib/photographers";

export const dynamic = "force-static";

export async function GET() {
  const photographers = await getAllPhotographers();

  return Response.json(photographers);
}
