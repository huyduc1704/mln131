"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Countdown from "../Countdown/Countdown";
import styles from "./PartyLeadership.module.css";

export default function PartyLeadership() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!textRef.current || !containerRef.current) return;

    // Small delay to ensure styles are applied before splitting
    const timer = setTimeout(() => {
      const split = new SplitType(textRef.current!, {
        types: "lines",
        tagName: "span"
      });

      if (split.lines) {
        gsap.from(split.lines, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play reverse play reverse",
          },
          rotationX: -100,
          transformOrigin: "50% 50% -160px",
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.2
        });
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section className={styles.section} ref={containerRef} id="party-leadership">
      <div className={styles.container}>
        <Countdown />
        <div className={styles.text} ref={textRef}>
          CHÀO MỪNG NGÀY BẦU CỬ ĐẠI BIỂU QUỐC HỘI KHÓA XVI & ĐẠI BIỂU HỘI ĐỒNG NHÂN DÂN CÁC CẤP NHIỆM KỲ 2026-2031
        </div>
      </div>
    </section>
  );
}
