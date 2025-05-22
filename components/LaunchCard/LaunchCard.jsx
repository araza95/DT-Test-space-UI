import React from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import fallbackImg from "../../public/Image-not-found.png";
import { formatDate } from "@/utils/dateFormatter";
import { getLaunchStatus } from "@/utils/launchStatus";

export const LaunchCard = ({ launch }) => {
  const { status, hasFailure, failureReason } = getLaunchStatus(launch);

  return (
    <article className={styles.card}>
      <Image
        src={launch.links.patch.small || fallbackImg}
        alt={`${launch.name} Patch`}
        width={200}
        height={200}
        className={styles.image}
        onError={(e) => {
          e.target.src = fallbackImg;
        }}
      />
      <div className={styles.content}>
        <h2 className={styles.title}>{launch.name}</h2>
        
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Launch Date</span>
            <div>{formatDate(launch.date_utc)}</div>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Status</span>
            <div className={`${styles.status} ${styles[status]}`}>
              {status}
            </div>
          </div>
        </div>

        <p 
          className={styles.details} 
          title={launch.details || "No details available"}
        >
          {launch.details || "No details available"}
          {hasFailure && ` | Failure Reason: ${failureReason}`}
        </p>
      </div>
    </article>
  );
};
