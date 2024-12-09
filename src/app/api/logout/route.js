import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Set the cookie with Max-Age=0 to clear it
    const response = NextResponse.json({ message: "Logged out successfully" });
    response.cookies.set('token', '', {
      maxAge: 0, // Expire immediately
      path: '/', // Ensure it's valid for the entire app
      httpOnly: true,
      sameSite: 'Strict',
    });

    return response;
  } catch (error) {
    console.error("Error during logout:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
