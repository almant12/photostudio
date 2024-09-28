'use server'
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function authUser() {
    // Get the cookies
    const cookieStore = cookies();
    const token = cookieStore.get('Authorization'); // Retrieve the token from cookies

    // If no token is found, return invalid
    if (!token) {
        return { valid: false, user: null };
    }

    try {
        // Convert to Uint8Array
        const secretKey = new TextEncoder().encode(JWT_SECRET);

        // Verify and decode the JWT
        const { payload } = await jwtVerify(token.value, secretKey); // Use token.value

        // Return decoded payload
        return { valid: true, user: payload };
    } catch (error) {
        console.error('Error verifying JWT:', error);
        return { valid: false, user: null };
    }
}
