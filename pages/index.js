import { Roboto } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Head from "next/head";
import { Header } from "@/components/Header";
import { LaunchCard } from "@/components/LaunchCard";
import { Pagination } from "@/components/Pagination";
import { useLaunches } from "@/hooks/useLaunches";
import { useState } from "react";

const roboto = Roboto({ subsets: ["latin"], weight: ["300", "400"] });

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  
  const { launches, meta, loading, error } = useLaunches({
    page: currentPage,
    limit: 10,
  });

  const handleNextPage = () => {
    if (currentPage < meta.totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  if (loading)
    return (
      <div className={styles.loading}>
        <p>Loading launches...</p>
      </div>
    );

  if (error)
    return (
      <div className={styles.error}>
        <p>Error: {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );

  return (
    <div className={`${styles.container} ${roboto.className}`}>
      <Head>
        <title>SpaceX Launch Tracker</title>
        <meta name="description" content="SpaceX launch monitoring application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Header title="Space X Launch Tracker" />
      
      <main className={styles.main}>
        <section role="card-container" className={styles.main__section}>
          {launches.map((launch) => (
            <LaunchCard key={launch.id} launch={launch} />
          ))}
        </section>
      </main>
      
      <div className={styles.pagination}>
        <Pagination
          currentPage={currentPage}
          totalPages={meta.totalPages}
          onNextPage={handleNextPage}
          onPrevPage={handlePrevPage}
        />
      </div>
    </div>
  );
}
