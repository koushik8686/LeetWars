import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Connectmongodb from '../../utils/mongodb'; // Update the path
import User from '../../models/usermodel'; // Update the path
const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request) {
  try {
    await Connectmongodb();
    const { username, email, password } = await request.json();
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: 'Email already exists' },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      leetcode_id: null, 
      requests: [],
      chats: [],
    });
    await newUser.save();

    // Generate JWT
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      SECRET_KEY,
    );

    // Set the token as an HTTP-only cookie
    const response = NextResponse.json(
      { message: 'User created successfully' },
      { status: 201 }
    );
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'strict', 
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
