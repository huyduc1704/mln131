"use client";

import { useEffect, useState } from "react";
import styles from "./Countdown.module.css";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
  }>({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date("2026-03-15T00:00:00");

    const calculateTime = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const hours = Math.floor((difference / (1000 * 60 * 60)));
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.countdownSection}>
      <div className={styles.container}>
        <div className={styles.label}>ĐẾM NGƯỢC TỚI NGÀY BẦU CỬ</div>
        <div className={styles.timer}>
          <div className={styles.timeBlock}>
            <span className={styles.number}>{String(timeLeft.hours).padStart(2, '0')}</span>
            <span className={styles.unit}>GIỜ</span>
          </div>
          <div className={styles.separator}>:</div>
          <div className={styles.timeBlock}>
            <span className={styles.number}>{String(timeLeft.minutes).padStart(2, '0')}</span>
            <span className={styles.unit}>PHÚT</span>
          </div>
          <div className={styles.separator}>:</div>
          <div className={styles.timeBlock}>
            <span className={styles.number}>{String(timeLeft.seconds).padStart(2, '0')}</span>
            <span className={styles.unit}>GIÂY</span>
          </div>
        </div>
        <div className={styles.dateLabel}>15 THÁNG 03, 2026</div>
      </div>
    </div>
  );
}
