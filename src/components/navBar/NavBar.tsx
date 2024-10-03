'use client' 

import React, { useState, useEffect } from 'react'; 
import Link from 'next/link';
import { authUser } from 'lib/authUser';
import { useRouter } from "next/navigation";
import NotificationButton from 'components/buttons/NotificationButton';


const NavBar = () => {
  
  const [notifications,setNotification] = useState([]);
  const [showNav, setShowNav] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [userAuth,setUserAuth] = useState(null);

  const route = useRouter();

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

  const logout = async()=>{
    const response = await fetch('/api/logout',{
      method:'POST'
    });
    if(response.ok){
      window.location.href = '/login';
    }
  }

  // Check the role of the authenticated user
  const checkUser = async () => {
    const user = (await authUser()).user;
    if (user) {
      setUserAuth(user); // Store userAuth in state
    }
  };

  useEffect(()=>{
    fetchNotification()
  checkUser();
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
            href="/"
            className="uppercase font-semibold text-base text-white px-5 py-1 text-xl rounded-2xl hover:bg-green-600 transition duration-500 ease-in-out"
          >
            Home
          </Link>

          <a
            href="/album"
            className="uppercase font-semibold text-base text-white px-5 py-1 text-xl rounded-2xl hover:bg-green-600 transition duration-500 ease-in-out"
          >
            Albums
          </a>

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
          
  {/* User is logged in */}
  {userAuth ? (
    <>
    <Link
      href="/admin/dashboard"
      className="bg-indigo-600 uppercase font-semibold text-base text-white px-5 py-1 text-xl rounded-2xl border-none hover:bg-indigo-700 transition duration-500 ease-in-out"
    >
      Dashboard
    </Link>
      <NotificationButton notifications={notifications}
      userId={userAuth.id} 
      />
      <b
        onClick={logout}
        className="bg-indigo-600 uppercase font-semibold text-base text-white px-5 py-1 text-xl rounded-2xl border-none hover:bg-indigo-700 transition duration-500 ease-in-out"
      >
        Logout
      </b>
    </>
  ) : (
    // No user is logged in (show Sign In and Login links)
    <>
      <a
        href="/signUp"
        className="bg-indigo-600 uppercase font-semibold text-base text-white px-5 py-1 text-xl rounded-2xl border-none hover:bg-indigo-700 transition duration-500 ease-in-out"
      >
        Sign In
      </a>
      <a
        href="/login"
        className="bg-indigo-600 uppercase font-semibold text-base text-white px-5 py-1 text-xl rounded-2xl border-none hover:bg-indigo-700 transition duration-500 ease-in-out"
      >
        Login
      </a>
    </>
  )}
</div>

      </nav>
    </header>
  );
};

export default NavBar;
