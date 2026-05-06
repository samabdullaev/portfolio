import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// Sanity webhook handler for on-demand revalidation. When content changes
// in Studio, Sanity POSTs to this endpoint and we re-render every cached
// page. The portfolio is small enough that a full revalidation is cheap
// — selective per-doc-type invalidation isn't worth the complexity.
//
// Setup: in Sanity Studio → Manage → API → Webhooks, create a new webhook:
//   - URL: https://samabdullaev.com/api/revalidate?secret=<your-secret>
//   - Trigger on: Create, Update, Delete
//   - Filter: leave empty (fires on all doc types)
// Then set SANITY_REVALIDATE_SECRET in the Vercel project environment.
export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const expected = process.env.SANITY_REVALIDATE_SECRET;

  if (!expected) {
    return NextResponse.json(
      { message: "SANITY_REVALIDATE_SECRET is not configured on the server" },
      { status: 500 },
    );
  }
  if (secret !== expected) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  revalidatePath("/", "layout");

  return NextResponse.json({
    revalidated: true,
    now: Date.now(),
  });
}
