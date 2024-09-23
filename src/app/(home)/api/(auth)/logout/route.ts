// src/app/api/logout/route.ts

import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req:NextRequest) {
    const response = NextResponse.redirect(new URL('/home',req.url));

    // Delete the cookie 'Authorization'
    response.cookies.delete('Authorization');

    return response;
}