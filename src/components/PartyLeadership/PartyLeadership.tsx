"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./PartyLeadership.module.css";

export default function PartyLeadership() {
  const containerRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 50%",
          end: "bottom 80%",
          scrub: 1, // Smooth scrub for line drawing
        },
      });

      // Show party text
      tl.from(".pl-party", { opacity: 0, y: 30, duration: 2 })
      // Draw connecting line
      .to(".pl-line", { height: "100%", duration: 4, ease: "none" })
      // Show state text
      .from(".pl-state", { opacity: 0, y: -30, duration: 2 }, "-=1")
      // Show explanation
      .from(".pl-desc", { opacity: 0, filter: "blur(10px)", duration: 3 });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} ref={containerRef}>
      <h2 className={styles.title}>Sự Lãnh Đạo Của Đảng</h2>
      
      <div className={styles.diagram}>
        
        <h3 className={`${styles.nodeText} ${styles.partyText} pl-party`}>
          Đảng Cộng sản Việt Nam
        </h3>

        <div className={styles.connectorArea}>
          <div className={styles.verticalLineContainer}>
             <div className={`${styles.drawVertical} pl-line`}></div>
          </div>
        </div>

        <h3 className={`${styles.nodeText} ${styles.stateText} pl-state`}>
          Nhà nước
        </h3>

        <p className={`${styles.description} pl-desc`}>
          Đảng lãnh đạo Nhà nước thông qua đường lối, chủ trương và định hướng chính sách.
        </p>

      </div>
    </section>
  );
}
