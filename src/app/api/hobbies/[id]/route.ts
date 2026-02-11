import { NextRequest, NextResponse } from "next/server";

// Mock database
let hobbies: any[] = [
  { id: "1", name: "Books", icon: "📚", description: "" },
  { id: "2", name: "Gaming", icon: "🎮", description: "" },
  { id: "3", name: "Sports", icon: "⚽", description: "" },
];

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  hobbies = hobbies.filter((h) => h.id !== id);
  return NextResponse.json({ success: true });
}
