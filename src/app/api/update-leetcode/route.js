import { NextResponse } from 'next/server';
import Connectmongodb from '../../utils/mongodb';
import User from '../../models/usermodel';
import jwt from 'jsonwebtoken'
export async function POST(req) {
  try {
    await Connectmongodb();
    const { leetcodeUsername , avatar } = await req.json();
    const token = req.cookies.get('token').value;
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    // Update user's LeetCode username
    const user = await User.findById(decoded.id);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    user.leetcode_id = leetcodeUsername;
    user.avatar=avatar
    await user.save();
    return NextResponse.json({ message: 'LeetCode username updated successfully' , name:user.username , username : leetcodeUsername , avatar:avatar});
  } catch (error) {
    console.error('Error updating LeetCode username:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
