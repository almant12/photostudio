
import { PrismaClient } from "@prisma/client";
import { authUser } from "lib/authUser";
import { NextRequest, NextResponse } from "next/server";


const prisma = new PrismaClient();

export async function GET(){
    

    const subscribe = await prisma.subscription.findMany({
        where:{adminId:1},
        include:{
            admin:true,
            user:true
        }
    })

    return NextResponse.json(subscribe);
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

  const authenticatedUser = authUser(req);

  //check admin exist
  const admin = await prisma.user.findUnique({
    where:{id:parseInt(adminId)}
  });

  if(!admin || admin.role !== 'ADMIN'){
    return NextResponse.json({'message':"Admin not found",},{status:404});
  }


  //check if request id maded  before


  //save admin to subscribe user


}