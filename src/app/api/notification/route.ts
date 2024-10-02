import { PrismaClient } from '@prisma/client';
import { authUser } from 'lib/authUser';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();
export async function GET(){

    const {valid,user} = await authUser();

    //check if user is authenticate
    if(!valid || !user){
        return NextResponse.json({'message':'Unauthorizate'},{status:401})
    }
    const authenticatedUser = user;

    //fetch ur notification
    const notification = await prisma.notification.findMany({
        where:{receiverId:parseInt(authenticatedUser.id)},
        include:{
            sender:true,
        }
    })
    
    // Update the seen attribute to true for all fetched notifications
    await prisma.notification.updateMany({
        where: { receiverId: parseInt(authenticatedUser.id), seen: false }, // Only update unseen notifications
        data: { senn: true },
    });
    
    return NextResponse.json(notification)
}