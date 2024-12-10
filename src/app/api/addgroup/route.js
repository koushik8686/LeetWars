import User from '../../models/usermodel';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import validateLeetCodeId from '../../utils/VerifYLeetcode'
import connectMongoDB from '../../utils/mongodb';
export async function POST(request) {
  try {
    await connectMongoDB();
    const token = request.cookies.get('token')?.value;
    console.log(token);
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized: Token not provided' }, { status: 401 });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace `process.env.JWT_SECRET` with your secret key
    const userId = decoded.id;
    const { groupName, users } = await request.json();
    if (!groupName || !users) {
        return NextResponse.json(
            { message: 'Provide All Details' },
            { status: 401 }
          );    
        }
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    const updatedUsers = await Promise.all(
      users.map(async (user) => {
        let imgurl = "";
        const response = await validateLeetCodeId(user.leetcode_id); 
        if (response.errors) {
          return {
            ...user,
            img: null, // or any fallback value for errors
            error: 'Incorrect LeetCode Username',
          };
        } else {
          imgurl = response.avatar;
        }
        return { ...user, img: imgurl };
      })
    );
    
    const grpdata ={
        group_name: groupName,
        group_members: updatedUsers,
    }    // Add the new comparison
    user.groups.push(grpdata);

    // Save the user
    await user.save();

    return NextResponse.json({ message: 'Comparison added successfully' }, { status: 201 });
  } catch (error) {
    if (error.name) {
      console.log(error);
      return NextResponse.json({ error: error }, { status: 401 });
    }
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
