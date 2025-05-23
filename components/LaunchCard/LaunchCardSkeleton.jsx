import React from "react";
import styles from "./styles.module.css";

/* Skeleton Loading Component*/
/* Component used from Nazariy medium blog*/
export const LaunchCardSkeleton = () => {
  return (
    <article className={`${styles.card} ${styles.skeleton}`}>
      <div className={`${styles.image} ${styles.skeletonPulse}`} />
      <div className={styles.content}>
        <div className={`${styles.title} ${styles.skeletonPulse}`} />
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <div className={`${styles.infoLabel} ${styles.skeletonPulse}`} />
            <div className={`${styles.skeletonPulse}`} />
          </div>
          <div className={styles.infoItem}>
            <div className={`${styles.infoLabel} ${styles.skeletonPulse}`} />
            <div className={`${styles.status} ${styles.skeletonPulse}`} />
          </div>
        </div>
        <div className={`${styles.details} ${styles.skeletonPulse}`} />
      </div>
    </article>
  );
};
