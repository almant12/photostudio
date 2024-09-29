import { NextResponse,NextRequest } from "next/server";
import { PrismaClient } from '@prisma/client';
import { saveImage,deleteImage } from 'image-handler-almant'
import { authUser } from "lib/authUser";
import pusher from "lib/pusher";

const prisma = new PrismaClient();


export async function GET(){
    try{
        const postsFetch = await prisma.post.findMany({
            include: {
              author: true, 
            },
          });
           
    const post = postsFetch.map(post => {
        const { authorId, ...postWithoutAuthorId } = post;
        return postWithoutAuthorId;
      });
      
        return NextResponse.json({post},{status:200});
    }catch (error) {
        return NextResponse.json({'message': 'error fetching posts' }, { status: 500 });
    }
}

export async function POST(req:NextRequest) {
    const formData = await req.formData();

    //pass the req into function for validate the header token and return user payload
    const {valid,user} = await authUser();

    if(!valid || !user){
        return NextResponse.json({'message':'Unauthorizate'},{status:401})
    }
    if(user.role === 'USER'){
      return NextResponse.json({'message':'Forbidden'},{status:403})
    }

    const authenticatedUser = user;
    
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const image = formData.get('image') as File;
  
    // Validation errors collection
    const errors: { [key: string]: string } = {};
  
    // Validate title
    if (!title) {
      errors.title = "Title is required.";
    } else if (title.length < 3) {
      errors.title = "Title must be at least 3 characters.";
    } else if (title.length > 255) {
      errors.title = "Title must not exceed 255 characters.";
    }
  
    // Validate image
    if (!image) {
      errors.image = "Image is required.";
    } else if (!['image/jpeg', 'image/png', 'image/gif'].includes(image.type)) {
      errors.image = "Invalid image type. Only JPEG, PNG, and GIF are allowed.";
    } else if (image.size > 2 * 1024 * 1024) {  // Max 2MB file size
      errors.image = "Image size must be less than 2MB.";
    }
  
    // If there are any validation errors, return them
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    let imagePath: string | null = null;

    try {
      imagePath = await saveImage(image);
  
      const post = await prisma.post.create({
        data: {
          title: title,
          description:description || null,
          image: imagePath,
          authorId: parseInt(authenticatedUser.id)
        }
      });

      //find all users who has made subscribe to this user
      const subscriptions = await prisma.subscription.findMany({
        where:{receiverId: parseInt(authenticatedUser.id)},
      });

        const notifications = subscriptions.map(async (subscription) => {
      const notification = await prisma.notification.create({
        data: {
          status: 'NEW_POST',
          senderId: parseInt(authenticatedUser.id),
          postId: post.id,
          receiverId: subscription.senderId
        }
      });

      // Trigger Pusher event for real-time notification
      await pusher.trigger(`user-${subscription.senderId}`, 'new-post', {
        postId: post.id,
        title: post.title,
        description: post.description,
        image: post.image,
      });

      return notification;
    });

      await Promise.all(notifications)
  
      return NextResponse.json({ post }, { status: 201 });
    } catch (error) {
      // If imagePath is not null, delete the image
      if (imagePath) {
        deleteImage(imagePath);
      }
  
      return NextResponse.json({ 'message': error.message}, { status: 500 });
    }
  }
