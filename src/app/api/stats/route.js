import ConnectMongoDb from '../../utils/mongodb';
import Stats from '../../models/statsmodel'
import { NextResponse } from 'next/server';

export async function GET(){
    try{
        await ConnectMongoDb();
        const statsData = await Stats.find({});
        return NextResponse.json(statsData[0]);
    }catch(error){
        console.error(error);
        return NextResponse.status(500).json({error: 'Failed to fetch stats data'});
    }
}