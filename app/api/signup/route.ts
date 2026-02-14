import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { error: "Email/password signup is disabled. Use Google sign-in." },
    { status: 410 }
  );
}
