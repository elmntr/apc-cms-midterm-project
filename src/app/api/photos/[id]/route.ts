import { NextRequest, NextResponse } from "next/server";

// Mock database
let photos: any[] = [];

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  photos = photos.filter((p) => p.id !== id);
  return NextResponse.json({ success: true });
}
