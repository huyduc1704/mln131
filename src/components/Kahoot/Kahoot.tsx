"use client";

import styles from "./Kahoot.module.css";
import { Gamepad2 } from "lucide-react";

export default function Kahoot() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.gimkitLogo}>Gimkit</div>
        <h2 className={styles.title}>Tổng Kết Kiến Thức</h2>
        <p className={styles.description}>
          Cùng tham gia trò chơi Gimkit để kiểm tra lại những kiến thức bạn vừa tìm hiểu về Nhà nước hệ thống pháp quyền XHCN Việt Nam!
        </p>
        
        <a 
          href="https://www.gimkit.com/host?id=69b50f811535a50d2730de9a" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={styles.button}
        >
          <Gamepad2 size={24} />
          Tham Gia Gimkit
        </a>
      </div>
    </section>
  );
}
