"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./VideoShowcase.module.css";

export default function VideoShowcase() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current || !wrapperRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1, // Smooth scrub
          markers: false,
          refreshPriority: 2, // Fine-tune priority
        },
      });

      // 1. Scale Up Video + Sharp Corners
      tl.to(wrapperRef.current, {
        width: "100%",
        height: "100vh",
        aspectRatio: "auto",
        borderRadius: 0,
        scale: 1,
        ease: "none",
      })
      // 2. Reveal Text
      .to(`.${styles.title}`, {
        opacity: 1,
        y: 0,
        duration: 0.5,
      }, "-=0.2")
      .to(`.${styles.subtitle}`, {
        opacity: 1,
        duration: 0.5,
      }, "-=0.3");

      // Auto-play management on scroll
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 80%",
        onEnter: () => videoRef.current?.play(),
        onLeaveBack: () => videoRef.current?.pause(),
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} ref={containerRef}>
      <div className={styles.stickyContainer}>
        <div className={styles.videoWrapper} ref={wrapperRef}>
          <video
            ref={videoRef}
            className={styles.video}
            muted
            loop
            playsInline
            src="/cutri_video/MLN131.mp4"
          />
          <div className={styles.overlay}>
            <h2 className={styles.title}>Hành Trình Pháp Quyền</h2>
            <p className={styles.subtitle}>
              Kiến tạo tương lai dựa trên nền tảng của Hiến pháp và Pháp luật Việt Nam.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
