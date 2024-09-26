
import { PrismaClient } from "@prisma/client";
import { authUser } from "lib/authUser";
import { NextRequest, NextResponse } from "next/server";


const prisma = new PrismaClient();

export async function GET(){
    
  const authenticatedUser = (await authUser()).user;

    const subscribe = await prisma.subscription.findMany({
        where:{senderId:parseInt(authenticatedUser.id)},
        include:{
          sender:true
        }
    })
    
    const users = subscribe.map(subscribe => subscribe.sender)

    return NextResponse.json({users});
}


export async function POST(req:NextRequest){

  const formData = await req.formData();
  const receiverId = formData.get('receiverId');

    // Initialize an errors collection
  const errors: { [key: string]: string } = {};

  // Check if adminId is provided
  if (!receiverId) {
    errors.adminId = 'Id is required';
  } else if (isNaN(Number(receiverId))) {
    // Check if adminId is a number
    errors.adminId = 'Id must be a valid number';
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

  const authenticatedUser = user;

  //check admin exist
  const userExist = await prisma.user.findUnique({
    where:{id:parseInt(receiverId)}
  });

  if(!userExist){
    return NextResponse.json({'message':"Admin not found",},{status:404});
  }
  if(userExist.role === 'USER'){
    return NextResponse.json({'message':'User can not be subscribe'})
  }

  //check if request id maded before
  const subscription = await prisma.subscription.findFirst({
    where: {
      senderId: parseInt(authenticatedUser.id), receiverId: parseInt(receiverId)
    }
  });

  if(subscription){
    return NextResponse.json({ message: 'Request has been made before' }, { status: 409 });
  }

  //save the new subscription
  const newSubscription = await prisma.subscription.create({
    data:{
      senderId:parseInt(authenticatedUser.id),
      receiverId:parseInt(receiverId)
    }
  })

  return NextResponse.json({ message: 'Subscription created successfully', newSubscription });

}