"use client";

import styles from "./Kahoot.module.css";
import { Play } from "lucide-react";

export default function Kahoot() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.kahootLogo}>Kahoot!</div>
        <h2 className={styles.title}>Tổng Kết Kiến Thức</h2>
        <p className={styles.description}>
          Cùng tham gia trò chơi Kahoot để kiểm tra lại những kiến thức bạn vừa tìm hiểu về Nhà nước hệ thống pháp quyền XHCN Việt Nam!
        </p>
        
        <a 
          href="https://kahoot.it/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={styles.button}
        >
          <Play size={20} fill="currentColor" />
          Join Kahoot
        </a>
      </div>
    </section>
  );
}
