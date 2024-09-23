import { NextRequest,NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req:NextRequest,{params}:{params:{userId:string}}){
    try {
        const { userId } = params;
        const id = parseInt(userId);
    
        const user = await prisma.user.findUnique({
          where: { id: id },
          select:{
            id: true,
            name: true,
            avatar: true,
            email: true,
            posts:true
          }
        });

        if (!user) {
          return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
    
        // Return the found user
        return NextResponse.json({ user }, { status: 200 });
      } catch (error) {
        console.error('Error finding user:', error);
        return NextResponse.json({ message: 'Error finding user' }, { status: 500 });
      }
}