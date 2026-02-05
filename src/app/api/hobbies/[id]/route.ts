import { NextRequest, NextResponse } from "next/server";

// Mock database
let hobbies: any[] = [
  { id: "1", name: "Books", icon: "📚", description: "" },
  { id: "2", name: "Gaming", icon: "🎮", description: "" },
  { id: "3", name: "Sports", icon: "⚽", description: "" },
];

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  hobbies = hobbies.filter((h) => h.id !== id);
  return NextResponse.json({ success: true });
}
