"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// @ts-ignore
import { Flip } from "gsap/Flip";
import styles from "./BentoGallery.module.css";

const galleryData = [
  { img: "/vietnam_images/Hiến pháp.png", title: "Hiến pháp Việt Nam", desc: "Văn bản pháp lý cao nhất, quy định cách thức tổ chức và hoạt động của bộ máy nhà nước." },
  { img: "/vietnam_images/Đảng.png", title: "Quốc Hội", desc: "Cơ quan đại biểu cao nhất của Nhân dân, thực hiện quyền lập hiến và quyền lập pháp." },
  { img: "/vietnam_images/Chính phủ.png", title: "Chính Phủ", desc: "Cơ quan hành chính nhà nước cao nhất, thực hiện quyền hành pháp, quản lý vĩ mô." },
  { img: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?auto=format&fit=crop&q=80&w=1200", title: "Tòa Án Nhân Dân", desc: "Cơ quan xét xử của nước Cộng hoà xã hội chủ nghĩa Việt Nam, thực hiện quyền tư pháp." },
  { img: "/vietnam_images/Viện kiểm soát.png", title: "Viện Kiểm Sát", desc: "Thực hành quyền công tố và kiểm sát các hoạt động tư pháp, bảo vệ pháp luật." },
  { img: "/vietnam_images/Mở đầu.png", title: "Chủ Tịch Nước", desc: "Người đứng đầu Nhà nước, thay mặt nước Cộng hoà xã hội chủ nghĩa Việt Nam đối nội và đối ngoại." },
  { img: "/vietnam_images/Hình nền.png", title: "Chính Quyền", desc: "Tổ chức thi hành Hiến pháp, pháp luật tại địa phương; quyết định các vấn đề phát triển." },
  { img: "/vietnam_images/Nhân dân.png", title: "Nhân Dân", desc: "Chủ thể tối cao của quyền lực nhà nước. Tất cả quyền lực nhà nước đều thuộc về Nhân dân." }
];

export default function BentoGallery() {
  const containerRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, Flip);

    if (!galleryRef.current || !containerRef.current) return;

    let flipCtx: gsap.Context;

    const createTween = () => {
      const galleryElement = galleryRef.current;
      if (!galleryElement) return;

      const galleryItems = galleryElement.querySelectorAll(`.${styles.galleryItem}`);
      const textItems = galleryElement.querySelectorAll(`.${styles.itemText}`);

      if (flipCtx) flipCtx.revert();
      galleryElement.classList.remove(styles.galleryFinal);

      flipCtx = gsap.context(() => {
        // 1. Temporarily add final class to capture the target state
        galleryElement.classList.add(styles.galleryFinal);
        const flipState = Flip.getState(galleryItems);
        // Remove it immediately so DOM goes back to Bento
        galleryElement.classList.remove(styles.galleryFinal);

        // 3. Create Timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=800%", // 800% scroll distance to cover 8 items
            scrub: 1,
            pin: true,
            refreshPriority: 10,
          }
        });

        // 4. Create Flip tween TO the captured final flex layout
        // We include borderRadius in the flip state if we want, or animate it separately.
        const flip = Flip.to(flipState, {
          absolute: true,
          ease: "power1.inOut",
          duration: 1
        });

        tl.add(flip, 0);

        // Animate border radius to 0
        tl.to(galleryItems, {
          borderRadius: 0,
          duration: 1,
          ease: "power1.inOut"
        }, 0);

        // Animate image opacity to 0.3
        const images = galleryElement.querySelectorAll("img");
        tl.to(images, {
          opacity: 0.3,
          duration: 1,
          ease: "power1.inOut"
        }, 0);

        // Fade in ALL texts right as the flip finishes
        tl.to(textItems, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.inOut"
        }, 0.8);

        // 5. Horizontal panning: scrub through the 8 items
        tl.to(galleryElement, {
          x: () => -(galleryItems.length - 1) * window.innerWidth,
          ease: "none",
          duration: galleryItems.length - 1
        }, 1);

        return () => {
          gsap.set(galleryItems, { clearProps: "all" });
        };
      });
    };

    setTimeout(() => {
      createTween();
    }, 100);

    window.addEventListener("resize", createTween);

    return () => {
      window.removeEventListener("resize", createTween);
      if (flipCtx) flipCtx.revert();
    };
  }, []);

  return (
    <section className={styles.section} ref={containerRef}>
      <div className={styles.galleryWrap}>
        <div className={styles.gallery} ref={galleryRef}>
          {galleryData.map((item, i) => (
            <div key={i} className={styles.galleryItem}>
              <img src={item.img} alt={item.title} />
              <div className={styles.itemText}>
                <h2>{item.title}</h2>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
