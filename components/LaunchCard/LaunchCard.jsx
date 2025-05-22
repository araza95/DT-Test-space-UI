import React from "react";
import styles from "./styles.module.css";
import Image from "next/image";

export const LaunchCard = ({ launch }) => {
  const status = launch.success ? "success" : "failure";

  const formatDate = (date) => {
    return date.slice(0, 10).split("-").reverse().join("-");
  };

  return (
    <article className={styles.card}>
      <Image
        src={launch.links.patch.small}
        alt="Rocket Patch"
        width={200}
        height={200}
        className={styles.image}
      />
      <h2>{launch.name}</h2>
      <div className={styles.content}>
        <p>Date: {formatDate(launch.date_utc)}</p>
        <p>Status: {status}</p>
        <p>{launch.details}</p>
        {!launch.success && <p>Failure Reason: {launch.failures[0].reason}</p>}
      </div>
    </article>
  );
};
