import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";
import * as jose from "jose";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;
    const adminRoutes = ['/admin/:path*']; // Only /admin/* routes need protection

    // Check for cookie
    const cookie = cookies().get('Authorization');

    // Validate JWT
    if (!cookie) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    const secret = new TextEncoder().encode(JWT_SECRET);
    const jwt = cookie.value;

    try {
        const { payload } = await jose.jwtVerify(jwt, secret, {});

        // Check if the user is trying to access admin routes
        if (adminRoutes.some(route => pathname.startsWith(route))) {
            if (payload.role !== 'ADMIN') {
                // If the user is not an admin, redirect them
                return NextResponse.redirect(new URL('/unauthorized', req.url)); // Redirect to an unauthorized page
            }
            // Allow access to admin routes
            return NextResponse.next();
        }

        // Logic for other routes (e.g., user routes)
        if (payload.role === 'USER') {
            // Redirect user to client page if accessing admin routes
            return NextResponse.redirect(new URL('/', req.url)); // Replace '/client' with the actual client page path
        }

        // Allow access to other routes for ADMIN or if no role is required
        return NextResponse.next();

    } catch (error) {
        console.error('JWT Verification Error:', error);
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

export const config = {
    matcher: [
        '/api/logout',
        '/api/post',
        '/api/post/update',
        '/api/post/delete',
        '/admin/:path*',
        '/api/user/update',
        '/uploadImages',
    ],
};
