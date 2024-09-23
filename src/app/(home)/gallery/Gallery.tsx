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

  const fetchUser = async () => {
    const response = await fetch(`/api/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      // If user not found, redirect to 404
      router.push('/404');
      return;
    }

    fetchPosts();
  };

  const fetchPosts = async () => {
    const response = await fetch(`/api/post/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      setPosts(data.post);
    } else {
      setError('Failed to fetch posts');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="pt-28">
      <h1>{userId}</h1>
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
    </div>
  );
};

export default Gallery;
