'use client' 

import React, { useState, useEffect } from 'react'; 
import Link from 'next/link';
import { authUser } from 'lib/authUser';
import { Role } from '@prisma/client';
import NotificationButton from '@components/buttons/NotificationButton';


const NavBar = () => {
  
  const [notifications,setNotification] = useState([]);
  const [showNav, setShowNav] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [userAuth,setUserAuth] = useState(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isPhotographLoggedIn,setIsPhotographLoggedIn] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);


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

  // Check the role of the authenticated user
  const checkUser = async () => {
    const user = (await authUser()).user;
    if (user) {
      setUserAuth(user); // Store userAuth in state
      if (user.role === Role.ADMIN) {
        setIsAdminLoggedIn(true);
      } else if (user.role === Role.PHOTOGRAPH) {
        setIsPhotographLoggedIn(true);
      } else if (user.role === Role.USER) {
        setIsUserLoggedIn(true);
      }
    }
  };

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

        <div className="flex gap-5 mr-10">
  {/* Admin is logged in */}
  {isAdminLoggedIn && (
    <Link
      href="/admin/dashboard"
      className="bg-indigo-600 uppercase font-semibold text-base text-white px-5 py-1 text-xl rounded-2xl border-none hover:bg-indigo-700 transition duration-500 ease-in-out"
    >
      Dashboard
    </Link>
  )}

  {/* User is logged in */}
  {userAuth ? (
    <>
      <NotificationButton notifications={notifications} />
      <Link
        href="/logout" // Assuming you have a logout route
        className="bg-indigo-600 uppercase font-semibold text-base text-white px-5 py-1 text-xl rounded-2xl border-none hover:bg-indigo-700 transition duration-500 ease-in-out"
      >
        Logout
      </Link>
    </>
  ) : (
    // No user is logged in (show Sign In and Login links)
    <>
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
    </>
  )}
</div>

      </nav>
    </header>
  );
};

export default NavBar;
