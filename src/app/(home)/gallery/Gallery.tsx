'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from 'next/navigation'

gsap.registerPlugin(ScrollTrigger);

const Gallery = ({ userId }) => {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search,setSearch] = useState('');


  const fetchPosts = async () => {
    const response = await fetch(`/api/post/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      setPosts(data.posts);
    } else {
      router.push('/404');
      setError('Failed to fetch posts');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts()
  }, [userId]);

  useEffect(() => {
    if (!loading && posts.length > 0) {
      gsap.utils.toArray(".gallery-img").forEach((img) => {
        if (img instanceof HTMLElement) {
          gsap.fromTo(
            img,
            { y: 100, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: img,
                start: "top 80%",
                end: "bottom 60%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });
    }
  }, [loading, posts]);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  
  return (
    <div className="pt-28">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
        
        <form className="max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="search-type" className="mb-2 text-sm font-medium text-gray-900">Search By:</label>
            <select
              id="search-type"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mb-4 block w-full text-black p-2 border border-gray-300 rounded-lg">
              <option value="title">Title</option>
              <option value="photographer">Photographer</option>
            </select>

            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={`Search by ${search.charAt(0).toUpperCase() + search.slice(1)}...`}
                required
                value={search}
                onChange={(e) => setSearch(e.target.value)} // Update search term on change
              />
              <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
            </div>
          </form>

          <h2 className="text-center text-3xl font-bold">Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-20">
            {filteredPosts.map((post) => (
              <div key={post.id}>
                <Image 
                  className="h-auto max-w-full rounded-lg gallery-img" 
                  src={post.image} 
                  alt={post.title} 
                  width={500} 
                  height={300} 
                />
                <h1 className="text-center">{post.title}</h1>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
  
};

export default Gallery;
