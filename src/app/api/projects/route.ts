import { NextResponse } from "next/server";
import projects from "@/data/projects.json";

export function GET() {
  return NextResponse.json(projects);
}
