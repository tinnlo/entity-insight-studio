import { getEntityOptions } from "@/lib/demo-data";

export async function GET() {
  const options = await getEntityOptions();
  return Response.json(options);
}
