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
      <h2>{launch.name}</h2>
      <div className={styles.content}>
        <p>Date: {formatDate(launch.date_utc)}</p>
        <p>Status: {status}</p>
        <p>{launch.details || "No details available"}</p>
        {hasFailure && <p>Failure Reason: {failureReason}</p>}
      </div>
    </article>
  );
};
