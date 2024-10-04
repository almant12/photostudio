import { PrismaClient } from '@prisma/client';
import { authUser } from 'lib/authUser'; // Ensure this path is correct
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

// GET request to fetch notifications
export async function GET() {
    const { valid, user } = await authUser();

    // Check if the user is authenticated
    if (!valid || !user) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const authenticatedUser : any = user;

    // Fetch notifications for the authenticated user
    const notifications = await prisma.notification.findMany({
        where: { receiverId: parseInt(authenticatedUser.id) },
        include: {
            sender: true, // Include sender details
        }
    });

    return NextResponse.json(notifications);
}

// UPDATE request to mark notifications as seen
export async function PUT() {
    const { valid, user } = await authUser();

    // Check if the user is authenticated
    if (!valid || !user) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const authenticatedUser:any = user;

    try {
        const updatedNotifications = await prisma.notification.updateMany({
            where: { 
                receiverId: parseInt(authenticatedUser.id), 
                seen: false // Only update unseen notifications
            },
            data: { seen: true },
        });

        return NextResponse.json({ message: 'Notifications updated successfully.', updated: updatedNotifications.count }, { status: 200 });
    } catch (error:any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
