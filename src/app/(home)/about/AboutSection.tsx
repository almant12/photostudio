import React from 'react';



const Background: React.FC = () => {
    return (
      <div
        className="bg-cover bg-center h-screen text-center backdrop-opacity-10 backdrop-invert bg-black opacity-50"
        
      >
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-8">
            <br />  About Us
            </h1>
            <p className="text-lg text-white max-w-2xl mx-auto mb-8">
            Welcome to Photo Vibe, where we celebrate the art of photography through our lens. At Photo Vibe, we believe that every photograph tells a unique story, 
            capturing moments that words alone cannot express. Our passion is to immortalize fleeting moments and transform them into timeless memories.
            </p>
            <a href="/album/Text.tsx" className="bg-green text-white uppercase font-semibold px-4 py-2 rounded-md inline-block hover:scale-105">
              See More
            </a>
          </div>
        </div>
      </div>
    );
  };
  
  export default Background;