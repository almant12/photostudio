import { useState, useEffect } from "react";
import Pusher from 'pusher-js';
import Link from 'next/link';

interface Notification {
    id: number;
    status: 'NEW_POST' | 'SUBSCRIBE';
    postId?: string; // used only for status;
    postTitle?: string; // used only for post;
    userName: string;
}

interface NotificationDropdownProps {
    notifications: {
        id: number;
        status: string;
        postId: number;
        postTitle:string
        sender: { name: string };
    }[];
}

// Function to transform incoming data to match Notification interface
const transformToNotification = (data: any): Notification => {
    return {
        id: data.id,
        status: 'NEW_POST', // Set the status appropriately; you can change this based on your requirements
        postId: data.postId.toString(), // Convert to string
        postTitle: data.postTitle,
        userName: data.userName,
    };
};

const NotificationButton: React.FC<NotificationDropdownProps> = ({ notifications }) => {

    const mappedNotifications: Notification[] = notifications.map(notification => ({
        id: notification.id,
        status: notification.status as 'NEW_POST' | 'SUBSCRIBE', // casting for simplicity
        postId: notification.postId.toString(),
        postTitle:notification.postTitle,
        userName: notification.sender.name
    }));

    const [isOpen, setIsOpen] = useState(false);
    const [notificationList, setNotificationList] = useState<Notification[]>(mappedNotifications);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
          cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
        });
      
        console.log("Pusher initialized:", pusher); // Log the Pusher instance
      
        const channel = pusher.subscribe('user-7');
      
        // Listen for the 'new-post' event
        channel.bind('new-post', (data: any) => {
            const notification = transformToNotification(data)
          setNotificationList((prev) => [notification, ...prev]); // Add new notification to the list
        });
      
        return () => {
          channel.unbind_all();
          channel.unsubscribe();
        };
      }, []);
      

 

    return (
        <div className="relative inline-block text-left">
            <button
            
                type="button"
                onClick={toggleDropdown}
                className="bg-indigo-600 uppercase font-semibold text-base text-white px-5 py-1 text-xl rounded-2xl border-none hover:bg-indigo-700 transition duration-500 ease-in-out"
            >
                Notification
                <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full text-xs px-2 py-1">
                {notificationList.length}
        </span>
            </button>
            {isOpen && (
                <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1" role="none">
                        {notificationList.length === 0 ? (
                            <p className="text-base text-black">No Notification</p>
                        ) : (
                            notificationList.map((notification) => {
                                // Conditionally render based on the notification status
                                return notification.status === 'NEW_POST' ? (
                                    <Link
                                        href={'/post/' + notification.postId}
                                        className="block px-4 py-2 text-sm text-gray-700"
                                        role="menuitem"
                                        key={notification.id}
                                    >
                                        New Post: by {notification.userName}
                                    </Link>
                                ) : (
                                    notification.status === 'SUBSCRIBE' && (
                                        <Link
                                        href={'/post/' + notification.postId}
                                        className="block px-4 py-2 text-sm text-gray-700"
                                        role="menuitem"
                                        key={notification.id}
                                    >
                                        New Subscribe: {notification.postTitle} by {notification.userName}
                                    </Link>
                                    )
                                );
                            })
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationButton;
