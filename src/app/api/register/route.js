import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Connectmongodb from '../../utils/mongodb'; // Update the path
import User from '../../models/usermodel'; // Update the path
const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';
import stats from '../../models/statsmodel';
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
    const statsInstance = await stats.findById("6769bcc93832e58fdf9d8e16");
    statsInstance.users++;
    await statsInstance.save();
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
export async function PUT(request) {
  try {
    await Connectmongodb();
    const { username, leetcode_id } = await request.json();
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized: Token not provided' }, { status: 401 });
    }
    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.id;
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    if (username) {
      user.username = username;
    }
    if (leetcode_id) {
      user.leetcode_id = leetcode_id;
    }
    await user.save();
    return NextResponse.json({ message: 'User updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
