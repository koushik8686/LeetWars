import User from '../../models/usermodel';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import validateLeetCodeId from '../../utils/VerifYLeetcode'
import connectMongoDB from '../../utils/mongodb';
import stats from '../../models/statsmodel';
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
    const { name, leetcode } = await request.json();
    if (!name || !leetcode) {
        return NextResponse.json(
            { message: 'Provide All Details' },
            { status: 401 }
          );    }
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const existingComparison = user.comparisions.find(
      (comparison) =>
        comparison.user1_leetcode_id === leetcode || comparison.user2_leetcode_id === leetcode
    );

    if (existingComparison) {
      return NextResponse.json({ error: 'Comparison already exists for this LeetCode ID' }, { status: 400 });
    }
    var imgurl =""
    const response = await validateLeetCodeId(leetcode); 
    if (response.errors) {
      return NextResponse.json(
        { message: 'Incorrect LeetCode Username' },
        { status: 403 }
      );    
    }else{
      imgurl=response.avatar
    }
    // Add the new comparison
    user.comparisions.push({
      user1: user.username,
      user1_leetcode_id: user.leetcode_id,
      user2: name,
      user2_leetcode_id: leetcode,
      img:imgurl
    });
    console.log(user);
    await user.save();
    const statsInstance = await stats.findById("6769bcc93832e58fdf9d8e16");
    statsInstance.comparisions++;
    await statsInstance.save();
    return NextResponse.json({ message: 'Comparison added successfully' }, { status: 200 });
  } catch (error) {
    if (error) {
      console.log(error);
      return NextResponse.json({ error: error }, { status: 401 });
    }
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}


export async function PUT(request) {
  try {
    await connectMongoDB();
    const token = request.cookies.get('token')?.value;
    console.log(token);
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized: Token not provided' }, { status: 401 });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace `process.env.JWT_SECRET` with your secret key
    const userId = decoded.id;
    const { name, leetcode } = await request.json();
    if (!name || !leetcode) {
        return NextResponse.json(
            { message: 'Provide All Details' },
            { status: 401 }
          );    }
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    const existingComparison = user.comparisions.find(
      (comparison) =>
        comparison.user2 === name
    );

    if (!existingComparison) {
      return NextResponse.json({ error: 'Comparison not found for this friend' }, { status: 404 });
    }
    var imgurl =""
    const response = await validateLeetCodeId(leetcode); 
    if (response.errors) {
      return NextResponse.json(
        { message: 'Incorrect LeetCode Username' },
        { status: 403 }
      );    
    }else{
      imgurl=response.avatar
    }
    existingComparison.user2_leetcode_id = leetcode;
    existingComparison.img = imgurl;
    // Save the user
    await user.save();
    return NextResponse.json({ message: 'Comparison updated successfully' }, { status: 200 });
  } catch (error) {
    if (error) {
      console.log(error);
      return NextResponse.json({ error: error }, { status: 401 });
    }
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(request) {
  try {
    await connectMongoDB();
    const token = request.cookies.get('token')?.value;
    console.log(token);
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized: Token not provided' }, { status: 401 });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace `process.env.JWT_SECRET` with your secret key
    const userId = decoded.id;
    const { name } = await request.json();
    if (!name) {
        return NextResponse.json(
            { message: 'Provide Friend Name' },
            { status: 401 }
          );    }
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const existingComparisonIndex = user.comparisions.findIndex(
      (comparison) =>
        comparison.user2 === name
    );
    if (existingComparisonIndex === -1) {
      return NextResponse.json({ error: 'Comparison not found for this friend' }, { status: 404 });
    }
    user.comparisions.splice(existingComparisonIndex, 1);
    await user.save();
    return NextResponse.json({ message: 'Comparison deleted successfully' }, { status: 200 });
  } catch (error) {
    if (error) {
      console.log(error);
      return NextResponse.json({ error: error }, { status: 401 });
    }
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}



