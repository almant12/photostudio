import { authUser } from "lib/authUser";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export async function DELETE(req:NextRequest,{params}:{params:{userId:string}}){

    const id = parseInt(params.userId);

    const {valid,user} = await authUser();
    if(!valid){
        return NextResponse.json({'message':'unauthorizate'},{status:401})
    }

    const authenticatedUser = user;

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
    } catch (error) {
        console.error('Error unsubscribing:', error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}