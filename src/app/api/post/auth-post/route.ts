import { NextResponse,NextRequest } from "next/server";
import { PrismaClient } from '@prisma/client';
import { authUser } from "lib/authUser";

const prisma = new PrismaClient();

export async function GET(req:NextRequest){

  // Pass the req into function to validate the header token and return user payload
const { valid, user } = await authUser(req);

if (!valid) {
    // Handle invalid token case, e.g., throw an error or return a response
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
}

const authenticatedUser = user;

try {
    // Find all posts by the authenticated user's ID
    const posts = await prisma.post.findMany({
        where: {
            authorId: parseInt(authenticatedUser.id), // Assuming 'userId' is the foreign key in the post model
        },
    });

    return NextResponse.json(posts); // Return the posts as a response
} catch (error) {
    // Handle error
    return NextResponse.json({ message: 'Error fetching posts', error: error.message }, { status: 500 });
}
}