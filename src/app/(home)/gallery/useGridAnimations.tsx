"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useGridAnimations = () => {
  useEffect(() => {
    const items = document.querySelectorAll(".grid-item");

    gsap.fromTo(
      items,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.2,
        scrollTrigger: {
          trigger: items[0],
          start: "top bottom",
          toggleActions: "play none none reset",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
};

export default useGridAnimations;
