"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ChevronDown } from "lucide-react";
import styles from "./Hero.module.css";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const svgPathRef = useRef<SVGPathElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleExploreClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    // Unlock scrolling
    document.body.style.overflow = "auto";
    if ((window as any).lenis) (window as any).lenis.start();

    const path = svgPathRef.current;
    if (!path) return;

    const start = "M 0 100 V 100 Q 50 100 100 100 V 100 z";
    const midCover = "M 0 100 V 50 Q 50 0 100 50 V 100 z";
    const endCover = "M 0 100 V 0 Q 50 0 100 0 V 100 z";

    const startReveal = "M 0 0 V 100 Q 50 100 100 100 V 0 z";
    const midReveal = "M 0 0 V 50 Q 50 0 100 50 V 0 z";
    const endReveal = "M 0 0 V 0 Q 50 0 100 0 V 0 z";

    const tl = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false);
      }
    });

    const svgOverlay = path.closest('svg');
    if (svgOverlay) svgOverlay.style.pointerEvents = 'auto';

    tl.set(path, { attr: { d: start } })
      .to(path, { attr: { d: midCover }, ease: "power2.in", duration: 0.4 })
      .to(path, { attr: { d: endCover }, ease: "power2.out", duration: 0.4 })
      .call(() => {
        const intro = document.getElementById("introduction");
        if (intro) {
          window.scrollTo({
            top: intro.offsetTop,
            behavior: "instant" as ScrollBehavior
          });
        }
      })
      .set(path, { attr: { d: startReveal } })
      .to(path, { attr: { d: midReveal }, ease: "power2.in", duration: 0.4 }, "+=0.1")
      .to(path, { attr: { d: endReveal }, ease: "power2.out", duration: 0.4 })
      .call(() => {
        if (svgOverlay) svgOverlay.style.pointerEvents = 'none';
      });
  };

  useEffect(() => {
    if (!containerRef.current) return;

    // Lock scroll explicitly when Hero mounts
    document.body.style.overflow = "hidden";
    if ((window as any).lenis) (window as any).lenis.stop();

    const ctx = gsap.context(() => {
      // Background gradient animation
      gsap.to(".bgGradient", {
        backgroundPosition: "200% center",
        duration: 20,
        ease: "none",
        repeat: -1,
        yoyo: true
      });

      // Text entry orchestration
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(".title-word", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        delay: 0.3
      })
        .from(".hero-subtitle", {
          y: 30,
          opacity: 0,
          filter: "blur(10px)",
          duration: 1.5
        }, "-=0.8")
        .from(".scroll-indicator", {
          opacity: 0,
          y: -20,
          duration: 1,
        }, "-=1")
        .to(".scroll-indicator", {
          y: 10,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
    }, containerRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = "auto"; // Cleanup
    };
  }, []);

  return (
    <section className={styles.hero} ref={containerRef}>
      <div className={`${styles.bgGradient} bgGradient`} />

      <div className={styles.content}>
        <h1 className={styles.title}>
          <span className="title-word">Mô hình</span> <br />
          <span className="title-word">Nhà nước Pháp quyền</span> <br />
          <span className="title-word gradient-text">XHCN Việt Nam</span>
        </h1>

        <p className={`${styles.subtitle} hero-subtitle`}>
          Quyền lực nhà nước là thống nhất, có sự phân công,<br />
          phối hợp và kiểm soát giữa lập pháp, hành pháp và tư pháp.
        </p>
      </div>

      <div
        className={`${styles.scrollIndicator} scroll-indicator`}
        onClick={handleExploreClick}
        style={{ cursor: "pointer", pointerEvents: "auto" }}
      >
        <span>KHÁM PHÁ</span>
        <ChevronDown size={24} />
      </div>

      <div className={styles.transitionWrapper}>
        <svg
          className={styles.transitionSvg}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="swipeGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
               <stop offset="0% " stopColor="#0a0a0a" />
               <stop offset="50%" stopColor="#ff3b30" />
               <stop offset="100%" stopColor="#0a0a0a" />
            </linearGradient>
          </defs>
          <path
            ref={svgPathRef}
            fill="url(#swipeGrad)"
            d="M 0 100 V 100 Q 50 100 100 100 V 100 z"
          />
        </svg>
      </div>
    </section>
  );
}
