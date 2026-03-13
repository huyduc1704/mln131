"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Introduction.module.css";

export default function Introduction() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current || !textRef.current || !highlightRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "bottom 80%",
          scrub: 1,
          refreshPriority: 5,
        },
      });

      tl.from(".intro-line", {
        opacity: 0,
        y: 40,
        stagger: 0.2,
        duration: 1,
        ease: "power2.out"
      })
        .to(highlightRef.current, {
          color: "#fff",
          textShadow: "0 0 10px rgba(255, 255, 255, 0.9), 0 0 20px rgba(255, 255, 255, 0.6), 0 0 40px rgba(255, 255, 255, 0.3)",
          duration: 0.5
        }, "-=0.2")
        .to(".intro-image", {
          opacity: 0.8,
          scale: 1,
          duration: 1,
        }, "-=0.8");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.introduction} ref={sectionRef} id="introduction">
      <div className={styles.container}>
        <div className={styles.asymmetricGrid}>
          <div className={styles.leftCol}>
            <h2 className="intro-line">Bản Chất</h2>
            <div className={`${styles.imageWrapper} intro-image`}>
              <div className={styles.imagePlaceholder}>
                <span>Ảnh Minh Họa</span>
              </div>
            </div>
          </div>
          <div className={styles.rightCol} ref={textRef}>
            <p className="intro-line">Nhà nước pháp quyền xã hội chủ nghĩa Việt Nam</p>
            <p className="intro-line">là mô hình tổ chức quyền lực nhà nước của nhân dân, do nhân dân và vì nhân dân,</p>
            <p className="intro-line">
              trong đó mọi hoạt động của Nhà nước và xã hội được tổ chức và quản lý <span ref={highlightRef} className={styles.highlight}>bằng Hiến pháp và pháp luật.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
