"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Users, Building2, Eye, Gavel } from "lucide-react";
import styles from "./Accountability.module.css";

export default function Accountability() {
  const containerRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!containerRef.current) return;
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          end: "bottom 90%",
          scrub: 1,
        }
      });

      tl.from(".center-node", { scale: 0, opacity: 0, duration: 1, ease: "back.out(1.5)" })
        .from(".side-node", { opacity: 0, y: 50, duration: 1, stagger: 0.3 }, "-=0.5")
        .from(".connector", { strokeDashoffset: 500, opacity: 0, duration: 1.5, stagger: 0.2 }, "-=0.5");

    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} ref={containerRef}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Trách Nhiệm Giải Trình</h2>
          <p>Cơ chế kiểm soát quyền lực nhà nước xoay quanh Nhân dân</p>
        </div>
        
        <div className={styles.diagram}>
          
          <div className={`${styles.node} ${styles.institution} side-node`}>
            <div className={styles.iconWrapper}><Building2 size={32} /></div>
            <h3>Quốc hội & Chính phủ</h3>
            <p className={styles.desc}>
              Quốc hội giám sát tối cao hoạt động của Chính phủ, bảo vệ lợi ích hợp pháp của công dân.
            </p>
          </div>

          <div className={`${styles.node} ${styles.citizens} center-node`}>
            <div className={styles.iconWrapper}><Users size={40} /></div>
            <h3>Nhân Dân</h3>
            <p className={styles.desc}>Trung tâm quyền lực</p>
          </div>

          <div className={`${styles.node} ${styles.justice} side-node`}>
            <div className={styles.iconWrapper}><Gavel size={32} /></div>
            <h3>Khối Tư pháp</h3>
            <p className={styles.desc}>
              Xét xử công khai, minh bạch, chịu sự giám sát của xã hội đối với mọi bản án.
            </p>
          </div>

          {/* Connectors */}
          <svg className={styles.linesSvg} viewBox="0 0 1000 400" preserveAspectRatio="none">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(255, 59, 48, 0.5)" />
                <stop offset="50%" stopColor="rgba(10, 132, 255, 1)" />
                <stop offset="100%" stopColor="rgba(255, 159, 10, 0.5)" />
              </linearGradient>
            </defs>
            <path 
              className="connector" 
              d="M 280,150 C 350,150 380,300 450,300" 
              stroke="url(#lineGradient)" 
              strokeWidth="2" 
              fill="none" 
              strokeDasharray="500" 
              strokeDashoffset="0"
            />
            <path 
              className="connector" 
              d="M 720,150 C 650,150 620,300 550,300" 
              stroke="url(#lineGradient)" 
              strokeWidth="2" 
              fill="none" 
              strokeDasharray="500" 
              strokeDashoffset="0"
            />
          </svg>

        </div>
      </div>
    </section>
  );
}
