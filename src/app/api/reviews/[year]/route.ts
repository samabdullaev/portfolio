import { NextResponse } from "next/server";
import reviews from "@/data/reviews.json";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ year: string }> }
) {
  const { year } = await params;
  const review = reviews.find((r: { slug: string }) => r.slug === year);
  if (!review) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(review);
}
