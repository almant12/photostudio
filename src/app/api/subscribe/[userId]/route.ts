import { PrismaClient, Status } from "@prisma/client";
import { authUser } from "lib/authUser";
import { NextRequest, NextResponse } from "next/server";
import pusher from "lib/pusher";

const prisma = new PrismaClient();
export async function POST(req:NextRequest){

      const url = req.nextUrl.pathname; // e.g., '/api/post/delete/1'
      const parts = url.split('/'); // Split the path into parts
      const id = parts[parts.length - 1]; // Get the last part, which is the postId
      const receiverId = parseInt(id);
  
      // Initialize an errors collection
    const errors: { [key: string]: string } = {};
  
    // Check if adminId is provided
    if (!receiverId) {
      errors.adminId = 'Id is required';
    } else if (isNaN(Number(receiverId))) {
      // Check if adminId is a number
      errors.Id = 'Id must be a valid number';
    }
  
    // If there are errors, return them in the response
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }
  
    //validate the token
    const {valid,user} = await authUser();
    if(!valid){
      return NextResponse.json({'message':'jwt not valid'},{status:500})
    }
  
    const authenticatedUser:any = user;
  
    //check admin exist
    const userExist = await prisma.user.findUnique({
      where:{id:receiverId}
    });
  
    if(!userExist){
      return NextResponse.json({'message':"User not found",},{status:404});
    }
    if(userExist.role === 'USER'){
      return NextResponse.json({'message':'User can not be subscribe'})
    }
  
    //check if request id maded before
    const subscription = await prisma.subscription.findFirst({
      where: {
        senderId: parseInt(authenticatedUser.id), receiverId: receiverId
      }
    });
  
    if(subscription){
      return NextResponse.json({ message: 'Request has been made before' }, { status: 409 });
    }

    //save the new subscription
    const newSubscription = await prisma.subscription.create({
      data:{
        senderId:parseInt(authenticatedUser.id),
        receiverId:receiverId
      }
    })

    const notification = await prisma.notification.create({
      data:{
        status:Status.SUBSCRIBE,
        senderId:parseInt(authenticatedUser.id),
        receiverId:receiverId,
        postId:null
      }
    })
     // Trigger Pusher event for real-time notification
     await pusher.trigger(`user-${newSubscription.receiverId}`, 'subscribe', {
      id: notification.id,
      userName:authenticatedUser.name
    });
  
    return NextResponse.json({ message: 'Subscription created successfully', newSubscription });
  
  }