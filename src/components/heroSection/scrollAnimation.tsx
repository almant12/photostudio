// animations/scrollAnimation.ts
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const scrollAnimation = () => {
  // Animo secilën pjesë të përmbajtjes që vjen nga poshtë-lart
  gsap.utils.toArray('.content-to-animate').forEach((element: any) => {
    gsap.fromTo(element, 
      {
        opacity: 0,
        y: 100, // Fillo nga poshtë
      },
      {
        opacity: 1,
        y: 0, // Përfundo në pozicionin e saj normal
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%", // Kur elementi është 80% në fushëpamje
          end: "bottom 60%", // Përfundimi kur të dalë nga ekrani
          toggleActions: "play none none none", // Luaj vetëm kur hyn në fushëpamje
          markers: false, // Vendos `true` për të parë shënuesit
        }
      }
    );
  });
};
