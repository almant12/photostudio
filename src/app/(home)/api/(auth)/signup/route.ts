import { request } from "http";
import { NextRequest,NextResponse } from "next/server";
import validateEmail from "helpers/validateEmail";
import validatePassword from "helpers/validatePassword";
import { PrismaClient } from '@prisma/client';
import bcrypt from "bcryptjs";


const prisma = new PrismaClient();
export async function POST(req:NextRequest){

    const body = await req.json();
    const {name,email,password} = body;

    //validate Name
    if(!name || typeof name !== 'string'){
        return NextResponse.json({'message':'Invalid Name'},{status:400});
    }
    //validate Email
    if(!validateEmail(email)){
        return NextResponse.json({'message':'Invalid Email'},{status:400});
    }
    //validate Password
    if(!validatePassword(password)){
        return NextResponse.json({'message':'Invalid Password'},{status:400});
    }

    //Check if Email exist or no
    const findEmail = await prisma.user.findFirst({
        where: {
          email: email,
        },
      });
  
    if (findEmail) {
      return NextResponse.json(
        { message: 'User Already Exists',},
        { status: 409 }
      );
    }

    const hashedPassword = bcrypt.hashSync(password,8);

    try{
        const user = await prisma.user.create({
            data:{
                name:name,
                email:email,
                password:hashedPassword
            }
        });
        return NextResponse.json(user,{status:201})
    }catch(error){
        return NextResponse.json({'message':'Error Create User'},{status:500})
    }
}