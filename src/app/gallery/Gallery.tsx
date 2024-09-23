'use client';

import React, { useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "@components/footer/Footer";

gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
  useEffect(() => {
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
              start: "top 80%", // fillon kur imazhi është në 80% të viewport-it
              end: "bottom 60%",
              toggleActions: "play none none reverse", // animacioni luhet dhe anulohet kur largohet nga viewport
            },
          }
        );
      }
    });
  }, []);

  return (
    <div className="pt-28"> {/* Hapësirë e sipërme për të kaluar navbar-in */}
      <h2 className="text-center text-3xl font-bold">Gallery</h2> {/* Titulli */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-20">
        <div className="grid gap-4">
          <div>
            <Image className="h-auto max-w-full rounded-lg gallery-img" src="https://madebydesignesia.com/themes/photix/images/album/3.jpg" alt="" width={500} height={300} />
          </div>
          <div>
            <Image className="h-auto max-w-full rounded-lg gallery-img" src="https://madebydesignesia.com/themes/photix/images/gallery/pf%20(1).jpg" alt="" width={500} height={300} />
          </div>
          <div>
            <Image className="h-auto max-w-full rounded-lg gallery-img" src="https://madebydesignesia.com/themes/photix/images/gallery/pf%20(5).jpg" alt="" width={500} height={300} />
          </div>
        </div>
        <div className="grid gap-4">
          <div>
            <Image className="h-auto max-w-full rounded-lg gallery-img" src="https://madebydesignesia.com/themes/photix/images/gallery/pf%20(5).jpg" alt="" width={500} height={300} />
          </div>
          <div>
            <Image className="h-auto max-w-full rounded-lg gallery-img" src="https://madebydesignesia.com/themes/photix/images/gallery/pf%20(2).jpg" alt="" width={500} height={300} />
          </div>
          <div>
            <Image className="h-auto max-w-full rounded-lg gallery-img" src="https://madebydesignesia.com/themes/photix/images/gallery/pf%20(6).jpg" alt="" width={500} height={300} />
          </div>
        </div>
        <div className="grid gap-4">
          <div>
            <Image className="h-auto max-w-full rounded-lg gallery-img" src="https://madebydesignesia.com/themes/photix/images/gallery/pf%20(3).jpg" alt="" width={500} height={300} />
          </div>
          <div>
            <Image className="h-auto max-w-full rounded-lg gallery-img" src="https://madebydesignesia.com/themes/photix/images/album/2.jpg" alt="" width={500} height={300} />
          </div>
          <div>
            <Image className="h-auto max-w-full rounded-lg gallery-img" src="https://madebydesignesia.com/themes/photix/images/album/4.jpg" alt="" width={500} height={300} />
          </div>
        </div>
        <div className="grid gap-4">
          <div>
            <Image className="h-auto max-w-full rounded-lg gallery-img" src="https://madebydesignesia.com/themes/photix/images/album/3.jpg" alt="" width={500} height={300} />
          </div>
          <div>
            <Image className="h-auto max-w-full rounded-lg gallery-img" src="https://madebydesignesia.com/themes/photix/images/gallery/pf%20(2).jpg" alt="" width={500} height={300} />
          </div>
          <div>
            <Image className="h-auto max-w-full rounded-lg gallery-img" src="https://madebydesignesia.com/themes/photix/images/gallery/pf%20(4).jpg" alt="" width={500} height={300} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
