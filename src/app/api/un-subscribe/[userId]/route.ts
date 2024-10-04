import { authUser } from "lib/authUser";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export async function DELETE(req:NextRequest){

    const url = req.nextUrl.pathname; // e.g., '/api/post/delete/1'
      const parts = url.split('/'); // Split the path into parts
      const idPath = parts[parts.length - 1]; // Get the last part, which is the postId
    const id = parseInt(idPath);

    const {valid,user} = await authUser();
    if(!valid){
        return NextResponse.json({'message':'unauthorizate'},{status:401})
    }

    const authenticatedUser:any = user;

    //find the subscribe
    try{
        const subscription = await prisma.subscription.findFirst({
            where: {
                senderId: parseInt(authenticatedUser.id), 
                receiverId: id, 
            },
        });
        //check if exist
        if(!subscription){
            return NextResponse.json({'message':'Not Found'},{status:404})
        }

        await prisma.subscription.delete({
            where:{
                id: subscription.id
            }
        });
        return NextResponse.json({ message: 'Successfully unsubscribed' }, { status: 200 });
    } catch (error:any) {
        console.error('Error unsubscribing:', error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}