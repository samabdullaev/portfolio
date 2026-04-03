import { NextResponse } from "next/server";
import projects from "@/data/projects.json";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const project = projects.find((p: { slug: string }) => p.slug === slug);
  if (!project) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(project);
}
