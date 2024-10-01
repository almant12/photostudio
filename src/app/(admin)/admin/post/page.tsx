'use client';
import { useState, useEffect } from "react";
import Image from "next/image";

export default function PostIndex() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/post/auth-post', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      const response = await fetch(`/api/post/delete/${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        // Remove the deleted post from the state
        setPosts(posts.filter(post => post.id !== postId));
      } else {
        console.error('Failed to delete the post');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 text-white border border-gray-200 rounded-3xl shadow-md">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="py-4 px-4 text-left font-semibold">Id</th>
              <th className="py-4 px-4 text-left font-semibold">Image</th>
              <th className="py-4 px-4 text-left font-semibold">Name</th>
              <th className="py-4 px-4 text-left font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b border-gray-300">
                <td className="py-4 px-4">{post.id}</td>
                <td className="py-4 px-4">
                  <Image 
                    src={post.image} 
                    alt={`Photo of ${post.title}`} 
                    width={300} 
                    height={200} 
                    className="rounded-lg shadow-lg mb-4" 
                  />
                </td>
                <td className="py-4 px-4">{post.title}</td>
                <td className="py-4 px-4 flex space-x-2">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
                    Edit
                  </button>
                  <button 
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                    onClick={() => handleDelete(post.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
