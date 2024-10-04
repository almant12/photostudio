import { useState, useEffect } from "react";
import Pusher from 'pusher-js';
import Link from 'next/link';

interface Notification {
    id: number;
    status: 'NEW_POST' | 'SUBSCRIBE';
    postId?: string;
    postTitle?: string;
    userName: string;
    seen: boolean;
}

interface IncomingNotification {
    id: number;
    status: string;
    postId: number;
    postTitle: string;
    seen: boolean;
    sender: { name: string };
}

interface NotificationDropdownProps {
    notifications: IncomingNotification[];
    userId: number;
}

// Function to transform incoming data to match Notification interface
const transformToNotification = (data: IncomingNotification): Notification => {
    return {
        id: data.id,
        status: data.status as 'NEW_POST' | 'SUBSCRIBE',
        postId: data.postId.toString(), // Convert to string
        postTitle: data.postTitle,
        seen: data.seen,
        userName: data.sender.name,
    };
};

const NotificationButton: React.FC<NotificationDropdownProps> = ({ notifications, userId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [notificationList, setNotificationList] = useState<Notification[]>([]);
    const [seenNotifications, setSeenNotification] = useState<number>(0);

    // Update notificationList whenever notifications prop changes
    useEffect(() => {
        const mappedNotifications = notifications.map(notification => ({
            id: notification.id,
            status: notification.status as 'NEW_POST' | 'SUBSCRIBE',
            postId: notification.postId.toString(),
            postTitle: notification.postTitle,
            seen: notification.seen,
            userName: notification.sender.name,
        }));
        setNotificationList(mappedNotifications);
    }, [notifications]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
        if (seenNotifications > 0) {
            unSeenNotifications();
        }
    };

    const unSeenNotifications = async () => {
        const response = await fetch('/api/notification', {
            method: 'PUT',
        });
        if (response.ok) {
            setSeenNotification(0);
        } else {
            console.log(response);
        }
    };

    useEffect(() => {
        const getSeenNotifications = () => {
            const unseen = notificationList.filter(notification => !notification.seen);
            setSeenNotification(unseen.length);
        };
        getSeenNotifications();
    }, [notificationList]);

    useEffect(() => {
        const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
            cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
        });

        const channel = pusher.subscribe(`user-${userId}`);

        // Listen for the 'new-post' event
        channel.bind('new-post', (data: IncomingNotification) => {
            const notification = transformToNotification(data);
            setNotificationList(prev => [notification, ...prev]); // Add new notification to the list
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [userId]);

    return (
        <div className="relative inline-block text-left">
            <button
                type="button"
                onClick={toggleDropdown}
                className="bg-indigo-600 uppercase font-semibold text-base text-white px-5 py-1 text-xl rounded-2xl border-none hover:bg-indigo-700 transition duration-500 ease-in-out"
            >
                Notification
                <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full text-xs px-2 py-1">
                    {seenNotifications}
                </span>
            </button>
            {isOpen && (
                <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1" role="none">
                        {notificationList.length === 0 ? (
                            <p className="text-base text-black">No Notification</p>
                        ) : (
                            notificationList.map(notification => (
                                <Link
                                    href={`/post/${notification.postId}`}
                                    className="block px-4 py-2 text-sm text-gray-700"
                                    role="menuitem"
                                    key={notification.id}
                                >
                                    {notification.status === 'NEW_POST' ? (
                                        <p>New Post: by {notification.userName}</p>
                                    ) : (
                                        <p>New Subscribe: {notification.postTitle} by {notification.userName}</p>
                                    )}
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationButton;
