'use server';

import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET as string;

export const checkAdminStatus = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get('Authorization')?.value;

  if (!token) {
    return false; // No token found in cookies
  }

  try {
    // Convert to Uint8Array
    const secretKey = new TextEncoder().encode(JWT_SECRET);
    
    // Verify the JWT
    const { payload } = await jwtVerify(token, secretKey);
    
    // Check if the user is an admin (assuming 'role' is the field in the payload)
    if (payload.role === 'ADMIN') {
      return true; // User is an admin
    } else {
      return false; // User is not an admin
    }
  } catch (error) {
    console.error('Error verifying token:', error);
    // If verification fails, return false
    return false;
  }
};
