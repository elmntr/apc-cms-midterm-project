import { NextRequest, NextResponse } from "next/server";

// Mock database
let hobbies: any[] = [
  { id: "1", name: "Books", icon: "📚", description: "" },
  { id: "2", name: "Gaming", icon: "🎮", description: "" },
  { id: "3", name: "Sports", icon: "⚽", description: "" },
];

export async function GET() {
  return NextResponse.json(hobbies);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newHobby = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date(),
    };

    hobbies.push(newHobby);
    return NextResponse.json(newHobby, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create hobby" },
      { status: 400 }
    );
  }
}
