"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./PowerDivision.module.css";

export default function PowerDivision() {
  const containerRef = useRef<HTMLElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        }
      });

      tl.from(".flow-node", {
        opacity: 0,
        y: 20,
        stagger: 0.05,
        duration: 0.6,
        ease: "power2.out"
      })
      .from(".flow-line", {
        opacity: 0,
        scale: 0,
        transformOrigin: "center center",
        duration: 0.4,
        stagger: 0.02
      }, "-=0.4");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} ref={containerRef} id="power-division">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.titleGroup}>
            <h1>SƠ ĐỒ</h1>
            <h2>BỘ MÁY NHÀ NƯỚC</h2>
            <p>THEO HIẾN PHÁP 2013 (SỬA ĐỔI 2025)</p>
          </div>
        </div>

        <div className={styles.diagramWrapper} ref={diagramRef}>
          {/* Level 1: Quốc hội & Hội đồng bầu cử quốc gia */}
          <div className={styles.level1}>
            <div className={`${styles.node} ${styles.qhNode} flow-node`}>Quốc hội</div>
            <div className={styles.hdbcContainer}>
              <div className={`${styles.hHorizontalLine} flow-line`}></div>
              <div className={`${styles.node} flow-node`}>Hội đồng bầu cử<br/>quốc gia</div>
            </div>
          </div>

          {/* Main Vertical Line & Chủ tịch nước */}
          <div className={`${styles.mainVerticalLine} flow-line`}>
            <div className={styles.ctnContainer}>
              <div className={`${styles.node} flow-node`}>Chủ tịch nước</div>
              <div className={`${styles.hHorizontalLine} flow-line`}></div>
            </div>
          </div>

          {/* Branches Level */}
          <div className={styles.branchesLevel}>
            <div className={`${styles.branchesListLine} flow-line`}></div>
            <div className={styles.branchesList}>
              
              {/* Branch 1: Chính phủ */}
              <div className={styles.branch}>
                <div className={`${styles.branchDropLine} flow-line`}></div>
                <div className={`${styles.node} flow-node`}>Chính phủ</div>
                
                <div className={`${styles.verticalLink} flow-line`}></div>
                
                <div className={styles.subTree}>
                  <div className={`${styles.subColumnsLine} flow-line`}></div>
                  <div className={styles.subColumns}>
                    <div className={styles.subCol}>
                      <div className={`${styles.subColDropLine} flow-line`}></div>
                      <div className={`${styles.node} flow-node`}>Bộ, cơ quan<br/>ngang Bộ</div>
                      <div className={`${styles.verticalLink} flow-line`}></div>
                      <div className={`${styles.node} flow-node`}>Sở</div>
                    </div>
                    <div className={styles.subCol}>
                      <div className={`${styles.subColDropLine} flow-line`}></div>
                      <div className={`${styles.node} flow-node`}>UBND<br/>cấp tỉnh</div>
                      <div className={`${styles.verticalLink} flow-line`}></div>
                      <div className={`${styles.node} flow-node`}>UBND<br/>cấp xã</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Branch 2: HĐND */}
              <div className={styles.branch}>
                <div className={`${styles.branchDropLine} flow-line`}></div>
                <div className={`${styles.node} flow-node`}>HĐND<br/>cấp tỉnh</div>
                <div className={`${styles.verticalLink} flow-line`}></div>
                <div className={`${styles.node} flow-node`}>HĐND<br/>cấp xã</div>
              </div>

              {/* Branch 3: TAND */}
              <div className={styles.branch}>
                <div className={`${styles.branchDropLine} flow-line`}></div>
                <div className={`${styles.node} flow-node`}>TAND<br/>tối cao</div>
                <div className={`${styles.verticalLink} flow-line`}></div>
                <div className={`${styles.node} flow-node`}>TAND<br/>cấp tỉnh</div>
                <div className={`${styles.verticalLink} flow-line`}></div>
                <div className={`${styles.node} flow-node`}>TAND<br/>khu vực</div>
              </div>

              {/* Branch 4: VKSND */}
              <div className={styles.branch}>
                <div className={`${styles.branchDropLine} flow-line`}></div>
                <div className={`${styles.node} flow-node`}>VKSND<br/>tối cao</div>
                <div className={`${styles.verticalLink} flow-line`}></div>
                <div className={`${styles.node} flow-node`}>VKSND<br/>cấp tỉnh</div>
                <div className={`${styles.verticalLink} flow-line`}></div>
                <div className={`${styles.node} flow-node`}>VKSND<br/>khu vực</div>
              </div>

              {/* Branch 5: Kiểm toán */}
              <div className={styles.branch}>
                <div className={`${styles.branchDropLine} flow-line`}></div>
                <div className={`${styles.node} flow-node`}>Kiểm toán<br/>Nhà nước</div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
