import { PrismaClient } from "@prisma/client";
import { authUser } from "lib/authUser";
import { updateImage } from "lib/uploadImageService";
import { NextRequest, NextResponse } from "next/server";
import { deleteImage } from "lib/uploadImageService";



const prisma = new PrismaClient();

export async function PUT(req:NextRequest,{params}:{params:{userId:string}}){
    
    const formData = await req.formData();
    const userId = parseInt(params.userId);

    const {valid,user} = await authUser(req);

    if(!valid || !user){
        return NextResponse.json({'message':'Unauthorizate'},{status:401});
    }

    const authenticateUser = user;
    //check if user exist
    const userExist = await prisma.user.findUnique({
        where:{id:userId},
    }) as {id:number,avatar: string} | null;

    if(!userExist){
        return NextResponse.json({'message':'User Not Found'},{status:404});
    }


    if(userExist.id !== parseInt(authenticateUser.id)){
        return NextResponse.json({'message':'Unauthorized to update this user'},{status:403});
    }

    const name = formData.get('name') as string;
    const avatar = formData.get('avatar') as File;

    const errors: {[key:string]:string} = {};

     // Validate title
     if (!name) {
        errors.name = "Name is required.";
      } else if (name.length < 2) {
        errors.name = " must be at least 2 characters.";
      } else if (name.length > 255) {
        errors.title = "Name must not exceed 255 characters.";
      }
    
    
      // Validate image
      if (!avatar) {
        errors.avatar = "Image is required.";
      } else if (!['image/jpeg', 'image/png', 'image/gif'].includes(avatar.type)) {
        errors.avatar = "Invalid image type. Only JPEG, PNG, and GIF are allowed.";
      } else if (avatar.size > 5 * 1024 * 1024) {  // Max 2MB file size
        errors.avatar = "Image size must be less than 5MB.";
      }
    
      // If there are any validation errors, return them
      if (Object.keys(errors).length > 0) {
        return NextResponse.json({ 'message': false, errors }, { status: 400 });
      }
  
      let avatarPath: string | null = null;


      try{
        avatarPath = await updateImage(avatar,userExist.avatar || '');

        //update the user
        const updateUser = await prisma.user.update({
            where:{id:userId},
            data:{
                name:name,
                avatar:avatarPath
            }
        });

        return NextResponse.json({updateUser},{status:200});
    } catch (error) {
        //once the user does not update delete the new upload image
        if (avatarPath) {
          deleteImage(avatarPath);
        }
        return NextResponse.json({ 'message': error.message}, { status: 500 });
      }
}