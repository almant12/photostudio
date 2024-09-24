
import { PrismaClient } from "@prisma/client";
import { authUser } from "lib/authUser";
import { NextRequest, NextResponse } from "next/server";


const prisma = new PrismaClient();

export async function GET(){
    
  const authenticatedUser = (await authUser()).user;
  if(authenticatedUser.role == 'USER'){
    return NextResponse.json({'message':"Unauthorizate"},{status:401})
  }

    const subscribe = await prisma.subscription.findMany({
        where:{adminId:parseInt(authenticatedUser.id)},
        include:{
            user:true
        }
    })
    
    const users = subscribe.map(subscribe => subscribe.user)

    return NextResponse.json({users});
}


export async function POST(req:NextRequest){

  const formData = await req.formData();
  const adminId = formData.get('adminId');

    // Initialize an errors collection
  const errors: { [key: string]: string } = {};

  // Check if adminId is provided
  if (!adminId) {
    errors.adminId = 'adminId is required';
  } else if (isNaN(Number(adminId))) {
    // Check if adminId is a number
    errors.adminId = 'adminId must be a valid number';
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

  //check the authUser is user Role
  if(authenticatedUser.role !== 'USER'){
    return NextResponse.json({'message':'only user role can make request'},{status:400});
  }

  //check admin exist
  const admin = await prisma.user.findUnique({
    where:{id:parseInt(adminId)}
  });

  if(!admin || admin.role !== 'ADMIN'){
    return NextResponse.json({'message':"Admin not found",},{status:404});
  }


  //check if request id maded  before
  const subscription = await prisma.subscription.findFirst({
    where:{
      userId:parseInt(authenticatedUser.id),
      adminId:admin.id
    }
  })

  if(subscription){
    return NextResponse.json({ message: 'Request has been made before' }, { status: 409 });
  }

  //save the new subscription
  const newSubscription = await prisma.subscription.create({
    data:{
      userId:parseInt(authenticatedUser.id),
      adminId:admin.id
    }
  })

  return NextResponse.json({ message: 'Subscription created successfully', newSubscription });

}