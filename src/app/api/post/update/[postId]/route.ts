import { NextResponse,NextRequest } from "next/server";
import { PrismaClient } from '@prisma/client';
import { authUser } from "lib/authUser";
import { updateImage,deleteImage  } from "image-handler-almant";

const prisma = new PrismaClient();


export async function PUT(req: NextRequest) {

      // Extract the postId from the URL path
      const url = req.nextUrl.pathname; // e.g., '/api/post/update/1'
      const parts = url.split('/'); // Split the path into parts
      const postId = parseInt(parts[parts.length - 1]); // Get the last part and parse it to an integer

      // Get the form data
      const formData = await req.formData();
    //pass the req into function for validate the header token and return user payload
    const {valid,user} = await authUser();

    if(!valid || !user){
        return NextResponse.json({'message':'Unauthorizate'},{status:401})
    }

    const authenticatedUser:any = user;

  
    //check if the post exist
    const postExist = await prisma.post.findUnique({
        where: { id: postId },
    }) as {image: string,authorId:number} | null;

    if(!postExist){
        return NextResponse.json({'message':'Post Not Found'},{status:404});
    }


    //check if the authenticate user is the author of the post
    if (postExist.authorId !== parseInt(authenticatedUser.id)){
        return NextResponse.json({'message':'Unauthorized to update this post'},{status:403});
    }

    
    const title = formData.get('title') as string;
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
    } else if (image.size > 5 * 1024 * 1024) {  // Max 2MB file size
      errors.image = "Image size must be less than 5MB.";
    }
  
    // If there are any validation errors, return them
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    let imagePath: string | null = null;

    try {
      imagePath = await updateImage(image,postExist.image);
  
       // Update the post
    const updatedPost = await prisma.post.update({
        where: { id: postId },
        data: {
          title: title,
          image: imagePath,
          authorId: postExist.authorId
        },
      });
  
      return NextResponse.json({ updatedPost }, { status: 201 });
    } catch (error:any) {
      //once the post does not update delete the new upload image
      if (imagePath) {
        deleteImage(imagePath);
      }
  
      return NextResponse.json({ 'message': error.message}, { status: 500 });
    }
  }
