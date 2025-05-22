import React, { useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import fallbackImg from "../../public/Image-not-found.png";
import { formatDate } from "@/utils/dateFormatter";
import { getLaunchStatus } from "@/utils/launchStatus";
import { APP_CONFIG } from "@/lib/config";

export const LaunchCard = ({ launch }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const { status, hasFailure, failureReason } = getLaunchStatus(launch);
  const imageUrl = launch.links.patch.small || fallbackImg;

  return (
    <article 
      className={styles.card}
      role="article"
      aria-labelledby={`launch-title-${launch.id}`}
    >
      <div className={styles.imageContainer}>
        {imageLoading && (
          <div className={styles.imagePlaceholder} role="status">
            <span className="sr-only">Loading launch patch image...</span>
          </div>
        )}
        <Image
          src={imageUrl}
          alt={`${launch.name} mission patch`}
          width={200}
          height={200}
          className={`${styles.image} ${imageLoading ? styles.imageLoading : ''}`}
          onLoadingComplete={() => setImageLoading(false)}
          onError={(e) => {
            e.target.src = fallbackImg;
            setImageLoading(false);
          }}
          priority={false}
        />
      </div>
      
      <h2 id={`launch-title-${launch.id}`} className={styles.title}>
        {launch.name}
      </h2>
      
      <div className={styles.content}>
        <p>
          <span className={styles.label}>Launch Date:</span>
          <time dateTime={launch.date_utc}>
            {formatDate(launch.date_utc)}
          </time>
        </p>
        
        <p>
          <span className={styles.label}>Status:</span>
          <span 
            className={`${styles.status} ${styles[`status-${status.toLowerCase()}`]}`}
            aria-label={`Launch status: ${status}`}
          >
            {status}
          </span>
        </p>
        
        {launch.details && (
          <p className={styles.details}>
            <span className={styles.label}>Details:</span>
            {launch.details}
          </p>
        )}
        
        {hasFailure && (
          <p className={styles.failure}>
            <span className={styles.label}>Failure Reason:</span>
            {failureReason}
          </p>
        )}
      </div>
    </article>
  );
};
