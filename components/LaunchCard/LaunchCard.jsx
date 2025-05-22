import React from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import fallbackImg from "../../public/Image-not-found.png";
export const LaunchCard = ({ launch }) => {
  const getStatus = () => {
    if (launch.success === null) return "unknown";
    return launch.success ? "success" : "failure";
  };

  const formatDate = (date) => {
    return date.slice(0, 10).split("-").reverse().join("-");
  };

  const getFailureReason = () => {
    if (!launch.success && launch.failures && launch.failures.length > 0) {
      return launch.failures[0].reason;
    }
    return null;
  };

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
        <p>Status: {getStatus()}</p>
        <p>{launch.details || "No details available"}</p>
        {getFailureReason() && <p>Failure Reason: {getFailureReason()}</p>}
      </div>
    </article>
  );
};
