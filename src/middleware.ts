import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";
import * as jose from "jose";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;
    
    // Get the 'Authorization' cookie
    const cookie = cookies().get('Authorization');
    if (!cookie) {
        return NextResponse.redirect(new URL('/login', req.url));
    }
    
    const secret = new TextEncoder().encode(JWT_SECRET);
    const jwt = cookie.value;

    try {
        // Verify the JWT token
        const { payload } = await jose.jwtVerify(jwt, secret, {});

        // Protect admin routes
        if (pathname.startsWith('/admin')) {
            if (payload.role !== 'ADMIN') {
                // Redirect non-admin users trying to access admin routes
                return NextResponse.redirect(new URL('/unauthorized', req.url)); // Redirect to unauthorized page
            }
        }

        // Protect photograph routes
        if (pathname.startsWith('/photograph')) {
            if (payload.role !== 'PHOTOGRAPH') {
                // Redirect non-photograph users trying to access photograph routes
                return NextResponse.redirect(new URL('/unauthorized', req.url)); // Redirect to unauthorized page
            }
        }

        // Allow access for all other roles and paths
        return NextResponse.next();

    } catch (error) {
        console.error('JWT Verification Error:', error);
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

export const config = {
    matcher: [
        '/admin/:path*',        // Protect all /admin routes
        '/photograph/:path*',   // Protect all /photograph routes
    ],
};
