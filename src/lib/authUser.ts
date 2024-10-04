'use server'
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { JWTPayload } from 'type/type';

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function authUser(): Promise<{ valid: boolean; user: JWTPayload | null }> {
    const cookieStore = cookies();
    const token = cookieStore.get('Authorization');

    if (!token) {
        return { valid: false, user: null };
    }

    try {
        const secretKey = new TextEncoder().encode(JWT_SECRET);
        const { payload } = await jwtVerify(token.value, secretKey);

        const payloadUser : JWTPayload = {
            id:payload.id as string,
            name:payload.name as string,
            role:payload.role as string,
            exp:payload.exp
        }

            return { valid: true, user: payloadUser }; // Safe assertion here
    } catch (error) {
        cookieStore.delete('Authorization');
        console.error('Error verifying JWT:', error instanceof Error ? error.message : error);
        return { valid: false, user: null };
    }
}
