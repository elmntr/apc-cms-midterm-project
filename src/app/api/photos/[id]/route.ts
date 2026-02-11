import { NextRequest, NextResponse } from "next/server";

// Mock database
let photos: any[] = [];

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  photos = photos.filter((p) => p.id !== id);
  return NextResponse.json({ success: true });
}
