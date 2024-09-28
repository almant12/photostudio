import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { promises as fsPromises } from 'fs';


export async function saveImage(image: File): Promise<string> {

  // Ensure the uploads directory exists
  const uploadsDir = path.join(process.cwd(), 'public', 'images');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  // Generate a unique file name
  const ext = path.extname(image.name);
  const filename = `${uuidv4()}${ext}`;

  // Create the full path to save the image
  const filePath = path.join(uploadsDir, filename);

  // Convert the image Blob into a Buffer
  const arrayBuffer = await image.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Save the file to the public/uploads directory
  fs.writeFileSync(filePath, buffer);

  // Return the file path relative to the public directory
  return `/images/${filename}`;
}

export async function saveFacebookImage(image: any): Promise<string> {
  try {
    // Ensure the uploads directory exists
    const uploadsDir = path.join(process.cwd(), 'public', 'images');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
    // Generate a unique file name (you may need to specify the extension)
    const ext = '.jpg'; // Change this based on the actual image type if needed
    const filename = `${uuidv4()}${ext}`;

    // Create the full path to save the image
    const filePath = path.join(uploadsDir, filename);

    // Convert the ArrayBuffer into a Buffer
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer); // Directly convert the ArrayBuffer to Buffer

    // Save the file to the public/uploads directory
    await fs.writeFileSync(filePath, buffer);

    // Return the file path relative to the public directory
    return `/images/${filename}`;
  } catch (error) {
    console.error('Error saving image:', error);
    throw error;
  }
}



export async function deleteImage(fileName:string):Promise<void>{
  if(fs.existsSync(fileName)){
    try{
      await fsPromises.unlink(fileName);
    }catch(error){
      console.log(error)
    }
  }
}


export async function updateImage(image:File,oldPath:string): Promise<string> {
  // Ensure the uploads directory exists
  const uploadsDir = path.join(process.cwd(), 'public', 'images');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  //check if the old path exist
  const oldPathImage = path.join(process.cwd(),oldPath)
  if(fs.existsSync(oldPathImage)){
    try{
      await fsPromises.unlink(oldPathImage);
    }catch(error){
      console.error(error)
    }
  }

  //store a new one
  const ext = path.extname(image.name);
  const filename = `${uuidv4()}${ext}`;

  // Create the full path to save the image
  const filePath = path.join(uploadsDir, filename);

  // Convert the image Blob into a Buffer
  const arrayBuffer = await image.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Save the file to the public/uploads directory
  fs.writeFileSync(filePath, buffer);

  // Return the file path relative to the public directory
  return `/images/${filename}`;
}

