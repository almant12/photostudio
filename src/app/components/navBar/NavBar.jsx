'use client' 

import React, { useState, useEffect } from 'react'; 
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Importo usePathname për të marrë rrugën aktuale
import { checkAdminStatus } from 'lib/checkAdmin';

const NavBar = () => {
  const [showNav, setShowNav] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const pathname = usePathname(); // Merr rrugën aktuale
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

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

  //here check if the admin is loggin 
  const checkAdmin = async()=>{
    const adminLoggedIn = await checkAdminStatus();
    setIsAdminLoggedIn(adminLoggedIn);
  }

  useEffect(() => {
    checkAdmin()
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollTop]);

  // Lista e rrugëve ku navbar duhet të fshihet
  const hideOnPaths = ['/login', '/signUp']; // Rrugët ku navbar nuk shfaqet
  const shouldHideNav = hideOnPaths.includes(pathname);

  // Nëse jemi në një nga faqet e përcaktuara, mos shfaq navbar
  if (shouldHideNav) {
    return null;
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
     <Link
  href="/signUp"
  className="bg-indigo-600 uppercase font-semibold text-base text-white px-5 py-1 text-xl rounded-2xl border-none hover:bg-indigo-700 transition duration-500 ease-in-out relative"
>
  Notification
  <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
    3
  </span>
</Link>
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
