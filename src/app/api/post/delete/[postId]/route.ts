import { NextResponse,NextRequest } from "next/server";
import { PrismaClient } from '@prisma/client';
import { authUser } from "lib/authUser";

const prisma = new PrismaClient();


export async function DELETE(req:NextRequest){
    try {
      const url = req.nextUrl.pathname; // e.g., '/api/post/delete/1'
      const parts = url.split('/'); // Split the path into parts
      const postId = parts[parts.length - 1]; // Get the last part, which is the postId
      const id = parseInt(postId); // Parse it as an integer

        //pass the req into function for validate the header token and return user payload
        const {valid,user} = await authUser();


        const authenticatedUser = user;

        const post = await prisma.post.findUnique({
          where: { id: id },
        });

        if (!post) {
          return NextResponse.json({ message: 'Post not found' }, { status: 404 });
        }

        //check if the authenticate user is the author of the post
        if (post.authorId !== parseInt(authenticatedUser.id)){
            return NextResponse.json({'message':'Unauthorized to delete this post'},{status:403});
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