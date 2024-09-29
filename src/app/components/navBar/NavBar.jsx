'use client' 

import React, { useState, useEffect } from 'react'; 
import Link from 'next/link';
import { authUser } from 'lib/authUser';
import { Role } from '@prisma/client';
import Pusher from 'pusher-js'


const NavBar = () => {
  const [isOpen,setIsOpen] = useState(false)
  const [notifications,setNotification] = useState([]);
  const [showNav, setShowNav] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isPhotographLoggedIn,setIsPhotographLoggedIn] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);


  useEffect(()=>{
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    });
    const channel = pusher.subscribe('user-4');
    channel.bind('new-post',(data)=>{
      console.log(data)
    })

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  },[])
  

  // Funksioni për të kontrolluar scroll-in
  const handleScroll = () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > lastScrollTop && currentScroll > 50) {
      setShowNav(false); 
    } else {
      setShowNav(true);
    } 
    setLastScrollTop(currentScroll <= 0 ? 0 : currentScroll);
  };

  //fetch notification
  const fetchNotification = async () => {
    try {
      const response = await fetch('/api/notification', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        const data = await response.json();
        setNotification(data);
      } else {
        const errorData = await response.json();
        if (response.status === 401) {
          console.error('Unauthorized:', errorData.message);
        } else {
          console.error('Error:', errorData.message); 
        }
      }
    } catch (error) {
      console.error('Fetch error:', error); 
    }
  };

  //check the role of the user
  const checkUser = async()=>{
    const userAuth =  (await authUser()).user;
    if(userAuth?.role === Role.ADMIN){
      setIsAdminLoggedIn(true)
    }else if(userAuth?.role === Role.PHOTOGRAPH){
      setIsPhotographLoggedIn(true)
    }else if(userAuth?.role === Role.USER){
      setIsUserLoggedIn(true)
    }
  }

  useEffect(()=>{
    checkUser();
  fetchNotification()
  },[])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollTop]);

  const toggleDropdown = ()=>{
    setIsOpen(!isOpen)
    console.log(notifications)
  }

  return (
    <header className={`fixed left-0 right-0 py-4 z-50 font-mono transition-transform duration-300 ${showNav ? 'translate-y-0' : '-translate-y-full'}`}>
      <h2 className="ml-10 text-white max-w-2xl">
        Photo Vibe
      </h2>

      <nav className="flex justify-between items-center">
        <div className="flex gap-10 mx-auto">
          <Link
            href="/home"
            className="uppercase font-semibold text-base text-white px-5 py-1 text-xl rounded-2xl hover:bg-green-600 transition duration-500 ease-in-out"
          >
            Home
          </Link>

          <Link
            href="/album"
            className="uppercase font-semibold text-base text-white px-5 py-1 text-xl rounded-2xl hover:bg-green-600 transition duration-500 ease-in-out"
          >
            Albums
          </Link>

          <Link
            href="/gallery"
            className="uppercase font-semibold text-base text-white px-5 py-1 text-xl rounded-2xl hover:bg-green-600 transition duration-500 ease-in-out"
          >
            Gallery
          </Link>

          <Link
            href="/about"
            className="uppercase font-semibold text-base text-white px-5 py-1 text-xl rounded-2xl hover:bg-green-600 transition duration-500 ease-in-out"
          >
            About
          </Link>
        </div>

        <div className='flex gap-5 mr-10'>
      {isAdminLoggedIn && (
        <Link
          href="/admin/dashboard"
          className="bg-indigo-600 uppercase font-semibold text-base text-white px-5 py-1 text-xl rounded-2xl border-none hover:bg-indigo-700 transition duration-500 ease-in-out"
        >
          Dashboard
        </Link>
      )}
    <div className="relative inline-block text-left">
    <button type="button" onClick={toggleDropdown} className="bg-indigo-600 uppercase font-semibold text-base text-white px-5 py-1 text-xl rounded-2xl border-none hover:bg-indigo-700 transition duration-500 ease-in-out">
      Notification
    </button>
    {isOpen && (
  <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
    <div className="py-1" role="none">
      {notifications.length === 0 ? (
        <p className="text-base">No Notification</p>
      ) : (
        notifications.map((notification) => {
          // Conditionally render based on the notification status
          return notification.status === 'NEW_POST' ? (
            <Link
              href={'/post/' + notification.postId}
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-0"
              key={notification.id}
            >
              New Post: {notification.postTitle} by {notification.sender.name}
            </Link>
          ) : (
            notification.status === 'SUBSCRIBE' && (
              <p
                className="block px-4 py-2 text-sm text-gray-700"
                role="menuitem"
                tabIndex="-1"
                id="menu-item-1"
                key={notification.id}
              >
                New Subscriber: {notification.subscriberName}
              </p>
            )
          );
        })
      )}
    </div>
  </div>
)}

</div>
      <Link
        href="/signUp"
        className="bg-indigo-600 uppercase font-semibold text-base text-white px-5 py-1 text-xl rounded-2xl border-none hover:bg-indigo-700 transition duration-500 ease-in-out"
      >
        Sign In
      </Link>
      <Link
        href="/login"
        className="bg-indigo-600 uppercase font-semibold text-base text-white px-5 py-1 text-xl rounded-2xl border-none hover:bg-indigo-700 transition duration-500 ease-in-out"
      >
        Login
      </Link>
    </div>
      </nav>
    </header>
  );
};

export default NavBar;
