import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();
export async function GET(req:NextRequest,{params}:{params:{userId:string}}){

    const {userId} = params;
    const id = parseInt(userId);

    //find user
    const userExist = await prisma.user.findUnique({
        where:{id:id}
    });

    if(!userExist){
        return NextResponse.json({'message':'User Not Found'},{status:404})
    }

    const posts = await prisma.post.findMany({
        where:{authorId:id},
        select: {
            id: true,
            title: true,
            image: true,
          }
    });

    return NextResponse.json({posts},{status:200})
}