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
      await jwtVerify(token, secretKey);
      
      // If verification succeeds, return true
      return true;
  } catch (error) {
      console.error('Error verifying token:', error);
      // If verification fails, return false
      return false;
  }
};