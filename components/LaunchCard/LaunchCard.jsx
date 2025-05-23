import React from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import fallbackImg from "../../public/Image-not-found.png";
import { formatDate } from "@/utils/dateFormatter";
import { getLaunchStatus } from "@/utils/launchStatus";

export const LaunchCard = ({ launch }) => {
  if (!launch) {
    return "No launch data available.";
  }

  // Get launch status : success, failure of the launch.
  const { status, hasFailure, failureReason } = getLaunchStatus(launch);

  // Safely access nested properties
  const patchImage = launch?.links?.patch?.small || fallbackImg;
  const launchName = launch?.name || "Unnamed Launch";
  const launchDate = launch?.date_utc
    ? formatDate(launch.date_utc)
    : "Date not available";
  const launchDetails = launch?.details || "No details available";

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={patchImage}
          alt={`${launchName} Mission Patch`}
          fill
          sizes="(max-width: 768px) 150px, 200px"
          priority={false}
          className={styles.image}
          onError={(e) => {
            e.target.src = fallbackImg;
          }}
          loading="lazy"
          quality={75}
        />
      </div>
      <div className={styles.content}>
        <h2 className={styles?.title}>{launchName}</h2>

        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Launch Date</span>
            <div>{launchDate}</div>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Status</span>
            <span
              className={`${styles.status} ${styles[status] || ""}`}
              data-testid="launch-status"
            >
              {status}
            </span>
          </div>
        </div>

        <p className={styles.details} title={launchDetails}>
          {launchDetails}
          {hasFailure && failureReason && ` | Failure Reason: ${failureReason}`}
        </p>
      </div>
    </article>
  );
};
