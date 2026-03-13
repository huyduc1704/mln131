"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import styles from "./GovernmentStructure.module.css";

type OrgId = "qh" | "cp" | "ta";

interface OrgInfo {
  id: OrgId;
  title: string;
  subtitle: string;
  color: string;
  details: string[];
}

const orgData: Record<OrgId, OrgInfo> = {
  qh: {
    id: "qh",
    title: "Quốc Hội",
    subtitle: "Cơ quan lập pháp",
    color: "#ffffff",
    details: [
      "Ban hành Hiến pháp và luật",
      "Quyết định các vấn đề quan trọng của đất nước",
      "Giám sát tối cao đối với toàn bộ hoạt động của Nhà nước"
    ]
  },
  cp: {
    id: "cp",
    title: "Chính Phủ",
    subtitle: "Cơ quan hành pháp",
    color: "#ffffff",
    details: [
      "Tổ chức thi hành Hiến pháp, luật, nghị quyết của Quốc hội",
      "Quản lý, điều hành các lĩnh vực kinh tế, văn hóa, xã hội",
      "Bảo đảm an ninh, quốc phòng và trật tự an toàn xã hội"
    ]
  },
  ta: {
    id: "ta",
    title: "Tòa Án",
    subtitle: "Cơ quan tư pháp",
    color: "#ffffff",
    details: [
      "Xét xử các vụ án hình sự, dân sự, hành chính",
      "Bảo vệ công lý, bảo vệ quyền con người",
      "Bảo vệ chế độ xã hội chủ nghĩa và lợi ích của Nhà nước"
    ]
  }
};

export default function GovernmentStructure() {
  const [activeOrg, setActiveOrg] = useState<OrgId | null>(null);

  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        
        <div className={styles.header}>
          <h2>Sơ Đồ Bộ Máy Nhà Nước</h2>
          <p>Nhấp vào từng cơ quan để xem chi tiết chức năng, nhiệm vụ</p>
        </div>

        <div className={styles.zoomContainer}>
          {/* Top Node */}
          <div className={styles.topNode}>
            Nhà Nước CHXHCN Việt Nam
          </div>

          {/* SVG Connection lines */}
          <svg className={styles.lines} preserveAspectRatio="none" viewBox="0 0 1000 100">
             <path d="M500,0 L500,30" stroke="rgba(255,255,255,0.2)" strokeWidth="4" fill="none" />
             <path d="M200,30 L800,30" stroke="rgba(255,255,255,0.2)" strokeWidth="4" fill="none" />
             <path d="M200,30 L200,80" stroke="rgba(255,255,255,0.2)" strokeWidth="4" fill="none" />
             <path d="M500,30 L500,80" stroke="rgba(255,255,255,0.2)" strokeWidth="4" fill="none" />
             <path d="M800,30 L800,80" stroke="rgba(255,255,255,0.2)" strokeWidth="4" fill="none" />
          </svg>

          {/* Branches */}
          <div className={styles.branches}>
            {(Object.keys(orgData) as OrgId[]).map((key) => {
              const org = orgData[key];
              return (
                <div key={org.id} className={styles.branchWrapper}>
                  <motion.div 
                    className={styles.node}
                    whileHover={{ scale: 1.05, boxShadow: `0 10px 30px rgba(255,255,255,0.05)` }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveOrg(org.id)}
                    layoutId={`card-${org.id}`}
                  >
                    <motion.h3 layoutId={`title-${org.id}`}>
                      {org.title}
                    </motion.h3>
                    <motion.p layoutId={`subtitle-${org.id}`}>
                      {org.subtitle}
                    </motion.p>
                    <div className={styles.clickHint}>Nhấp để xem</div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal / Expanded View */}
        <AnimatePresence>
          {activeOrg && (
            <div className={styles.modalOverlay} onClick={() => setActiveOrg(null)}>
              <div className={styles.modalContainer}>
                <motion.div 
                  className={styles.modalContent}
                  layoutId={`card-${activeOrg}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button className={styles.closeBtn} onClick={() => setActiveOrg(null)}>
                    <X size={24} />
                  </button>
                  
                  <motion.h3 
                    layoutId={`title-${activeOrg}`}
                    className={styles.modalTitle}
                  >
                    {orgData[activeOrg].title}
                  </motion.h3>
                  
                  <motion.p layoutId={`subtitle-${activeOrg}`} className={styles.modalSubtitle}>
                    {orgData[activeOrg].subtitle}
                  </motion.p>
                  
                  <motion.div 
                    className={styles.modalDetails}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h4>Chức năng & Nhiệm vụ chính:</h4>
                    <ul>
                      {orgData[activeOrg].details.map((detail, idx) => (
                        <motion.li 
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + idx * 0.1 }}
                        >
                          {detail}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
