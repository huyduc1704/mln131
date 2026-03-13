"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FileText, Users, Scale, ArrowRight } from "lucide-react";
import styles from "./PowerDivision.module.css";

const powers = [
  {
    title: "Lập pháp",
    icon: <FileText size={40} className={styles.icon} />,
    color: "#ff3b30",
    desc: "Đề ra luật và Hiến pháp"
  },
  {
    title: "Hành pháp",
    icon: <Users size={40} className={styles.icon} />,
    color: "#0a84ff",
    desc: "Thực thi pháp luật"
  },
  {
    title: "Tư pháp",
    icon: <Scale size={40} className={styles.icon} />,
    color: "#ff9f0a",
    desc: "Bảo vệ công lý"
  }
];

export default function PowerDivision() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom 80%",
          scrub: 1,
        }
      });

      tl.from(".flow-node", {
        opacity: 0,
        x: -50,
        stagger: 0.3,
        duration: 1,
        ease: "power2.out"
      })
      .from(".flow-arrow", {
        opacity: 0,
        scaleX: 0,
        transformOrigin: "left center",
        stagger: 0.3,
        duration: 1
      }, "-=0.8");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} ref={containerRef}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Phân Công Quyền Lực</h2>
          <p>Sự phối hợp chặt chẽ, nhịp nhàng theo nguyên tắc thống nhất quyền lực</p>
        </div>
        
        <div className={styles.horizontalFlow}>
          {powers.map((p, i) => (
            <div key={i} className={styles.flowItem}>
              <div className={`${styles.node} flow-node`} style={{ '--accent': p.color } as React.CSSProperties}>
                <div className={styles.iconWrapper}>{p.icon}</div>
                <div className={styles.content}>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                </div>
              </div>
              
              {i < powers.length - 1 && (
                <div className={`${styles.arrow} flow-arrow`}>
                  <ArrowRight size={32} />
                  <span className={styles.arrowText}>Kiểm soát & Phối hợp</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
