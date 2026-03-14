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
          start: "top 50%",
          end: "bottom 70%",
          scrub: 1,
          refreshPriority: 5,
        },
      });

      tl.from(".intro-line", {
        opacity: 0,
        y: 10,
        stagger: 0.2,
        duration: 1,
        ease: "power2.out"
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.introduction} ref={sectionRef} id="introduction">
      <div className={styles.container}>
        <div className={styles.asymmetricGrid}>
          <div className={styles.leftCol}>
            <h2 className="intro-line">Bản Chất</h2>
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
