// components/HeroSection.tsx
"use client"; 

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Background from '../image/background1.jpg';
import { scrollAnimation } from "../heroSection/scrollAnimation"; // Importo animacionin
import { authUser } from "lib/authUser";

const HeroSection = () => {

  const [users,setUser] = useState([]);
  const [userAuth, setUserAuth] = useState<{ valid: boolean; user: any } | null>(null);
  const [subscribeUsers,setSubscribeUser] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUser(data.users);

    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    const authenticateUser = async () => {
      const authResult = await authUser();
      setUserAuth(authResult);

      if (authResult?.valid) {
        try {
          const response = await fetch('/api/subscribe', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
          });
          if (!response.ok) {
            throw new Error("Failed to fetch subscribed users");
          }
          const data = await response.json();
          setSubscribeUser(data.users); // Update state with fetched subscribed users
        } catch (error) {
          console.error("Error fetching subscriptions:", error);
        }
      }
    };
    authenticateUser();
    fetchUsers();
  }, []);

  useEffect(() => {
    scrollAnimation(); // Thirr funksionin e animacionit kur komponenti montohet
  }, []);

  return (
    <div className="bg-cover bg-center text-center backdrop-opacity-10 backdrop-invert bg-white/30 opacity-80 linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)" 
  style={{ backgroundImage: `url(${Background.src})` }}>
  {/* Change h-screen to min-h-[80vh] or remove it */}
  <div className="flex justify-start items-center min-h-[80vh] left-10">
    <div className="text-center ml-10">
      <h1 className="text-4xl font-bold text-white content-to-animate">
        Photography is the art of capturing moments <br /> that tell stories without words.
      </h1>
      <p className="text-lg text-white max-w-2xl mt-8 content-to-animate">
        Through the lens, we preserve the beauty of fleeting moments and transform them into timeless
        memories. Each photograph is a window into a unique world, capturing the essence of our experiences
        and emotions. Explore our gallery and discover the stories behind every shot.
      </p>
      <Link href="/admin/post/create" className="bg-green-600 text-white text-center uppercase font-semibold px-4 py-2 rounded-md inline-block hover:scale-105 mt-10 content-to-animate">
        Upload Here
      </Link>
    </div>
  </div>

  <section className="bg-darkGray py-16 bg-gray-100 content-to-animate">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12 content-to-animate">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-black">Our Top Photographers</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Our team consists of some of the most talented and renowned photographers in the industry.
          Each of them brings a unique and creative perspective, capturing the most beautiful and special moments.
          Explore some of their best work and discover the passion and creativity behind every photograph.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  {users.map((user) => (
    <div key={user.id} className="flex flex-col items-center content-to-animate">
      <Image 
        src={user.avatar ? user.avatar : '/defaultUser.jpeg'} 
        alt={`Photo of ${user.name}`} 
        width={300} 
        height={200} 
        className="rounded-lg shadow-lg mb-4" 
      />
      <Link href={`/gallery/${user.id}`} className="text-center text-lg text-black font-semibold">
        {user.name}
      </Link>
      {/* Subscribe button for each user */}
      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-500 transition">
        Subscribe
      </button>
    </div>
  ))}
</div>

    </div>
  </section>
</div>
  );
}

export default HeroSection;
