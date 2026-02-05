import { NextRequest, NextResponse } from "next/server";

// Mock database for messages
let messages: any[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newMessage = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date(),
    };

    messages.push(newMessage);
    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 400 }
    );
  }
}
