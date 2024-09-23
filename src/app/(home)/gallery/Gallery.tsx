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
  const [error, setError] = useState(null);


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
  
  return (
    <div className="pt-28">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h2 className="text-center text-3xl font-bold">Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-20">
            {posts.map((post) => (
              <div key={post.id}>
                <Image 
                  className="h-auto max-w-full rounded-lg gallery-img" 
                  src={post.image} 
                  alt={post.title} 
                  width={500} 
                  height={300} 
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
  
};

export default Gallery;
