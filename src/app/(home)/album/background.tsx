// components/Background.tsx
import React from 'react';
import BackgroundImage from '../album/album.jpg';

const Background: React.FC = () => {
  return (
    <div
      className="bg-cover bg-center h-screen text-center backdrop-opacity-10 backdrop-invert bg-white/30 opacity-80"
      style={{ backgroundImage: `url(${BackgroundImage.src})` }}
    >
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-8">
            Photography is the art of capturing moments <br /> that tell stories without words.
          </h1>
          <p className="text-lg text-white max-w-2xl mx-auto mb-8">
            Through the lens, we preserve the beauty of fleeting moments and transform them into timeless
            memories. Each photograph is a window into a unique world, capturing the essence of our experiences
            and emotions. Explore our gallery and discover the stories behind every shot.
          </p>
          <a href="/album/Text.tsx" className="bg-green-600 text-white uppercase font-semibold px-4 py-2 rounded-md inline-block hover:scale-105">
            See More
          </a>
        </div>
      </div>
    </div>
  );
};

export default Background;
