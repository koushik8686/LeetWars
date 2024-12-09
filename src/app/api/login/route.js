import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Connectmongodb from '../../utils/mongodb';
import User from '../../models/usermodel';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request) {
  try {
    await Connectmongodb();
    const { email, password } = await request.json();

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid email' },
        { status: 401 }
      );
    }
    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Invalid password' },
        { status: 401 }
      );
    }
    // Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      SECRET_KEY
    );

    // Set the token as an HTTP-only cookie
    const response = NextResponse.json(
      { message: 'Successfully logged in', userID: user._id },
      { status: 200 }
    );
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
