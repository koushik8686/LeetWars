import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import UserModel from '../../models/usermodel';
const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';
export async function POST(req) {
  try {
    const { email } = await req.json();
    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    // Generate JWT token with user id and email
    const id = user._id;
    const token = jwt.sign(
      { id, email },
      SECRET_KEY,
    );
    // Create response and set token in cookies
    const response = NextResponse.json({ message: "Token set successfully" });
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Error setting token:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
