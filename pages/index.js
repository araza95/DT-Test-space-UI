import { Roboto } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Head from "next/head";
import { Header } from "@/components/Header";
import { LaunchSection } from "@/components/LaunchSection";
import { Pagination } from "@/components/Pagination";
import { useLaunches } from "@/hooks/useLaunches";
import { useState, memo } from "react";

const roboto = Roboto({ subsets: ["latin"], weight: ["300", "400"] });

// Memoize the components to prevent unnecessary re-renders
const MemoizedHeader = memo(Header);
const MemoizedPagination = memo(Pagination);

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const { launches, meta, loading, error } = useLaunches({
    page: currentPage,
    limit: 12,
  });

  const handleNextPage = () => {
    if (currentPage < meta.totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className={`${styles.container} ${roboto.className}`}>
      <Head>
        <title>SpaceX Launch Tracker</title>
        <meta
          name="description"
          content="Track SpaceX launches, mission details, and launch history in real-time"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="SpaceX Launch Tracker" />
        <meta
          property="og:description"
          content="Track SpaceX launches, mission details, and launch history in real-time"
        />
        <meta property="og:type" content="website" />
        <meta
          name="twitter:description"
          content="Track SpaceX launches, mission details, and launch history in real-time"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MemoizedHeader title="Space X Launch Tracker" />

      <main className={styles.main}>
        <LaunchSection launches={launches} loading={loading} error={error} />
      </main>

      <MemoizedPagination
        currentPage={currentPage}
        totalPages={meta.totalPages}
        onNextPage={handleNextPage}
        onPrevPage={handlePrevPage}
      />
    </div>
  );
}
