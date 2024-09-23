"use client";

import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import ImageModal from './ImageModal';

const Grid: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const imageUrls = [
    "https://madebydesignesia.com/themes/photix/images/album/5.jpg",
    "https://madebydesignesia.com/themes/photix/images/album/6.jpg",
    "https://madebydesignesia.com/themes/photix/images/album/1.jpg",
    "https://madebydesignesia.com/themes/photix/images/album/2.jpg",
    "https://madebydesignesia.com/themes/photix/images/album/3.jpg",
    "https://madebydesignesia.com/themes/photix/images/album/3.jpg",
  ];

  const imageCaptions = [
    "Beautiful Sunset",
    "Mountain Range",
    "Calm Beach",
    "Lush Forest",
    "City Lights",
    "Desert Dunes",
    "Crystal Clear Lake",
    "Misty Morning",
    "Starry Night"
  ];

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length);
  };

  useEffect(() => {
    imageUrls.forEach((_, index) => {
      gsap.fromTo(
        `.text-overlay-${index}`,
        { y: '100%', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power1.inOut',
          paused: true,
        }
      );
    });
  }, [imageUrls]);

  const handleMouseEnter = (index: number) => {
    gsap.to(`.text-overlay-${index}`, { y: 0, opacity: 1, duration: 0.5 });
  };

  const handleMouseLeave = (index: number) => {
    gsap.to(`.text-overlay-${index}`, { y: '100%', opacity: 0, duration: 0.5 });
  };

  return (
    <div>
      <div className="bg-black grid md:grid-cols-3 grid-cols-1 w-full gap-4 pb-16">
        {imageUrls.map((url, index) => (
          <div
            className="relative px-[6%] py-[4%] grid-item overflow-hidden"
            key={index}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            <img
              src={url}
              className="shadow-lg rounded-md transition-transform duration-300 hover:scale-105 cursor-pointer"
              alt={`picsum ${index + 1}`}
              onClick={() => openModal(index)}
            />
            <div
              className={`absolute inset-0 flex items-center justify-center text-overlay-${index} text-white text-2xl opacity-0 pointer-events-none`}
            >
              {imageCaptions[index]}
            </div>
          </div>
        ))}
      </div>

      <ImageModal
        isOpen={isModalOpen}
        imageUrl={imageUrls[currentImageIndex]}
        onClose={closeModal}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </div>
  );
};

export default Grid;
