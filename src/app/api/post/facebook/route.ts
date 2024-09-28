import { authUser } from "lib/authUser";
import { NextRequest, NextResponse } from "next/server";
import { saveFacebookImage,deleteImage} from "image-handler-almant";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const API_KEY = process.env.API_KEY
export async function POST(req:NextRequest){
    const formData = await req.formData();

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
    const postUrl = formData.get('postUrl') as string;

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
    if (!postUrl) {
      errors.postUrl = "postUrl is required.";
    }
  
    // If there are any validation errors, return them
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    //filter the id of pathUrl
    const postId = extractFbid(postUrl);
    let imagePath:string | null = null;

    try{
        //fetch data from api facebook
        const response = await fetch('https://graph.facebook.com/v12.0/'+postId+'?fields=images'+'&access_token='+API_KEY+'',{
            method:'GET'
        });
        const data = await response.json();
        const imageUrl = data.images[0].source;
    // Save the image to the public directory
    imagePath = await saveFacebookImage(imageUrl);

    //store the post in database
    const post = await prisma.post.create({
      data:{
        title:title,
        description:description||null,
        image:imagePath,
        authorId:parseInt(authenticatedUser.id)
      }
    });

    //find all users who has made subscribe to this user
    const subscriptions = await prisma.subscription.findMany({
      where:{receiverId: parseInt(authenticatedUser.id)},
    });

    //push the notification to the user who has made subscribe
    const notification = subscriptions.map(async (subscriptions) =>{
      return prisma.notification.create({
        data:{
          status:'NEW_POST',
          senderId:parseInt(authenticatedUser.id),
          postId:post.id,
          receiverId:subscriptions.senderId
        }
       })
    })

    await Promise.all(notification)

    return NextResponse.json({ post }, { status: 201 });
    }catch (error) {
      // If imagePath is not null, delete the image
      if (imagePath) {
        deleteImage(imagePath);
      }
  
      return NextResponse.json({ 'message': error.message}, { status: 500 });
    }

}


function extractFbid(url: string): string | null {
    const fbidRegex = /fbid=(\d+)/;
    const match = url.match(fbidRegex);

    if (match && match[1]) {
        return match[1]; // Return the fbid if found
    }
    return null; // Return null if no fbid is found
}