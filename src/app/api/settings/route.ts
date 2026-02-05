import { NextRequest, NextResponse } from "next/server";

// Mock database - single settings object
let settings: any = {
  id: "settings-1",
  heroHeading: "From Then to Now",
  gapQuote: "Some years are meant to be lived, not captured.",
  grade6PhotoUrl: "",
  collegePhotoUrl: "",
  childhoodTitle: "Childhood Gallery",
  collegeTitle: "College Journey",
};

export async function GET() {
  return NextResponse.json(settings);
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    settings = {
      ...settings,
      ...body,
      updatedAt: new Date(),
    };

    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 400 }
    );
  }
}
