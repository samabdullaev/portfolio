import { NextResponse } from "next/server";
import resources from "@/data/resources.json";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const resource = resources.find((r: { slug: string }) => r.slug === slug);
  if (!resource) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(resource);
}
