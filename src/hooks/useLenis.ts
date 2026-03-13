"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function useLenis() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const lenis = new Lenis({
      lerp: 0.1
    });
    
    (window as any).lenis = lenis;
    lenis.stop(); // Initally stopped for Hero section

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0, 0);
    
    return () => {
      lenis.destroy();
      delete (window as any).lenis;
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);
}
