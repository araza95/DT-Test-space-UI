import { LaunchCard } from "@/components/LaunchCard";
import { LaunchCardSkeleton } from "@/components/LaunchCard/LaunchCardSkeleton";
import styles from "./styles.module.css";

export const LaunchSection = ({ launches, loading, error }) => {
  if (loading) {
    return (
      <section role="card-container" className={styles.section}>
        {Array(12)
          .fill(0)
          .map((_, index) => (
            <LaunchCardSkeleton key={index} />
          ))}
      </section>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>Error: {error}</p>
        {/* Retry: If the user clicks on the button, reload the page */}
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <section role="card-container" className={styles.section}>
      {launches.map((launch) => (
        <LaunchCard key={launch.id} launch={launch} />
      ))}
    </section>
  );
};
