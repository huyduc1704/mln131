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

    const ctx = gsap.context((self) => {
      if (!self || !self.selector) return;
      const q = self.selector;

      // 1. Initial State - Hide everything
      // Using autoAlpha for visibility + opacity
      gsap.set(q(".pl-title, .pl-party, .pl-state, .pl-desc"), {
        autoAlpha: 0,
        y: 100,
        filter: "blur(20px)"
      });
      gsap.set(q(".pl-line"), { height: "0%" });
      gsap.set(q(".pl-party"), { scale: 0.5 });

      // 2. Main Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "top 3%", // End much earlier so it's fully visible quickly
          scrub: 1.5,     // Faster response
          markers: false,
          refreshPriority: 1,
        },
      });

      tl.to(q(".pl-title"), {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 2,
        ease: "power2.out"
      })
        .to(q(".pl-party"), {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "back.out(1.7)"
        }, "-=1")
        .to(q(".pl-line"), {
          height: "100%",
          duration: 3,
          ease: "none"
        })
        .to(q(".pl-state"), {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 3,
          ease: "power2.out"
        }, "-=2")
        .to(q(".pl-desc"), {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 4
        });

      // Refresh and sort to ensure pinning from above is accounted for
      setTimeout(() => {
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      }, 1000);

    }, containerRef.current);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section className={styles.section} ref={containerRef} id="party-leadership">
      <h2 className={`${styles.title} pl-title`}>Sự Lãnh Đạo Của Đảng</h2>

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
