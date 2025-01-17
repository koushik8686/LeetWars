import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import Connectmongodb from '../../utils/mongodb'; // Update the path
import User from '../../models/usermodel'; // Update the path
import FetchData from '../../utils/FetchLeetcodeData';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';
export async function GET(req) {
  try {
    await Connectmongodb();
    // Retrieve the token from cookies
    const token = req.cookies.get('token')?.value;
    // console.log(token);
    if (!token) {
      return NextResponse.json(
        { message: 'Unauthorized: Token not found' },
        { status: 401 }
      );
    }
    let decoded;
    try {
      decoded = jwt.verify(token, SECRET_KEY);
    } catch (err) {
      console.log(err);
      return NextResponse.json(
        { message: 'Unauthorized: Invalid token' },
        { status: 401 }
      );
    }
    // Find the user in the database
    const user = await User.findById(decoded.id);
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }
    const data = await FetchData(user.leetcode_id , user.username)
    console.log(data);
    // Return user data and LeetCode status
    return NextResponse.json( {
          username: user.username,
          email: user.email,
          avatar: user.avatar,
          leetcode_id: user.leetcode_id,
          comparisions: user.comparisions,
          groups: user.groups,
          data
        },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error verifying user:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
