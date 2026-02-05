import { NextRequest, NextResponse } from "next/server";

// Mock database - in production, use Prisma with MongoDB
let photos: any[] = [];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const section = searchParams.get("section");

  if (section) {
    return NextResponse.json(photos.filter((p) => p.section === section));
  }

  return NextResponse.json(photos);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newPhoto = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date(),
    };

    photos.push(newPhoto);
    return NextResponse.json(newPhoto, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create photo" },
      { status: 400 }
    );
  }
}
