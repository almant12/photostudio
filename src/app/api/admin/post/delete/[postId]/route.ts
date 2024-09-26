import { NextResponse,NextRequest } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export async function DELETE(req:NextRequest,{params}:{params:{postId:string}}){
    try {
        const { postId } = params;
        const id = parseInt(postId);

        const post = await prisma.post.findUnique({
          where: { id: id },
        });

        if (!post) {
          return NextResponse.json({ message: 'Post not found' }, { status: 404 });
        }

        await prisma.post.delete({
            where:{id:id}
        });

        return NextResponse.json({'message': 'Post deleted successfully'},{status:200});
      } catch (error) {
        console.error('Error finding Post:', error);
        return NextResponse.json({ message: 'Error finding Post' }, { status: 500 });
      }
}