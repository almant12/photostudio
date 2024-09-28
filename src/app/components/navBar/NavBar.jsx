'use client' 

import React, { useState, useEffect } from 'react'; 
import Link from 'next/link';
import { authUser } from 'lib/authUser';
import { Role } from '@prisma/client';

const NavBar = () => {
  const [isOpen,setIsOpen] = useState(false)
  const [notification,setNotification] = useState([]);
  const [showNav, setShowNav] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);
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

  //check the role of the user
  const checkUser = async()=>{
    const userAuth = (await authUser()).user;
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
    <div classname="relative inline-block text-left">
    <button type="button" onClick={toggleDropdown} classname="bg-indigo-600 uppercase font-semibold text-base text-white px-5 py-1 text-xl rounded-2xl border-none hover:bg-indigo-700 transition duration-500 ease-in-out">
      Notification
    </button>
  {isOpen &&(
    <div classname="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
    <div classname="py-1" role="none">
      <a href="#" classname="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-0">Account settings</a>
      <a href="#" classname="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-1">Support</a>
      <a href="#" classname="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-2">License</a>
      <form method="POST" action="#" role="none">
        <button type="submit" classname="block w-full px-4 py-2 text-left text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-3">Sign out</button>
      </form>
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
