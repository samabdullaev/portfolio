import { NextResponse } from "next/server";
import travel from "@/data/travel.json";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const destination = travel.find((t: { slug: string }) => t.slug === slug);
  if (!destination) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(destination);
}
