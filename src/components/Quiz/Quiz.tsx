"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import styles from "./Quiz.module.css";

const options = [
  { id: "qh", name: "Quốc hội" },
  { id: "cp", name: "Chính phủ" },
  { id: "ta", name: "Tòa án" }
];

export default function Quiz() {
  const [selected, setSelected] = useState<string | null>(null);

  const isCorrect = selected === "qh";

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        <motion.div
          className={styles.glassWindow}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.windowHeader}>
            <div className={styles.dots}>
              <span className={styles.dotRed}></span>
              <span className={styles.dotYellow}></span>
              <span className={styles.dotGreen}></span>
            </div>
            <div className={styles.windowTitle}>Kiểm Tra Kiến Thức</div>
          </div>

          <div className={styles.windowBody}>
            <h2 className={styles.question}>Cơ quan nào nắm quyền ban hành luật?</h2>

            <div className={styles.options}>
              {options.map((opt) => (
                <button
                  key={opt.id}
                  className={`
                    ${styles.option} 
                    ${selected === opt.id ? styles.selected : ''} 
                    ${selected && opt.id === "qh" ? styles.correct : ''}
                    ${selected === opt.id && opt.id !== "qh" ? styles.wrong : ''}
                  `}
                  onClick={() => !selected && setSelected(opt.id)}
                  disabled={selected !== null}
                >
                  <span className={styles.optRing}>
                    {selected === opt.id && isCorrect && <Check size={16} />}
                    {selected === opt.id && !isCorrect && <X size={16} />}
                  </span>
                  {opt.name}
                </button>
              ))}
            </div>

            <AnimatePresence>
              {selected && (
                <motion.div
                  className={styles.feedback}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                  <div className={`${styles.feedbackBox} ${isCorrect ? styles.feedbackSuccess : styles.feedbackError}`}>
                    <h3>{isCorrect ? "Hoàn toàn chính xác!" : "Sai rồi, hãy xem lại!"}</h3>
                    <p>
                      <strong>Quốc hội</strong> là cơ quan quyền lực nhà nước cao nhất, thực hiện quyền lập hiến và quyền lập pháp.
                    </p>
                    <button className={styles.resetBtn} onClick={() => setSelected(null)}>Thử lại</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
