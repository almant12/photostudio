import { NextRequest, NextResponse } from 'next/server';

export async function POST() {
    try {
        const response = NextResponse.json({ message: 'success' }, { status: 200 });

        response.cookies.set('Authorization', '');

        return response;
    } catch (error) {
        return NextResponse.json({ message: 'error' }, { status: 500 });
    }
}
